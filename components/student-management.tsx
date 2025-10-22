"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  MoreVertical,
  Mail,
  MessageSquare,
  AlertTriangle,
  Star,
  Send,
  Download,
  FileText,
  Award,
  Bell,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const students = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 3,
    completedCourses: 1,
    totalProgress: 68,
    lastActivity: "2024-01-20",
    status: "active",
    grade: 85,
    certificates: 2,
  },
  {
    id: 2,
    name: "María González",
    email: "maria.gonzalez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 2,
    completedCourses: 2,
    totalProgress: 92,
    lastActivity: "2024-01-19",
    status: "active",
    grade: 94,
    certificates: 3,
  },
  {
    id: 3,
    name: "José Martínez",
    email: "jose.martinez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 4,
    completedCourses: 0,
    totalProgress: 34,
    lastActivity: "2024-01-15",
    status: "inactive",
    grade: 72,
    certificates: 0,
  },
  {
    id: 4,
    name: "Ana López",
    email: "ana.lopez@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    enrolledCourses: 1,
    completedCourses: 1,
    totalProgress: 100,
    lastActivity: "2024-01-21",
    status: "completed",
    grade: 96,
    certificates: 1,
  },
]

const messages = [
  {
    id: 1,
    student: "Carlos Rodríguez",
    subject: "Consulta sobre instalaciones residenciales",
    preview: "Tengo una duda sobre el módulo 3 del curso...",
    timestamp: "2024-01-20 14:30",
    unread: true,
    priority: "normal",
  },
  {
    id: 2,
    student: "María González",
    subject: "Solicitud de certificado",
    preview: "¿Cuándo estará disponible mi certificado?",
    timestamp: "2024-01-19 16:45",
    unread: false,
    priority: "high",
  },
  {
    id: 3,
    student: "José Martínez",
    subject: "Problema con el video del módulo 2",
    preview: "No puedo reproducir el video de la lección...",
    timestamp: "2024-01-18 10:15",
    unread: true,
    priority: "normal",
  },
]

const announcements = [
  {
    id: 1,
    title: "Nuevo módulo disponible",
    content: "Se ha agregado contenido adicional sobre seguridad eléctrica",
    date: "2024-01-20",
    recipients: "Todos los estudiantes",
    status: "sent",
  },
  {
    id: 2,
    title: "Mantenimiento programado",
    content: "La plataforma estará en mantenimiento el domingo de 2-4 AM",
    date: "2024-01-18",
    recipients: "Estudiantes activos",
    status: "draft",
  },
]

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Estudiantes</h2>
          <p className="text-gray-600 dark:text-gray-300">Administra estudiantes, comunicaciones y calificaciones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Send className="h-4 w-4 mr-2" />
            Nuevo Anuncio
          </Button>
        </div>
      </div>

      {/* Student Management Tabs */}
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
          <TabsTrigger value="students" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Estudiantes ({students.length})
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Mensajes ({messages.filter((m) => m.unread).length})
          </TabsTrigger>
          <TabsTrigger value="gradebook" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Libro de Calificaciones
          </TabsTrigger>
          <TabsTrigger
            value="announcements"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            Anuncios ({announcements.length})
          </TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students">
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar estudiantes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Students List */}
            <div className="grid gap-4">
              {filteredStudents.map((student) => (
                <Card
                  key={student.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{student.email}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge
                              variant={
                                student.status === "active"
                                  ? "default"
                                  : student.status === "completed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {student.status === "active"
                                ? "Activo"
                                : student.status === "completed"
                                  ? "Completado"
                                  : "Inactivo"}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Última actividad: {new Date(student.lastActivity).toLocaleDateString("es-ES")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{student.enrolledCourses}</div>
                          <div className="text-sm text-gray-500">Cursos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{student.totalProgress}%</div>
                          <div className="text-sm text-gray-500">Progreso</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{student.grade}</div>
                          <div className="text-sm text-gray-500">Promedio</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{student.certificates}</div>
                          <div className="text-sm text-gray-500">Certificados</div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Enviar mensaje
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Ver progreso
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Award className="h-4 w-4 mr-2" />
                              Generar certificado
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progreso general</span>
                        <span className="text-sm text-gray-600">{student.totalProgress}%</span>
                      </div>
                      <Progress value={student.totalProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <div className="grid gap-4">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 ${message.unread ? "ring-2 ring-purple-500/20" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{message.student}</h3>
                        {message.unread && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            Nuevo
                          </Badge>
                        )}
                        {message.priority === "high" && (
                          <Badge variant="destructive" className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Urgente
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{message.subject}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{message.preview}</p>
                      <p className="text-sm text-gray-500">{message.timestamp}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Responder
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Gradebook Tab */}
        <TabsContent value="gradebook">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle>Libro de Calificaciones</CardTitle>
              <CardDescription>Calificaciones y progreso de todos los estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium">Estudiante</th>
                      <th className="text-left py-3 px-4 font-medium">Cursos Inscritos</th>
                      <th className="text-left py-3 px-4 font-medium">Completados</th>
                      <th className="text-left py-3 px-4 font-medium">Promedio</th>
                      <th className="text-left py-3 px-4 font-medium">Progreso</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.enrolledCourses}</td>
                        <td className="py-3 px-4">{student.completedCourses}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span
                              className={`font-medium ${student.grade >= 90 ? "text-green-600" : student.grade >= 80 ? "text-blue-600" : student.grade >= 70 ? "text-yellow-600" : "text-red-600"}`}
                            >
                              {student.grade}
                            </span>
                            <Star className="h-4 w-4 ml-1 text-yellow-500" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Progress value={student.totalProgress} className="h-2 w-20" />
                            <span className="text-sm">{student.totalProgress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              student.status === "active"
                                ? "default"
                                : student.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {student.status === "active"
                              ? "Activo"
                              : student.status === "completed"
                                ? "Completado"
                                : "Inactivo"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline">
                            Ver detalles
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Anuncios Recientes</h3>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Bell className="h-4 w-4 mr-2" />
                Crear Anuncio
              </Button>
            </div>

            <div className="grid gap-4">
              {announcements.map((announcement) => (
                <Card
                  key={announcement.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{announcement.title}</h3>
                          <Badge variant={announcement.status === "sent" ? "default" : "secondary"}>
                            {announcement.status === "sent" ? "Enviado" : "Borrador"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{announcement.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Fecha: {new Date(announcement.date).toLocaleDateString("es-ES")}</span>
                          <span>Destinatarios: {announcement.recipients}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
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
