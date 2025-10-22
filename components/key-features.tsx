"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Play, Award, Clock, Users, BookOpen, Smartphone, HeadphonesIcon } from "lucide-react"

const keyFeatures = [
  {
    icon: Zap,
    title: "Capacitación Especializada",
    description:
      "Cursos diseñados específicamente para profesionales eléctricos con contenido actualizado según las últimas normativas.",
    benefits: ["Contenido actualizado", "Casos reales", "Normativas vigentes"],
  },
  {
    icon: Shield,
    title: "Certificación Oficial",
    description: "Obtén certificaciones reconocidas por la industria eléctrica nacional e internacional.",
    benefits: ["Reconocimiento oficial", "Validez internacional", "Mejora profesional"],
  },
  {
    icon: Play,
    title: "Aprendizaje Interactivo",
    description: "Videos en alta definición, simuladores 3D y ejercicios prácticos para un aprendizaje efectivo.",
    benefits: ["Videos HD", "Simuladores 3D", "Ejercicios prácticos"],
  },
  {
    icon: Award,
    title: "Instructores Expertos",
    description: "Aprende de profesionales activos con años de experiencia en proyectos reales de la industria.",
    benefits: ["Experiencia real", "Casos de estudio", "Mentorías personalizadas"],
  },
  {
    icon: Clock,
    title: "Horarios Flexibles",
    description: "Estudia a tu propio ritmo con acceso 24/7 a todo el contenido desde cualquier dispositivo.",
    benefits: ["Acceso 24/7", "Tu propio ritmo", "Multiplataforma"],
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Únete a una comunidad de más de 2,500 profesionales eléctricos para networking y colaboración.",
    benefits: ["Networking", "Foros de discusión", "Grupos de estudio"],
  },
  {
    icon: BookOpen,
    title: "Recursos Descargables",
    description: "Accede a manuales, diagramas, plantillas y herramientas que podrás usar en tus proyectos.",
    benefits: ["Manuales técnicos", "Plantillas", "Herramientas"],
  },
  {
    icon: Smartphone,
    title: "App Móvil",
    description: "Lleva tu aprendizaje contigo con nuestra aplicación móvil disponible para iOS y Android.",
    benefits: ["Descarga offline", "Sincronización", "Notificaciones"],
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7",
    description: "Recibe ayuda técnica y académica cuando la necesites con nuestro equipo de soporte especializado.",
    benefits: ["Chat en vivo", "Email support", "Tutorías"],
  },
]

export function KeyFeatures() {
  return (
    <section className="py-24 bg-muted/30" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            ¿Por Qué Elegirnos?
          </Badge>
          <h2 id="features-heading" className="text-3xl lg:text-4xl font-bold text-balance">
            Características que nos Distinguen
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Descubre todas las ventajas que hacen de nuestra plataforma la mejor opción para tu desarrollo profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {keyFeatures.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card border-0"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-pretty text-sm">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Incluye:</div>
                  <div className="flex flex-wrap gap-1">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <Badge key={benefitIndex} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
