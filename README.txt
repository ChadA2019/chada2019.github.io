BALANCEIQ v6.9 — SEQUENCE RECONSTRUCTION RELEASE

WHOLE-SEQUENCE CURRENCY PARSING
- Complete damaged currency strings are parsed before shorter substrings.
- $236 . 9. 3 becomes $236.93.
- $236 93 becomes $236.93.
- $91. 06 becomes $91.06.
- Compact parsing cannot extract $2.36 from inside a larger $236.xx sequence.
- OCR closing parenthesis can be interpreted as a final 5 in GST context:
  $21.5) becomes $21.55.

PAYMENT RECOGNITION
- Additional damaged PowerPass variants such as poverPase and PousrPass are treated
  as payment evidence.

INVOICE VALIDATION
- Standard footer references remain supported.
- OCR footer variants such as H019-T8347-2052-2026-07-07 reconstruct and validate
  invoice 2052/01978347.
- Footer-validated invoice candidates outrank conflicting header/full-pass readings.

GST RECOVERY
- GST extraction uses the same whole-sequence currency engine.
- Printed plausible GST remains preferred over arithmetic fallback.

INSTALLATION
Replace every hosted file, unregister the prior service worker or uninstall the PWA,
clear cached files, hard-refresh, and reinstall if required.
