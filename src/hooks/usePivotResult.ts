'use client'

import { useMemo } from 'react'

import { GroupField } from '@/data/transactions'
import { PivotResult, buildPivot, parseTransactions } from '@/lib/pivot'

// Recomputes pivot output when configuration changes.
export const usePivotResult = (
  transactions: ReturnType<typeof parseTransactions>,
  rowField: GroupField,
  columnFields: GroupField[],
): PivotResult =>
  useMemo(() => buildPivot(transactions, { rowField, columnFields }), [transactions, rowField, columnFields])
