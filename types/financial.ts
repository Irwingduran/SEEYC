// Tipos para datos financieros

export type TransactionType = "income" | "expense" | "pending"
export type TransactionStatus = "completed" | "pending" | "failed"

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  amount: number
  status: TransactionStatus
  date: string
  category: string
  user?: string
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  pendingPayments: number
  completedTransactions: number
  monthlyGrowth: number
}
