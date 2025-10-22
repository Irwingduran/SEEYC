"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { DollarSign, Users, BookOpen, Star, TrendingUp, Calendar, Award, Eye } from "lucide-react"

const revenueData = [
  { month: "Ene", revenue: 4500, students: 45 },
  { month: "Feb", revenue: 5200, students: 52 },
  { month: "Mar", revenue: 4800, students: 48 },
  { month: "Abr", revenue: 6100, students: 61 },
  { month: "May", revenue: 7300, students: 73 },
  { month: "Jun", revenue: 8900, students: 89 },
]

const coursePerformance = [
  { name: "Instalaciones Residenciales", students: 156, rating: 4.8, revenue: 15600 },
  { name: "Automatización Industrial", students: 89, rating: 4.9, revenue: 17800 },
  { name: "Energía Solar", students: 134, rating: 4.7, revenue: 20100 },
  { name: "Seguridad Eléctrica", students: 67, rating: 4.6, revenue: 8040 },
]

const ratingDistribution = [
  { rating: "5 estrellas", count: 245, color: "#10B981" },
  { rating: "4 estrellas", count: 89, color: "#3B82F6" },
  { rating: "3 estrellas", count: 23, color: "#F59E0B" },
  { rating: "2 estrellas", count: 8, color: "#EF4444" },
  { rating: "1 estrella", count: 3, color: "#6B7280" },
]

const weeklyActivity = [
  { day: "Lun", views: 120, completions: 45 },
  { day: "Mar", views: 98, completions: 38 },
  { day: "Mié", views: 156, completions: 62 },
  { day: "Jue", views: 134, completions: 51 },
  { day: "Vie", views: 178, completions: 73 },
  { day: "Sáb", views: 89, completions: 34 },
  { day: "Dom", views: 67, completions: 28 },
]

export function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$36,800</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">446</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% nuevos estudiantes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Publicados</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />3 en desarrollo
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4.75</div>
            <div className="flex items-center text-xs text-yellow-600">
              <Award className="h-3 w-3 mr-1" />
              368 reseñas totales
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle>Ingresos y Inscripciones</CardTitle>
            <CardDescription>Tendencia de los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="students" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle>Distribución de Calificaciones</CardTitle>
            <CardDescription>Reseñas de todos los cursos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ rating, count }) => `${rating}: ${count}`}
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance Table */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle>Rendimiento por Curso</CardTitle>
          <CardDescription>Métricas detalladas de cada curso</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium">Curso</th>
                  <th className="text-left py-3 px-4 font-medium">Estudiantes</th>
                  <th className="text-left py-3 px-4 font-medium">Calificación</th>
                  <th className="text-left py-3 px-4 font-medium">Ingresos</th>
                  <th className="text-left py-3 px-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {coursePerformance.map((course, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4 font-medium">{course.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{course.students} estudiantes</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {course.rating}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-600 font-medium">${course.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
        <CardHeader>
          <CardTitle>Actividad Semanal</CardTitle>
          <CardDescription>Visualizaciones y completaciones por día</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="views" fill="#3B82F6" name="Visualizaciones" />
              <Bar dataKey="completions" fill="#10B981" name="Completaciones" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
