"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/contexts/sidebar-context"
import { logout } from "@/lib/actions"
import {
  BookOpen,
  BarChart3,
  Home,
  Users,
  Settings,
  Clock,
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
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Mis Cursos", href: "/dashboard/courses" },
  { icon: BarChart3, label: "Progreso", href: "/dashboard/progress" },
  { icon: Users, label: "Comunidad", href: "/dashboard/community" },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const notifications = [
    { id: 1, title: "Nuevo curso disponible", message: "Instalaciones Solares Avanzadas", read: false, time: "2h" },
    { id: 2, title: "Certificado listo", message: "Automatización Industrial completado", read: false, time: "1d" },
    { id: 3, title: "Recordatorio", message: "Examen de Seguridad Eléctrica mañana", read: true, time: "2d" },
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
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm leading-tight">Eléctricos</span>
                      <span className="text-xs text-muted-foreground leading-tight">Especializados</span>
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
                  <AvatarImage src="/user-avatar.jpg" alt="Carlos Rodríguez" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                    CR
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Carlos Rodríguez</p>
                  <p className="text-xs text-muted-foreground truncate">carlos@email.com</p>
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
                      <Link href="/dashboard/profile">
                        <User className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
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
                      <AvatarImage src="/user-avatar.jpg" alt="Carlos Rodríguez" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-xs">
                        CR
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Carlos Rodríguez</p>
                      <p className="text-xs text-muted-foreground">carlos@email.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
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

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navigationItems.map((item) => {
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

              {/* Stats Section - Only when expanded */}
              {!isCollapsed && (
                <>
                  <Separator className="my-4" />

                  <Card className="border-0 bg-muted/50">
                    <CardHeader className="pb-2 pt-3 px-3">
                      <CardTitle className="text-xs font-medium">Progreso General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-3 px-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">Cursos</span>
                          <span className="font-medium">3/8</span>
                        </div>
                        <Progress value={37.5} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">Horas</span>
                          <span className="font-medium">45h</span>
                        </div>
                        <Progress value={75} className="h-1.5" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-3 border-0 bg-muted/50">
                    <CardHeader className="pb-2 pt-3 px-3">
                      <CardTitle className="text-xs font-medium">Stats Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pb-3 px-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs">Horas</span>
                        </div>
                        <Badge variant="secondary" className="text-xs h-5">
                          45h
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs">Certificados</span>
                        </div>
                        <Badge variant="secondary" className="text-xs h-5">
                          3
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <BarChart3 className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs">Racha</span>
                        </div>
                        <Badge variant="secondary" className="text-xs h-5">
                          7d
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
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
