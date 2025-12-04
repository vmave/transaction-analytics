'use client'

import styles from './HomeHero.module.css'

type Props = {
  stats: {
    transactionCount: number
    fieldCount: number
    distinctValueCount: number
  }
}

export const HomeHero = ({ stats }: Props) => (
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
)
