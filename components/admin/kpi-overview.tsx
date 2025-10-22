"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, BookOpen, DollarSign, TrendingUp, Activity, Server, AlertTriangle, CheckCircle } from "lucide-react"

// Mock data
const kpiData = {
  totalUsers: 15847,
  totalCourses: 342,
  totalRevenue: 284750,
  activeUsers: 8934,
  userGrowth: 12.5,
  courseGrowth: 8.3,
  revenueGrowth: 15.7,
}

const growthData = [
  { month: "Ene", users: 12000, courses: 280, revenue: 180000 },
  { month: "Feb", users: 12800, courses: 295, revenue: 195000 },
  { month: "Mar", users: 13500, courses: 310, revenue: 215000 },
  { month: "Abr", users: 14200, courses: 325, revenue: 235000 },
  { month: "May", users: 14900, courses: 335, revenue: 255000 },
  { month: "Jun", users: 15847, courses: 342, revenue: 284750 },
]

const activityFeed = [
  { id: 1, type: "user", message: "Nuevo usuario registrado: María González", time: "Hace 2 min", status: "success" },
  {
    id: 2,
    type: "course",
    message: "Curso aprobado: Instalaciones Eléctricas Avanzadas",
    time: "Hace 5 min",
    status: "success",
  },
  { id: 3, type: "payment", message: "Pago procesado: $2,450 MXN", time: "Hace 8 min", status: "success" },
  { id: 4, type: "system", message: "Mantenimiento programado completado", time: "Hace 15 min", status: "info" },
  { id: 5, type: "alert", message: "Alta carga en servidor de videos", time: "Hace 23 min", status: "warning" },
]

const systemHealth = [
  { name: "API Server", status: "healthy", uptime: 99.9, response: 145 },
  { name: "Database", status: "healthy", uptime: 99.8, response: 23 },
  { name: "Video CDN", status: "warning", uptime: 98.5, response: 890 },
  { name: "Payment Gateway", status: "healthy", uptime: 99.9, response: 67 },
]

const courseCategories = [
  { name: "Instalaciones", value: 35, color: "#8b5cf6" },
  { name: "Motores", value: 28, color: "#3b82f6" },
  { name: "Protecciones", value: 22, color: "#06b6d4" },
  { name: "Automatización", value: 15, color: "#10b981" },
]

export function KpiOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{kpiData.userGrowth}% este mes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalCourses}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{kpiData.courseGrowth}% este mes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpiData.totalRevenue.toLocaleString()} MXN</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{kpiData.revenueGrowth}% este mes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.activeUsers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">
              {((kpiData.activeUsers / kpiData.totalUsers) * 100).toFixed(1)}% del total
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle>Crecimiento Mensual</CardTitle>
            <CardDescription>Usuarios, cursos e ingresos por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
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
                <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} name="Usuarios" />
                <Line type="monotone" dataKey="courses" stroke="#3b82f6" strokeWidth={2} name="Cursos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Categories */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle>Distribución de Cursos</CardTitle>
            <CardDescription>Por categoría de especialización</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {courseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {courseCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm">
                    {category.name}: {category.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity Feed */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad en Tiempo Real
            </CardTitle>
            <CardDescription>Últimas acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Estado del Sistema
            </CardTitle>
            <CardDescription>Monitoreo de servicios críticos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    {service.status === "healthy" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-600">Uptime: {service.uptime}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={service.status === "healthy" ? "default" : "secondary"}>{service.response}ms</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
