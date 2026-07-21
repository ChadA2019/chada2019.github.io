BALANCEIQ v6.7 — CANDIDATE VALIDATION RELEASE

DATE VALIDATION
- Future receipt years are rejected.
- A clear full-receipt date receives more weight than a conflicting date-strip result.
- Two-digit or truncated years receive a strong penalty.
- Same-year dates more than seven days in the future are rejected.
- Year disagreement lowers trust instead of selecting the largest year.

TOTAL VALIDATION
- EFT is recognised as a payment label.
- Payment values receive stronger evidence than subtotals.
- A payment value matching a Total or GST-inclusive total line receives a consensus bonus.
- Subtotals that differ materially from the payment amount are penalised.
- A candidate must have a trusted financial role before it can populate Total Paid.

GST VALIDATION
- GST values equal to the total are rejected.
- GST candidates above 20% of the total are rejected.
- On GST-inclusive receipts, Total ÷ 11 is preferred when OCR GST values are implausible.
- Additional damaged GST-included wording is recognised.

INSTALLATION
Replace every hosted file, unregister the previous service worker or uninstall the PWA,
clear cached files, hard-refresh, and reinstall if required.
