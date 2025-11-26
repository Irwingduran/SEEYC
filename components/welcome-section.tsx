"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, TrendingUp, Award } from "lucide-react"
import { useEffect, useState } from "react"
import { getUserProfile, getEnrolledCourses } from "@/lib/user-service"

export function WelcomeSection() {
  const [userName, setUserName] = useState("Estudiante")
  const [stats, setStats] = useState([
    {
      icon: Clock,
      label: "Tiempo de Estudio Hoy",
      value: "0h 0m",
      change: "Sin actividad",
      color: "text-blue-600",
    },
    {
      icon: Target,
      label: "Objetivo Semanal",
      value: "0%",
      change: "0h de 10h",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      label: "Racha de Estudio",
      value: "0 días",
      change: "¡Sigue así!",
      color: "text-purple-600",
    },
    {
      icon: Award,
      label: "Próximo Certificado",
      value: "0%",
      change: "Ninguno",
      color: "text-orange-600",
    },
  ])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profile, courses] = await Promise.all([
          getUserProfile(),
          getEnrolledCourses()
        ])

        setUserName(profile.name.split(" ")[0]) // First name

        // Calculate "Next Certificate" (highest progress course not yet completed)
        const activeCourses = courses.filter(c => c.status === 'active')
        const nextCertCourse = activeCourses.sort((a, b) => b.progress - a.progress)[0]
        
        setStats([
          {
            icon: Clock,
            label: "Tiempo Total",
            value: `${profile.totalHours}h`,
            change: "Acumulado",
            color: "text-blue-600",
          },
          {
            icon: Target,
            label: "Cursos Completados",
            value: profile.coursesCompleted.toString(),
            change: "Total",
            color: "text-green-600",
          },
          {
            icon: TrendingUp,
            label: "Racha de Estudio",
            value: `${profile.currentStreak} días`,
            change: "¡Sigue así!",
            color: "text-purple-600",
          },
          {
            icon: Award,
            label: "Próximo Certificado",
            value: nextCertCourse ? `${nextCertCourse.progress}%` : "N/A",
            change: nextCertCourse ? nextCertCourse.title : "Inscríbete a un curso",
            color: "text-orange-600",
          },
        ])
      } catch (error) {
        console.error("Failed to load welcome stats", error)
      }
    }
    loadData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-balance">
              ¡Bienvenido de vuelta, <span className="text-primary">{userName}</span>!
            </h2>
            <p className="text-muted-foreground mt-2">Continúa tu formación en sistemas eléctricos especializados</p>
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
                <Badge variant="outline" className="text-xs truncate max-w-[120px]">
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
