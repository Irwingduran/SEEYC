"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Miguel Hernández",
    title: "Electricista Industrial",
    company: "Industrias del Norte S.A.",
    image: "/professional-electrician-testimonial.jpg",
    rating: 5,
    text: "Los cursos de automatización industrial me ayudaron a conseguir una promoción en mi empresa. El contenido es muy práctico y aplicable al trabajo diario.",
    course: "Sistemas de Control Industrial",
    beforeAfter: "Aumenté mi salario en un 40% después de completar el curso",
  },
  {
    id: 2,
    name: "Carmen López",
    title: "Ingeniera Eléctrica",
    company: "Consultora Eléctrica Moderna",
    image: "/female-electrical-engineer-testimonial.jpg",
    rating: 5,
    text: "La calidad de los instructores es excepcional. Aprendí técnicas que no había visto en la universidad y que uso constantemente en mis proyectos.",
    course: "Instalaciones Eléctricas Residenciales",
    beforeAfter: "Ahora lidero proyectos de mayor complejidad",
  },
  {
    id: 3,
    name: "José Ramírez",
    title: "Técnico en Energías Renovables",
    company: "Solar Tech Solutions",
    image: "/solar-technician-testimonial.jpg",
    rating: 5,
    text: "El curso de paneles solares me abrió las puertas a un sector en crecimiento. Ahora trabajo en una empresa líder en energías renovables.",
    course: "Energías Renovables y Paneles Solares",
    beforeAfter: "Cambié de carrera y encontré mi pasión",
  },
  {
    id: 4,
    name: "Ana Martínez",
    title: "Supervisora de Seguridad",
    company: "Construcciones Seguras Ltda.",
    image: "/female-safety-supervisor-testimonial.jpg",
    rating: 5,
    text: "Los conocimientos de seguridad eléctrica que adquirí me permitieron implementar protocolos que redujeron los accidentes en un 80%.",
    course: "Seguridad Eléctrica y Normativas",
    beforeAfter: "Implementé protocolos que salvaron vidas",
  },
  {
    id: 5,
    name: "Roberto Díaz",
    title: "Electricista Residencial",
    company: "Instalaciones Díaz & Asociados",
    image: "/residential-electrician-testimonial.jpg",
    rating: 5,
    text: "Después de 10 años en el oficio, estos cursos me enseñaron nuevas técnicas que mejoraron la calidad de mi trabajo y la satisfacción de mis clientes.",
    course: "Instalaciones Eléctricas Residenciales",
    beforeAfter: "Mis clientes ahora me recomiendan constantemente",
  },
  {
    id: 6,
    name: "Patricia Vega",
    title: "Ingeniera de Proyectos",
    company: "Megaproyectos Industriales",
    image: "/female-project-engineer-testimonial.jpg",
    rating: 5,
    text: "La plataforma es muy intuitiva y el contenido está muy bien estructurado. Pude estudiar mientras trabajaba sin problemas.",
    course: "Sistemas de Control Industrial",
    beforeAfter: "Completé mi especialización sin dejar de trabajar",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage,
    (currentIndex + 1) * testimonialsPerPage,
  )

  return (
    <section className="py-24 bg-background" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="w-fit mx-auto">
            Testimonios
          </Badge>
          <h2 id="testimonials-heading" className="text-3xl lg:text-4xl font-bold text-balance">
            Lo que Dicen Nuestros Estudiantes
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Más de 2,500 profesionales han transformado sus carreras con nuestros cursos especializados.
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card border-0"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-primary/20" />
                  </div>

                  <blockquote className="text-muted-foreground text-pretty italic">"{testimonial.text}"</blockquote>

                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.course}
                    </Badge>
                    <div className="text-xs text-primary font-medium">✨ {testimonial.beforeAfter}</div>
                  </div>

                  <div className="flex items-center space-x-3 pt-4 border-t">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`Foto de ${testimonial.name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonials}
              disabled={currentIndex === 0}
              aria-label="Testimonios anteriores"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir a página ${index + 1} de testimonios`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonials}
              disabled={currentIndex === totalPages - 1}
              aria-label="Siguientes testimonios"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
