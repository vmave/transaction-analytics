'use client'

import styles from '@/app/page.module.css'

type Props = {
  stats: {
    transactionCount: number
    fieldCount: number
    distinctValueCount: number
  }
}

export function HomeHero({ stats }: Props) {
  return (
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
            <dd data-testid="stat-transactions">{stats.transactionCount}</dd>
          </div>
          <div>
            <dt>Fields</dt>
            <dd data-testid="stat-fields">{stats.fieldCount}</dd>
          </div>
          <div>
            <dt>Distinct values</dt>
            <dd data-testid="stat-distinct">{stats.distinctValueCount}</dd>
          </div>
        </dl>
      </div>
    </header>
  )
}