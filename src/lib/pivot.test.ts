import { GROUP_FIELDS } from '@/constants/fields'
import { rawTransactions } from '@/data/transactions'
import { buildPivot, distinctValues, parseTransactions } from './pivot'
import { GroupField } from '@/types/transactions'

const transactions = parseTransactions(rawTransactions)

describe('pivot helpers', () => {
  it('parses amounts into numbers', () => {
    expect(transactions[0].amount).toBeCloseTo(490)
    expect(transactions.find((t) => t.transaction_number === '13')?.amount).toBeCloseTo(-220)
  })

  it('derives distinct values for each dimension', () => {
    const years = distinctValues(transactions, 'year')
    const statuses = distinctValues(transactions, 'status')

    expect(years).toEqual(['2023', '2024', '2025'])
    expect(statuses).toEqual(['paid', 'partially_paid', 'unpaid'])
    GROUP_FIELDS.forEach((field) => {
      expect(distinctValues(transactions, field as GroupField).length).toBeGreaterThan(0)
    })
  })
})

describe('pivot aggregation', () => {
  it('groups by year and status', () => {
    const result = buildPivot(transactions, { rowField: 'year', columnFields: ['status'] })

    expect(result.rows).toEqual(['2023', '2024', '2025'])
    expect(result.columnLeaves.map((c) => c.key)).toEqual(['paid', 'partially_paid', 'unpaid'])
    expect(result.cells['2023'].paid.amount).toBeCloseTo(-236.29)
    expect(result.cells['2024'].partially_paid.amount).toBeCloseTo(1350.5)
    expect(result.cells['2025'].unpaid.amount).toBeCloseTo(460.6)
    expect(result.rowTotals['2024']).toBeCloseTo(3157.4)
    expect(result.columnTotals['unpaid']).toBeCloseTo(2687.5)
    expect(result.grandTotal).toBeCloseTo(5689.26)
  })

  it('supports multi-level columns', () => {
    const result = buildPivot(transactions, { rowField: 'transaction_type', columnFields: ['year', 'status'] })
    const firstLeaf = result.columnLeaves[0]

    expect(firstLeaf.path).toEqual(['2023', 'paid'])
    expect(result.columnLeaves).toHaveLength(9)
    expect(result.cells.invoice['2024|partially_paid'].amount).toBeCloseTo(1330)
    expect(result.cells.bill['2023|unpaid'].amount).toBeCloseTo(740)
    expect(result.rowTotals.direct_expense).toBeCloseTo(528.15)
  })
})
