"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  Calendar,
  Award,
  Zap,
  Target,
  Flame,
  ChevronRight,
  CheckCircle2,
  Users,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"

function DashboardContent() {
  const { isCollapsed } = useSidebar()

  // Mock user data
  const user = {
    name: "Carlos Rodríguez",
    role: "Estudiante",
    avatar: "/user-avatar.jpg",
    initials: "CR",
    currentStreak: 7,
    totalHours: 45,
    coursesCompleted: 3,
    coursesInProgress: 4,
    certificates: 3,
    points: 1250,
  }

  // Stats cards data
  const stats = [
    {
      title: "Cursos Activos",
      value: user.coursesInProgress,
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "+2 este mes",
      trend: "up",
    },
    {
      title: "Horas de Estudio",
      value: `${user.totalHours}h`,
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Este mes",
      trend: "up",
    },
    {
      title: "Certificados",
      value: user.certificates,
      icon: Award,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Completados",
      trend: "neutral",
    },
  ]

  // Courses in progress
  const coursesInProgress = [
    {
      id: 1,
      title: "Automatización Industrial con PLC",
      instructor: "Ing. María González",
      progress: 75,
      nextLesson: "Programación de Temporizadores",
      image: "/industrial-automation-plc.jpg",
      duration: "45 min",
      level: "Intermedio",
    },
    {
      id: 2,
      title: "Instalaciones Solares Residenciales",
      instructor: "Ing. Roberto Silva",
      progress: 60,
      nextLesson: "Cálculo de Dimensionamiento",
      image: "/solar-panels-installation.jpg",
      duration: "30 min",
      level: "Avanzado",
    },
    {
      id: 3,
      title: "Seguridad Eléctrica Industrial",
      instructor: "Ing. Ana Martínez",
      progress: 40,
      nextLesson: "Protocolos de Bloqueo",
      image: "/electrical-safety-equipment.jpg",
      duration: "25 min",
      level: "Básico",
    },
  ]

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Sesión en vivo: Nuevas Tecnologías en Energía Solar",
      date: "Hoy",
      time: "4:00 PM",
      type: "Webinar",
      instructor: "Ing. Roberto Silva",
    },
    {
      id: 2,
      title: "Examen: Automatización Industrial",
      date: "Mañana",
      time: "10:00 AM",
      type: "Evaluación",
      instructor: "Ing. María González",
    },
    {
      id: 3,
      title: "Taller Práctico: Instalación de Paneles",
      date: "Viernes",
      time: "2:00 PM",
      type: "Taller",
      instructor: "Ing. Roberto Silva",
    },
  ]

  // Recent achievements
  const recentAchievements = [
    {
      id: 1,
      title: "Primer Curso Completado",
      description: "Completaste tu primer curso exitosamente",
      icon: Trophy,
      color: "text-yellow-500",
      date: "Hace 2 días",
    },
    {
      id: 2,
      title: "Racha de 7 Días",
      description: "Has estudiado 7 días consecutivos",
      icon: Flame,
      color: "text-orange-500",
      date: "Hoy",
    },
    {
      id: 3,
      title: "Experto en Seguridad",
      description: "Obtuviste 100% en el examen de seguridad",
      icon: Award,
      color: "text-green-500",
      date: "Hace 1 semana",
    },
  ]

  // Community activity
  const communityActivity = [
    {
      id: 1,
      user: "Ana Martínez",
      action: "compartió un recurso en",
      topic: "Instalaciones Eléctricas",
      time: "Hace 2h",
      avatar: "/avatar-1.jpg",
    },
    {
      id: 2,
      user: "Luis García",
      action: "respondió tu pregunta en",
      topic: "Automatización Industrial",
      time: "Hace 5h",
      avatar: "/avatar-2.jpg",
    },
    {
      id: 3,
      user: "María López",
      action: "inició una discusión en",
      topic: "Energía Solar",
      time: "Hace 1d",
      avatar: "/avatar-3.jpg",
    },
  ]

  return (
    <>
      <DashboardSidebar />

      {/* Main Content */}
      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    ¡Bienvenido de vuelta, {user.name.split(" ")[0]}! 👋
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Continúa tu camino de aprendizaje desde donde lo dejaste
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Puntos Totales</p>
                    <p className="text-2xl font-bold text-primary flex items-center gap-1">
                      <Zap className="h-5 w-5" />
                      {user.points}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      {stat.trend === "up" && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-5 mb-6">
              {/* Left Column - Courses in Progress */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Play className="h-5 w-5 text-primary" />
                          Continuar Aprendiendo
                        </CardTitle>
                        <CardDescription>Retoma tus cursos donde los dejaste</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/learning">
                          Ver todos
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {coursesInProgress.map((course) => (
                      <div
                        key={course.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
                      >
                        <div className="w-full sm:w-32 h-32 sm:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-base mb-1">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </div>
                            <Badge variant="secondary" className="w-fit">
                              {course.level}
                            </Badge>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Progreso</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Siguiente: {course.nextLesson}
                            </p>
                            <Button size="sm" className="w-full sm:w-auto">
                              <Play className="h-4 w-4 mr-1" />
                              Continuar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
               
              </div>

              {/* Right Column - Events & Community */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Próximos Eventos
                    </CardTitle>
                    <CardDescription>No te pierdas nada importante</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge
                            variant={event.type === "Evaluación" ? "destructive" : "default"}
                            className="text-xs"
                          >
                            {event.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.instructor}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Ver Calendario Completo
                    </Button>
                  </CardContent>
                </Card>

                {/* Progress Overview */}
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Meta Semanal
                    </CardTitle>
                    <CardDescription>Tu progreso esta semana</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Horas completadas</span>
                        <span className="text-sm font-medium">12 / 14 horas</span>
                      </div>
                      <Progress value={85} className="h-3" />
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
                        <div key={day} className="flex flex-col items-center gap-1">
                          <span className="text-xs text-muted-foreground">{day}</span>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index < 5
                                ? "bg-green-500/20 text-green-500"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {index < 5 ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">¿Listo para más?</h3>
                    <p className="text-muted-foreground">
                      Explora nuevos cursos y continúa desarrollando tus habilidades
                    </p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button size="lg" asChild className="flex-1 md:flex-none">
                      <Link href="/courses">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Explorar Cursos
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="flex-1 md:flex-none">
                      <Link href="/dashboard/profile">
                        <Award className="h-4 w-4 mr-2" />
                        Mi Perfil
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
      </main>
    </>
  )
}

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
          <DashboardContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
