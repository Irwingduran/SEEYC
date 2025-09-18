"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Clock, Flame, Target } from "lucide-react"

const stats = [
  {
    title: "Racha Actual",
    value: "7 días",
    icon: Flame,
    color: "text-orange-500",
    description: "¡Sigue así!",
  },
  {
    title: "Tiempo Promedio",
    value: "2.1h",
    icon: Clock,
    color: "text-blue-500",
    description: "Por día",
  },
  {
    title: "Meta Semanal",
    value: "85%",
    icon: Target,
    color: "text-green-500",
    description: "12/14 horas",
  },
]

export function LearningStats() {
  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>Estadísticas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
            <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
