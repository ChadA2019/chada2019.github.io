CHAD'S FINANCE MANAGER V4

VERSION 4 ADDS
- Optional encrypted cloud backup and device sync.
- Free Supabase backend owned by you.
- Email magic-link sign-in.
- AES-256-GCM encryption in the browser before upload.
- Automatic sync while signed in and the app is open.
- Existing Version 3.3 PDF importer, reports, categories and merchant learning.

SETUP
1. Create a free Supabase project.
2. Run supabase_setup.sql in Supabase SQL Editor.
3. In Authentication > URL Configuration, set your GitHub Pages URL as Site URL and add it to Redirect URLs.
4. Copy Project URL and anon public key from Project Settings > API.
5. Paste these into Settings > Encrypted Cloud Sync in the app.
6. Request an email sign-in link.
7. Enter a strong encryption passphrase and press Sync Now.

IMPORTANT
- Do not forget the encryption passphrase; it cannot be recovered.
- Do not upload statements, CSVs or backup files to GitHub.
- Cloud sync is optional. The app still operates locally without it.
- Clearing browser Site Data can still erase the local copy, but the encrypted cloud copy can be restored after signing in with the same passphrase.
