"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Play, CheckCircle, BookOpen, Trophy } from "lucide-react"

const activities = [
  {
    type: "lesson_completed",
    title: "Completaste: Conexión de Protecciones",
    course: "Instalaciones Residenciales",
    time: "Hace 2 horas",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    type: "course_started",
    title: "Iniciaste: Uso de EPP",
    course: "Seguridad Eléctrica",
    time: "Ayer",
    icon: Play,
    color: "text-blue-500",
  },
  {
    type: "quiz_passed",
    title: "Aprobaste el examen del Módulo 2",
    course: "Instalaciones Residenciales",
    time: "Hace 3 días",
    icon: BookOpen,
    color: "text-purple-500",
  },
  {
    type: "milestone",
    title: "Alcanzaste 75% de progreso",
    course: "Instalaciones Residenciales",
    time: "Hace 1 semana",
    icon: Trophy,
    color: "text-orange-500",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Actividad Reciente</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
            <div className={`p-1.5 rounded-lg bg-muted/50 ${activity.color}`}>
              <activity.icon className="h-3 w-3" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.course}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
