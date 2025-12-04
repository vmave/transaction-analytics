'use client'

import { ColumnLeaf, PivotResult } from '@/lib/pivot'
import { formatAmount } from './utils'
import styles from './PivotTable.module.css'

type Props = {
  columnLeaves: ColumnLeaf[]
  columnTotals: PivotResult['columnTotals']
  grandTotal: number
  separators: boolean[]
}

export const PivotSummaryRow = ({ columnLeaves, columnTotals, grandTotal, separators }: Props) => (
  <tr className={styles.summary} data-testid="pivot-summary-row">
    <th
      className={`${styles.cell} ${styles.headerCell} ${styles.rowHeading} ${styles.rowHeadingSticky}`}
      data-testid="pivot-summary-heading"
    >
      Column total
    </th>
    {columnLeaves.map((leaf, idx) => (
      <td
        key={`total-${leaf.key}`}
        className={`${styles.cell} ${styles.bodyCell} ${separators[idx] ? styles.groupEdge : ''}`}
        data-testid={`pivot-summary-cell-${leaf.key}`}
      >
        {formatAmount(columnTotals[leaf.key])}
      </td>
    ))}
    <td className={`${styles.cell} ${styles.total}`} data-testid="pivot-summary-grand">
      {formatAmount(grandTotal)}
    </td>
  </tr>
)
