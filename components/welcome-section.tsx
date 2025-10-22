"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, TrendingUp, Award } from "lucide-react"

export function WelcomeSection() {
  const stats = [
    {
      icon: Clock,
      label: "Tiempo de Estudio Hoy",
      value: "2h 30m",
      change: "+15m vs ayer",
      color: "text-blue-600",
    },
    {
      icon: Target,
      label: "Objetivo Semanal",
      value: "85%",
      change: "17h de 20h",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      label: "Racha de Estudio",
      value: "7 días",
      change: "¡Nuevo récord!",
      color: "text-purple-600",
    },
    {
      icon: Award,
      label: "Próximo Certificado",
      value: "92%",
      change: "Automatización Industrial",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-balance">
              ¡Bienvenido de vuelta, <span className="text-primary">Carlos</span>!
            </h2>
            <p className="text-muted-foreground mt-2">Continúa tu formación en sistemas eléctricos especializados</p>
          </div>
          <div className="hidden sm:block">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Nivel: Intermedio
            </Badge>
          </div>
        </div>
      </div>

      {/* Personal Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <Badge variant="outline" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
