'use client'

import { FIELD_LABELS } from '@/constants/fields'
import { PivotResult } from '@/lib/pivot'
import { PivotHeader } from './PivotHeader'
import { PivotRow } from './PivotRow'
import { PivotSummaryRow } from './PivotSummaryRow'
import { getGroupSeparators } from './utils'
import styles from './PivotTable.module.css'
import { GroupField } from '@/types/transactions'

type Props = {
  result: PivotResult
  rowField: GroupField
  columnFields: GroupField[]
}

// Orchestrates pivot header, body rows, and summary row.
export const PivotTable = ({ result, rowField, columnFields }: Props) => {
  const separators = getGroupSeparators(result.columnLeaves)

  return (
    <div className={styles.tableCard} data-testid="pivot-table">
      <div className={styles.tableHeader}>
        <div>
          <p className="eyebrow">Report</p>
          <h2 className={styles.tableTitle}>
            {FIELD_LABELS[rowField]} by {columnFields.map((field) => FIELD_LABELS[field]).join(' → ')}
          </h2>
        </div>
        <div className={styles.meta}>
          <span>{result.rows.length} row groups</span>
          <span>{result.columnLeaves.length} column groups</span>
        </div>
      </div>

      <div className={styles.tableScroll} data-testid="pivot-scroll">
        <table className={styles.pivot} data-testid="pivot-grid">
          <PivotHeader headers={result.headers} rowField={rowField} separators={separators} />
          <tbody>
            {result.rows.map((rowValue) => (
              <PivotRow
                key={rowValue}
                rowValue={rowValue}
                columnLeaves={result.columnLeaves}
                cells={result.cells}
                rowTotals={result.rowTotals}
                separators={separators}
              />
            ))}
            <PivotSummaryRow
              columnLeaves={result.columnLeaves}
              columnTotals={result.columnTotals}
              grandTotal={result.grandTotal}
              separators={separators}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}
