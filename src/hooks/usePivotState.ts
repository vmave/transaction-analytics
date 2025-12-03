'use client'

import { useState } from 'react'

import { GROUP_FIELDS, GroupField } from '@/data/transactions'

type Handlers = {
  handleRowFieldChange: (next: GroupField) => void
  handleColumnFieldChange: (index: number, next: GroupField) => void
  handleAddColumnField: () => void
  handleRemoveColumnField: (index: number) => void
}

// Manages selected grouping fields and provides mutation handlers.
export const usePivotState = (): {
  rowField: GroupField
  columnFields: GroupField[]
  handlers: Handlers
} => {
  const [rowField, setRowField] = useState<GroupField>('transaction_type')
  const [columnFields, setColumnFields] = useState<GroupField[]>(['status', 'year'])

  const handleRowFieldChange = (next: GroupField) => setRowField(next)

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
    handlers: {
      handleRowFieldChange,
      handleColumnFieldChange,
      handleAddColumnField,
      handleRemoveColumnField,
    },
  }
}
