"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, BookOpen, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const enrolledCourses = [
  {
    id: "1",
    title: "Fundamentos de Instalaciones Eléctricas Residenciales",
    instructor: "Ing. Carlos Mendoza",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: "Conexión de Protecciones",
    timeSpent: "12.5 horas",
    image: "/electrical-residential-installation.jpg",
    lastAccessed: "Hace 2 días",
  },
  {
    id: "4",
    title: "Seguridad Eléctrica y Prevención de Riesgos",
    instructor: "Ing. Ana Rodríguez",
    progress: 45,
    totalLessons: 18,
    completedLessons: 8,
    nextLesson: "Uso de EPP en Trabajos Eléctricos",
    timeSpent: "6.2 horas",
    image: "/electrical-safety-equipment.jpg",
    lastAccessed: "Ayer",
  },
  {
    id: "2",
    title: "Sistemas de Automatización Industrial",
    instructor: "Ing. María González",
    progress: 20,
    totalLessons: 32,
    completedLessons: 6,
    nextLesson: "Introducción a PLC",
    timeSpent: "5.8 horas",
    image: "/industrial-automation-plc.jpg",
    lastAccessed: "Hace 1 semana",
  },
]

export function EnrolledCourses() {
  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Mis Cursos</span>
          </CardTitle>
          <Badge variant="secondary">{enrolledCourses.length} activos</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col lg:flex-row gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              {/* Course Image */}
              <div className="relative w-full lg:w-48 h-32 rounded-lg overflow-hidden">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <Progress value={course.progress} className="h-1 bg-white/20" />
                </div>
              </div>

              {/* Course Info */}
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Progreso</p>
                    <p className="font-medium">{course.progress}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Lecciones</p>
                    <p className="font-medium">
                      {course.completedLessons}/{course.totalLessons}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Tiempo</p>
                    <p className="font-medium">{course.timeSpent}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Último acceso</p>
                    <p className="font-medium">{course.lastAccessed}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Próxima lección:</p>
                  <p className="font-medium">{course.nextLesson}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2 lg:w-32">
                <Button asChild className="flex-1 lg:flex-none">
                  <Link href={`/courses/${course.id}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Continuar
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="lg:w-full bg-transparent">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
