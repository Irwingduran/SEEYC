"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"

const upcomingDeadlines = [
  {
    id: 1,
    title: "Examen Final - Seguridad Eléctrica",
    course: "Seguridad Eléctrica Industrial",
    date: "2024-01-15",
    time: "14:00",
    type: "exam",
    priority: "high",
    daysLeft: 2,
  },
  {
    id: 2,
    title: "Entrega de Proyecto - Sistema PLC",
    course: "Automatización Industrial",
    date: "2024-01-18",
    time: "23:59",
    type: "assignment",
    priority: "medium",
    daysLeft: 5,
  },
  {
    id: 3,
    title: "Quiz - Cálculos Solares",
    course: "Instalaciones Solares",
    date: "2024-01-20",
    time: "10:00",
    type: "quiz",
    priority: "low",
    daysLeft: 7,
  },
  {
    id: 4,
    title: "Certificación - Motores Industriales",
    course: "Motores Eléctricos",
    date: "2024-01-25",
    time: "16:00",
    type: "certification",
    priority: "high",
    daysLeft: 12,
  },
]

const priorityColors = {
  high: "text-red-600 bg-red-50 border-red-200",
  medium: "text-orange-600 bg-orange-50 border-orange-200",
  low: "text-green-600 bg-green-50 border-green-200",
}

const typeIcons = {
  exam: AlertTriangle,
  assignment: Calendar,
  quiz: CheckCircle,
  certification: CheckCircle,
}

export function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Próximas Fechas Límite
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingDeadlines.map((deadline) => {
            const Icon = typeIcons[deadline.type]
            return (
              <div key={deadline.id} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <div className={`p-2 rounded-full ${priorityColors[deadline.priority]}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{deadline.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{deadline.course}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {deadline.date}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {deadline.time}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant={deadline.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                    {deadline.daysLeft} días
                  </Badge>
                  <Button variant="ghost" size="sm" className="mt-1 h-6 text-xs">
                    Ver
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          Ver Calendario Completo
        </Button>
      </CardContent>
    </Card>
  )
}
