# Google Sheets Integration Setup Guide

This guide will help you connect your PlannrAI waitlist form to Google Sheets to automatically collect submissions.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"** or select an existing project
3. Name it something like "PlannrAI Waitlist"
4. Click **Create**

## Step 2: Enable Google Sheets API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for **"Google Sheets API"**
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **"+ CREATE CREDENTIALS"** > **Service Account**
3. Fill in the details:
   - Service account name: `plannrai-sheets`
   - Service account ID: (auto-generated)
4. Click **Create and Continue**
5. For role, select **Editor** and click **Continue**
6. Click **Done**

## Step 4: Create a Service Account Key

1. In the Credentials page, click on your newly created service account
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** and click **Create**
5. Save the downloaded JSON file securely (you'll need it)

## Step 5: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "PlannrAI Waitlist"
3. In Row 1, add these headers:
   ```
   A1: Timestamp
   B1: Submission ID
   C1: Full Name
   D1: Email
   E1: Age
   F1: Expectations
   G1: Main Problem
   ```
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

## Step 6: Share the Sheet with Service Account

1. In your Google Sheet, click **Share**
2. Add the service account email (from your JSON key file):
   ```
   plannrai-sheets@your-project.iam.gserviceaccount.com
   ```
3. Give it **Editor** access
4. Uncheck "Notify people" and click **Share**

## Step 7: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Google Sheets API Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

**Important:** The private key should be on a single line with `\n` for newlines, OR you can use triple quotes in some environments.

## Step 8: Verify It Works

1. Restart your development server: `npm run dev`
2. Fill out the waitlist form on your site
3. Check your Google Sheet - a new row should appear!

## Troubleshooting

### "Permission denied" error
- Make sure you shared the spreadsheet with the service account email
- Give it Editor access, not just Viewer

### "Invalid credentials" error
- Check that the private key is correctly formatted in `.env.local`
- Make sure there are no extra spaces before or after the key

### Data not appearing in sheet
- Verify the spreadsheet ID is correct
- Check the browser console and server logs for errors

## Security Notes

- Never commit your `.env.local` file to git
- The private key should be kept secret
- Form data is encrypted before transmission
- Only you (the sheet owner) can see the submissions

---

**Need help?** Check the server logs when submitting the form - they will show detailed error messages if something goes wrong.
