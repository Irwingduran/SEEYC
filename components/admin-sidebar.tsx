"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/contexts/sidebar-context"
import {
  Shield,
  Users,
  BookOpen,
  DollarSign,
  Brain,
  Settings,
  GraduationCap,
  Search,
  Bell,
  User,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Zap,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Upload,
  BarChart3,
  Video,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useState } from "react"

// Secciones de navegación agrupadas
const navigationSections = [
  {
    title: "General",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      { icon: BarChart3, label: "Analíticas", href: "/admin/analytics" },
    ],
  },
  {
    title: "Plataforma",
    items: [
      { icon: Users, label: "Usuarios", href: "/admin/users" },
      { icon: BookOpen, label: "Contenido", href: "/admin/content" },
      { icon: DollarSign, label: "Finanzas", href: "/admin/financial" },
      { icon: Settings, label: "Configuración", href: "/admin/settings" },
    ],
  },
  {
    title: "Instructor",
    items: [
      { icon: GraduationCap, label: "Mis Cursos", href: "/admin/courses" },
      { icon: Upload, label: "Crear Curso", href: "/admin/courses/create" },
      { icon: FileText, label: "Recursos", href: "/admin/resources" },
    ],
  },
]

export function AdminSidebar() {
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const notifications = [
    { id: 1, title: "Nuevo usuario registrado", message: "Juan Pérez se registró", read: false, time: "1h" },
    { id: 2, title: "Curso publicado", message: "Automatización Industrial está activo", read: false, time: "3h" },
    { id: 3, title: "Pago recibido", message: "Nuevo pago de $250", read: true, time: "1d" },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-background border-r transition-all duration-300 ease-in-out overflow-hidden",
          isCollapsed ? "w-16" : "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className={cn("p-4 border-b", isCollapsed && "p-2")}>
            <div className="flex items-center justify-between">
              {!isCollapsed ? (
                <>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm leading-tight">Admin Panel</span>
                      <span className="text-xs text-muted-foreground leading-tight">Gestión Total</span>
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleCollapse} className="h-8 w-8 hidden lg:flex">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCollapse}
                  className="h-8 w-8 mx-auto hidden lg:flex"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Search Bar */}
            {!isCollapsed && (
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9 text-sm bg-muted/50 border-0"
                />
              </div>
            )}
          </div>

          {/* User Profile Section */}
          <div className={cn("p-4 border-b", isCollapsed && "p-2")}>
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/admin-avatar.jpg" alt="María González" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    MG
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">María González</p>
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="text-xs h-4 px-1">
                      Admin
                    </Badge>
                    <Badge variant="outline" className="text-xs h-4 px-1">
                      Instructor
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/profile">
                        <User className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 mx-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.jpg" alt="María González" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs">
                        MG
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">María González</p>
                      <div className="flex gap-1">
                        <Badge variant="secondary" className="text-xs h-4">
                          Admin
                        </Badge>
                        <Badge variant="outline" className="text-xs h-4">
                          Instructor
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile">
                      <User className="mr-2 h-4 w-4" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Navigation & Actions */}
          <div className="flex-1 overflow-y-auto">
            <div className={cn("p-3", isCollapsed && "p-2")}>
              {/* Quick Actions */}
              {!isCollapsed && (
                <div className="flex items-center gap-2 mb-4">
                  {/* Theme Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex-1 h-9"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="ml-2 text-xs">Tema</span>
                  </Button>

                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="relative h-9 px-3">
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="right" className="w-80">
                      <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                            <div className="flex items-center justify-between w-full">
                              <span className={`font-medium text-sm ${!notification.read ? "text-primary" : ""}`}>
                                {notification.title}
                              </span>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">{notification.message}</span>
                            {!notification.read && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {isCollapsed && (
                <div className="flex flex-col gap-2 mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="h-10 w-10 mx-auto"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative h-10 w-10 mx-auto">
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="right" className="w-80">
                      <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                            <div className="flex items-center justify-between w-full">
                              <span className={`font-medium text-sm ${!notification.read ? "text-primary" : ""}`}>
                                {notification.title}
                              </span>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">{notification.message}</span>
                            {!notification.read && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <Separator className="my-3" />

              {/* Navigation Items by Section */}
              {navigationSections.map((section) => (
                <div key={section.title} className="mb-4">
                  {!isCollapsed && (
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                      {section.title}
                    </h3>
                  )}
                  <nav className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Button
                          key={item.href}
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start",
                            isCollapsed ? "h-10 w-10 p-0 mx-auto" : "h-9"
                          )}
                          size="sm"
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                            {!isCollapsed && <span className="text-sm">{item.label}</span>}
                          </Link>
                        </Button>
                      )
                    })}
                  </nav>
                  {!isCollapsed && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleMobile} />
      )}
    </>
  )
}
