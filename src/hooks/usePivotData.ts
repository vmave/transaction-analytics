'use client'

import { useMemo } from 'react'

import { GROUP_FIELDS, GroupField, rawTransactions } from '@/data/transactions'
import { distinctValues, parseTransactions } from '@/lib/pivot'

const parsedTransactions = parseTransactions(rawTransactions)

type Dimension = {
  field: GroupField
  values: string[]
}

type PivotStats = {
  transactionCount: number
  fieldCount: number
  distinctValueCount: number
}

// Prepares immutable data sources: parsed transactions, distinct values, and stats.
export const usePivotData = (): {
  transactions: ReturnType<typeof parseTransactions>
  dimensions: Dimension[]
  stats: PivotStats
} => {
  const dimensions = useMemo(
    () =>
      GROUP_FIELDS.map((field) => ({
        field,
        values: distinctValues(parsedTransactions, field),
      })),
    [],
  )

  const stats: PivotStats = useMemo(
    () => ({
      transactionCount: parsedTransactions.length,
      fieldCount: GROUP_FIELDS.length,
      distinctValueCount: dimensions.reduce((acc, item) => acc + item.values.length, 0),
    }),
    [dimensions],
  )

  return { transactions: parsedTransactions, dimensions, stats }
}
