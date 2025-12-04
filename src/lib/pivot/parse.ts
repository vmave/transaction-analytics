import { RawTransaction } from '@/data/transactions'
import { Transaction } from './types'

// Convert amount strings to numbers for aggregation.
export const parseTransactions = (raw: RawTransaction[]): Transaction[] =>
  raw.map((item) => ({
    ...item,
    amount: Number.parseFloat(item.amount),
  }))
