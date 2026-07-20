BALANCEIQ v5.2.2 — NAVIGATION STABILITY RELEASE

ROOT CAUSE FOUND
The uploaded v5.2.1 app.js contained duplicated raw HTML after renderAssetSettings().
That made app.js invalid JavaScript, so the browser could not parse it. As a result,
navigation handlers, greeting updates and most buttons never initialized.

FIXES
- Repaired the malformed renderAssetSettings function.
- Added explicit document.getElementById bindings for app controls.
- Added validated navigation event listeners.
- Changed PDF.js from a startup import to an on-demand import.
- Updated version/build and the service-worker cache.

VALIDATION
- JavaScript syntax validated with Node.
- Every navigation button was checked against a matching view ID.
- All required HTML element IDs were checked before packaging.

DEPLOYMENT
Replace every hosted file with this ZIP's contents.
Then clear the site's cache and unregister the old service worker, or uninstall the old PWA.
Reopen the site and hard-refresh before reinstalling. Otherwise the browser may keep serving
the broken v5.2.1 app.js.
