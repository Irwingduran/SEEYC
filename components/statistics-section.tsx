"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Clock, Star, TrendingUp, Globe, Building } from "lucide-react"

const statistics = [
  {
    icon: Users,
    value: "2,500+",
    label: "Estudiantes Activos",
    description: "Profesionales capacitándose actualmente",
    color: "text-chart-1",
  },
  {
    icon: BookOpen,
    value: "150+",
    label: "Cursos Disponibles",
    description: "En todas las especialidades eléctricas",
    color: "text-chart-2",
  },
  {
    icon: Award,
    value: "50+",
    label: "Certificaciones",
    description: "Reconocidas por la industria",
    color: "text-chart-3",
  },
  {
    icon: Clock,
    value: "1,200+",
    label: "Horas de Contenido",
    description: "Videos, simuladores y ejercicios",
    color: "text-chart-4",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Calificación Promedio",
    description: "Basada en más de 1,500 reseñas",
    color: "text-chart-5",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Tasa de Finalización",
    description: "De estudiantes que completan cursos",
    color: "text-chart-1",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Países",
    description: "Con estudiantes registrados",
    color: "text-chart-2",
  },
  {
    icon: Building,
    value: "500+",
    label: "Empresas",
    description: "Confían en nuestra capacitación",
    color: "text-chart-3",
  },
]

const achievements = [
  {
    title: "Plataforma Líder",
    description: "Reconocida como la mejor plataforma de capacitación eléctrica en Latinoamérica",
    year: "2024",
  },
  {
    title: "Certificación ISO",
    description: "Certificados bajo estándares internacionales de calidad educativa",
    year: "2023",
  },
  {
    title: "Alianzas Estratégicas",
    description: "Partnerships con las principales empresas del sector eléctrico",
    year: "2023",
  },
]

export function StatisticsSection() {
  return (
    <section className="py-24 bg-muted/30" aria-labelledby="statistics-heading">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            Nuestros Números
          </Badge>
          <h2 id="statistics-heading" className="text-3xl lg:text-4xl font-bold text-balance">
            Resultados que Hablan por Sí Solos
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Más de 5 años formando a los mejores profesionales eléctricos de la región.
          </p>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.05] bg-card border-0 text-center"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground text-pretty">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Reconocimientos y Logros</h3>
            <p className="text-muted-foreground">Avalados por las principales organizaciones del sector</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-card border-0 text-center">
                <CardContent className="p-6 space-y-3">
                  <Badge className="bg-primary text-primary-foreground">{achievement.year}</Badge>
                  <h4 className="text-lg font-semibold text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground text-pretty">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
