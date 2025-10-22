"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  DollarSign,
  Award,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  BarChart3,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

function AnalyticsContent() {
  const { isCollapsed } = useSidebar()

  // Métricas principales
  const metrics = {
    totalUsers: 1247,
    userChange: 12.5,
    totalCourses: 48,
    courseChange: 8.3,
    totalRevenue: 125430,
    revenueChange: 15.2,
    totalCertificates: 892,
    certificateChange: 23.4,
    activeUsers: 856,
    activeChange: 5.8,
    completionRate: 68.5,
    completionChange: 3.2,
  }

  // Top cursos
  const topCourses = [
    {
      id: 1,
      title: "Introducción a Sistemas Eléctricos",
      enrollments: 245,
      completionRate: 78,
      revenue: 24500,
    },
    {
      id: 2,
      title: "Automatización Industrial con PLCs",
      enrollments: 198,
      completionRate: 72,
      revenue: 19800,
    },
    {
      id: 3,
      title: "Instalaciones Fotovoltaicas",
      enrollments: 176,
      completionRate: 65,
      revenue: 17600,
    },
    {
      id: 4,
      title: "Seguridad Eléctrica NOM",
      enrollments: 154,
      completionRate: 81,
      revenue: 15400,
    },
    {
      id: 5,
      title: "Mantenimiento Preventivo Industrial",
      enrollments: 132,
      completionRate: 70,
      revenue: 13200,
    },
  ]

  // Actividad reciente (últimos 7 días)
  const recentActivity = [
    { day: "Lun", users: 45, courses: 12 },
    { day: "Mar", users: 52, courses: 15 },
    { day: "Mié", users: 48, courses: 11 },
    { day: "Jue", users: 61, courses: 18 },
    { day: "Vie", users: 58, courses: 16 },
    { day: "Sáb", users: 34, courses: 8 },
    { day: "Dom", users: 28, courses: 6 },
  ]

  const maxUsers = Math.max(...recentActivity.map((d) => d.users))

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    prefix = "",
    suffix = "",
    colorClass,
  }: {
    title: string
    value: number | string
    change: number
    icon: any
    prefix?: string
    suffix?: string
    colorClass: string
  }) => (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <Badge
            variant={change >= 0 ? "default" : "destructive"}
            className={
              change >= 0
                ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                : ""
            }
          >
            {change >= 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">
            {prefix}
            {value}
            {suffix}
          </p>
          <p className="text-xs text-muted-foreground mt-1">vs mes anterior</p>
        </div>
      </CardContent>
    </Card>
  )

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Análisis y Métricas
          </h1>
          <p className="text-muted-foreground text-lg">
            Resumen del rendimiento de la plataforma
          </p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <MetricCard
            title="Total de Usuarios"
            value={metrics.totalUsers.toLocaleString()}
            change={metrics.userChange}
            icon={Users}
            colorClass="bg-blue-500/10 text-blue-600"
          />
          <MetricCard
            title="Usuarios Activos"
            value={metrics.activeUsers.toLocaleString()}
            change={metrics.activeChange}
            icon={Activity}
            colorClass="bg-green-500/10 text-green-600"
          />
          <MetricCard
            title="Total de Cursos"
            value={metrics.totalCourses}
            change={metrics.courseChange}
            icon={BookOpen}
            colorClass="bg-purple-500/10 text-purple-600"
          />
          <MetricCard
            title="Ingresos Totales"
            value={formatCurrency(metrics.totalRevenue)}
            change={metrics.revenueChange}
            icon={DollarSign}
            colorClass="bg-emerald-500/10 text-emerald-600"
          />
          <MetricCard
            title="Certificados Emitidos"
            value={metrics.totalCertificates}
            change={metrics.certificateChange}
            icon={Award}
            colorClass="bg-yellow-500/10 text-yellow-600"
          />
          <MetricCard
            title="Tasa de Completación"
            value={metrics.completionRate}
            change={metrics.completionChange}
            icon={Target}
            suffix="%"
            colorClass="bg-orange-500/10 text-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Actividad semanal */}
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Actividad de la Última Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium w-12">{day.day}</span>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-end pr-2"
                              style={{
                                width: `${(day.users / maxUsers) * 100}%`,
                              }}
                            >
                              <span className="text-xs font-semibold text-white">
                                {day.users}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-3 w-3" />
                        <span className="w-8 text-right">{day.courses}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span className="text-muted-foreground">Usuarios activos</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Cursos iniciados</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Cursos */}
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top 5 Cursos Más Populares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.enrollments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {course.completionRate}%
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-emerald-600">
                          <DollarSign className="h-3 w-3" />
                          {formatCurrency(course.revenue)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen rápido */}
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Promedio de Inscripciones por Curso
                </p>
                <p className="text-3xl font-bold text-primary">26</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Tiempo Promedio de Completación
                </p>
                <p className="text-3xl font-bold text-primary">4.2 sem</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Satisfacción del Usuario
                </p>
                <p className="text-3xl font-bold text-primary">4.7/5</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Tasa de Retención
                </p>
                <p className="text-3xl font-bold text-primary">84%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export default function AnalyticsPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <AnalyticsContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
