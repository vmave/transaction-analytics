# Transaction Analytics Pivot

Configurable pivot table over a small transactions dataset. Built with Next.js (App Router) + TypeScript. Includes a lightweight transformation layer for grouping/aggregation and Jest tests for core logic.

## Running the app

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The UI uses the static data from `src/data/transactions.ts` and runs fully in the browser.

## Tests

```bash
npm test
```

## Covers

- data utilities (parse, distinct values, headers, pivot builder)
- UI components (hero, coverage badges, grouping controls, pivot table)

## Project structure

- `src/app/page.tsx` — page wiring state, controls, and table
- `src/constants/fields.ts` — field labels
- `src/components/grouping` — row/column grouping controls
- `src/components/pivot` — table with nested headers, totals, sticky labels
- `src/components/home`, `src/components/data-coverage` — hero & dimension badges
- `src/data/transactions.ts` — mocked dataset
- `src/lib/pivot/` — parsing, distinct extraction, header builder, aggregator (with tests)
- `src/hooks/` — state (`usePivotState`), data (`usePivotData`), aggregation (`usePivotResult`), composition (`usePivotConfig`)
- **CSS** — globals in `globals.css`, component-level styles in `*.module.css`

## Assumptions & notes

- Dataset is local and mocked  
- Row grouping uses a single field; column grouping requires at least one  
- Duplicate fields on the same axis are not allowed  
- Amounts are parsed as numbers and summed, including negative values  

## Next steps (given more time)

- Add filters (e.g. by year or type) and CSV export  
- Add smooth transitions when grouping changes  
- Persist table configuration in `localStorage`  
- Move styling into a design system or CSS modules  
- Improve accessibility (ARIA roles, keyboard focus handling)
