import { GroupField } from '@/data/transactions'
import { ColumnLeaf, HeaderCell, Transaction } from './types'

type ColumnNode = {
  key: string
  label: string
  field: GroupField
  children: ColumnNode[]
  span: number
}

// Distinct column leaf combinations preserving lexical order.
export const buildColumnLeaves = (transactions: Transaction[], columnFields: GroupField[]): ColumnLeaf[] => {
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

// Build multi-row header structure with colSpan values.
export const buildHeaderRows = (columnLeaves: ColumnLeaf[], columnFields: GroupField[]): HeaderCell[][] => {
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

const computeSpan = (node: ColumnNode): number => {
  if (node.children.length === 0) {
    node.span = 1
    return 1
  }

  node.span = node.children.reduce((acc, child) => acc + computeSpan(child), 0)
  return node.span
}

const traverseHeaders = (nodes: ColumnNode[], depth: number, rows: HeaderCell[][]) => {
  if (!nodes.length) return
  if (!rows[depth]) rows[depth] = []

  nodes.forEach((node) => {
    rows[depth].push({ label: node.label, span: node.span })
  })

  nodes.forEach((node) => traverseHeaders(node.children, depth + 1, rows))
}
