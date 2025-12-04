import { ColumnLeaf } from '@/lib/pivot'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatAmount = (value: number) => currency.format(value)

// Marks places where top-level group changes to draw separators.
export const getGroupSeparators = (leaves: ColumnLeaf[]): boolean[] =>
  leaves.map((leaf, idx) => {
    if (idx === 0) return false
    const prev = leaves[idx - 1]
    return leaf.path[0] !== prev.path[0]
  })
