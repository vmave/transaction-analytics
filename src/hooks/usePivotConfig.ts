'use client'

import { useMemo, useState } from 'react'

import { FIELD_LABELS, GROUP_FIELDS, GroupField, rawTransactions } from '@/data/transactions'
import { PivotResult, buildPivot, distinctValues, parseTransactions } from '@/lib/pivot'

const parsedTransactions = parseTransactions(rawTransactions)
const defaultColumns: GroupField[] = ['status', 'year']

type PivotStats = {
  transactionCount: number
  fieldCount: number
  distinctValueCount: number
}

type Handlers = {
  handleRowFieldChange: (next: GroupField) => void
  handleColumnFieldChange: (index: number, next: GroupField) => void
  handleAddColumnField: () => void
  handleRemoveColumnField: (index: number) => void
}

export function usePivotConfig(): {
  rowField: GroupField
  columnFields: GroupField[]
  dimensionValues: { field: GroupField; values: string[] }[]
  pivot: PivotResult
  stats: PivotStats
  handlers: Handlers
  } {
  const [rowField, setRowField] = useState<GroupField>('transaction_type')
  const [columnFields, setColumnFields] = useState<GroupField[]>(defaultColumns)

  const dimensionValues = useMemo(
    () =>
      GROUP_FIELDS.map((field) => ({
        field,
        values: distinctValues(parsedTransactions, field),
      })),
    [],
  )

  const pivot = useMemo(
    () => buildPivot(parsedTransactions, { rowField, columnFields }),
    [rowField, columnFields],
  )

  const stats: PivotStats = useMemo(
    () => ({
      transactionCount: parsedTransactions.length,
      fieldCount: GROUP_FIELDS.length,
      distinctValueCount: dimensionValues.reduce((acc, item) => acc + item.values.length, 0),
    }),
    [dimensionValues],
  )

  const handleRowFieldChange = (next: GroupField) => {
    setRowField(next)
  }

  const handleColumnFieldChange = (index: number, next: GroupField) => {
    const current = columnFields[index]
    if (current === next) return

    if (columnFields.includes(next)) {
      const swapIndex = columnFields.findIndex((field) => field === next)
      const updated = [...columnFields]
      updated[swapIndex] = current
      updated[index] = next
      setColumnFields(updated)
      return
    }

    const updated = [...columnFields]
    updated[index] = next
    setColumnFields(updated)
  }

  const handleAddColumnField = () => {
    const available = GROUP_FIELDS.find((field) => !columnFields.includes(field))
    if (available) {
      setColumnFields([...columnFields, available])
    }
  }

  const handleRemoveColumnField = (index: number) => {
    if (columnFields.length === 1) return
    setColumnFields(columnFields.filter((_, idx) => idx !== index))
  }

  return {
    rowField,
    columnFields,
    dimensionValues,
    pivot,
    stats,
    handlers: {
      handleRowFieldChange,
      handleColumnFieldChange,
      handleAddColumnField,
      handleRemoveColumnField,
    },
  }
}

export { FIELD_LABELS }
