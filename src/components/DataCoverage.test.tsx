import { render, screen } from '@testing-library/react'

import { DataCoverage } from './DataCoverage'

describe('DataCoverage', () => {
  it('shows dimension labels and values', () => {
    render(
      <DataCoverage
        dimensions={[
          { field: 'transaction_type', values: ['invoice', 'bill'] },
          { field: 'year', values: ['2023', '2024'] },
        ]}
      />,
    )

    expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    expect(screen.getByText('invoice')).toBeInTheDocument()
    expect(screen.getByText('bill')).toBeInTheDocument()
    expect(screen.getByText('Year')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })
})
