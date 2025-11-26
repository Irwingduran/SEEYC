"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, BookOpen } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getEnrolledCourses, EnrolledCourse } from "@/lib/user-service"
import Link from "next/link"

export function ContinueLearning() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getEnrolledCourses()
        setCourses(data.filter(c => c.status === "active").slice(0, 3))
      } catch (error) {
        console.error("Error fetching enrolled courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Continuar Aprendiendo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Continuar Aprendiendo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No tienes cursos activos.</p>
            <Button variant="link" asChild className="mt-2">
              <Link href="/courses">Explorar catálogo</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Continuar Aprendiendo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={course.image || "/images/course-placeholder.jpg"} alt={course.title} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{course.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {course.nextLessonTitle ? `Próxima lección: ${course.nextLessonTitle}` : "Continuar curso"}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progreso</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  {/* <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {course.timeLeft}
                  </div> */}
                </div>
              </div>

              <Button size="sm" className="flex-shrink-0" asChild>
                <Link href={`/dashboard/courses/${course.courseId}/learn`}>
                  <Play className="h-4 w-4 mr-1" />
                  Continuar
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
