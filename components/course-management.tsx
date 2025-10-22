"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Star,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Copy,
  BookOpen,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText,
  Zap,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const activeCourses = [
  {
    id: 1,
    title: "Instalaciones Eléctricas Residenciales",
    thumbnail: "/electrical-residential-installation.jpg",
    students: 156,
    rating: 4.8,
    revenue: 15600,
    status: "published",
    lastUpdated: "2024-01-15",
    modules: 12,
    duration: "8 horas",
  },
  {
    id: 2,
    title: "Automatización Industrial con PLC",
    thumbnail: "/industrial-automation-plc.jpg",
    students: 89,
    rating: 4.9,
    revenue: 17800,
    status: "published",
    lastUpdated: "2024-01-10",
    modules: 15,
    duration: "12 horas",
  },
  {
    id: 3,
    title: "Sistemas de Energía Solar",
    thumbnail: "/solar-panels-installation.jpg",
    students: 134,
    rating: 4.7,
    revenue: 20100,
    status: "published",
    lastUpdated: "2024-01-08",
    modules: 10,
    duration: "6 horas",
  },
]

const draftCourses = [
  {
    id: 4,
    title: "Motores Eléctricos Avanzados",
    thumbnail: "/electric-motors.png",
    progress: 75,
    lastEdited: "2024-01-20",
    modules: 8,
    estimatedDuration: "10 horas",
  },
  {
    id: 5,
    title: "Sistemas de Protección Eléctrica",
    thumbnail: "/electrical-protection-systems.jpg",
    progress: 45,
    lastEdited: "2024-01-18",
    modules: 6,
    estimatedDuration: "7 horas",
  },
]

const courseTemplates = [
  {
    id: 1,
    name: "Curso Técnico Básico",
    description: "Plantilla para cursos técnicos de nivel básico",
    modules: 8,
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Curso Especializado",
    description: "Para cursos avanzados con certificación",
    modules: 12,
    icon: Zap,
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Taller Práctico",
    description: "Enfoque en ejercicios y práctica",
    modules: 6,
    icon: PlayCircle,
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Curso Teórico",
    description: "Contenido conceptual y fundamentos",
    modules: 10,
    icon: FileText,
    color: "bg-orange-500",
  },
]

export function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Cursos</h2>
          <p className="text-gray-600 dark:text-gray-300">Administra tus cursos, borradores y plantillas</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Crear Nuevo Curso
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
          />
        </div>
        <Button variant="outline" className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Course Management Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <TabsTrigger value="active" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Cursos Activos ({activeCourses.length})
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Borradores ({draftCourses.length})
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Plantillas ({courseTemplates.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Courses */}
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Publicado
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver curso
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{course.modules} módulos</span>
                    <span>{course.duration}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center text-blue-600 mb-1">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students}
                      </div>
                      <p className="text-xs text-gray-500">Estudiantes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-yellow-600 mb-1">
                        <Star className="h-4 w-4 mr-1" />
                        {course.rating}
                      </div>
                      <p className="text-xs text-gray-500">Calificación</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-green-600 mb-1">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {course.revenue.toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-500">Ingresos</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Draft Courses */}
        <TabsContent value="drafts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draftCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg opacity-75"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    Borrador
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{course.modules} módulos</span>
                    <span>{course.estimatedDuration}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progreso</span>
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Última edición: {new Date(course.lastEdited).toLocaleDateString("es-ES")}
                  </p>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Edit className="h-4 w-4 mr-1" />
                      Continuar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      Vista previa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Course Templates */}
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseTemplates.map((template) => {
              const IconComponent = template.icon
              return (
                <Card
                  key={template.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <CardHeader className="text-center pb-3">
                    <div
                      className={`w-16 h-16 ${template.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 text-center">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">
                        {template.modules} módulos incluidos
                      </Badge>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Usar Plantilla
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
