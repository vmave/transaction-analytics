'use client'

import { GroupingControls } from '@/components/GroupingControls'
import { PivotTable } from '@/components/PivotTable'
import { FIELD_LABELS } from '@/data/transactions'
import { usePivotConfig } from '@/hooks/usePivotConfig'
import styles from './page.module.css'

export default function HomePage() {
  const { rowField, columnFields, dimensionValues, pivot, stats, handlers } = usePivotConfig()

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className="eyebrow">Coding challenge</p>
          <h1>Transaction analytics pivot</h1>
          <p className={styles.subtitle}>
            Slice and aggregate transactions across transaction type, status, and year. Configure grouping on the fly to
            explore totals in a spreadsheet-like table.
          </p>
          <dl className={styles.stats}>
            <div>
              <dt>Transactions</dt>
              <dd>{stats.transactionCount}</dd>
            </div>
            <div>
              <dt>Fields</dt>
              <dd>{stats.fieldCount}</dd>
            </div>
            <div>
              <dt>Distinct values</dt>
              <dd>{stats.distinctValueCount}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className={styles.layout}>
        <GroupingControls
          rowField={rowField}
          columnFields={columnFields}
          onRowFieldChange={handlers.handleRowFieldChange}
          onColumnFieldChange={handlers.handleColumnFieldChange}
          onAddColumnField={handlers.handleAddColumnField}
          onRemoveColumnField={handlers.handleRemoveColumnField}
        />

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Data coverage</p>
              <h2>Dynamic values derived from data</h2>
            </div>
            <span className="muted">No hardcoded statuses, years, or types</span>
          </div>
          <div className={styles.badges}>
            {dimensionValues.map((dimension) => (
              <div key={dimension.field} className="chip-group">
                <span className="chip chip-label">{FIELD_LABELS[dimension.field]}</span>
                {dimension.values.map((value) => (
                  <span key={value} className="chip">
                    {value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <PivotTable result={pivot} rowField={rowField} columnFields={columnFields} />
      </section>
    </main>
  )
}
