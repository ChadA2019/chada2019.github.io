BALANCEIQ v7.1 — TOTALS COLUMN CONSENSUS

TOTALS-COLUMN OCR
- Adds two high-resolution OCR passes over the right-hand Total/GST/PowerPass column.
- Adds an even tighter GST-number pass.
- Regional evidence is isolated and receives higher weight than broad receipt OCR.

CURRENCY
- $236 . 93 is reconstructed as $236.93.
- Complete spaced decimals are parsed before shorter fragments.
- A clearly labelled exact Total can beat a conflicting one-digit PowerPass OCR result.
- A payment amount differing by less than $1 becomes supporting evidence rather than final authority.

GST
- Printed GST from the tight GST/right-column pass is preferred when plausible.
- Total ÷ 11 remains a fallback, not an automatic override.
- This supports receipts containing rounding or non-taxable items.

RETAINED
- Reference-number protection
- Weekday/date validation
- Footer invoice validation
- Receipt geometry
- Low-confidence blank-field safeguards

INSTALLATION
Replace all hosted files, unregister the previous service worker or uninstall the PWA,
clear cached files, hard-refresh, and reinstall if required.
