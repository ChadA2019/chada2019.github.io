CHAD'S FINANCE MANAGER V2

NEW IN THIS VERSION
- Imports Suncorp CSV files.
- Imports selectable-text PDF bank statements.
- Extracts dates, descriptions and transaction amounts.
- Shows a preview before PDF transactions are saved.
- Allows corrections and deselection of uncertain PDF rows.
- Detects duplicate transactions across CSV and PDF imports.
- Applies merchant rules and sends unfamiliar merchants to Review Queue.
- Stores data locally in the browser.
- Exports and restores JSON backups.

IMPORTANT
The PDF reader loads PDF.js from a trusted public CDN, so internet access is needed when the
app first loads. Your bank statement itself is processed inside your browser and is not uploaded
by this app.

Scanned or photographed PDFs are not supported in this version. Those require OCR.

ANDROID INSTALLATION
Upload the extracted folder to an HTTPS static host such as GitHub Pages, Netlify or Cloudflare
Pages. Open the address in Chrome and choose Add to Home screen or Install App.

LOCAL TESTING ON WINDOWS
Extract the ZIP, open a terminal in the folder and run:
    python -m http.server 8000
Then open:
    http://localhost:8000
