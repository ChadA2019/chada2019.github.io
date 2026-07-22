BalanceIQ v9.0 — Dual Local OCR Release

This release uses PaddleOCR PP-OCRv5 and Tesseract.js together in the browser.
No receipt image is sent to an OCR or AI processing server.

Important: the OCR libraries and model files are downloaded from public CDNs on first use and then cached by the browser. The app remains free to operate, but an internet connection is needed for the first model load unless you later self-host those assets.

Deployment: replace every file in the existing GitHub Pages site with the files in this package.
