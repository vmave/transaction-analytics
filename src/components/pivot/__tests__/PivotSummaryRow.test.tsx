import { render, screen } from '@testing-library/react'

import { PivotSummaryRow } from '../PivotSummaryRow'
import { ColumnLeaf } from '@/lib/pivot'

const columnLeaves: ColumnLeaf[] = [
  { key: 'a', path: ['a'] },
  { key: 'b', path: ['b'] },
]

describe('PivotSummaryRow', () => {
  it('renders column totals and grand total', () => {
    render(
      <table>
        <tbody>
          <PivotSummaryRow
            columnLeaves={columnLeaves}
            columnTotals={{ a: 5, b: 10 }}
            grandTotal={15}
            separators={[false, true]}
          />
        </tbody>
      </table>,
    )

    expect(screen.getByTestId('pivot-summary-heading')).toBeInTheDocument()
    expect(screen.getByTestId('pivot-summary-cell-a')).toHaveTextContent('$5.00')
    expect(screen.getByTestId('pivot-summary-cell-b')).toHaveTextContent('$10.00')
    expect(screen.getByTestId('pivot-summary-grand')).toHaveTextContent('$15.00')
  })
})
