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
  <tr className={styles.summary}>
    <th className={`${styles.cell} ${styles.headerCell} ${styles.rowHeading} ${styles.rowHeadingSticky}`}>Column total</th>
    {columnLeaves.map((leaf, idx) => (
      <td key={`total-${leaf.key}`} className={`${styles.cell} ${styles.bodyCell} ${separators[idx] ? styles.groupEdge : ''}`}>
        {formatAmount(columnTotals[leaf.key])}
      </td>
    ))}
    <td className={`${styles.cell} ${styles.total}`}>{formatAmount(grandTotal)}</td>
  </tr>
)
