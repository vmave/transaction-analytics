'use client'

import { FIELD_LABELS, GroupField } from '@/constants/fields'
import styles from '@/app/page.module.css'

type Dimension = {
  field: GroupField
  values: string[]
}

type Props = {
  dimensions: Dimension[]
}

export const DataCoverage = ({ dimensions }: Props) => (
  <div className="panel" data-testid="data-coverage">
    <div className="panel-header">
      <div>
        <p className="eyebrow">Data coverage</p>
        <h2>Dynamic values derived from data</h2>
      </div>
      <span className="muted">No hardcoded statuses, years, or types</span>
    </div>
    <div className={styles.badges}>
      {dimensions.map((dimension) => (
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
)
