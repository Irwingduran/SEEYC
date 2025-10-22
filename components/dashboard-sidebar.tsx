"use client"

import { useState } from "react"
import { BookOpen, Trophy, Calendar, BarChart3, HelpCircle, Menu, X, Home, Users, Settings, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/learning", active: true },
  { icon: BookOpen, label: "Mis Cursos", href: "/learning/courses" },
  { icon: Trophy, label: "Logros", href: "/learning/achievements" },
  { icon: Calendar, label: "Calendario", href: "/learning/calendar" },
  { icon: BarChart3, label: "Progreso", href: "/learning/progress" },
  { icon: Users, label: "Comunidad", href: "/learning/community" },
  { icon: Settings, label: "Configuración", href: "/learning/settings" },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 transform bg-background border-r transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-auto",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex flex-col h-full p-4 pt-20 lg:pt-4">
          {/* Navigation */}
          <nav className="space-y-2 mb-6">
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </a>
              </Button>
            ))}
          </nav>

          {/* Progress Overview */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Progreso General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Cursos Completados</span>
                  <span>3/8</span>
                </div>
                <Progress value={37.5} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Horas de Estudio</span>
                  <span>45h</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Estadísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Horas Aprendidas</span>
                </div>
                <Badge variant="secondary">45h</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm">Certificados</span>
                </div>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Racha Actual</span>
                </div>
                <Badge variant="secondary">7 días</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Support Link */}
          <Card className="mt-auto">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="/support">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Centro de Ayuda
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsCollapsed(true)} />
      )}
    </>
  )
}
