"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Star, Award, Play, BookOpen } from "lucide-react"
import Image from "next/image"
import type { Course } from "@/lib/course-data"

interface CourseHeroProps {
  course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
  const levelColors = {
    Principiante: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    Intermedio: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    Avanzado: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.2] bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/80 to-background" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge className={levelColors[course.level]}>{course.level}</Badge>
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold text-balance leading-tight text-foreground">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground text-pretty">{course.description}</p>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} estudiantes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                <Play className="h-5 w-5 mr-2" />
                Inscribirse Ahora
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <BookOpen className="h-5 w-5 mr-2" />
                Vista Previa
              </Button>
            </div>
          </div>

          {/* Course Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 bg-card/60 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between text-white">
                      <div className="space-y-1">
                        <div className="text-sm opacity-90">Precio del curso</div>
                        <div className="text-3xl font-bold">${course.price.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                        <Award className="h-5 w-5" />
                        <span className="text-sm font-medium">Certificado incluido</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
