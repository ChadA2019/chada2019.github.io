BalanceIQ v9.8.4 — Demo Dashboard & PWA Cache Fix

This release fixes Demo Mode transactions not appearing on the dashboard in installed/PWA copies.

Key changes:
- Replaced the stale v9.8.1 service-worker cache with a v9.8.4 network-first cache.
- Added skipWaiting and clients.claim so updates activate immediately.
- Demo transactions now include stable demo IDs and explicit demo markers.
- Demo Mode verifies data was saved before showing success.
- Dashboard date filters are cleared before the demo dashboard is displayed.
- The Settings confirmation now reports demo income and expenses.
