import { NextRequest, NextResponse } from 'next/server';

interface SignUpData {
    submissionId?: string;
    // Step 1: Basics
    fullName: string;
    email: string;
    ageRange: string;
    occupation: string;
    // Step 2: Current Situation
    currentTools: string;
    painPoints: string;
    // Step 3: Wants & Needs
    topFeatures: string;
    mainGoal: string;
    // Step 4: Pricing & Closing
    willingToPay: string;
    priceJustification?: string;
    referralSource: string;
    // Metadata
    submittedAt?: string;
}

// Security headers for the response
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export async function POST(request: NextRequest) {
    try {
        const data: SignUpData = await request.json();
        const submissionId = request.headers.get('X-Submission-ID') || data.submissionId || 'unknown';

        // Validate required fields
        if (!data.fullName || !data.email || !data.ageRange || !data.occupation) {
            return NextResponse.json(
                { error: 'Missing required fields in Step 1' },
                { status: 400, headers: securityHeaders }
            );
        }

        if (!data.currentTools || !data.painPoints) {
            return NextResponse.json(
                { error: 'Missing required fields in Step 2' },
                { status: 400, headers: securityHeaders }
            );
        }

        if (!data.topFeatures || !data.mainGoal) {
            return NextResponse.json(
                { error: 'Missing required fields in Step 3' },
                { status: 400, headers: securityHeaders }
            );
        }

        if (!data.willingToPay || !data.referralSource) {
            return NextResponse.json(
                { error: 'Missing required fields in Step 4' },
                { status: 400, headers: securityHeaders }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400, headers: securityHeaders }
            );
        }

        // Check for Google Sheets credentials
        const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
        const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

        const timestamp = new Date().toISOString();

        if (!privateKey || !clientEmail || !spreadsheetId) {
            // If Google Sheets is not configured, log to console
            console.log('\n========== NEW WAITLIST SUBMISSION ==========');
            console.log('Submission ID:', submissionId);
            console.log('Timestamp:', timestamp);
            console.log('--- BASICS ---');
            console.log('Full Name:', data.fullName);
            console.log('Email:', data.email);
            console.log('Age Range:', data.ageRange);
            console.log('Occupation:', data.occupation);
            console.log('--- CURRENT SITUATION ---');
            console.log('Current Tools:', data.currentTools);
            console.log('Pain Points:', data.painPoints);
            console.log('--- WANTS & NEEDS ---');
            console.log('Top Features:', data.topFeatures);
            console.log('Main Goal:', data.mainGoal);
            console.log('--- PRICING ---');
            console.log('Willing to Pay:', data.willingToPay);
            console.log('Price Justification:', data.priceJustification || 'Not provided');
            console.log('Referral Source:', data.referralSource);
            console.log('==============================================\n');

            console.log('⚠️  Google Sheets not configured. See GOOGLE_SHEETS_SETUP.md for setup instructions.');

            return NextResponse.json({
                success: true,
                message: 'Sign-up recorded successfully (console mode)',
                submissionId,
            }, { headers: securityHeaders });
        }

        // Google Sheets API integration
        try {
            const jwt = await createJWT(clientEmail, privateKey);

            const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    assertion: jwt,
                }),
            });

            if (!tokenResponse.ok) {
                const errorText = await tokenResponse.text();
                console.error('Token error:', errorText);
                throw new Error('Failed to get access token');
            }

            const { access_token } = await tokenResponse.json();

            // Prepare row data for Google Sheets (expanded columns)
            const values = [[
                timestamp,                          // A: Timestamp
                submissionId,                       // B: Submission ID
                data.fullName,                      // C: Full Name
                data.email,                         // D: Email
                data.ageRange,                      // E: Age Range
                data.occupation,                    // F: Occupation
                data.currentTools,                  // G: Current Tools
                data.painPoints,                    // H: Pain Points
                data.topFeatures,                   // I: Top Features
                data.mainGoal,                      // J: Main Goal
                data.willingToPay,                  // K: Willing to Pay
                data.priceJustification || '',      // L: Price Justification
                data.referralSource,                // M: Referral Source
            ]];

            const appendResponse = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:M:append?valueInputOption=USER_ENTERED`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ values }),
                }
            );

            if (!appendResponse.ok) {
                const errorData = await appendResponse.json();
                console.error('Google Sheets API error:', errorData);
                throw new Error('Failed to append to spreadsheet');
            }

            console.log('✅ Waitlist submission saved to Google Sheets:', submissionId);

            return NextResponse.json({
                success: true,
                message: 'Sign-up recorded successfully',
                submissionId,
            }, { headers: securityHeaders });

        } catch (sheetsError) {
            console.error('Google Sheets error:', sheetsError);

            // Still log to console as backup
            console.log('\n========== SUBMISSION (Sheets failed) ==========');
            console.log('Submission ID:', submissionId);
            console.log('Timestamp:', timestamp);
            console.log('Full Name:', data.fullName);
            console.log('Email:', data.email);
            console.log('Age Range:', data.ageRange);
            console.log('Occupation:', data.occupation);
            console.log('Current Tools:', data.currentTools);
            console.log('Pain Points:', data.painPoints);
            console.log('Top Features:', data.topFeatures);
            console.log('Main Goal:', data.mainGoal);
            console.log('Willing to Pay:', data.willingToPay);
            console.log('Price Justification:', data.priceJustification || 'Not provided');
            console.log('Referral Source:', data.referralSource);
            console.log('================================================\n');

            // Return success anyway - data is logged
            return NextResponse.json({
                success: true,
                message: 'Sign-up recorded (backup mode)',
                submissionId,
            }, { headers: securityHeaders });
        }

    } catch (error) {
        console.error('Sign-up submission error:', error);
        return NextResponse.json(
            { error: 'Failed to process sign-up. Please try again.' },
            { status: 500, headers: securityHeaders }
        );
    }
}

// Helper function to create JWT for Google API authentication
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
