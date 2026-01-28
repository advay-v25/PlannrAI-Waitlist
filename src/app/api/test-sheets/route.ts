import { NextResponse } from 'next/server';

// Diagnostic endpoint to test Google Sheets connection
export async function GET() {
    const diagnostics: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    };

    // Check environment variables (don't expose full values)
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

    diagnostics.spreadsheetId = spreadsheetId ? `Set (${spreadsheetId.substring(0, 8)}...)` : 'NOT SET';
    diagnostics.clientEmail = clientEmail ? `Set (${clientEmail})` : 'NOT SET';
    diagnostics.privateKeyLength = privateKey ? privateKey.length : 0;
    diagnostics.privateKeyStart = privateKey ? privateKey.substring(0, 30) : 'NOT SET';
    diagnostics.privateKeyHasNewlines = privateKey ? privateKey.includes('\\n') : false;
    diagnostics.privateKeyHasRealNewlines = privateKey ? privateKey.includes('\n') : false;

    if (!spreadsheetId || !clientEmail || !privateKey) {
        return NextResponse.json({
            success: false,
            error: 'Missing environment variables',
            diagnostics,
        }, { status: 500 });
    }

    // Try to create JWT and get access token
    try {
        const jwt = await createJWT(clientEmail, privateKey);
        diagnostics.jwtCreated = true;
        diagnostics.jwtLength = jwt.length;

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: jwt,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            diagnostics.tokenError = tokenData;
            return NextResponse.json({
                success: false,
                error: 'Failed to get access token',
                diagnostics,
            }, { status: 500 });
        }

        diagnostics.tokenObtained = true;

        // Try to read from the spreadsheet
        const testResponse = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:A1`,
            {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`,
                },
            }
        );

        const testData = await testResponse.json();

        if (!testResponse.ok) {
            diagnostics.sheetsError = testData;
            return NextResponse.json({
                success: false,
                error: 'Failed to access spreadsheet',
                diagnostics,
            }, { status: 500 });
        }

        diagnostics.sheetsAccess = true;
        diagnostics.testRead = testData;

        return NextResponse.json({
            success: true,
            message: 'Google Sheets connection working!',
            diagnostics,
        });

    } catch (error) {
        diagnostics.error = error instanceof Error ? error.message : String(error);
        return NextResponse.json({
            success: false,
            error: 'Exception during test',
            diagnostics,
        }, { status: 500 });
    }
}

// JWT creation functions (same as main route)
async function createJWT(email: string, privateKey: string): Promise<string> {
    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: email,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const key = await importPrivateKey(privateKey);
    const signature = await signData(key, signatureInput);

    return `${signatureInput}.${signature}`;
}

function base64UrlEncode(str: string): string {
    const base64 = Buffer.from(str).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
    // Handle both escaped newlines and real newlines
    const pemContents = pem
        .replace(/\\n/g, '\n')
        .replace(/-----BEGIN PRIVATE KEY-----/, '')
        .replace(/-----END PRIVATE KEY-----/, '')
        .replace(/\s/g, '');

    const binaryDer = Buffer.from(pemContents, 'base64');

    return await crypto.subtle.importKey(
        'pkcs8',
        binaryDer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );
}

async function signData(key: CryptoKey, data: string): Promise<string> {
    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        key,
        encoder.encode(data)
    );

    const base64 = Buffer.from(signature).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
