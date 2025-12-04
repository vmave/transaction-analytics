# Transaction Analytics Pivot

 Configurable pivot table over a transactions dataset. Built with Next.js (App Router) + TypeScript, with a small utility layer for grouping and aggregation and Jest tests for the data logic.

## Running the app

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The UI runs entirely in the browser off a static data source (`src/data/transactions.ts`), but the aggregation layer is structured to be swapped for an API call.

## Tests

```bash
npm test
```

Focuses on the transformation layer: parsing raw values, deriving distinct dimension values, and building pivot totals (including multi-level columns).

## Project structure

- `src/app/page.tsx` – main page wiring state, controls, and the pivot table.
- `src/components/grouping` – row/column grouping selectors with ordering and removal.
- `src/components/pivot` – spreadsheet-like table with nested headers, totals, and sticky labels.
- `src/components/home` / `src/components/data-coverage` – hero section and dimension badges.
- `src/data/transactions.ts` – canonical dataset; UI field metadata lives in `src/constants/fields.ts`.
- `src/lib/pivot/*` – transformation utilities (parse, distinct values, headers, pivot builder) with tests in `src/lib/pivot.test.ts`.

## Assumptions & notes

- Dataset is mocked locally; wiring to a backend would replace the in-memory `parseTransactions` call while keeping the pivot builder intact.
- Column grouping requires at least one field; row grouping is a single field. Axis-specific uniqueness is enforced to avoid duplicate selections on the same axis.
- Amounts are parsed as numbers for aggregation; sums include negative values.

## Next steps (given more time)

- Add server-side API + persistence (Django/PostgreSQL) and hydrate the UI from it.
- Extend filters (e.g., by year or type) and add CSV export.
- Add column formatting controls (currency/precision) and subtotals per hierarchy level.
