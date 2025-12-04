import { GroupField } from '@/data/transactions'

export const GROUP_FIELDS: GroupField[] = ['transaction_type', 'status', 'year']

export const FIELD_LABELS: Record<GroupField, string> = {
  transaction_type: 'Transaction Type',
  status: 'Status',
  year: 'Year',
}

export const FIELD_COLORS: Record<GroupField, string> = {
  transaction_type: '#7c3aed',
  status: '#0ea5e9',
  year: '#f59e0b',
}

export type { GroupField }
