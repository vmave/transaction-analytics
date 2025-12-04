import { render, screen } from '@testing-library/react'

import { PivotRow } from '../PivotRow'
import { ColumnLeaf, Aggregation } from '@/lib/pivot'

const columnLeaves: ColumnLeaf[] = [
  { key: 'a', path: ['a'] },
  { key: 'b', path: ['b'] },
]

const cells: Record<string, Record<string, Aggregation>> = {
  row1: {
    a: { amount: 5, count: 1 },
    b: { amount: 10, count: 1 },
  },
}

describe('PivotRow', () => {
  it('renders cells and totals', () => {
    render(
      <table>
        <tbody>
          <PivotRow
            rowValue="row1"
            columnLeaves={columnLeaves}
            cells={cells}
            rowTotals={{ row1: 15 }}
            separators={[false, true]}
          />
        </tbody>
      </table>,
    )

    expect(screen.getByTestId('pivot-row-heading')).toHaveTextContent('row1')
    expect(screen.getByTestId('pivot-row-cell-row1-a')).toHaveTextContent('$5.00')
    expect(screen.getByTestId('pivot-row-cell-row1-b')).toHaveTextContent('$10.00')
    expect(screen.getByTestId('pivot-row-total-row1')).toHaveTextContent('$15.00')
  })
})
