import { ColumnLeaf } from '@/lib/pivot'
import { getGroupSeparators, formatAmount } from '../utils'

describe('pivot utils', () => {
  it('formats amounts as currency', () => {
    expect(formatAmount(10)).toBe('$10.00')
    expect(formatAmount(-5.5)).toBe('-$5.50')
  })

  it('detects group separators', () => {
    const leaves: ColumnLeaf[] = [
      { key: '2023|paid', path: ['2023', 'paid'] },
      { key: '2023|unpaid', path: ['2023', 'unpaid'] },
      { key: '2024|paid', path: ['2024', 'paid'] },
    ]
    expect(getGroupSeparators(leaves)).toEqual([false, false, true])
  })
})
