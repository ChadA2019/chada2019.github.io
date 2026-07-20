BALANCEIQ VERSION 5 — COMMERCIAL PREVIEW

WHAT IS NEW
- Complete BalanceIQ rebrand with a cleaner commercial interface.
- Smart receipt camera capture for phones.
- Optional on-device receipt OCR through Tesseract.js when online.
- Immediate expense creation from a saved receipt.
- Automatic receipt-to-bank reconciliation during later CSV/PDF imports.
- Confidence scoring using amount, date, merchant similarity and account.
- Review workflow for uncertain receipt matches.
- Duplicate protection for bank imports and repeat receipt scans.
- Preserves receipt image, GST, account, payment method and bank details.
- Version 4 encrypted Supabase cloud sync remains included.
- Installable PWA and ready to become a Capacitor Android project.

DEPLOYMENT
Replace the files in your GitHub Pages repository with all files in this package. After deployment, hard refresh or remove/reinstall the existing PWA so the BalanceIQ v5 service worker is loaded.

IMPORTANT
This is a working commercial-preview build, not yet a Play Store production release. Receipt OCR quality depends on image quality and internet access to load Tesseract.js. Manual entry remains available.
