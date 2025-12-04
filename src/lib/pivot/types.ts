import { GroupField, RawTransaction } from '@/data/transactions'

export type Transaction = Omit<RawTransaction, 'amount' | 'year'> & {
  amount: number
  year: string
}

export type PivotConfig = {
  rowField: GroupField
  columnFields: GroupField[]
}

export type Aggregation = {
  amount: number
  count: number
}

export type ColumnLeaf = {
  key: string
  path: string[]
}

export type HeaderCell = {
  label: string
  span: number
}

export type PivotResult = {
  rows: string[]
  columnLeaves: ColumnLeaf[]
  headers: HeaderCell[][]
  cells: Record<string, Record<string, Aggregation>>
  rowTotals: Record<string, number>
  columnTotals: Record<string, number>
  grandTotal: number
}
