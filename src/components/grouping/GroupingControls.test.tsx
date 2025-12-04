import { fireEvent, render, screen } from '@testing-library/react'

import { GroupingControls } from './GroupingControls'

describe('GroupingControls', () => {
  it('renders row and column selectors', () => {
    render(
      <GroupingControls
        rowField="transaction_type"
        columnFields={['status']}
        onRowFieldChange={jest.fn()}
        onColumnFieldChange={jest.fn()}
        onAddColumnField={jest.fn()}
        onRemoveColumnField={jest.fn()}
      />,
    )

    expect(screen.getByLabelText(/Row grouping/i)).toBeInTheDocument()
    expect(screen.getByText(/Column grouping/i)).toBeInTheDocument()
  })

  it('calls handlers', () => {
    const onRowFieldChange = jest.fn()
    const onAddColumnField = jest.fn()
    render(
      <GroupingControls
        rowField="transaction_type"
        columnFields={['status']}
        onRowFieldChange={onRowFieldChange}
        onColumnFieldChange={jest.fn()}
        onAddColumnField={onAddColumnField}
        onRemoveColumnField={jest.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText(/Row grouping/i), { target: { value: 'year' } })
    fireEvent.click(screen.getByText(/\+ Add column level/i))

    expect(onRowFieldChange).toHaveBeenCalledWith('year')
    expect(onAddColumnField).toHaveBeenCalled()
  })
})
