"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getAllCourses } from "@/lib/course-service"
import { Course } from "@/types/course"

const recommendedCourses = [
  {
    id: 1,
    title: "Motores Eléctricos Industriales",
    instructor: "Ing. Carlos Mendoza",
    rating: 4.8,
    students: 1250,
    duration: "8 horas",
    price: "$89",
    image: "/industrial-motors.jpg",
    level: "Intermedio",
    category: "Industrial",
  },
  {
    id: 2,
    title: "Sistemas de Iluminación LED",
    instructor: "Ing. Laura Pérez",
    rating: 4.9,
    students: 890,
    duration: "6 horas",
    price: "$65",
    image: "/led-lighting-systems.jpg",
    level: "Básico",
    category: "Iluminación",
  },
  {
    id: 3,
    title: "Tableros de Control Avanzados",
    instructor: "Ing. Miguel Torres",
    rating: 4.7,
    students: 650,
    duration: "12 horas",
    price: "$120",
    image: "/control-panels.jpg",
    level: "Avanzado",
    category: "Control",
  },
  {
    id: 4,
    title: "Instalaciones Domóticas",
    instructor: "Ing. Sofia Ruiz",
    rating: 4.6,
    students: 420,
    duration: "10 horas",
    price: "$95",
    image: "/home-automation.jpg",
    level: "Intermedio",
    category: "Domótica",
  },
]

export function RecommendedCourses() {
  const [courses, setCourses] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const coursesPerView = 2

  useEffect(() => {
    const fetchCourses = async () => {
      const allCourses = await getAllCourses()
      const mapped = allCourses.map(c => ({
        id: c.id,
        title: c.title,
        instructor: c.instructor.name,
        rating: c.rating,
        students: c.students,
        duration: c.duration,
        price: c.price === 0 ? "Gratis" : `$${c.price}`,
        image: c.thumbnail || "/images/course-placeholder.jpg",
        level: c.level,
        category: c.category
      }))
      setCourses(mapped)
    }
    fetchCourses()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + coursesPerView >= courses.length ? 0 : prev + coursesPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, courses.length - coursesPerView) : prev - coursesPerView,
    )
  }

  const visibleCourses = courses.slice(currentIndex, currentIndex + coursesPerView)

  if (courses.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Cursos Recomendados</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visibleCourses.map((course) => (
            <div key={course.id} className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-background/80">
                    {course.level}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-medium mb-2 line-clamp-2">{course.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{course.price}</span>
                  <Button size="sm" variant="outline">
                    Ver Curso
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
