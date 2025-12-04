'use client'

import { ColumnLeaf, PivotResult } from '@/lib/pivot'
import { formatAmount } from './utils'

type Props = {
  rowValue: string
  columnLeaves: ColumnLeaf[]
  cells: PivotResult['cells']
  rowTotals: PivotResult['rowTotals']
  separators: boolean[]
}

export const PivotRow = ({ rowValue, columnLeaves, cells, rowTotals, separators }: Props) => (
  <tr>
    <th className="row-heading sticky" scope="row">
      {rowValue}
    </th>
    {columnLeaves.map((leaf, idx) => (
      <td key={`${rowValue}-${leaf.key}`} className={separators[idx] ? 'group-edge' : ''}>
        {formatAmount(cells[rowValue][leaf.key].amount)}
      </td>
    ))}
    <td className="total">{formatAmount(rowTotals[rowValue])}</td>
  </tr>
)
