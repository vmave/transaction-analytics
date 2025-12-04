'use client'

import { ColumnLeaf, PivotResult } from '@/lib/pivot'
import { formatAmount } from './utils'

type Props = {
  columnLeaves: ColumnLeaf[]
  columnTotals: PivotResult['columnTotals']
  grandTotal: number
  separators: boolean[]
}

export const PivotSummaryRow = ({ columnLeaves, columnTotals, grandTotal, separators }: Props) => (
  <tr className="summary">
    <th className="row-heading sticky">Column total</th>
    {columnLeaves.map((leaf, idx) => (
      <td key={`total-${leaf.key}`} className={separators[idx] ? 'group-edge' : ''}>
        {formatAmount(columnTotals[leaf.key])}
      </td>
    ))}
    <td className="total">{formatAmount(grandTotal)}</td>
  </tr>
)
