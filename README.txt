BALANCEIQ v5.2.1 — REBUILT FROM VERIFIED v5.1

This release was rebuilt directly from the user's last known working v5.1 package.

CHANGES
- Preserves the original v5.1 navigation and tab implementation.
- Uses local device time for Good morning / afternoon / evening.
- Uses local calendar dates for new manual transactions and receipts.
- Adds reliable Category and Subcategory dropdowns to:
  * Manual transaction entry and editing
  * Receipt entry
  * Merchant rules
- Removes personal default assets:
  * Audi TT
  * Holiday Home
  * Amarok
  * Ford Ranger
  * PPS
- New installations have no preloaded assets, merchant rules or sample transactions.
- Adds optional sample data in Settings.
- Adds onboarding for usage mode, currency, appearance and optional first asset.
- Adds About BalanceIQ with version and build number.
- Displays v5.2.1 beside the logo.
- Updates the service-worker cache.

UPGRADING
Existing locally saved user data is preserved. Personal assets already saved in an existing browser are not deleted automatically.

DEPLOYMENT
Replace every hosted app file with the contents of this ZIP.
Then hard-refresh the browser or remove and reinstall the PWA so the old service-worker cache is cleared.
