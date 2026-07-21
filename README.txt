BALANCEIQ v5.3 PROFESSIONAL

This package is the professional release of the v5.3 Australian receipt intelligence build.

CORE FEATURES
- Smart multi-image receipt capture and OCR.
- Merchant-aware parsing for common Australian retailers.
- Invoice number prioritised over order number and job number.
- Improved total and GST extraction.
- Receipt date and time extraction.
- Merchant-aware category suggestions.
- OCR quality score and field-extraction confidence recorded in receipt notes.
- Existing bank-import reconciliation workflow retained.
- Explicit DOM bindings and stable navigation retained from v5.2.2.
- PDF.js loads on demand so a network failure cannot disable the whole app.

BUNNINGS VALIDATION CASE
Expected output for the supplied receipt:
Merchant: Bunnings Warehouse
Branch: O'Connor
Date: 21/07/2026
Time: 08:30:45 AM
Total: $68.64
GST: $6.24
Receipt number: 2402/01719325
Payment method: Card
Category: Home & Maintenance
Subcategory: Hardware

INSTALLATION
1. Extract the ZIP.
2. Upload every included app file to the same web-app directory.
3. Remove the old installed PWA or unregister the old service worker.
4. Clear the site's cached files.
5. Reopen the site and hard-refresh.
6. Reinstall the PWA if required.

DATA
Existing BalanceIQ browser data remains compatible. Back up important data before replacing a production deployment.
