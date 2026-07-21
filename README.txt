BALANCEIQ v6.2 — OCR QUALITY RELEASE

- Three OCR passes per image: full receipt, high-contrast header, high-contrast totals.
- Australian DD/MM/YYYY parsing.
- Footer date correction for OCR year errors such as 2006 vs 2026.
- No fallback from Invoice/Receipt Number to Order Number or Job Number.
- Letters-only labels such as Details are rejected.
- Bunnings invoice IDs require ####/####### or ####/######## format.
- Fuzzy PowerPass and Total OCR variants are normalised.
- Payment values outrank subtotals when totals are damaged.
- Combined confidence includes actual Tesseract confidence.
- Date and receipt number stay blank when recognition is not reliable.
- Diagnostic panel remains available.

Install by replacing all files and clearing/unregistering the previous service worker.
