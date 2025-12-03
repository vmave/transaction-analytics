'use client'

import { usePivotData } from './usePivotData'
import { usePivotResult } from './usePivotResult'
import { usePivotState } from './usePivotState'

// Composes pivot state, data, and computed result.
export const usePivotConfig = () => {
  const { rowField, columnFields, handlers } = usePivotState()
  const { transactions, dimensions, stats } = usePivotData()
  const pivot = usePivotResult(transactions, rowField, columnFields)

  return { rowField, columnFields, pivot, stats, dimensionValues: dimensions, handlers }
}
