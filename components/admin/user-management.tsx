"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  Search,
  Download,
  Mail,
  UserCheck,
  UserX,
  MoreHorizontal,
  Eye,
  Edit,
  Shield,
  Crown,
  User,
  GraduationCap,
  TrendingUp,
} from "lucide-react"

// Mock user data
const users = [
  {
    id: 1,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    role: "student",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-03-10",
    coursesEnrolled: 5,
    coursesCompleted: 3,
    totalSpent: 4500,
    location: "Ciudad de México",
  },
  {
    id: 2,
    name: "Ana García",
    email: "ana.garcia@email.com",
    role: "instructor",
    status: "active",
    joinDate: "2023-08-20",
    lastActive: "2024-03-11",
    coursesEnrolled: 0,
    coursesCompleted: 0,
    totalSpent: 0,
    location: "Guadalajara",
  },
  {
    id: 3,
    name: "Miguel Torres",
    email: "miguel.torres@email.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-02-01",
    lastActive: "2024-02-28",
    coursesEnrolled: 2,
    coursesCompleted: 0,
    totalSpent: 1200,
    location: "Monterrey",
  },
  {
    id: 4,
    name: "Laura Jiménez",
    email: "laura.jimenez@email.com",
    role: "admin",
    status: "active",
    joinDate: "2023-05-10",
    lastActive: "2024-03-11",
    coursesEnrolled: 0,
    coursesCompleted: 0,
    totalSpent: 0,
    location: "Puebla",
  },
  {
    id: 5,
    name: "Roberto Silva",
    email: "roberto.silva@email.com",
    role: "student",
    status: "active",
    joinDate: "2023-12-05",
    lastActive: "2024-03-09",
    coursesEnrolled: 8,
    coursesCompleted: 6,
    totalSpent: 7800,
    location: "Tijuana",
  },
]

const userAnalytics = [
  { month: "Oct", newUsers: 245, activeUsers: 1890 },
  { month: "Nov", newUsers: 312, activeUsers: 2150 },
  { month: "Dec", newUsers: 189, activeUsers: 2080 },
  { month: "Ene", newUsers: 456, activeUsers: 2340 },
  { month: "Feb", newUsers: 398, activeUsers: 2520 },
  { month: "Mar", newUsers: 523, activeUsers: 2780 },
]

const roleDistribution = [
  { role: "Estudiantes", count: 14250, color: "#8b5cf6" },
  { role: "Instructores", count: 1420, color: "#3b82f6" },
  { role: "Administradores", count: 177, color: "#10b981" },
]

export function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showBulkActions, setShowBulkActions] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((user) => user.id))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-600" />
      case "instructor":
        return <GraduationCap className="h-4 w-4 text-blue-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-yellow-100 text-yellow-800",
      instructor: "bg-blue-100 text-blue-800",
      student: "bg-gray-100 text-gray-800",
    }
    return variants[role as keyof typeof variants] || variants.student
  }

  return (
    <div className="space-y-6">
      {/* User Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,847</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +523 este mes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,934</div>
            <div className="text-xs text-gray-600">56.4% del total</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Usuarios</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">523</div>
            <div className="text-xs text-gray-600">Este mes</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
            <CardDescription>Nuevos usuarios vs usuarios activos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                  name="Usuarios Activos"
                />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stackId="2"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Nuevos Usuarios"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle>Distribución por Roles</CardTitle>
            <CardDescription>Usuarios por tipo de cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="role" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Management Interface */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administra usuarios, roles y permisos</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              {selectedUsers.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Acciones ({selectedUsers.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Acciones en Lote</DialogTitle>
                      <DialogDescription>
                        Aplicar acciones a {selectedUsers.length} usuarios seleccionados
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start bg-transparent">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Activar
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <UserX className="h-4 w-4 mr-2" />
                          Desactivar
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Email
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <Shield className="h-4 w-4 mr-2" />
                          Cambiar Rol
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="student">Estudiantes</SelectItem>
                <SelectItem value="instructor">Instructores</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Table */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="p-3 text-left">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-3 text-left font-medium">Usuario</th>
                    <th className="p-3 text-left font-medium">Rol</th>
                    <th className="p-3 text-left font-medium">Estado</th>
                    <th className="p-3 text-left font-medium">Cursos</th>
                    <th className="p-3 text-left font-medium">Gasto Total</th>
                    <th className="p-3 text-left font-medium">Última Actividad</th>
                    <th className="p-3 text-left font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50/30">
                      <td className="p-3">
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          <div className="text-xs text-gray-500">{user.location}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <Badge className={getRoleBadge(user.role)}>
                            {user.role === "admin" ? "Admin" : user.role === "instructor" ? "Instructor" : "Estudiante"}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div>{user.coursesEnrolled} inscritos</div>
                          <div className="text-gray-600">{user.coursesCompleted} completados</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">${user.totalSpent.toLocaleString()} MXN</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm text-gray-600">{user.lastActive}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
