'use client'

import { ColumnLeaf, PivotResult } from '@/lib/pivot'
import { formatAmount } from './utils'
import styles from './PivotTable.module.css'

type Props = {
  rowValue: string
  columnLeaves: ColumnLeaf[]
  cells: PivotResult['cells']
  rowTotals: PivotResult['rowTotals']
  separators: boolean[]
}

export const PivotRow = ({ rowValue, columnLeaves, cells, rowTotals, separators }: Props) => (
  <tr>
    <th className={`${styles.cell} ${styles.headerCell} ${styles.rowHeading} ${styles.rowHeadingSticky}`} scope="row">
      {rowValue}
    </th>
    {columnLeaves.map((leaf, idx) => (
      <td
        key={`${rowValue}-${leaf.key}`}
        className={`${styles.cell} ${styles.bodyCell} ${separators[idx] ? styles.groupEdge : ''}`}
      >
        {formatAmount(cells[rowValue][leaf.key].amount)}
      </td>
    ))}
    <td className={`${styles.cell} ${styles.total}`}>{formatAmount(rowTotals[rowValue])}</td>
  </tr>
)
