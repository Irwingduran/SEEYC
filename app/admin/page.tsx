"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield,
  GraduationCap,
  Upload,
  Eye,
  MessageSquare,
  Star,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import { getAllCourses } from "@/lib/course-service"
import { useState, useEffect } from "react"

function AdminDashboardContent() {
  const { isCollapsed } = useSidebar()
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    draftCourses: 0,
    archivedCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    avgRating: 0,
    totalEnrollments: 0
  })

  useEffect(() => {
    const loadStats = async () => {
      const courses = await getAllCourses()
      
      const published = courses.filter(c => c.status === 'published')
      const draft = courses.filter(c => c.status === 'draft')
      const archived = courses.filter(c => c.status === 'archived')
      
      const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0)
      const totalRevenue = courses.reduce((sum, c) => sum + (c.revenue || 0), 0)
      const avgRating = courses.length > 0 
        ? courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length 
        : 0
      
      setStats({
        totalCourses: courses.length,
        publishedCourses: published.length,
        draftCourses: draft.length,
        archivedCourses: archived.length,
        totalStudents,
        totalRevenue,
        avgRating,
        totalEnrollments: totalStudents
      })
    }
    loadStats()
  }, [])

  // KPIs principales calculados dinámicamente
  const kpis = [
    {
      title: "Estudiantes Inscritos",
      value: stats.totalStudents.toLocaleString(),
      subValue: `${stats.totalEnrollments} inscripciones`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      description: "Total activos",
    },
    {
      title: "Cursos Publicados",
      value: stats.publishedCourses.toString(),
      subValue: `${stats.draftCourses} en borrador`,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      description: `${stats.totalCourses} total`,
    },
    {
      title: "Ingresos Generados",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      subValue: `${stats.totalStudents} estudiantes`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      description: "Total acumulado",
    },
    {
      title: "Calificación Promedio",
      value: stats.avgRating.toFixed(1),
      subValue: "⭐".repeat(Math.round(stats.avgRating)),
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-600/10",
      description: "De todos los cursos",
    },
  ]

  // Actividad reciente
  const recentActivity = [
    {
      id: 1,
      user: "Juan Pérez",
      action: "se inscribió en",
      course: "Automatización Industrial",
      time: "Hace 5 min",
      avatar: "/avatar-1.jpg",
      type: "enrollment",
    },
    {
      id: 2,
      user: "Ana Martínez",
      action: "completó",
      course: "Seguridad Eléctrica",
      time: "Hace 15 min",
      avatar: "/avatar-2.jpg",
      type: "completion",
    },
    {
      id: 3,
      user: "Carlos López",
      action: "dejó una reseña en",
      course: "Instalaciones Solares",
      time: "Hace 1 hora",
      avatar: "/avatar-3.jpg",
      type: "review",
    },
    {
      id: 4,
      user: "María García",
      action: "realizó un pago de",
      course: "$250",
      time: "Hace 2 horas",
      avatar: "/avatar-4.jpg",
      type: "payment",
    },
  ]

  // Tareas pendientes
  const pendingTasks = [
    {
      id: 1,
      title: "Revisar 5 cursos pendientes de aprobación",
      priority: "high",
      count: 5,
    },
    {
      id: 2,
      title: "Responder 12 preguntas de estudiantes",
      priority: "medium",
      count: 12,
    },
    {
      id: 3,
      title: "Actualizar contenido de 3 cursos",
      priority: "medium",
      count: 3,
    },
    {
      id: 4,
      title: "Revisar reportes de estudiantes",
      priority: "low",
      count: 2,
    },
  ]

  // Acciones rápidas
  const quickActions = [
    {
      title: "Crear Nuevo Curso",
      description: "Comienza a crear contenido",
      icon: Upload,
      href: "/admin/courses/create",
      color: "bg-blue-500",
    },
    {
      title: "Gestionar Usuarios",
      description: "Ver y administrar usuarios",
      icon: Users,
      href: "/admin/users",
      color: "bg-green-500",
    },
    {
      title: "Ver Analíticas",
      description: "Estadísticas detalladas",
      icon: TrendingUp,
      href: "/admin/analytics",
      color: "bg-purple-500",
    },
    {
      title: "Configuración",
      description: "Ajustes de la plataforma",
      icon: Shield,
      href: "/admin/settings",
      color: "bg-orange-500",
    },
  ]

  return (
    <>
      <AdminSidebar />

      {/* Main Content */}
      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Panel de Administración</h1>
              <p className="text-muted-foreground text-lg">
                Bienvenida, María. Aquí está el resumen de tu plataforma.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild>
                <Link href="/admin/courses/create">
                  <Upload className="h-4 w-4 mr-2" />
                  Crear Curso
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi, index) => (
            <Card
              key={index}
              className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                  <p className="text-2xl md:text-3xl font-bold">{kpi.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{kpi.subValue}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Quick Actions */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Acceso rápido a las funciones principales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Card className="border-2 hover:border-primary transition-all duration-200 hover:shadow-md cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${action.color} text-white`}>
                              <action.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{action.title}</h3>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones en la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.course}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Pending Tasks */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Tareas Pendientes</CardTitle>
                <CardDescription>Cosas que requieren tu atención</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{task.title}</p>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.count}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Vista Rápida
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Usuarios activos hoy</span>
                  <span className="text-lg font-bold">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nuevas inscripciones</span>
                  <span className="text-lg font-bold">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cursos en progreso</span>
                  <span className="text-lg font-bold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Preguntas sin responder</span>
                  <span className="text-lg font-bold text-orange-600">12</span>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Estado del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Servidor</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                    Operativo
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Base de datos</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                    Operativo
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Almacenamiento</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                    65% usado
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">CDN</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                    Operativo
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

export default function AdminDashboard() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <AdminDashboardContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
