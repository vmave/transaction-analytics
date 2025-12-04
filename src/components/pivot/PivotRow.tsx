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
  <tr data-testid={`pivot-row-${rowValue}`}>
    <th
      className={`${styles.cell} ${styles.headerCell} ${styles.rowHeading} ${styles.rowHeadingSticky}`}
      scope="row"
      data-testid="pivot-row-heading"
    >
      {rowValue}
    </th>
    {columnLeaves.map((leaf, idx) => (
      <td
        key={`${rowValue}-${leaf.key}`}
        className={`${styles.cell} ${styles.bodyCell} ${separators[idx] ? styles.groupEdge : ''}`}
        data-testid={`pivot-row-cell-${rowValue}-${leaf.key}`}
      >
        {formatAmount(cells[rowValue][leaf.key].amount)}
      </td>
    ))}
    <td className={`${styles.cell} ${styles.total}`} data-testid={`pivot-row-total-${rowValue}`}>
      {formatAmount(rowTotals[rowValue])}
    </td>
  </tr>
)
