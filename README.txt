BALANCEIQ v7.0 — REFERENCE PROTECTION RELEASE

REFERENCE PROTECTION
- CARD NO, account, ABN, phone, order, job, authorization, invoice and receipt-number
  lines are completely excluded from currency extraction.
- A card reference such as 903601-369 can never become $3.69.
- Card payment evidence requires a genuine payment context; card-number labels are not payments.

DATE VALIDATION
- Weekday text is checked against the parsed date.
- A date such as Tue 07/07/2006 is rejected because that calendar date was not Tuesday.
- When exactly one recent year matches the weekday/month/day combination, the year is repaired.
- Existing footer and future-date protections remain active.

DEDICATED OCR
- A high-resolution footer pass improves invoice/footer validation.
- A narrow GST-region pass improves printed GST recognition.
- Footer and GST text remain isolated channels.

INVOICE VALIDATION
- Footer forms containing register references and 019-78347-2052-style identifiers
  receive stronger evidence than conflicting header OCR.

INSTALLATION
Replace all hosted files, unregister the old service worker or uninstall the PWA,
clear cached files, hard-refresh, and reinstall if required.
