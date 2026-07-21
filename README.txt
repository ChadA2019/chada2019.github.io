BALANCEIQ v6.3 — CANDIDATE CONSENSUS RELEASE

DATE
- Collects dates from every OCR pass.
- Full-pass and footer agreement outweighs a weaker header result.
- Likely OCR year errors are merged when day/month match.

INVOICE
- Collects every Bunnings-format invoice candidate.
- Full-pass candidates receive higher weight.
- Barcode/footer store and suffix references arbitrate competing invoice values.

GST
- Collects GST candidates from all OCR passes.
- Cross-checks values against Total ÷ 11.
- For GST-inclusive receipts, arithmetic consistency wins when OCR returns nearby conflicting values.
- Example: total $77.26 resolves conflicting $7.00 and $7.07 readings to $7.02.

CONFIDENCE AND DIAGNOSTICS
- Candidate disagreement lowers field confidence.
- Ranked date, invoice and GST candidates appear in OCR diagnostics.

INSTALLATION
Replace every file, unregister the old service worker or uninstall the old PWA, clear cached files, hard-refresh, then reinstall if required.
