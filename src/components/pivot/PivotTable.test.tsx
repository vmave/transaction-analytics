import { render, screen } from '@testing-library/react'

import { PivotTable } from './PivotTable'

const sampleResult = {
  rows: ['row1'],
  columnLeaves: [{ key: 'col1', path: ['col1'] }],
  headers: [[{ label: 'col1', span: 1 }]],
  cells: { row1: { col1: { amount: 10, count: 1 } } },
  rowTotals: { row1: 10 },
  columnTotals: { col1: 10 },
  grandTotal: 10,
}

describe('PivotTable', () => {
  it('renders headers and totals', () => {
    render(<PivotTable result={sampleResult as any} rowField="transaction_type" columnFields={['status']} />)

    expect(screen.getByText(/row groups/i)).toBeInTheDocument()
    expect(screen.getByText('Row total')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })
})
