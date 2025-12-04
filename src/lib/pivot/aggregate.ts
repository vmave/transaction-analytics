import { distinctValues } from './distinct'
import { buildColumnLeaves, buildHeaderRows } from './headers'
import { Aggregation, PivotConfig, PivotResult, Transaction } from './types'

// Main pivot aggregation: cells, totals, headers.
export const buildPivot = (transactions: Transaction[], config: PivotConfig): PivotResult => {
  if (config.columnFields.length === 0) throw new Error('At least one column field is required')

  const rows = distinctValues(transactions, config.rowField)
  const columnLeaves = buildColumnLeaves(transactions, config.columnFields)
  const headers = buildHeaderRows(columnLeaves, config.columnFields)

  const cells: Record<string, Record<string, Aggregation>> = {}
  const rowTotals: Record<string, number> = {}
  const columnTotals: Record<string, number> = {}

  columnLeaves.forEach((leaf) => {
    columnTotals[leaf.key] = 0
  })

  rows.forEach((rowValue) => {
    cells[rowValue] = {}
    columnLeaves.forEach((leaf) => {
      cells[rowValue][leaf.key] = { amount: 0, count: 0 }
    })
    rowTotals[rowValue] = 0
  })

  transactions.forEach((tx) => {
    const rowValue = String(tx[config.rowField])
    const columnPath = config.columnFields.map((field) => String(tx[field]))
    const columnKey = columnPath.join('|')
    if (!cells[rowValue] || !cells[rowValue][columnKey]) return

    cells[rowValue][columnKey].amount += tx.amount
    cells[rowValue][columnKey].count += 1
    rowTotals[rowValue] += tx.amount
    columnTotals[columnKey] += tx.amount
  })

  const grandTotal = Object.values(rowTotals).reduce((acc, value) => acc + value, 0)

  return { rows, columnLeaves, headers, cells, rowTotals, columnTotals, grandTotal }
}
