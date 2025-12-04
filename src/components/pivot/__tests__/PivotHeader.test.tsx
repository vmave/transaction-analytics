import { render, screen } from '@testing-library/react'

import { PivotHeader } from '../PivotHeader'

const headers = [
  [{ label: 'group', span: 2 }],
  [
    { label: 'A', span: 1 },
    { label: 'B', span: 1 },
  ],
]

describe('PivotHeader', () => {
  it('renders row heading and totals header', () => {
    render(
      <PivotHeader
        headers={headers}
        rowField="transaction_type"
        separators={[false, false]}
      />,
    )

    expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    expect(screen.getByText('Row total')).toBeInTheDocument()
  })
})
