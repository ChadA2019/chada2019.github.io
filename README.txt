BALANCEIQ v6.6 — RECEIPT GEOMETRY & RECOVERY

RECEIPT GEOMETRY
- Detects the bright, low-saturation receipt area inside the camera image.
- Crops OCR processing to the detected receipt bounds.
- Header, date and totals regions are now measured relative to the receipt rather than
  the full photograph.
- Geometry confidence and bounds are included in OCR diagnostics.

DATE RECOVERY
- Dedicated date-strip OCR now runs on the detected receipt.
- Existing Australian DD/MM/YYYY, footer date and year-correction logic remains active.
- Partial date fragments can be completed only when matching footer evidence exists.
- Weak dates remain blank.

INVOICE RECOVERY
- Bunnings invoice numbers can be reconstructed from digit-only OCR such as
  2163700737706 → 2163/00737706.
- Standard invoice and footer consensus remains preferred.

TOTAL AND GST RECOVERY
- Fuzzy “included in the total” OCR variants can support a total candidate.
- GST arithmetic recovery recognizes damaged versions of the GST-included phrase.
- Existing trusted-total and item-line safety rules remain active.

INSTALLATION
Replace every hosted file, unregister the old service worker or uninstall the old PWA,
clear cached files, hard-refresh, and reinstall if required.
