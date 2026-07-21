BALANCEIQ v6.0 — MERCHANT INTELLIGENCE ENGINE

v6.0 introduces a profile-driven receipt parsing architecture.

MERCHANT PROFILES INCLUDED
- Bunnings Warehouse
- Woolworths
- Coles
- ALDI
- Officeworks
- JB Hi-Fi
- Supercheap Auto
- Repco
- BCF
- Kmart
- Target
- Ampol
- Shell
- BP

RECEIPT INTELLIGENCE
- Merchant detection selects a parser profile.
- Invoice numbers rank above receipt, transaction, order and job numbers.
- Multiline invoice numbers are supported.
- Repeated monetary values are used as consensus signals.
- A single noisy OCR total can be rejected when repeated subtotal/payment values agree.
- GST is read from the same line or following line.
- Australian GST-inclusive receipts can recover GST as total ÷ 11 when the printed amount is missed.
- Parser identity, merchant profile, OCR quality and extraction confidence are saved in notes.

VERIFIED BUNNINGS CASES
1. $68.64 total, $6.24 GST, invoice 2402/01719325
2. Noisy OCR total $76.69 corrected to $26.89, GST recovered as $2.44,
   invoice 2402/00972200

INSTALLATION
Replace every hosted file with this package. Unregister the previous service worker or
uninstall the old PWA, clear cached site files, hard-refresh, and reinstall if required.
