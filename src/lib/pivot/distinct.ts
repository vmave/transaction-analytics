import { GROUP_FIELDS } from '@/constants/fields'
import { Transaction } from './types'
import { GroupField } from '@/types/transactions'

// Sorted distinct values for a given field.
export const distinctValues = (transactions: Transaction[], field: GroupField): string[] => {
  const values = new Set<string>()
  transactions.forEach((t) => values.add(String(t[field])))
  return Array.from(values).sort()
}

export const isValidField = (field: string): field is GroupField => GROUP_FIELDS.includes(field as GroupField)
