"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Play,
  Search,
  Filter,
  Star,
  Users,
  CheckCircle,
  Award,
  Video,
  FileText,
  BarChart3,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

interface Course {
  id: number
  title: string
  description: string
  instructor: string
  category: string
  level: "Básico" | "Intermedio" | "Avanzado"
  duration: string
  enrolled: boolean
  progress?: number
  rating: number
  students: number
  lessons: number
  status: "published" | "draft"
  nextLesson?: string
}

function CoursesContent() {
  const { isCollapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  // Mock courses data - estos vendrían del backend/admin
  const allCourses: Course[] = [
    {
      id: 1,
      title: "Introducción a Sistemas Eléctricos",
      description: "Fundamentos de electricidad y circuitos básicos para principiantes",
      instructor: "Ing. María González",
      category: "Electricidad",
      level: "Básico",
      duration: "8 horas",
      enrolled: true,
      progress: 85,
      rating: 4.8,
      students: 245,
      lessons: 24,
      status: "published",
      nextLesson: "Circuitos en Serie y Paralelo",
    },
    {
      id: 2,
      title: "Automatización Industrial con PLC",
      description: "Aprende programación de PLCs y sistemas de automatización",
      instructor: "Ing. Carlos Rodríguez",
      category: "Automatización",
      level: "Intermedio",
      duration: "12 horas",
      enrolled: true,
      progress: 60,
      rating: 4.9,
      students: 198,
      lessons: 36,
      status: "published",
      nextLesson: "Programación Ladder Avanzada",
    },
    {
      id: 3,
      title: "Instalaciones Solares Fotovoltaicas",
      description: "Diseño e instalación de sistemas de energía solar",
      instructor: "Ing. Roberto Silva",
      category: "Energía Renovable",
      level: "Avanzado",
      duration: "15 horas",
      enrolled: true,
      progress: 40,
      rating: 4.7,
      students: 176,
      lessons: 42,
      status: "published",
      nextLesson: "Cálculo de Dimensionamiento",
    },
    {
      id: 4,
      title: "Seguridad Eléctrica Industrial NOM",
      description: "Normativas y protocolos de seguridad eléctrica",
      instructor: "Ing. Ana Martínez",
      category: "Seguridad",
      level: "Básico",
      duration: "6 horas",
      enrolled: false,
      rating: 4.9,
      students: 312,
      lessons: 18,
      status: "published",
    },
    {
      id: 5,
      title: "Mantenimiento Preventivo Industrial",
      description: "Técnicas y estrategias de mantenimiento preventivo",
      instructor: "Ing. Luis Hernández",
      category: "Mantenimiento",
      level: "Intermedio",
      duration: "10 horas",
      enrolled: false,
      rating: 4.6,
      students: 189,
      lessons: 30,
      status: "published",
    },
    {
      id: 6,
      title: "Diseño de Instalaciones Eléctricas",
      description: "Proyectos completos de instalaciones residenciales e industriales",
      instructor: "Ing. María González",
      category: "Electricidad",
      level: "Avanzado",
      duration: "14 horas",
      enrolled: false,
      rating: 4.8,
      students: 156,
      lessons: 38,
      status: "published",
    },
    {
      id: 7,
      title: "Transformadores y Motores Eléctricos",
      description: "Funcionamiento, instalación y mantenimiento de transformadores",
      instructor: "Ing. Jorge Ramírez",
      category: "Electricidad",
      level: "Intermedio",
      duration: "11 horas",
      enrolled: false,
      rating: 4.7,
      students: 203,
      lessons: 32,
      status: "published",
    },
    {
      id: 8,
      title: "Energía Eólica: Fundamentos",
      description: "Introducción a sistemas de generación eólica",
      instructor: "Ing. Roberto Silva",
      category: "Energía Renovable",
      level: "Básico",
      duration: "7 horas",
      enrolled: false,
      rating: 4.5,
      students: 134,
      lessons: 21,
      status: "published",
    },
  ]

  const enrolledCourses = allCourses.filter((c) => c.enrolled)

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    return matchesSearch && matchesCategory && matchesLevel
  })

  const categories = ["all", ...Array.from(new Set(allCourses.map((c) => c.category)))]

  const handleEnroll = (courseId: number) => {
    toast.success("¡Te has inscrito al curso exitosamente!")
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Básico":
        return "bg-green-500/10 text-green-700 hover:bg-green-500/20"
      case "Intermedio":
        return "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20"
      case "Avanzado":
        return "bg-purple-500/10 text-purple-700 hover:bg-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-5">
        <div className="flex flex-col h-full">
          {/* Course Image Placeholder */}
          <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>

          {/* Course Info */}
          <div className="flex items-start justify-between mb-2">
            <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
            {course.enrolled && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-700">
                Inscrito
              </Badge>
            )}
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

          <div className="space-y-2 mb-4">
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                {course.rating}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {course.students}
              </span>
              <span className="flex items-center gap-1">
                <Video className="h-3 w-3" />
                {course.lessons} lecciones
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {course.duration}
            </div>
          </div>

          {/* Progress for enrolled courses */}
          {course.enrolled && course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              {course.nextLesson && (
                <p className="text-xs text-muted-foreground mt-2">Siguiente: {course.nextLesson}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto pt-4 border-t">
            {course.enrolled ? (
              <Button className="w-full" asChild>
                <Link href={`/dashboard/courses/${course.id}/learn`}>
                  <Play className="h-4 w-4 mr-2" />
                  Continuar
                </Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm" asChild>
                  <Link href={`/dashboard/courses/${course.id}`}>
                    Ver Detalles
                  </Link>
                </Button>
                <Button className="flex-1" size="sm" onClick={() => handleEnroll(course.id)}>
                  Inscribirse
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Mis Cursos</h1>
          <p className="text-muted-foreground text-lg">
            Gestiona tus cursos inscritos y descubre nuevos contenidos
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cursos Activos</p>
                  <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completados</p>
                  <p className="text-2xl font-bold">
                    {enrolledCourses.filter((c) => c.progress === 100).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificados</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="enrolled">Mis Cursos ({enrolledCourses.length})</TabsTrigger>
            <TabsTrigger value="explore">Explorar ({allCourses.length})</TabsTrigger>
          </TabsList>

          {/* Enrolled Courses */}
          <TabsContent value="enrolled" className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No tienes cursos inscritos</h3>
                  <p className="text-muted-foreground mb-4">
                    Explora nuestro catálogo y comienza tu aprendizaje
                  </p>
                  <Button>Explorar Cursos</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Explore Courses */}
          <TabsContent value="explore" className="space-y-4">
            {/* Filters */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar cursos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories
                        .filter((c) => c !== "all")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {/* Level Filter */}
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-full md:w-[160px]">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los niveles</SelectItem>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters Display */}
                {(searchQuery || categoryFilter !== "all" || levelFilter !== "all") && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                    <span className="text-sm text-muted-foreground">Filtros activos:</span>
                    {searchQuery && (
                      <Badge variant="secondary">Búsqueda: {searchQuery}</Badge>
                    )}
                    {categoryFilter !== "all" && (
                      <Badge variant="secondary">{categoryFilter}</Badge>
                    )}
                    {levelFilter !== "all" && (
                      <Badge variant="secondary">{levelFilter}</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setCategoryFilter("all")
                        setLevelFilter("all")
                      }}
                      className="ml-auto"
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No se encontraron cursos</h3>
                  <p className="text-muted-foreground mb-4">
                    Intenta con otros términos de búsqueda o filtros
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("all")
                      setLevelFilter("all")
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {filteredCourses.length} curso{filteredCourses.length !== 1 ? "s" : ""}{" "}
                    encontrado{filteredCourses.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default function CoursesPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
          <CoursesContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
