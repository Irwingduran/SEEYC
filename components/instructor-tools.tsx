"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FolderOpen,
  HelpCircle,
  Calendar,
  Award,
  Plus,
  Upload,
  Video,
  ImageIcon,
  Music,
  Archive,
  Clock,
  Users,
  Download,
  Eye,
  Edit,
  Copy,
  Search,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react"

const contentLibrary = [
  {
    id: 1,
    name: "Video: Instalación de Tableros Eléctricos",
    type: "video",
    size: "245 MB",
    duration: "15:30",
    uploadDate: "2024-01-15",
    usedIn: 3,
    status: "active",
  },
  {
    id: 2,
    name: "PDF: Manual de Seguridad Eléctrica",
    type: "document",
    size: "12 MB",
    pages: 45,
    uploadDate: "2024-01-12",
    usedIn: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Imagen: Diagrama de Circuitos",
    type: "image",
    size: "2.3 MB",
    dimensions: "1920x1080",
    uploadDate: "2024-01-10",
    usedIn: 8,
    status: "active",
  },
  {
    id: 4,
    name: "Audio: Explicación de Motores Trifásicos",
    type: "audio",
    size: "18 MB",
    duration: "12:45",
    uploadDate: "2024-01-08",
    usedIn: 2,
    status: "draft",
  },
]

const quizzes = [
  {
    id: 1,
    title: "Evaluación: Instalaciones Residenciales",
    course: "Instalaciones Eléctricas Residenciales",
    questions: 15,
    timeLimit: 30,
    attempts: 3,
    passingScore: 80,
    completions: 142,
    averageScore: 85,
    status: "active",
  },
  {
    id: 2,
    title: "Quiz: Seguridad en Trabajos Eléctricos",
    course: "Seguridad Eléctrica",
    questions: 10,
    timeLimit: 15,
    attempts: 2,
    passingScore: 75,
    completions: 89,
    averageScore: 78,
    status: "active",
  },
  {
    id: 3,
    title: "Examen Final: Automatización Industrial",
    course: "Automatización Industrial con PLC",
    questions: 25,
    timeLimit: 60,
    attempts: 1,
    passingScore: 85,
    completions: 67,
    averageScore: 82,
    status: "draft",
  },
]

const liveSessions = [
  {
    id: 1,
    title: "Taller: Instalación de Paneles Solares",
    date: "2024-01-25",
    time: "19:00",
    duration: 120,
    maxParticipants: 50,
    registered: 38,
    status: "scheduled",
    type: "workshop",
  },
  {
    id: 2,
    title: "Q&A: Automatización Industrial",
    date: "2024-01-22",
    time: "18:00",
    duration: 60,
    maxParticipants: 100,
    registered: 67,
    status: "completed",
    type: "qa",
  },
  {
    id: 3,
    title: "Webinar: Nuevas Tecnologías Eléctricas",
    date: "2024-01-28",
    time: "20:00",
    duration: 90,
    maxParticipants: 200,
    registered: 156,
    status: "scheduled",
    type: "webinar",
  },
]

const certificateTemplates = [
  {
    id: 1,
    name: "Certificado Estándar",
    description: "Plantilla básica para certificados de curso",
    preview: "/certificate-standard.jpg",
    usedBy: 8,
    lastModified: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Certificado Premium",
    description: "Diseño elegante con bordes dorados",
    preview: "/certificate-premium.jpg",
    usedBy: 3,
    lastModified: "2024-01-10",
    status: "active",
  },
  {
    id: 3,
    name: "Certificado Especialización",
    description: "Para cursos de especialización avanzada",
    preview: "/certificate-specialization.jpg",
    usedBy: 2,
    lastModified: "2024-01-08",
    status: "draft",
  },
]

export function InstructorTools() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContentType, setSelectedContentType] = useState("all")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case "audio":
        return <Music className="h-5 w-5 text-purple-500" />
      default:
        return <Archive className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "draft":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Herramientas del Instructor</h2>
          <p className="text-gray-600 dark:text-gray-300">Gestiona contenido, evaluaciones y sesiones en vivo</p>
        </div>
      </div>

      {/* Tools Tabs */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <TabsTrigger value="content" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <FolderOpen className="h-4 w-4 mr-2" />
            Biblioteca de Contenido
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <HelpCircle className="h-4 w-4 mr-2" />
            Evaluaciones
          </TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Sesiones en Vivo
          </TabsTrigger>
          <TabsTrigger
            value="certificates"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            <Award className="h-4 w-4 mr-2" />
            Certificados
          </TabsTrigger>
        </TabsList>

        {/* Content Library Tab */}
        <TabsContent value="content">
          <div className="space-y-4">
            {/* Content Library Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar archivos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                  />
                </div>
                <Select value={selectedContentType} onValueChange={setSelectedContentType}>
                  <SelectTrigger className="w-48 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                    <SelectValue placeholder="Tipo de archivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="document">Documentos</SelectItem>
                    <SelectItem value="image">Imágenes</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Archivo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Subir Nuevo Archivo</DialogTitle>
                    <DialogDescription>Agrega contenido a tu biblioteca</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="file-name">Nombre del archivo</Label>
                      <Input id="file-name" placeholder="Ej: Video tutorial instalaciones" />
                    </div>
                    <div>
                      <Label htmlFor="file-type">Tipo de contenido</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Documento</SelectItem>
                          <SelectItem value="image">Imagen</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="file-description">Descripción</Label>
                      <Textarea id="file-description" placeholder="Descripción del contenido..." />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Subir</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Content Library Grid */}
            <div className="grid gap-4">
              {contentLibrary.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(item.type)}
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{item.size}</span>
                            {item.duration && <span>{item.duration}</span>}
                            {item.pages && <span>{item.pages} páginas</span>}
                            {item.dimensions && <span>{item.dimensions}</span>}
                            <span>Subido: {new Date(item.uploadDate).toLocaleDateString("es-ES")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{item.usedIn}</div>
                          <div className="text-xs text-gray-500">Usado en cursos</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <Badge variant={item.status === "active" ? "default" : "secondary"}>
                            {item.status === "active" ? "Activo" : "Borrador"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Constructor de Evaluaciones</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Evaluación
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Evaluación</DialogTitle>
                    <DialogDescription>Configura una nueva evaluación para tus estudiantes</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quiz-title">Título de la evaluación</Label>
                      <Input id="quiz-title" placeholder="Ej: Evaluación Módulo 1" />
                    </div>
                    <div>
                      <Label htmlFor="quiz-course">Curso asociado</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Instalaciones Residenciales</SelectItem>
                          <SelectItem value="industrial">Automatización Industrial</SelectItem>
                          <SelectItem value="solar">Energía Solar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quiz-questions">Número de preguntas</Label>
                        <Input id="quiz-questions" type="number" placeholder="10" />
                      </div>
                      <div>
                        <Label htmlFor="quiz-time">Tiempo límite (min)</Label>
                        <Input id="quiz-time" type="number" placeholder="30" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Crear Evaluación</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {quizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{quiz.title}</h3>
                          <Badge variant={quiz.status === "active" ? "default" : "secondary"}>
                            {quiz.status === "active" ? "Activo" : "Borrador"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{quiz.course}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <span>{quiz.questions} preguntas</span>
                          <span>{quiz.timeLimit} min</span>
                          <span>{quiz.attempts} intentos</span>
                          <span>Nota mínima: {quiz.passingScore}%</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{quiz.completions}</div>
                          <div className="text-xs text-gray-500">Completadas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{quiz.averageScore}%</div>
                          <div className="text-xs text-gray-500">Promedio</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-4 w-4 mr-1" />
                            Duplicar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Live Sessions Tab */}
        <TabsContent value="sessions">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Programador de Sesiones en Vivo</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Programar Sesión
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Programar Nueva Sesión</DialogTitle>
                    <DialogDescription>Crea una sesión en vivo para tus estudiantes</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="session-title">Título de la sesión</Label>
                      <Input id="session-title" placeholder="Ej: Taller de Instalaciones" />
                    </div>
                    <div>
                      <Label htmlFor="session-type">Tipo de sesión</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">Taller</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="qa">Sesión Q&A</SelectItem>
                          <SelectItem value="demo">Demostración</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="session-date">Fecha</Label>
                        <Input id="session-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="session-time">Hora</Label>
                        <Input id="session-time" type="time" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="session-duration">Duración (min)</Label>
                        <Input id="session-duration" type="number" placeholder="60" />
                      </div>
                      <div>
                        <Label htmlFor="session-participants">Máx. participantes</Label>
                        <Input id="session-participants" type="number" placeholder="50" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Programar</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {liveSessions.map((session) => (
                <Card
                  key={session.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{session.title}</h3>
                          <Badge
                            variant={
                              session.status === "scheduled"
                                ? "default"
                                : session.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {session.status === "scheduled"
                              ? "Programada"
                              : session.status === "completed"
                                ? "Completada"
                                : "Borrador"}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {session.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <span>📅 {new Date(session.date).toLocaleDateString("es-ES")}</span>
                          <span>🕐 {session.time}</span>
                          <span>⏱️ {session.duration} min</span>
                          <span>
                            👥 {session.registered}/{session.maxParticipants} inscritos
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{session.registered}</div>
                          <div className="text-xs text-gray-500">Inscritos</div>
                        </div>
                        <div className="flex gap-2">
                          {session.status === "scheduled" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <PlayCircle className="h-4 w-4 mr-1" />
                              Iniciar
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="h-4 w-4 mr-1" />
                            Participantes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Diseñador de Certificados</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Plantilla
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Crear Plantilla de Certificado</DialogTitle>
                    <DialogDescription>Diseña una nueva plantilla para certificados</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="template-name">Nombre de la plantilla</Label>
                      <Input id="template-name" placeholder="Ej: Certificado Especialización" />
                    </div>
                    <div>
                      <Label htmlFor="template-description">Descripción</Label>
                      <Textarea id="template-description" placeholder="Descripción de la plantilla..." />
                    </div>
                    <div>
                      <Label htmlFor="template-style">Estilo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">Clásico</SelectItem>
                          <SelectItem value="modern">Moderno</SelectItem>
                          <SelectItem value="elegant">Elegante</SelectItem>
                          <SelectItem value="professional">Profesional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Crear Plantilla</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificateTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={template.preview || "/placeholder.svg?height=200&width=300"}
                      alt={template.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800">
                      {template.status === "active" ? "Activa" : "Borrador"}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Usado por {template.usedBy} cursos</span>
                      <span>Modificado: {new Date(template.lastModified).toLocaleDateString("es-ES")}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
