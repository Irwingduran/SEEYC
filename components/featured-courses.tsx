"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Play } from "lucide-react"
import Link from "next/link"

const featuredCourses = [
  {
    id: 1,
    title: "Instalaciones Eléctricas Residenciales",
    description: "Aprende a diseñar e instalar sistemas eléctricos seguros para hogares y edificios residenciales.",
    image: "/electrical-residential-installation-course.jpg",
    instructor: "Ing. Carlos Mendoza",
    rating: 4.9,
    students: 1250,
    duration: "12 horas",
    price: "$89",
    level: "Intermedio",
    category: "Residencial",
  },
  {
    id: 2,
    title: "Sistemas de Control Industrial",
    description: "Domina los PLCs, variadores de frecuencia y sistemas de automatización industrial.",
    image: "/industrial-control-systems-plc-automation.jpg",
    instructor: "Ing. María González",
    rating: 4.8,
    students: 890,
    duration: "16 horas",
    price: "$129",
    level: "Avanzado",
    category: "Industrial",
  },
  {
    id: 3,
    title: "Energías Renovables y Paneles Solares",
    description: "Especialízate en la instalación y mantenimiento de sistemas fotovoltaicos.",
    image: "/images/renewable-energy-solar-panels.jpg",
    instructor: "Ing. Roberto Silva",
    rating: 4.7,
    students: 650,
    duration: "10 horas",
    price: "$99",
    level: "Intermedio",
    category: "Renovables",
  },
  {
    id: 4,
    title: "Seguridad Eléctrica y Normativas",
    description: "Conoce las normas de seguridad y prevención de riesgos en trabajos eléctricos.",
    image: "/electrical-safety-standards-workplace.jpg",
    instructor: "Ing. Ana Rodríguez",
    rating: 4.9,
    students: 1100,
    duration: "8 horas",
    price: "$69",
    level: "Básico",
    category: "Seguridad",
  },
]

export function FeaturedCourses() {
  return (
    <section className="py-24 bg-muted/30" aria-labelledby="featured-courses-heading">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            Cursos Destacados
          </Badge>
          <h2 id="featured-courses-heading" className="text-3xl lg:text-4xl font-bold text-balance">
            Cursos Más Populares
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Descubre nuestros cursos más demandados, diseñados por expertos de la industria eléctrica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card border-0"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={`Imagen del curso ${course.title}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">{course.level}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-balance leading-tight">{course.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{course.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">Por {course.instructor}</div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">{course.price}</div>
                <Button size="sm" asChild>
                  <Link href={`/courses/${course.id}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Inscribirse
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">Ver Todos los Cursos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
