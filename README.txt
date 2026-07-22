BalanceIQ v9.3 — Version Synchronisation & Cleanup

Deploy every file in this folder together.

Receipt workflow:
1. Photograph or select the receipt.
2. Select Quick Scan.
3. BalanceIQ performs one fast local OCR pass and fills likely values.
4. Check the highlighted fields, correct anything inaccurate, then save.

Version information is now controlled from APP_INFO in app.js. The header badge, About page, build label and browser title read from that shared source, preventing stale visible version numbers in future releases.

Quick Scan remains intentionally assistive rather than exhaustive. All OCR runs locally in the browser. No AI or external receipt-processing server is required.
