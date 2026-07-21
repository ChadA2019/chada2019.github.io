BALANCEIQ v6.5 — DATE RECOVERY RELEASE

NEW OCR PASSES
Each receipt section now receives three dedicated date-strip OCR passes:
- Enlarged grayscale
- Enlarged adaptive black-and-white
- Enlarged sharpened

The date strip is cropped from the upper receipt area where Australian retailers commonly
print the transaction date and time. Date OCR restricts recognition to digits, slashes,
hyphens, time punctuation, AM/PM and weekday letters.

DATE CONSENSUS
- Date-strip OCR has the highest candidate weight.
- Full and header OCR remain supporting evidence.
- Australian numeric dates use DD/MM/YYYY.
- Footer/barcode dates in YYYY-MM-DD format remain strong evidence.
- Likely year errors such as 2006 instead of 2026 are merged when day/month agree.
- Separated OCR tokens such as “10 07 2026” are recoverable.
- If no defensible date exists, the field remains blank.

RETAINED
- Parser isolation
- Bunnings merchant evidence scoring
- Trusted total selection
- GST arithmetic recovery
- Strict invoice-number handling
- OCR diagnostics and JSON export

INSTALLATION
Replace every hosted file, unregister the previous service worker or uninstall the old PWA,
clear cached files, hard-refresh, and reinstall if needed.
