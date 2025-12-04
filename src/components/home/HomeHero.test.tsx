import { render, screen } from '@testing-library/react'

import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders title and stats', () => {
    render(<HomeHero stats={{ transactionCount: 30, fieldCount: 3, distinctValueCount: 12 }} />)

    expect(screen.getByText(/Transaction analytics pivot/i)).toBeInTheDocument()
    expect(screen.getByText('Transactions').nextSibling?.textContent).toBe('30')
    expect(screen.getByText('Fields').nextSibling?.textContent).toBe('3')
    expect(screen.getByText('Distinct values').nextSibling?.textContent).toBe('12')
  })
})
