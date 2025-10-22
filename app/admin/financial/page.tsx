"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import type { Transaction } from "@/types/financial"

function FinancialContent() {
  const { isCollapsed } = useSidebar()
  const [period, setPeriod] = useState("month")

  // Resumen financiero
  const summary = {
    totalIncome: 125430,
    incomeChange: 15.2,
    totalExpenses: 42850,
    expenseChange: -8.5,
    netProfit: 82580,
    profitChange: 23.4,
    pendingPayments: 18500,
    pendingChange: -12.3,
  }

  // Transacciones recientes
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      description: "Inscripción - Introducción a Sistemas Eléctricos",
      amount: 2500,
      status: "completed",
      date: "2024-01-22",
      category: "Curso",
      user: "Juan Pérez",
    },
    {
      id: "2",
      type: "income",
      description: "Inscripción - Automatización Industrial",
      amount: 2800,
      status: "completed",
      date: "2024-01-22",
      category: "Curso",
      user: "María García",
    },
    {
      id: "3",
      type: "expense",
      description: "Pago a instructor - Carlos Rodríguez",
      amount: 8500,
      status: "completed",
      date: "2024-01-21",
      category: "Instructor",
      user: "Carlos Rodríguez",
    },
    {
      id: "4",
      type: "income",
      description: "Inscripción - Instalaciones Fotovoltaicas",
      amount: 3200,
      status: "pending",
      date: "2024-01-21",
      category: "Curso",
      user: "Ana Martínez",
    },
    {
      id: "5",
      type: "expense",
      description: "Servicios de hosting - AWS",
      amount: 1200,
      status: "completed",
      date: "2024-01-20",
      category: "Servicios",
    },
    {
      id: "6",
      type: "income",
      description: "Inscripción - Seguridad Eléctrica NOM",
      amount: 2200,
      status: "completed",
      date: "2024-01-20",
      category: "Curso",
      user: "Luis Hernández",
    },
    {
      id: "7",
      type: "expense",
      description: "Licencia software de diseño",
      amount: 850,
      status: "completed",
      date: "2024-01-19",
      category: "Software",
    },
    {
      id: "8",
      type: "income",
      description: "Inscripción - Mantenimiento Preventivo",
      amount: 2600,
      status: "completed",
      date: "2024-01-19",
      category: "Curso",
      user: "Sofia López",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completado
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Fallido
          </Badge>
        )
    }
  }

  const handleExport = () => {
    const csvData = [
      ["ID", "Tipo", "Descripción", "Monto", "Estado", "Fecha", "Categoría", "Usuario"],
      ...transactions.map((t) => [
        t.id,
        t.type === "income" ? "Ingreso" : "Gasto",
        `"${t.description}"`,
        t.amount,
        t.status,
        t.date,
        t.category,
        t.user || "",
      ]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transacciones-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <AdminSidebar />

      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Finanzas
              </h1>
              <p className="text-muted-foreground text-lg">
                Resumen de ingresos, gastos y transacciones
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {summary.incomeChange}%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ingresos Totales</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(summary.totalIncome)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">vs periodo anterior</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                </div>
                <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {Math.abs(summary.expenseChange)}%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gastos Totales</p>
                <p className="text-3xl font-bold text-red-600">
                  {formatCurrency(summary.totalExpenses)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">vs periodo anterior</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Wallet className="h-5 w-5 text-blue-600" />
                </div>
                <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {summary.profitChange}%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ganancia Neta</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(summary.netProfit)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">vs periodo anterior</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {Math.abs(summary.pendingChange)}%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pagos Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(summary.pendingPayments)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">vs periodo anterior</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transacciones recientes */}
        <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Transacciones Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "income"
                        ? "bg-green-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight
                        className={`h-5 w-5 ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                      {transaction.user && (
                        <>
                          <span>•</span>
                          <span>{transaction.user}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p
                        className={`font-bold text-lg ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export default function FinancialPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <FinancialContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
