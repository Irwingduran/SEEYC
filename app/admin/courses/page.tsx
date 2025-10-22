"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCourseActions } from "@/hooks/use-course-actions"
import { exportCoursesToCSV, exportCoursesToJSON, exportCourseStats } from "@/lib/export-utils"
import type { Course } from "@/types/course"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Archive,
  Copy,
  Settings,
  BarChart3,
  Grid3x3,
  List,
  ArrowUpDown,
  Calendar,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import React, { useState } from "react"

// Tipos
type ViewMode = "grid" | "table"

function CoursesContent() {
  const { isCollapsed } = useSidebar()
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [courses, setCourses] = useState<Course[]>([])

  // Hook para acciones de cursos
  const { isLoading: isActionLoading, publishCourse, archiveCourse, restoreCourse, duplicateCourse, deleteCourse } =
    useCourseActions({
      onSuccess: () => {
        // Recargar cursos después de una acción exitosa
        // En producción, esto vendría de una API
        loadCourses()
      },
    })

  // Cargar cursos (simulado)
  const loadCourses = () => {
    // En producción, esto sería una llamada a API
    setCourses(mockCourses)
  }

  // Cargar cursos al montar
  React.useEffect(() => {
    loadCourses()
  }, [])

  // Manejar exportación
  const handleExport = (format: "csv" | "json" | "stats") => {
    switch (format) {
      case "csv":
        exportCoursesToCSV(filteredCourses, "mis-cursos")
        break
      case "json":
        exportCoursesToJSON(filteredCourses, "mis-cursos")
        break
      case "stats":
        exportCourseStats(filteredCourses, "estadisticas-cursos")
        break
    }
  }

  // Datos de ejemplo - en producción vendrían de una API
  const mockCourses: Course[] = [
    {
      id: 1,
      title: "Automatización Industrial con PLC",
      subtitle: "Aprende programación de PLCs desde cero",
      description: "Curso completo de automatización industrial",
      category: "Automatización Industrial",
      level: "Avanzado",
      status: "published",
      language: "es",
      students: 245,
      revenue: 2450,
      rating: 4.8,
      reviews: 89,
      lastUpdated: "2024-01-15",
      createdAt: "2023-06-20",
      duration: "12 horas",
      price: 149.99,
      modules: [
        { id: 1, title: "Módulo 1", description: "", lessons: [], order: 0 },
        { id: 2, title: "Módulo 2", description: "", lessons: [], order: 1 },
      ],
      instructor: {
        id: "1",
        name: "María González",
        email: "maria@example.com",
        avatar: "/avatar-1.jpg",
      },
      instructorId: "1",
    },
    {
      id: 2,
      title: "Instalaciones Solares Residenciales",
      subtitle: "Diseña e instala sistemas fotovoltaicos",
      description: "Aprende a diseñar e instalar sistemas solares",
      category: "Energía Solar",
      level: "Intermedio",
      status: "published",
      language: "es",
      students: 198,
      revenue: 1980,
      rating: 4.9,
      reviews: 67,
      lastUpdated: "2024-01-10",
      createdAt: "2023-08-15",
      duration: "8 horas",
      price: 99.99,
      modules: [
        { id: 1, title: "Módulo 1", description: "", lessons: [], order: 0 },
        { id: 2, title: "Módulo 2", description: "", lessons: [], order: 1 },
        { id: 3, title: "Módulo 3", description: "", lessons: [], order: 2 },
        { id: 4, title: "Módulo 4", description: "", lessons: [], order: 3 },
        { id: 5, title: "Módulo 5", description: "", lessons: [], order: 4 },
        { id: 6, title: "Módulo 6", description: "", lessons: [], order: 5 },
      ],
      instructor: { id: "1", name: "María González", email: "maria@example.com", avatar: "/avatar-1.jpg" },
      instructorId: "1",
    },
    {
      id: 3,
      title: "Seguridad Eléctrica Industrial",
      subtitle: "Normas y prácticas de seguridad",
      description: "Curso completo de seguridad eléctrica",
      category: "Seguridad Eléctrica",
      level: "Básico",
      status: "published",
      language: "es",
      students: 312,
      revenue: 3120,
      rating: 4.7,
      reviews: 124,
      lastUpdated: "2024-01-08",
      createdAt: "2023-05-10",
      duration: "6 horas",
      price: 79.99,
      modules: [
        { id: 1, title: "Módulo 1", description: "", lessons: [], order: 0 },
        { id: 2, title: "Módulo 2", description: "", lessons: [], order: 1 },
        { id: 3, title: "Módulo 3", description: "", lessons: [], order: 2 },
        { id: 4, title: "Módulo 4", description: "", lessons: [], order: 3 },
        { id: 5, title: "Módulo 5", description: "", lessons: [], order: 4 },
      ],
      instructor: { id: "1", name: "María González", email: "maria@example.com", avatar: "/avatar-1.jpg" },
      instructorId: "1",
    },
    {
      id: 4,
      title: "Mantenimiento de Sistemas Eléctricos",
      subtitle: "Mantenimiento preventivo y correctivo",
      description: "Técnicas de mantenimiento eléctrico",
      category: "Mantenimiento Industrial",
      level: "Intermedio",
      status: "draft",
      language: "es",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: "2024-01-20",
      createdAt: "2024-01-05",
      duration: "5 horas",
      price: 89.99,
      modules: [
        { id: 1, title: "Módulo 1", description: "", lessons: [], order: 0 },
        { id: 2, title: "Módulo 2", description: "", lessons: [], order: 1 },
        { id: 3, title: "Módulo 3", description: "", lessons: [], order: 2 },
        { id: 4, title: "Módulo 4", description: "", lessons: [], order: 3 },
      ],
      instructor: { id: "1", name: "María González", email: "maria@example.com", avatar: "/avatar-1.jpg" },
      instructorId: "1",
    },
    {
      id: 5,
      title: "Control de Procesos Industriales",
      subtitle: "Sistemas de control avanzados",
      description: "Control de procesos con sistemas modernos",
      category: "Control de Procesos",
      level: "Avanzado",
      status: "draft",
      language: "es",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: "2024-01-18",
      createdAt: "2024-01-12",
      duration: "10 horas",
      price: 129.99,
      modules: [
        { id: 1, title: "Módulo 1", description: "", lessons: [], order: 0 },
        { id: 2, title: "Módulo 2", description: "", lessons: [], order: 1 },
        { id: 3, title: "Módulo 3", description: "", lessons: [], order: 2 },
        { id: 4, title: "Módulo 4", description: "", lessons: [], order: 3 },
        { id: 5, title: "Módulo 5", description: "", lessons: [], order: 4 },
        { id: 6, title: "Módulo 6", description: "", lessons: [], order: 5 },
        { id: 7, title: "Módulo 7", description: "", lessons: [], order: 6 },
      ],
      instructor: { id: "1", name: "María González", email: "maria@example.com", avatar: "/avatar-1.jpg" },
      instructorId: "1",
    },
    {
      id: 6,
      title: "Introducción a Sistemas SCADA",
      subtitle: "Supervisión y control de procesos",
      description: "Fundamentos de sistemas SCADA",
      category: "Automatización Industrial",
      level: "Básico",
      status: "archived",
      language: "es",
      students: 156,
      revenue: 1560,
      rating: 4.5,
      reviews: 45,
      lastUpdated: "2023-12-01",
      createdAt: "2023-03-15",
      duration: "4 horas",
      price: 59.99,
      modules: [
        { id: 1, title: "Módulo 1", description: "", lessons: [], order: 0 },
        { id: 2, title: "Módulo 2", description: "", lessons: [], order: 1 },
        { id: 3, title: "Módulo 3", description: "", lessons: [], order: 2 },
        { id: 4, title: "Módulo 4", description: "", lessons: [], order: 3 },
      ],
      instructor: { id: "1", name: "María González", email: "maria@example.com", avatar: "/avatar-1.jpg" },
      instructorId: "1",
    },
  ]

  // KPIs
  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter((c) => c.status === "published").length,
    draftCourses: courses.filter((c) => c.status === "draft").length,
    totalStudents: courses.reduce((sum, c) => sum + c.students, 0),
    totalRevenue: courses.reduce((sum, c) => sum + c.revenue, 0),
    avgRating:
      courses.filter((c) => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) /
      courses.filter((c) => c.rating > 0).length,
  }

  const categories = [
    "Automatización Industrial",
    "Instalaciones Eléctricas",
    "Energía Solar",
    "Seguridad Eléctrica",
    "Mantenimiento Industrial",
    "Control de Procesos",
  ]

  const levels = ["Básico", "Intermedio", "Avanzado", "Experto"]

  // Función para obtener el badge del estado
  const getStatusBadge = (status: CourseStatus) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Publicado
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="secondary">
            <AlertCircle className="h-3 w-3 mr-1" />
            Borrador
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <Archive className="h-3 w-3 mr-1" />
            Archivado
          </Badge>
        )
    }
  }

  // Filtrar cursos
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesStatus && matchesLevel
  })

  // Componente de tarjeta de curso
  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/60 backdrop-blur-sm overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-primary/40" />
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {getStatusBadge(course.status)}
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm border-0">
            {course.category}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src={course.instructor.avatar} />
              <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-white font-medium">{course.instructor.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5">
        <div className="space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{course.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {course.level}
              </Badge>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {course.modules.length} módulos
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.duration}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-3 w-3 text-blue-600" />
                <span className="text-sm font-bold">{course.students}</span>
              </div>
              <p className="text-xs text-muted-foreground">Estudiantes</p>
            </div>
            {course.status === "published" && (
              <>
                <div className="text-center border-x">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold">{course.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="h-3 w-3 text-green-600" />
                    <span className="text-sm font-bold">{course.revenue}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Ingresos</p>
                </div>
              </>
            )}
            {course.status !== "published" && (
              <div className="col-span-2 text-center border-l">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Calendar className="h-3 w-3 text-purple-600" />
                  <span className="text-xs font-medium">{course.lastUpdated}</span>
                </div>
                <p className="text-xs text-muted-foreground">Última actualización</p>
              </div>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">${course.price}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/admin/courses/${course.id}/edit`}>
                  <Edit className="h-3 w-3" />
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/admin/courses/${course.id}/analytics`}>
                  <BarChart3 className="h-3 w-3" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/courses/${course.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/courses/${course.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver como estudiante
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => duplicateCourse(course.id, course)} disabled={isActionLoading}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/courses/${course.id}/analytics`}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analíticas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {course.status === "published" && (
                    <DropdownMenuItem onClick={() => archiveCourse(course.id)} disabled={isActionLoading}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archivar
                    </DropdownMenuItem>
                  )}
                  {course.status === "draft" && (
                    <DropdownMenuItem onClick={() => publishCourse(course.id)} disabled={isActionLoading}>
                      <Upload className="h-4 w-4 mr-2" />
                      Publicar
                    </DropdownMenuItem>
                  )}
                  {course.status === "archived" && (
                    <DropdownMenuItem onClick={() => restoreCourse(course.id)} disabled={isActionLoading}>
                      <Upload className="h-4 w-4 mr-2" />
                      Restaurar
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => deleteCourse(course.id, course.title)}
                    disabled={isActionLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Gestión de Cursos</h1>
              <p className="text-muted-foreground text-lg">
                Administra y monitorea todos tus cursos en un solo lugar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Formato de exportación</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    Exportar como CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("json")}>
                    Exportar como JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("stats")}>
                    Exportar estadísticas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" asChild>
                <Link href="/admin/courses/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Curso
                </Link>
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700">
                    {stats.publishedCourses} activos
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de Cursos</p>
                  <p className="text-3xl font-bold">{stats.totalCourses}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.draftCourses} en borrador
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-medium">+15%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Estudiantes</p>
                  <p className="text-3xl font-bold">{stats.totalStudents}</p>
                  <p className="text-xs text-muted-foreground mt-1">En todos los cursos</p>
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
                    <span className="text-xs font-medium">+28%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ingresos Totales</p>
                  <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Este mes</p>
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
                  <p className="text-3xl font-bold">{stats.avgRating.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">De todos los cursos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar cursos por título o categoría..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap lg:flex-nowrap gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full lg:w-[140px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="published">Publicados</SelectItem>
                    <SelectItem value="draft">Borradores</SelectItem>
                    <SelectItem value="archived">Archivados</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full lg:w-[140px]">
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-[160px]">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="oldest">Más antiguos</SelectItem>
                    <SelectItem value="students">Más estudiantes</SelectItem>
                    <SelectItem value="revenue">Más ingresos</SelectItem>
                    <SelectItem value="rating">Mejor valorados</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{filteredCourses.length}</span> de{" "}
            <span className="font-semibold text-foreground">{courses.length}</span> cursos
          </p>
          {(searchQuery || selectedCategory !== "all" || selectedStatus !== "all" || selectedLevel !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedStatus("all")
                setSelectedLevel("all")
              }}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Course Grid/Table */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Curso</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Estudiantes</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="text-right">Ingresos</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {course.modules.length} módulos · {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} lecciones
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(course.status)}</TableCell>
                      <TableCell className="text-right font-medium">{course.students}</TableCell>
                      <TableCell className="text-right">
                        {course.rating > 0 ? (
                          <div className="flex items-center justify-end gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        ${course.revenue}
                      </TableCell>
                      <TableCell className="text-right font-medium">${course.price}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/admin/courses/${course.id}/edit`}>
                              <Edit className="h-3 w-3" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/courses/${course.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/courses/${course.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver como estudiante
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => duplicateCourse(course.id, course)} disabled={isActionLoading}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/courses/${course.id}/analytics`}>
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  Analíticas
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {course.status === "published" && (
                                <DropdownMenuItem onClick={() => archiveCourse(course.id)} disabled={isActionLoading}>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archivar
                                </DropdownMenuItem>
                              )}
                              {course.status === "draft" && (
                                <DropdownMenuItem onClick={() => publishCourse(course.id)} disabled={isActionLoading}>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Publicar
                                </DropdownMenuItem>
                              )}
                              {course.status === "archived" && (
                                <DropdownMenuItem onClick={() => restoreCourse(course.id)} disabled={isActionLoading}>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Restaurar
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => deleteCourse(course.id, course.title)}
                                disabled={isActionLoading}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron cursos</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || selectedCategory !== "all" || selectedStatus !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Comienza creando tu primer curso"}
              </p>
              {!searchQuery && selectedCategory === "all" && selectedStatus === "all" && (
                <Button asChild>
                  <Link href="/admin/courses/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primer Curso
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </>
  )
}

export default function CoursesPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <CoursesContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
