"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Flame, Shield } from "lucide-react"

const achievements = [
  {
    title: "Primera Certificación",
    description: "Completaste tu primer curso",
    icon: Award,
    earned: true,
    date: "Hace 2 semanas",
  },
  {
    title: "Estudiante Dedicado",
    description: "7 días consecutivos estudiando",
    icon: Flame,
    earned: true,
    date: "Hoy",
  },
  {
    title: "Experto en Seguridad",
    description: "Domina la seguridad eléctrica",
    icon: Shield,
    earned: false,
    progress: 65,
  },
  {
    title: "Maestro Electricista",
    description: "Completa 10 cursos",
    icon: Trophy,
    earned: false,
    progress: 30,
  },
]

export function Achievements() {
  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span>Logros</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg transition-all ${
              achievement.earned ? "bg-primary/10 border border-primary/20" : "bg-muted/30 opacity-60"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <achievement.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.earned ? (
                  <Badge variant="secondary" className="text-xs">
                    {achievement.date}
                  </Badge>
                ) : (
                  <div className="text-xs text-muted-foreground">Progreso: {achievement.progress}%</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
