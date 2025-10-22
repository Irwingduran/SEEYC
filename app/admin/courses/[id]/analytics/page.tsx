"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Star,
  Eye,
  Clock,
  CheckCircle,
  Download,
  Calendar,
  BarChart3,
  Target,
  Award,
  AlertTriangle,
  Globe,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import { useParams } from "next/navigation"

function CourseAnalyticsContent() {
  const { isCollapsed } = useSidebar()
  const params = useParams()
  const courseId = params.id as string
  const [timeRange, setTimeRange] = useState("30d")

  // Datos de ejemplo - en producción vendrían de una API
  const courseInfo = {
    id: courseId,
    title: "Automatización Industrial con PLC",
    thumbnail: "/course-1.jpg",
    status: "published",
  }

  const analytics = {
    overview: {
      totalEnrollments: 245,
      enrollmentGrowth: 12.5,
      activeStudents: 189,
      completedStudents: 87,
      completionRate: 35.5,
      averageProgress: 68,
      totalRevenue: 24500,
      revenueGrowth: 23.1,
      averageRating: 4.8,
      totalReviews: 89,
      averageWatchTime: "4.5h",
      dropOffRate: 15.2,
    },
    enrollmentTrend: [
      { date: "2024-01-01", value: 12 },
      { date: "2024-01-08", value: 18 },
      { date: "2024-01-15", value: 25 },
      { date: "2024-01-22", value: 31 },
      { date: "2024-01-29", value: 28 },
    ],
    revenueTrend: [
      { date: "2024-01-01", value: 1200 },
      { date: "2024-01-08", value: 1800 },
      { date: "2024-01-15", value: 2500 },
      { date: "2024-01-22", value: 3100 },
      { date: "2024-01-29", value: 2800 },
    ],
    topPerformingLessons: [
      {
        id: 1,
        title: "Introducción a PLCs",
        module: "Módulo 1",
        completionRate: 95,
        avgRating: 4.9,
        avgWatchTime: "15:30",
      },
      {
        id: 2,
        title: "Programación Ladder Básica",
        module: "Módulo 2",
        completionRate: 87,
        avgRating: 4.8,
        avgWatchTime: "22:45",
      },
      {
        id: 3,
        title: "Componentes de Hardware",
        module: "Módulo 1",
        completionRate: 82,
        avgRating: 4.7,
        avgWatchTime: "18:20",
      },
    ],
    dropOffPoints: [
      {
        id: 1,
        lessonTitle: "Programación Avanzada SCADA",
        moduleTitle: "Módulo 5",
        dropOffRate: 28,
        studentsDropped: 68,
      },
      {
        id: 2,
        lessonTitle: "Redes Industriales",
        moduleTitle: "Módulo 4",
        dropOffRate: 18,
        studentsDropped: 44,
      },
      {
        id: 3,
        lessonTitle: "Troubleshooting Avanzado",
        moduleTitle: "Módulo 6",
        dropOffRate: 15,
        studentsDropped: 37,
      },
    ],
    studentsByCountry: [
      { country: "México", students: 98, percentage: 40 },
      { country: "España", students: 74, percentage: 30 },
      { country: "Argentina", students: 49, percentage: 20 },
      { country: "Colombia", students: 24, percentage: 10 },
    ],
    recentEnrollments: [
      {
        id: 1,
        studentName: "Juan Pérez",
        studentEmail: "juan@example.com",
        enrolledAt: "2024-01-28",
        progress: 15,
        lastAccessed: "2024-01-29",
      },
      {
        id: 2,
        studentName: "María González",
        studentEmail: "maria@example.com",
        enrolledAt: "2024-01-27",
        progress: 25,
        lastAccessed: "2024-01-29",
      },
      {
        id: 3,
        studentName: "Carlos López",
        studentEmail: "carlos@example.com",
        enrolledAt: "2024-01-26",
        progress: 42,
        lastAccessed: "2024-01-28",
      },
      {
        id: 4,
        studentName: "Ana Martínez",
        studentEmail: "ana@example.com",
        enrolledAt: "2024-01-25",
        progress: 67,
        lastAccessed: "2024-01-29",
      },
      {
        id: 5,
        studentName: "Luis Rodríguez",
        studentEmail: "luis@example.com",
        enrolledAt: "2024-01-24",
        progress: 89,
        lastAccessed: "2024-01-29",
      },
    ],
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
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Cursos
              </Link>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{courseInfo.title}</h1>
                  <p className="text-muted-foreground">Analíticas y métricas de rendimiento</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Últimos 90 días</SelectItem>
                  <SelectItem value="1y">Último año</SelectItem>
                  <SelectItem value="all">Todo el tiempo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* KPIs principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+{analytics.overview.enrollmentGrowth}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Inscripciones</p>
                <p className="text-3xl font-bold">{analytics.overview.totalEnrollments}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {analytics.overview.activeStudents} activos
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                  {analytics.overview.completionRate}%
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tasa de Finalización</p>
                <p className="text-3xl font-bold">{analytics.overview.completedStudents}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  de {analytics.overview.totalEnrollments} estudiantes
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+{analytics.overview.revenueGrowth}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ingresos Totales</p>
                <p className="text-3xl font-bold">${analytics.overview.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Este periodo</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700">
                  Excelente
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rating Promedio</p>
                <p className="text-3xl font-bold">{analytics.overview.averageRating}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {analytics.overview.totalReviews} reseñas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de analíticas */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-card/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="students">Estudiantes</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="demographics">Demográficos</TabsTrigger>
          </TabsList>

          {/* Tab: Resumen */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Métricas de engagement */}
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Métricas de Engagement</CardTitle>
                  <CardDescription>Cómo interactúan los estudiantes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso Promedio</span>
                      <span className="font-medium">{analytics.overview.averageProgress}%</span>
                    </div>
                    <Progress value={analytics.overview.averageProgress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tasa de Finalización</span>
                      <span className="font-medium">{analytics.overview.completionRate}%</span>
                    </div>
                    <Progress value={analytics.overview.completionRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tasa de Abandono</span>
                      <span className="font-medium text-orange-600">{analytics.overview.dropOffRate}%</span>
                    </div>
                    <Progress value={analytics.overview.dropOffRate} className="h-2" />
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Tiempo promedio de visualización</span>
                      </div>
                      <span className="font-semibold">{analytics.overview.averageWatchTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Estudiantes activos</span>
                      </div>
                      <span className="font-semibold">{analytics.overview.activeStudents}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tendencia de inscripciones */}
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Tendencia de Inscripciones</CardTitle>
                  <CardDescription>Nuevos estudiantes en el tiempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.enrollmentTrend.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-24 text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("es", { month: "short", day: "numeric" })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Progress value={(item.value / 31) * 100} className="h-2" />
                            <span className="text-sm font-medium w-8">{item.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lecciones más populares */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Lecciones con Mejor Desempeño</CardTitle>
                <CardDescription>Top 3 lecciones más exitosas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPerformingLessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-background/50"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{lesson.title}</h4>
                        <p className="text-sm text-muted-foreground">{lesson.module}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{lesson.completionRate}%</p>
                          <p className="text-xs text-muted-foreground">Completado</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{lesson.avgRating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{lesson.avgWatchTime}</p>
                          <p className="text-xs text-muted-foreground">Tiempo</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Puntos de abandono */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <CardTitle>Puntos de Abandono</CardTitle>
                </div>
                <CardDescription>Lecciones donde los estudiantes abandonan más</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.dropOffPoints.map((point) => (
                    <div
                      key={point.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-background/50"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{point.lessonTitle}</h4>
                        <p className="text-sm text-muted-foreground">{point.moduleTitle}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-orange-600">{point.dropOffRate}%</p>
                          <p className="text-xs text-muted-foreground">Abandono</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{point.studentsDropped}</p>
                          <p className="text-xs text-muted-foreground">Estudiantes</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Estudiantes */}
          <TabsContent value="students" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Inscripciones Recientes</CardTitle>
                <CardDescription>Últimos estudiantes inscritos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Fecha de Inscripción</TableHead>
                      <TableHead>Progreso</TableHead>
                      <TableHead>Último Acceso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.recentEnrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{enrollment.studentName}</p>
                            <p className="text-sm text-muted-foreground">{enrollment.studentEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(enrollment.enrolledAt).toLocaleDateString("es", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={enrollment.progress} className="h-2 w-24" />
                            <span className="text-sm font-medium w-10">{enrollment.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(enrollment.lastAccessed).toLocaleDateString("es", {
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Contenido */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Lecciones Más Vistas</CardTitle>
                  <CardDescription>Contenido más popular</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topPerformingLessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</span>
                        <div className="flex-1">
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">{lesson.avgWatchTime} promedio</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{lesson.completionRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Mejor Valoradas</CardTitle>
                  <CardDescription>Lecciones con mejor rating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topPerformingLessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</span>
                        <div className="flex-1">
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">{lesson.module}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{lesson.avgRating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Demográficos */}
          <TabsContent value="demographics" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Estudiantes por País</CardTitle>
                <CardDescription>Distribución geográfica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.studentsByCountry.map((country) => (
                    <div key={country.country} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{country.country}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {country.students} estudiantes ({country.percentage}%)
                        </span>
                      </div>
                      <Progress value={country.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default function CourseAnalyticsPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <CourseAnalyticsContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
