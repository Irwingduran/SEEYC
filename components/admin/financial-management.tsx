"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  RefreshCw,
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
} from "lucide-react"

// Mock financial data
const revenueData = [
  { month: "Oct", revenue: 145000, transactions: 890, refunds: 12000 },
  { month: "Nov", revenue: 167000, transactions: 1020, refunds: 8500 },
  { month: "Dec", revenue: 189000, transactions: 1150, refunds: 15000 },
  { month: "Ene", revenue: 234000, transactions: 1420, refunds: 9800 },
  { month: "Feb", revenue: 256000, transactions: 1580, refunds: 11200 },
  { month: "Mar", revenue: 284750, transactions: 1750, refunds: 7600 },
]

const paymentMethods = [
  { name: "Tarjeta de Crédito", value: 65, color: "#8b5cf6" },
  { name: "Tarjeta de Débito", value: 25, color: "#3b82f6" },
  { name: "PayPal", value: 8, color: "#06b6d4" },
  { name: "Transferencia", value: 2, color: "#10b981" },
]

const recentTransactions = [
  {
    id: "TXN-001",
    user: "Carlos Mendoza",
    course: "Instalaciones Eléctricas Avanzadas",
    amount: 2500,
    method: "Tarjeta de Crédito",
    status: "completed",
    date: "2024-03-11",
    time: "14:30",
  },
  {
    id: "TXN-002",
    user: "Ana García",
    course: "Motores Trifásicos",
    amount: 1800,
    method: "PayPal",
    status: "completed",
    date: "2024-03-11",
    time: "12:15",
  },
  {
    id: "TXN-003",
    user: "Miguel Torres",
    course: "Sistemas de Protección",
    amount: 3200,
    method: "Tarjeta de Débito",
    status: "pending",
    date: "2024-03-11",
    time: "10:45",
  },
  {
    id: "TXN-004",
    user: "Laura Jiménez",
    course: "Automatización Industrial",
    amount: 2800,
    method: "Transferencia",
    status: "failed",
    date: "2024-03-10",
    time: "16:20",
  },
]

const refundRequests = [
  {
    id: "REF-001",
    user: "Roberto Silva",
    course: "Fundamentos de Electricidad",
    amount: 1500,
    reason: "Curso no cumplió expectativas",
    requestDate: "2024-03-09",
    status: "pending",
    originalTransaction: "TXN-890",
  },
  {
    id: "REF-002",
    user: "María González",
    course: "Instalaciones Residenciales",
    amount: 2200,
    reason: "Problemas técnicos",
    requestDate: "2024-03-08",
    status: "approved",
    originalTransaction: "TXN-845",
  },
  {
    id: "REF-003",
    user: "José Ramírez",
    course: "Motores Industriales",
    amount: 2900,
    reason: "Duplicado accidental",
    requestDate: "2024-03-07",
    status: "processed",
    originalTransaction: "TXN-823",
  },
]

const monthlyReports = [
  {
    id: 1,
    month: "Febrero 2024",
    revenue: 256000,
    transactions: 1580,
    refunds: 11200,
    generated: "2024-03-01",
    status: "available",
  },
  {
    id: 2,
    month: "Enero 2024",
    revenue: 234000,
    transactions: 1420,
    refunds: 9800,
    generated: "2024-02-01",
    status: "available",
  },
  {
    id: 3,
    month: "Diciembre 2023",
    revenue: 189000,
    transactions: 1150,
    refunds: 15000,
    generated: "2024-01-01",
    status: "available",
  },
]

export function FinancialManagement() {
  const [selectedTab, setSelectedTab] = useState("analytics")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>
      case "approved":
        return <Badge className="bg-blue-100 text-blue-800">Aprobado</Badge>
      case "processed":
        return <Badge className="bg-green-100 text-green-800">Procesado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalRevenue = revenueData[revenueData.length - 1].revenue
  const totalTransactions = revenueData[revenueData.length - 1].transactions
  const totalRefunds = revenueData.reduce((sum, item) => sum + item.refunds, 0)
  const revenueGrowth = (
    ((revenueData[revenueData.length - 1].revenue - revenueData[revenueData.length - 2].revenue) /
      revenueData[revenueData.length - 2].revenue) *
    100
  ).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()} MXN</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{revenueGrowth}% este mes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Este mes</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reembolsos</CardTitle>
            <RefreshCw className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefunds.toLocaleString()} MXN</div>
            <div className="text-xs text-gray-600">Total procesados</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Reembolso</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <div className="text-xs text-gray-600">Promedio mensual</div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Management Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle>Gestión Financiera</CardTitle>
          <CardDescription>Administra ingresos, pagos y reportes financieros</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analytics">Análisis de Ingresos</TabsTrigger>
              <TabsTrigger value="payments">Procesamiento de Pagos</TabsTrigger>
              <TabsTrigger value="refunds">Gestión de Reembolsos</TabsTrigger>
              <TabsTrigger value="reports">Reportes Financieros</TabsTrigger>
            </TabsList>

            {/* Revenue Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend Chart */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Tendencia de Ingresos</CardTitle>
                    <CardDescription>Ingresos mensuales y transacciones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                          name="Ingresos (MXN)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Payment Methods Distribution */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Métodos de Pago</CardTitle>
                    <CardDescription>Distribución por tipo de pago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={paymentMethods}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {paymentMethods.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {paymentMethods.map((method, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                          <span className="text-sm">
                            {method.name}: {method.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transactions vs Refunds Chart */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>Transacciones vs Reembolsos</CardTitle>
                  <CardDescription>Comparación mensual de transacciones y reembolsos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="transactions" fill="#3b82f6" name="Transacciones" />
                      <Bar dataKey="refunds" fill="#ef4444" name="Reembolsos (MXN)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Processing */}
            <TabsContent value="payments" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Procesamiento de Pagos</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar transacciones..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las fechas</SelectItem>
                      <SelectItem value="today">Hoy</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="p-3 text-left font-medium">ID Transacción</th>
                        <th className="p-3 text-left font-medium">Usuario</th>
                        <th className="p-3 text-left font-medium">Curso</th>
                        <th className="p-3 text-left font-medium">Monto</th>
                        <th className="p-3 text-left font-medium">Método</th>
                        <th className="p-3 text-left font-medium">Estado</th>
                        <th className="p-3 text-left font-medium">Fecha</th>
                        <th className="p-3 text-left font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t border-gray-100 hover:bg-gray-50/30">
                          <td className="p-3 font-mono text-sm">{transaction.id}</td>
                          <td className="p-3">{transaction.user}</td>
                          <td className="p-3">
                            <div className="max-w-xs truncate">{transaction.course}</div>
                          </td>
                          <td className="p-3 font-semibold">${transaction.amount.toLocaleString()} MXN</td>
                          <td className="p-3">{transaction.method}</td>
                          <td className="p-3">{getStatusBadge(transaction.status)}</td>
                          <td className="p-3">
                            <div className="text-sm">
                              <div>{transaction.date}</div>
                              <div className="text-gray-500">{transaction.time}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                Ver
                              </Button>
                              {transaction.status === "failed" && (
                                <Button variant="ghost" size="sm" className="text-blue-600">
                                  Reintentar
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Refund Management */}
            <TabsContent value="refunds" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gestión de Reembolsos</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {refundRequests.map((refund) => (
                  <Card key={refund.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <RefreshCw className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">{refund.id}</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                Usuario: <span className="font-medium">{refund.user}</span>
                              </div>
                              <div>
                                Curso: <span className="font-medium">{refund.course}</span>
                              </div>
                              <div>
                                Monto: <span className="font-medium">${refund.amount.toLocaleString()} MXN</span>
                              </div>
                              <div>
                                Fecha: <span className="font-medium">{refund.requestDate}</span>
                              </div>
                              <div className="col-span-2">
                                Razón: <span className="font-medium">{refund.reason}</span>
                              </div>
                              <div>
                                Transacción original:{" "}
                                <span className="font-medium font-mono">{refund.originalTransaction}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          {getStatusBadge(refund.status)}
                          <div className="flex gap-2">
                            {refund.status === "pending" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Aprobar
                                </Button>
                                <Button size="sm" variant="destructive">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Rechazar
                                </Button>
                              </>
                            )}
                            {refund.status === "approved" && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Procesar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Financial Reports */}
            <TabsContent value="reports" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Reportes Financieros</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Generar Reporte
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generar Reporte Financiero</DialogTitle>
                      <DialogDescription>Crea un reporte personalizado con los datos financieros</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="report-type">Tipo de Reporte</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Reporte Mensual</SelectItem>
                            <SelectItem value="quarterly">Reporte Trimestral</SelectItem>
                            <SelectItem value="annual">Reporte Anual</SelectItem>
                            <SelectItem value="custom">Período Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-date">Fecha Inicio</Label>
                          <Input id="start-date" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="end-date">Fecha Fin</Label>
                          <Input id="end-date" type="date" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="report-format">Formato</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar formato" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Generar Reporte</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthlyReports.map((report) => (
                  <Card key={report.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{report.month}</h4>
                            <p className="text-sm text-gray-600">Generado: {report.generated}</p>
                          </div>
                        </div>
                        <Badge variant="default">Disponible</Badge>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between">
                          <span>Ingresos:</span>
                          <span className="font-medium">${report.revenue.toLocaleString()} MXN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transacciones:</span>
                          <span className="font-medium">{report.transactions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reembolsos:</span>
                          <span className="font-medium">${report.refunds.toLocaleString()} MXN</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
