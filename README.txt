BALANCEIQ v6.8 — CURRENCY RECONSTRUCTION RELEASE

CURRENCY REPAIR
- Compact payment values such as 23693 are reconstructed as $236.93.
- Spaced decimals such as $91. 06 are reconstructed as $91.06.
- One-decimal OCR such as 236.9 is retained as a weaker $236.90 candidate.
- Every repaired value records the repair method in OCR diagnostics.

FINANCIAL-ROLE CONSENSUS
- Payment lines (PowerPass, EFT, EFTPOS, Card, Visa, Mastercard) have the strongest weight.
- Payment values that agree with Total or GST-inclusive total evidence receive a large bonus.
- Corrupted subtotals are penalised when they conflict with payment evidence.
- Tiny values caused by incorrect decimal insertion are rejected when a larger payment candidate exists.
- Item prices, discounts, savings, change and barcodes remain excluded.

GST
- Plausible printed GST remains preferred.
- Total ÷ 11 is retained as a fallback for GST-inclusive receipts.
- GST must remain below 20% of the selected total.

INSTALLATION
Replace every hosted file, unregister the previous service worker or uninstall the PWA,
clear cached files, hard-refresh, and reinstall if needed.
