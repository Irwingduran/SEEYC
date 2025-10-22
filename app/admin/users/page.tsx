"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  UserPlus,
  Download,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield,
  AlertCircle,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { cn } from "@/lib/utils"

interface User {
  id: number
  name: string
  email: string
  avatar?: string
  status: "active" | "inactive" | "suspended"
  enrolledCourses: number
  completedCourses: number
  progress: number
  certificates: number
  joinedDate: string
  lastActivity: string
  phone?: string
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    avatar: "",
    status: "active",
    enrolledCourses: 3,
    completedCourses: 1,
    progress: 45,
    certificates: 1,
    joinedDate: "2024-01-15",
    lastActivity: "Hace 2 horas",
    phone: "+1234567890",
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@example.com",
    avatar: "",
    status: "active",
    enrolledCourses: 2,
    completedCourses: 1,
    progress: 55,
    certificates: 1,
    joinedDate: "2023-11-20",
    lastActivity: "Hace 1 día",
    phone: "+1234567891",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    avatar: "",
    status: "active",
    enrolledCourses: 5,
    completedCourses: 3,
    progress: 78,
    certificates: 3,
    joinedDate: "2024-02-10",
    lastActivity: "Hace 30 minutos",
    phone: "+1234567892",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    avatar: "",
    status: "inactive",
    enrolledCourses: 2,
    completedCourses: 0,
    progress: 15,
    certificates: 0,
    joinedDate: "2024-03-05",
    lastActivity: "Hace 2 semanas",
    phone: "+1234567893",
  },
  {
    id: 5,
    name: "Luis Hernández",
    email: "luis.hernandez@example.com",
    avatar: "",
    status: "active",
    enrolledCourses: 6,
    completedCourses: 4,
    progress: 88,
    certificates: 4,
    joinedDate: "2023-09-01",
    lastActivity: "Hace 5 minutos",
    phone: "+1234567894",
  },
  {
    id: 6,
    name: "Sofia López",
    email: "sofia.lopez@example.com",
    avatar: "",
    status: "suspended",
    enrolledCourses: 1,
    completedCourses: 0,
    progress: 5,
    certificates: 0,
    joinedDate: "2024-04-12",
    lastActivity: "Hace 1 mes",
    phone: "+1234567895",
  },
  {
    id: 7,
    name: "Diego Torres",
    email: "diego.torres@example.com",
    avatar: "",
    status: "active",
    enrolledCourses: 3,
    completedCourses: 2,
    progress: 70,
    certificates: 2,
    joinedDate: "2024-01-08",
    lastActivity: "Hace 3 horas",
    phone: "+1234567896",
  },
  {
    id: 8,
    name: "Laura Ramírez",
    email: "laura.ramirez@example.com",
    avatar: "",
    status: "active",
    enrolledCourses: 4,
    completedCourses: 2,
    progress: 62,
    certificates: 2,
    joinedDate: "2024-02-22",
    lastActivity: "Hace 1 hora",
    phone: "+1234567897",
  },
  {
    id: 9,
    name: "Roberto Sánchez",
    email: "roberto.sanchez@example.com",
    avatar: "",
    status: "active",
    enrolledCourses: 2,
    completedCourses: 1,
    progress: 48,
    certificates: 1,
    joinedDate: "2024-03-18",
    lastActivity: "Hace 4 horas",
    phone: "+1234567898",
  },
  {
    id: 10,
    name: "Patricia Morales",
    email: "patricia.morales@example.com",
    avatar: "",
    status: "inactive",
    enrolledCourses: 1,
    completedCourses: 0,
    progress: 10,
    certificates: 0,
    joinedDate: "2024-04-22",
    lastActivity: "Hace 3 semanas",
    phone: "+1234567899",
  },
]

function UsersContent() {
  const { isCollapsed } = useSidebar()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isCertificatesModalOpen, setIsCertificatesModalOpen] = useState(false)
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)

  // Statistics
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const inactiveUsers = users.filter((u) => u.status === "inactive").length
  const suspendedUsers = users.filter((u) => u.status === "suspended").length
  const totalEnrolled = users.reduce((sum, u) => sum + u.enrolledCourses, 0)
  const totalCompleted = users.reduce((sum, u) => sum + u.completedCourses, 0)
  const avgProgress = totalUsers > 0
    ? Math.round(users.reduce((sum, u) => sum + u.progress, 0) / totalUsers)
    : 0

  // Filtered users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-600 text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Activo
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            Inactivo
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="outline" className="border-red-600 text-red-600">
            <Ban className="h-3 w-3 mr-1" />
            Suspendido
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === "active" ? "suspended" : "active"
    setUsers(
      users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
    )
  }

  const handleViewCourses = (user: User) => {
    setSelectedUser(user)
    setIsCoursesModalOpen(true)
  }

  const handleViewProgress = (user: User) => {
    setSelectedUser(user)
    setIsProgressModalOpen(true)
  }

  const handleViewCertificates = (user: User) => {
    setSelectedUser(user)
    setIsCertificatesModalOpen(true)
  }

  const handleExportData = () => {
    const csvData = [
      ["ID", "Nombre", "Email", "Estado", "Cursos Inscritos", "Completados", "Progreso %", "Certificados", "Fecha Registro"],
      ...filteredUsers.map(u => [
        u.id,
        u.name,
        u.email,
        u.status,
        u.enrolledCourses,
        u.completedCourses,
        u.progress,
        u.certificates,
        u.joinedDate
      ])
    ]

    const csvContent = csvData.map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `alumnos-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
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
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Gestión de Alumnos
              </h1>
              <p className="text-muted-foreground">
                Administra y monitorea todos los alumnos de la plataforma
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExportData}>
                <Download className="h-4 w-4" />
                Exportar
              </Button>
              <Button size="sm" className="gap-2" onClick={() => setIsNewUserModalOpen(true)}>
                <UserPlus className="h-4 w-4" />
                Nuevo Alumno
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Alumnos
                  </p>
                  <h3 className="text-3xl font-bold mt-2">{totalUsers}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +12% este mes
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Alumnos Activos
                  </p>
                  <h3 className="text-3xl font-bold mt-2">{activeUsers}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((activeUsers / totalUsers) * 100).toFixed(0)}% del total
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-full">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Inscripciones Totales
                  </p>
                  <h3 className="text-3xl font-bold mt-2">{totalEnrolled}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {totalCompleted} completadas
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-full">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Suspendidos
                  </p>
                  <h3 className="text-3xl font-bold mt-2">{suspendedUsers}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {inactiveUsers} inactivos
                  </p>
                </div>
                <div className="p-3 bg-red-500 rounded-full">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 border-0 bg-card/60 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                  <SelectItem value="suspended">Suspendidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Alumnos ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-center">Cursos</TableHead>
                    <TableHead className="text-center">Progreso</TableHead>
                    <TableHead className="text-center">Certificados</TableHead>
                    <TableHead>Última Actividad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-12 w-12 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            No se encontraron alumnos
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-semibold">
                              {user.enrolledCourses}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {user.completedCourses} completados
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm font-medium">
                              {user.progress}%
                            </span>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className={cn(
                                  "h-1.5 rounded-full",
                                  user.progress < 30
                                    ? "bg-red-500"
                                    : user.progress < 70
                                    ? "bg-orange-500"
                                    : "bg-green-500"
                                )}
                                style={{ width: `${user.progress}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Award className="h-4 w-4 text-yellow-600" />
                            <span className="font-semibold">{user.certificates}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {user.lastActivity}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleViewUser(user)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewCourses(user)}>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Ver Cursos
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewProgress(user)}>
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Ver Progreso
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewCertificates(user)}>
                                <Award className="h-4 w-4 mr-2" />
                                Ver Certificados
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(user)}
                              >
                                {user.status === "active" ? (
                                  <>
                                    <Ban className="h-4 w-4 mr-2" />
                                    Suspender
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Activar
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(user)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View User Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Alumno</DialogTitle>
              <DialogDescription>
                Información completa del alumno
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(selectedUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">
                      {selectedUser.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-medium">{selectedUser.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Teléfono
                          </p>
                          <p className="font-medium">
                            {selectedUser.phone || "No disponible"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Fecha de Registro
                          </p>
                          <p className="font-medium">{selectedUser.joinedDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Última Actividad
                          </p>
                          <p className="font-medium">
                            {selectedUser.lastActivity}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Estadísticas de Aprendizaje
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <BookOpen className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                        <p className="text-2xl font-bold">
                          {selectedUser.enrolledCourses}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cursos Inscritos
                        </p>
                      </div>
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                        <p className="text-2xl font-bold">
                          {selectedUser.completedCourses}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cursos Completados
                        </p>
                      </div>
                      <div className="text-center">
                        <Award className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                        <p className="text-2xl font-bold">
                          {selectedUser.certificates}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Certificados
                        </p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                        <p className="text-2xl font-bold">
                          {selectedUser.progress}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Progreso General
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Cerrar
              </Button>
              <Button onClick={() => handleEditUser(selectedUser!)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Alumno
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Alumno</DialogTitle>
              <DialogDescription>
                Modifica la información del alumno
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nombre Completo</Label>
                    <Input
                      id="edit-name"
                      defaultValue={selectedUser.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      defaultValue={selectedUser.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Teléfono</Label>
                    <Input
                      id="edit-phone"
                      defaultValue={selectedUser.phone}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Estado</Label>
                    <Select defaultValue={selectedUser.status}>
                      <SelectTrigger id="edit-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                        <SelectItem value="suspended">Suspendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)}>
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar Alumno</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. ¿Estás seguro de que deseas
                eliminar a este alumno?
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setUsers(users.filter((u) => u.id !== selectedUser?.id))
                  setIsDeleteModalOpen(false)
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Courses Modal */}
        <Dialog open={isCoursesModalOpen} onOpenChange={setIsCoursesModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Cursos del Alumno</DialogTitle>
              <DialogDescription>
                Cursos en los que está inscrito {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                    <CardContent className="pt-6">
                      <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                      <p className="text-2xl font-bold">{selectedUser.enrolledCourses}</p>
                      <p className="text-xs text-muted-foreground">Cursos Inscritos</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                    <CardContent className="pt-6">
                      <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-2xl font-bold">{selectedUser.completedCourses}</p>
                      <p className="text-xs text-muted-foreground">Completados</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, title: "Introducción a Sistemas Eléctricos", progress: 100, status: "completed" },
                    { id: 2, title: "Automatización Industrial con PLCs", progress: 75, status: "in_progress" },
                    { id: 3, title: "Instalaciones Fotovoltaicas", progress: 45, status: "in_progress" },
                    { id: 4, title: "Mantenimiento Preventivo", progress: 20, status: "in_progress" },
                    { id: 5, title: "Seguridad Eléctrica NOM", progress: 0, status: "not_started" },
                  ].slice(0, selectedUser.enrolledCourses).map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{course.title}</h4>
                          <Badge variant={course.status === "completed" ? "default" : "secondary"}>
                            {course.status === "completed" ? "Completado" :
                             course.status === "in_progress" ? "En Progreso" : "No Iniciado"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium min-w-[3rem] text-right">
                            {course.progress}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCoursesModalOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Progress Modal */}
        <Dialog open={isProgressModalOpen} onOpenChange={setIsProgressModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Progreso de Aprendizaje</DialogTitle>
              <DialogDescription>
                Análisis detallado del progreso de {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Progreso General</p>
                      <p className="text-5xl font-bold mb-4">{selectedUser.progress}%</p>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${selectedUser.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                      <p className="text-2xl font-bold">24h</p>
                      <p className="text-xs text-muted-foreground">Tiempo Total</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
                      <p className="text-2xl font-bold">+15%</p>
                      <p className="text-xs text-muted-foreground">Este Mes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Calendar className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-muted-foreground">Días Activo</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actividad Reciente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: "Hoy 10:30", action: "Completó lección: Fundamentos de Corriente Alterna" },
                        { date: "Ayer 15:45", action: "Subió tarea: Cálculo de Cargas Eléctricas" },
                        { date: "Hace 2 días", action: "Obtuvo certificado: Introducción a Sistemas Eléctricos" },
                        { date: "Hace 3 días", action: "Inició curso: Instalaciones Fotovoltaicas" },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsProgressModalOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Certificates Modal */}
        <Dialog open={isCertificatesModalOpen} onOpenChange={setIsCertificatesModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Certificados Obtenidos</DialogTitle>
              <DialogDescription>
                Certificados que ha obtenido {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
                  <CardContent className="pt-6 text-center">
                    <Award className="h-12 w-12 mx-auto text-yellow-600 mb-2" />
                    <p className="text-4xl font-bold mb-1">{selectedUser.certificates}</p>
                    <p className="text-sm text-muted-foreground">Certificados Totales</p>
                  </CardContent>
                </Card>

                {selectedUser.certificates > 0 ? (
                  <div className="grid gap-4">
                    {[
                      {
                        id: 1,
                        title: "Introducción a Sistemas Eléctricos",
                        date: "15 Ene 2024",
                        code: "CERT-2024-001",
                      },
                      {
                        id: 2,
                        title: "Seguridad en Instalaciones Eléctricas",
                        date: "22 Ene 2024",
                        code: "CERT-2024-002",
                      },
                      {
                        id: 3,
                        title: "Mantenimiento de Sistemas Industriales",
                        date: "05 Feb 2024",
                        code: "CERT-2024-003",
                      },
                      {
                        id: 4,
                        title: "Automatización y Control",
                        date: "18 Feb 2024",
                        code: "CERT-2024-004",
                      },
                    ].slice(0, selectedUser.certificates).map((cert) => (
                      <Card key={cert.id} className="border-2 border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                                <Award className="h-6 w-6 text-yellow-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{cert.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {cert.date}
                                  </span>
                                  <span className="font-mono text-xs">{cert.code}</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Este alumno aún no ha obtenido certificados
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCertificatesModalOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New User Modal */}
        <Dialog open={isNewUserModalOpen} onOpenChange={setIsNewUserModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Alumno</DialogTitle>
              <DialogDescription>
                Registra un nuevo alumno en la plataforma
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-name">Nombre Completo *</Label>
                  <Input id="new-name" placeholder="Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-email">Email *</Label>
                  <Input id="new-email" type="email" placeholder="juan@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-phone">Teléfono</Label>
                  <Input id="new-phone" placeholder="+52 123 456 7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-status">Estado</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="new-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-notes">Notas (opcional)</Label>
                <Textarea
                  id="new-notes"
                  placeholder="Información adicional sobre el alumno..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewUserModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                // Aquí iría la lógica para crear el usuario
                setIsNewUserModalOpen(false)
              }}>
                <UserPlus className="h-4 w-4 mr-2" />
                Crear Alumno
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}

export default function UsersPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <UsersContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
