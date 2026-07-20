CHAD'S FINANCE MANAGER V3.1

V3.1 PDF FIX
- Added support for Suncorp dates written as "1 Feb 2025".
- Uses the running balance to determine whether each transaction is a withdrawal or deposit.
- Supports continuation lines and multiple sub-accounts.
- Skips statement headers, page footers, references and foreign-currency detail lines.
- Gives balance-reconciled rows 98% extraction confidence.

NEW FEATURES
- Dark mode.
- Editable and manually created transactions.
- Assets such as Amarok, Home, Investment Property and PPS.
- Tax-deductible transaction flag.
- Tags and notes.
- Date-range dashboard filtering.
- Financial year reporting.
- Asset spending summaries.
- Largest-expense report.
- CSV report export.
- Improved mobile layout.
- CSV and selectable-text PDF importing.
- Duplicate detection and merchant-rule learning.
- Local JSON backup and restore.

DEPLOYING TO GITHUB PAGES
1. Replace the old files in your repository with the files in this package.
2. Keep index.html in the repository root.
3. The repository must be public for GitHub Pages on the free plan.
4. Open Settings > Pages.
5. Under Build and deployment choose Deploy from a branch.
6. Select main and /(root), then Save.
7. Wait a few minutes and open your username.github.io address.

PRIVACY
The hosted code is public, but your imported transaction data stays in your browser's local storage.
Do not put real statements, backups, CSV files or personal documents into the GitHub repository.

PDF NOTE
PDF.js is loaded from a public CDN. The statement is processed in the browser and is not uploaded by this app.
Scanned image PDFs are not supported yet.
