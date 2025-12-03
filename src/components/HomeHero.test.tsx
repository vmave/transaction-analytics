import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders title and stats', () => {
    render(
      <HomeHero
        stats={{
          transactionCount: 30,
          fieldCount: 3,
          distinctValueCount: 12,
        }}
      />,
    )

    expect(screen.getByText(/Transaction analytics pivot/i)).toBeInTheDocument()

    expect(screen.getByTestId('stat-transactions')).toHaveTextContent('30')
    expect(screen.getByTestId('stat-fields')).toHaveTextContent('3')
    expect(screen.getByTestId('stat-distinct')).toHaveTextContent('12')
  })
})