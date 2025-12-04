'use client'

import { FIELD_LABELS } from '@/constants/fields'
import styles from './DataCoverage.module.css'
import { GroupField } from '@/types/transactions'

type Dimension = {
  field: GroupField
  values: string[]
}

type Props = {
  dimensions: Dimension[]
}

export const DataCoverage = ({ dimensions }: Props) => (
  <div className={styles.panel} data-testid="data-coverage">
    <div className={styles.panelHeader}>
      <div>
        <p className="eyebrow">Data coverage</p>
        <h2>Dynamic values derived from data</h2>
      </div>
      <span className={styles.muted}>No hardcoded statuses, years, or types</span>
    </div>
    <div className={styles.badges}>
      {dimensions.map((dimension) => (
        <div key={dimension.field} className={styles.chipGroup}>
          <span className={`${styles.chip} ${styles.chipLabel}`}>{FIELD_LABELS[dimension.field]}</span>
          {dimension.values.map((value) => (
            <span key={value} className={styles.chip}>
              {value}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
)
