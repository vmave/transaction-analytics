export type GroupField = 'transaction_type' | 'status' | 'year'

export type RawTransaction = {
  transaction_type: 'invoice' | 'bill' | 'direct_expense'
  transaction_number: string
  amount: string
  status: 'paid' | 'unpaid' | 'partially_paid'
  year: string
}
