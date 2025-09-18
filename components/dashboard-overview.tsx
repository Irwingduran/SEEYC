"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Award, TrendingUp, Target } from "lucide-react"

const overviewStats = [
  {
    title: "Cursos Activos",
    value: "3",
    change: "+1 este mes",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    title: "Horas Completadas",
    value: "24.5",
    change: "+8.2 esta semana",
    icon: Clock,
    color: "text-green-600",
  },
  {
    title: "Certificados",
    value: "2",
    change: "+1 este mes",
    icon: Award,
    color: "text-purple-600",
  },
  {
    title: "Progreso General",
    value: "68%",
    change: "+12% este mes",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const currentGoals = [
  {
    title: "Completar Instalaciones Residenciales",
    progress: 75,
    target: "Finalizar antes del 15 de enero",
    priority: "high",
  },
  {
    title: "Obtener Certificación en Seguridad",
    progress: 45,
    target: "Meta: Febrero 2025",
    priority: "medium",
  },
  {
    title: "Dominar Automatización Industrial",
    progress: 20,
    target: "Objetivo a largo plazo",
    priority: "low",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Goals */}
      <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Objetivos de Aprendizaje</span>
            </CardTitle>
            <Badge variant="secondary">3 activos</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentGoals.map((goal, index) => (
            <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground">{goal.target}</p>
                </div>
                <Badge
                  variant={
                    goal.priority === "high" ? "destructive" : goal.priority === "medium" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {goal.priority === "high" ? "Alta" : goal.priority === "medium" ? "Media" : "Baja"}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progreso</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
