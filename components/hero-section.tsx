"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Users, Award, Clock, Zap, Shield, BookOpen } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Estudiantes Activos", value: "2,500+", icon: Users },
  { label: "Cursos Disponibles", value: "150+", icon: BookOpen },
  { label: "Certificaciones", value: "50+", icon: Award },
  { label: "Horas de Contenido", value: "1,200+", icon: Clock },
]

const features = [
  {
    icon: Zap,
    title: "Capacitación Especializada",
    description: "Cursos diseñados por expertos en sistemas eléctricos industriales y residenciales.",
  },
  {
    icon: Shield,
    title: "Certificación Oficial",
    description: "Obtén certificaciones reconocidas por la industria eléctrica nacional.",
  },
  {
    icon: Play,
    title: "Aprendizaje Interactivo",
    description: "Videos HD, simuladores y ejercicios prácticos para un aprendizaje efectivo.",
  },
]

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
      aria-labelledby="hero-heading"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-grid-small-black/[0.2] bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.2]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-background/80 to-background"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Zap className="h-3 w-3 mr-1" aria-hidden="true" />
                Plataforma Líder en Capacitación Eléctrica
              </Badge>

              <h1 id="hero-heading" className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                <span className="text-primary">Eléctricos</span> <span className="text-foreground">Especializados</span>
                <br />
                <span className="text-muted-foreground text-2xl lg:text-4xl">y Capacitación</span>
              </h1>

              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Domina las técnicas más avanzadas en sistemas eléctricos con nuestros cursos especializados. Desde
                instalaciones residenciales hasta sistemas industriales complejos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                <Play className="h-5 w-5 mr-2" aria-hidden="true" />
                Comenzar Ahora
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/courses">Ver Cursos</Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              role="region"
              aria-label="Estadísticas de la plataforma"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <stat.icon className="h-6 w-6 mx-auto text-primary" aria-hidden="true" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Cards */}
          <div className="space-y-6" role="region" aria-label="Características principales">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-pretty">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
