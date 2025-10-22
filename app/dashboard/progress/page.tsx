"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Target,
  Flame,
  CheckCircle,
  Video,
  FileText,
  BarChart3,
  Calendar,
  Play,
  Zap,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import Link from "next/link"

interface CourseProgress {
  id: number
  title: string
  progress: number
  completedLessons: number
  totalLessons: number
  hoursSpent: number
  lastActivity: string
  category: string
}

interface Activity {
  id: number
  type: "lesson" | "quiz" | "certificate"
  title: string
  course: string
  date: string
  score?: number
}

function ProgressContent() {
  const { isCollapsed } = useSidebar()
  const [timePeriod, setTimePeriod] = useState("week")

  // User stats
  const stats = {
    totalCourses: 4,
    completedCourses: 3,
    totalHours: 45,
    currentStreak: 7,
    totalCertificates: 3,
    averageScore: 87,
  }

  // Course progress
  const coursesProgress: CourseProgress[] = [
    {
      id: 1,
      title: "Introducción a Sistemas Eléctricos",
      progress: 85,
      completedLessons: 20,
      totalLessons: 24,
      hoursSpent: 12,
      lastActivity: "Hace 2 horas",
      category: "Electricidad",
    },
    {
      id: 2,
      title: "Automatización Industrial con PLC",
      progress: 60,
      completedLessons: 22,
      totalLessons: 36,
      hoursSpent: 18,
      lastActivity: "Hoy",
      category: "Automatización",
    },
    {
      id: 3,
      title: "Instalaciones Solares Fotovoltaicas",
      progress: 40,
      completedLessons: 17,
      totalLessons: 42,
      hoursSpent: 15,
      lastActivity: "Ayer",
      category: "Energía Renovable",
    },
  ]

  // Weekly activity
  const weeklyActivity = [
    { day: "Lun", hours: 2.5, lessons: 3 },
    { day: "Mar", hours: 3, lessons: 4 },
    { day: "Mié", hours: 2, lessons: 2 },
    { day: "Jue", hours: 3.5, lessons: 5 },
    { day: "Vie", hours: 2.5, lessons: 3 },
    { day: "Sáb", hours: 1.5, lessons: 2 },
    { day: "Dom", hours: 1, lessons: 1 },
  ]

  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours))

  // Recent activity
  const recentActivity: Activity[] = [
    {
      id: 1,
      type: "lesson",
      title: "Circuitos en Serie y Paralelo",
      course: "Sistemas Eléctricos",
      date: "Hace 2 horas",
    },
    {
      id: 2,
      type: "quiz",
      title: "Examen: Fundamentos de Electricidad",
      course: "Sistemas Eléctricos",
      date: "Hoy",
      score: 95,
    },
    {
      id: 3,
      type: "lesson",
      title: "Programación Ladder Avanzada",
      course: "Automatización Industrial",
      date: "Ayer",
    },
    {
      id: 4,
      type: "certificate",
      title: "Certificado obtenido",
      course: "Sistemas Eléctricos",
      date: "Hace 2 días",
    },
    {
      id: 5,
      type: "lesson",
      title: "Cálculo de Dimensionamiento",
      course: "Instalaciones Solares",
      date: "Hace 3 días",
    },
  ]

  // Goals
  const goals = [
    {
      id: 1,
      title: "Completar 4 cursos este mes",
      current: 3,
      target: 4,
      progress: 75,
    },
    {
      id: 2,
      title: "Estudiar 50 horas",
      current: 45,
      target: 50,
      progress: 90,
    },
    {
      id: 3,
      title: "Mantener racha de 10 días",
      current: 7,
      target: 10,
      progress: 70,
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <Video className="h-4 w-4 text-blue-600" />
      case "quiz":
        return <FileText className="h-4 w-4 text-purple-600" />
      case "certificate":
        return <Award className="h-4 w-4 text-yellow-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  return (
    <>
      <DashboardSidebar />

      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Mi Progreso</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Visualiza tu avance y estadísticas de aprendizaje
              </p>
            </div>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
                <SelectItem value="all">Todo el tiempo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10 w-fit">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCourses}</p>
                  <p className="text-xs text-muted-foreground">Cursos Activos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-lg bg-green-500/10 w-fit">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.completedCourses}</p>
                  <p className="text-xs text-muted-foreground">Completados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10 w-fit">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalHours}h</p>
                  <p className="text-xs text-muted-foreground">Horas Totales</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-lg bg-orange-500/10 w-fit">
                  <Flame className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Días Racha</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-lg bg-yellow-500/10 w-fit">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalCertificates}</p>
                  <p className="text-xs text-muted-foreground">Certificados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 w-fit">
                  <Target className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.averageScore}%</p>
                  <p className="text-xs text-muted-foreground">Promedio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Course Progress & Activity */}
          <div className="lg:col-span-2 space-y-6">

            {/* Course Progress */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Progreso por Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {coursesProgress.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {course.category}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.hoursSpent}h
                          </span>
                          <span>{course.lastActivity}</span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-primary">{course.progress}%</span>
                    </div>

                    <div className="space-y-2">
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {course.completedLessons} de {course.totalLessons} lecciones
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                          <Link href={`/dashboard/courses/${course.id}/learn`}>
                            <Play className="h-3 w-3 mr-1" />
                            Continuar
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Goals & Recent Activity */}
          <div className="space-y-6">
            {/* Goals */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Objetivos del Mes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{goal.title}</p>
                      <Badge
                        variant="secondary"
                        className={
                          goal.progress >= 100
                            ? "bg-green-500/10 text-green-700"
                            : goal.progress >= 75
                              ? "bg-blue-500/10 text-blue-700"
                              : "bg-yellow-500/10 text-yellow-700"
                        }
                      >
                        {goal.current}/{goal.target}
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{goal.progress}% completado</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">¡Excelente progreso!</h3>
                    <p className="text-sm text-muted-foreground">
                      Estás en el top 10% de estudiantes
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Nivel de compromiso</span>
                    <span className="font-semibold text-green-600">Alto</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Velocidad de aprendizaje</span>
                    <span className="font-semibold text-blue-600">Por encima del promedio</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

export default function ProgressPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
          <ProgressContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
