BALANCEIQ v6.1 — OCR DIAGNOSTIC BUILD

PURPOSE
This is a development build for diagnosing real receipt-recognition failures. It exposes
the actual OCR output instead of hiding it behind the completed form.

DIAGNOSTIC PANEL
After pressing “Read scanned receipt”, expand OCR diagnostics to see:
- Raw combined OCR text
- OCR text and confidence for every photographed section
- Parser and merchant profile selected
- Extracted field values and confidence scores
- Ranked monetary candidates, their scores and repetition counts
- Overall extraction confidence and OCR quality

DEBUG EXPORT
- Copy debug report copies a readable report to the clipboard.
- Download JSON creates a local diagnostic file that can be shared for analysis.
- Receipt images are not placed inside the debug JSON.

SAFETY
Low-confidence fields are no longer automatically inserted into the form. This prevents
values such as product dimensions or weights from being silently saved as transaction totals.

TESTING WORKFLOW
1. Scan a receipt.
2. Press Read scanned receipt.
3. Open OCR diagnostics.
4. Check Raw OCR text and Amount candidates.
5. Download the JSON when the result is wrong.
6. Keep the original receipt image with the JSON for parser development.

INSTALLATION
Replace every hosted file. Clear/unregister the previous service worker or uninstall the
old PWA, hard-refresh the site, then reinstall if needed.
