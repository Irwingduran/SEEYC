"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Flag,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Tag,
  Award,
  AlertTriangle,
} from "lucide-react"

// Mock data for pending courses
const pendingCourses = [
  {
    id: 1,
    title: "Instalaciones Eléctricas Residenciales Avanzadas",
    instructor: "Carlos Mendoza",
    category: "Instalaciones",
    submittedDate: "2024-03-08",
    status: "pending",
    lessons: 12,
    duration: "8 horas",
    price: 2500,
    thumbnail: "/electrical-installation.jpg",
  },
  {
    id: 2,
    title: "Mantenimiento de Motores Trifásicos",
    instructor: "Ana García",
    category: "Motores",
    submittedDate: "2024-03-10",
    status: "review",
    lessons: 8,
    duration: "6 horas",
    price: 1800,
    thumbnail: "/motor-maintenance.jpg",
  },
  {
    id: 3,
    title: "Sistemas de Protección Eléctrica Industrial",
    instructor: "Miguel Torres",
    category: "Protecciones",
    submittedDate: "2024-03-11",
    status: "pending",
    lessons: 15,
    duration: "10 horas",
    price: 3200,
    thumbnail: "/protection-systems.jpg",
  },
]

// Mock data for content moderation
const flaggedContent = [
  {
    id: 1,
    type: "course",
    title: "Curso con contenido cuestionable",
    instructor: "Usuario Reportado",
    reason: "Contenido inapropiado",
    reportedBy: "María González",
    reportDate: "2024-03-09",
    status: "pending",
  },
  {
    id: 2,
    type: "comment",
    title: "Comentario ofensivo en foro",
    instructor: "Usuario Anónimo",
    reason: "Lenguaje ofensivo",
    reportedBy: "Carlos Ruiz",
    reportDate: "2024-03-10",
    status: "resolved",
  },
]

// Mock data for categories
const categories = [
  { id: 1, name: "Instalaciones Eléctricas", courses: 89, color: "#8b5cf6", active: true },
  { id: 2, name: "Motores Eléctricos", courses: 67, color: "#3b82f6", active: true },
  { id: 3, name: "Sistemas de Protección", courses: 45, color: "#06b6d4", active: true },
  { id: 4, name: "Automatización Industrial", courses: 34, color: "#10b981", active: true },
  { id: 5, name: "Energías Renovables", courses: 23, color: "#f59e0b", active: false },
]

// Mock data for featured content
const featuredCourses = [
  {
    id: 1,
    title: "Fundamentos de Electricidad Industrial",
    instructor: "Roberto Silva",
    rating: 4.8,
    students: 1250,
    featured: true,
    featuredUntil: "2024-04-15",
  },
  {
    id: 2,
    title: "Instalaciones Domiciliarias Completas",
    instructor: "Laura Jiménez",
    rating: 4.9,
    students: 980,
    featured: true,
    featuredUntil: "2024-04-20",
  },
]

export function ContentManagement() {
  const [selectedTab, setSelectedTab] = useState("approval")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "review":
        return <Badge className="bg-blue-100 text-blue-800">En Revisión</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rechazado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Content Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <div className="text-xs text-gray-600">Esperando aprobación</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contenido Reportado</CardTitle>
            <Flag className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-gray-600">Requiere moderación</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Destacados</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-gray-600">Actualmente promocionados</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías Activas</CardTitle>
            <Tag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <div className="text-xs text-gray-600">Organizando contenido</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle>Gestión de Contenido</CardTitle>
          <CardDescription>Administra cursos, moderación y contenido destacado</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="approval">Cola de Aprobación</TabsTrigger>
              <TabsTrigger value="moderation">Moderación</TabsTrigger>
              <TabsTrigger value="categories">Categorías</TabsTrigger>
              <TabsTrigger value="featured">Contenido Destacado</TabsTrigger>
            </TabsList>

            {/* Course Approval Queue */}
            <TabsContent value="approval" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar cursos pendientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {pendingCourses.map((course) => (
                  <Card key={course.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                Instructor: <span className="font-medium">{course.instructor}</span>
                              </div>
                              <div>
                                Categoría: <span className="font-medium">{course.category}</span>
                              </div>
                              <div>
                                Lecciones: <span className="font-medium">{course.lessons}</span>
                              </div>
                              <div>
                                Duración: <span className="font-medium">{course.duration}</span>
                              </div>
                              <div>
                                Precio: <span className="font-medium">${course.price.toLocaleString()} MXN</span>
                              </div>
                              <div>
                                Enviado: <span className="font-medium">{course.submittedDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          {getStatusBadge(course.status)}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Revisar
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              Rechazar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Content Moderation */}
            <TabsContent value="moderation" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Contenido Reportado</h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar por tipo
                </Button>
              </div>

              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <Card key={item.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">{item.title}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div>
                                Tipo: <span className="font-medium capitalize">{item.type}</span>
                              </div>
                              <div>
                                Razón: <span className="font-medium">{item.reason}</span>
                              </div>
                              <div>
                                Reportado por: <span className="font-medium">{item.reportedBy}</span>
                              </div>
                              <div>
                                Fecha: <span className="font-medium">{item.reportDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <Badge variant={item.status === "resolved" ? "default" : "secondary"}>
                            {item.status === "resolved" ? "Resuelto" : "Pendiente"}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Revisar
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Resolver
                            </Button>
                            <Button size="sm" variant="destructive">
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Category Management */}
            <TabsContent value="categories" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gestión de Categorías</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Categoría
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Categoría</DialogTitle>
                      <DialogDescription>Agrega una nueva categoría para organizar los cursos</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="category-name">Nombre de la Categoría</Label>
                        <Input id="category-name" placeholder="Ej: Energías Renovables" />
                      </div>
                      <div>
                        <Label htmlFor="category-description">Descripción</Label>
                        <Textarea id="category-description" placeholder="Descripción de la categoría..." />
                      </div>
                      <div>
                        <Label htmlFor="category-color">Color</Label>
                        <Input id="category-color" type="color" defaultValue="#8b5cf6" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="category-active" defaultChecked />
                        <Label htmlFor="category-active">Categoría activa</Label>
                      </div>
                      <Button className="w-full">Crear Categoría</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                          <h4 className="font-semibold">{category.name}</h4>
                        </div>
                        <Badge variant={category.active ? "default" : "secondary"}>
                          {category.active ? "Activa" : "Inactiva"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{category.courses} cursos</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Featured Content */}
            <TabsContent value="featured" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Contenido Destacado</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Destacar Curso
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Destacar Curso</DialogTitle>
                      <DialogDescription>Selecciona un curso para destacar en la página principal</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="course-select">Seleccionar Curso</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Buscar curso..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="course1">Fundamentos de Electricidad</SelectItem>
                            <SelectItem value="course2">Instalaciones Residenciales</SelectItem>
                            <SelectItem value="course3">Motores Industriales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="featured-until">Destacar hasta</Label>
                        <Input id="featured-until" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="featured-position">Posición</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar posición" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hero">Banner Principal</SelectItem>
                            <SelectItem value="featured">Sección Destacados</SelectItem>
                            <SelectItem value="trending">Tendencias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Destacar Curso</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {featuredCourses.map((course) => (
                  <Card key={course.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                            <Award className="h-8 w-8 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{course.title}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>
                                Instructor: <span className="font-medium">{course.instructor}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span>⭐ {course.rating}</span>
                                <span>{course.students.toLocaleString()} estudiantes</span>
                              </div>
                              <div>
                                Destacado hasta: <span className="font-medium">{course.featuredUntil}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Quitar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
