"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Users } from "lucide-react"
import Link from "next/link"

const instructors = [
  {
    id: 1,
    name: "Ing. Carlos Mendoza",
    title: "Especialista en Instalaciones Residenciales",
    image: "/professional-electrical-engineer-instructor.jpg",
    rating: 4.9,
    students: 3200,
    courses: 12,
    experience: "15+ años",
    specialties: ["Instalaciones Residenciales", "Códigos Eléctricos", "Seguridad"],
    bio: "Ingeniero eléctrico con más de 15 años de experiencia en proyectos residenciales y comerciales.",
  },
  {
    id: 2,
    name: "Ing. María González",
    title: "Experta en Automatización Industrial",
    image: "/female-electrical-engineer-industrial-automation.jpg",
    rating: 4.8,
    students: 2800,
    courses: 8,
    experience: "12+ años",
    specialties: ["PLCs", "Variadores", "Automatización"],
    bio: "Especialista en sistemas de control industrial con certificaciones internacionales en Siemens y Allen-Bradley.",
  },
  {
    id: 3,
    name: "Ing. Roberto Silva",
    title: "Especialista en Energías Renovables",
    image: "/electrical-engineer-solar-energy-renewable.jpg",
    rating: 4.7,
    students: 1900,
    courses: 6,
    experience: "10+ años",
    specialties: ["Energía Solar", "Sistemas Fotovoltaicos", "Eficiencia Energética"],
    bio: "Pionero en energías renovables con múltiples proyectos de instalación solar a gran escala.",
  },
  {
    id: 4,
    name: "Ing. Ana Rodríguez",
    title: "Experta en Seguridad Eléctrica",
    image: "/female-electrical-safety-engineer-instructor.jpg",
    rating: 4.9,
    students: 2500,
    courses: 10,
    experience: "18+ años",
    specialties: ["Seguridad Industrial", "Normativas", "Prevención de Riesgos"],
    bio: "Consultora en seguridad eléctrica con experiencia en auditorías y capacitación empresarial.",
  },
]

export function InstructorsHighlight() {
  return (
    <section className="py-24 bg-background" aria-labelledby="instructors-heading">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            Nuestros Expertos
          </Badge>
          <h2 id="instructors-heading" className="text-3xl lg:text-4xl font-bold text-balance">
            Aprende de los Mejores
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Nuestros instructores son profesionales activos con años de experiencia en la industria eléctrica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {instructors.map((instructor) => (
            <Card
              key={instructor.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card border-0 text-center"
            >
              <CardContent className="p-6 space-y-4">
                <div className="relative">
                  <img
                    src={instructor.image || "/placeholder.svg"}
                    alt={`Foto de ${instructor.name}`}
                    className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs">{instructor.experience}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-balance">{instructor.name}</h3>
                  <p className="text-sm text-primary font-medium">{instructor.title}</p>
                  <p className="text-sm text-muted-foreground text-pretty">{instructor.bio}</p>
                </div>

                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{instructor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{instructor.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{instructor.courses}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">Especialidades:</div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/instructors">Ver Todos los Instructores</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
