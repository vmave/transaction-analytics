import { GROUP_FIELDS, GroupField, RawTransaction } from '@/data/transactions'

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

export function parseTransactions(raw: RawTransaction[]): Transaction[] {
  return raw.map((item) => ({
    ...item,
    amount: Number.parseFloat(item.amount),
  }))
}

export function distinctValues(transactions: Transaction[], field: GroupField): string[] {
  const values = new Set<string>()
  transactions.forEach((t) => values.add(String(t[field])))
  return Array.from(values).sort()
}

export function buildPivot(transactions: Transaction[], config: PivotConfig): PivotResult {
  if (config.columnFields.length === 0) {
    throw new Error('At least one column field is required')
  }

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

    if (!cells[rowValue] || !cells[rowValue][columnKey]) {
      return
    }

    cells[rowValue][columnKey].amount += tx.amount
    cells[rowValue][columnKey].count += 1
    rowTotals[rowValue] += tx.amount
    columnTotals[columnKey] += tx.amount
  })

  const grandTotal = Object.values(rowTotals).reduce((acc, value) => acc + value, 0)

  return { rows, columnLeaves, headers, cells, rowTotals, columnTotals, grandTotal }
}

function buildColumnLeaves(transactions: Transaction[], columnFields: GroupField[]): ColumnLeaf[] {
  const combos = new Map<string, string[]>()

  transactions.forEach((tx) => {
    const path = columnFields.map((field) => String(tx[field]))
    const key = path.join('|')
    if (!combos.has(key)) {
      combos.set(key, path)
    }
  })

  return Array.from(combos.values())
    .sort((a, b) => a.join('|').localeCompare(b.join('|')))
    .map((path) => ({ key: path.join('|'), path }))
}

type ColumnNode = {
  key: string
  label: string
  field: GroupField
  children: ColumnNode[]
  span: number
}

function buildHeaderRows(columnLeaves: ColumnLeaf[], columnFields: GroupField[]): HeaderCell[][] {
  const rootNodes: ColumnNode[] = []

  columnLeaves.forEach((leaf) => {
    let level = rootNodes

    leaf.path.forEach((label, depth) => {
      const field = columnFields[depth]
      const prefix = leaf.path.slice(0, depth + 1).join('|')
      let node = level.find((n) => n.label === label && n.field === field)

      if (!node) {
        node = { key: prefix, label, field, children: [], span: 0 }
        level.push(node)
      }

      level = node.children
    })
  })

  rootNodes.forEach((node) => computeSpan(node))

  const headerRows: HeaderCell[][] = []
  traverseHeaders(rootNodes, 0, headerRows)
  return headerRows
}

function computeSpan(node: ColumnNode): number {
  if (node.children.length === 0) {
    node.span = 1
    return 1
  }

  node.span = node.children.reduce((acc, child) => acc + computeSpan(child), 0)
  return node.span
}

function traverseHeaders(nodes: ColumnNode[], depth: number, rows: HeaderCell[][]) {
  if (!nodes.length) return
  if (!rows[depth]) rows[depth] = []

  nodes.forEach((node) => {
    rows[depth].push({ label: node.label, span: node.span })
  })

  nodes.forEach((node) => traverseHeaders(node.children, depth + 1, rows))
}

export function isValidField(field: string): field is GroupField {
  return GROUP_FIELDS.includes(field as GroupField)
}
