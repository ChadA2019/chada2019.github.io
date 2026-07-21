BALANCEIQ v6.4 — PARSER ISOLATION & SAFETY RELEASE

STRUCTURAL FIX
The business parser no longer consumes diagnostic marker text. Header, totals and full OCR
results are passed as separate channels.

MERCHANT SAFETY
- Bunnings is detected using combined evidence: damaged name variants, PowerPass, ABN,
  Tax Invoice wording and Bunnings-format invoice numbers.
- Diagnostic labels can never become the merchant.
- Weak generic merchant guesses beginning with separators are rejected.

TOTAL SAFETY
- Only values on labelled Total, PowerPass, Card, EFTPOS, Visa, Mastercard or Subtotal
  lines are considered.
- Item, quantity, discount, barcode, savings, change and rounding lines are heavily penalised.
- Implausible values over $5,000 are rejected.
- GST is never calculated from an untrusted total.
- Missing decimal repair is allowed only on labelled financial lines.

RECEIPT SAFETY
- Invoice extraction runs even when merchant detection is imperfect.
- Existing Bunnings invoice consensus and footer validation are retained.
- Low-evidence fields stay blank.

INSTALLATION
Replace all files, unregister the previous service worker or uninstall the old PWA, clear
cached files, hard-refresh, and reinstall if required.
