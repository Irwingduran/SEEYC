"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseCard } from "@/components/course-card"
import { coursesData } from "@/lib/course-data"

interface RelatedCoursesProps {
  currentCourseId: string
  category: string
}

export function RelatedCourses({ currentCourseId, category }: RelatedCoursesProps) {
  const relatedCourses = coursesData
    .filter((course) => course.id !== currentCourseId && course.category === category)
    .slice(0, 3)

  if (relatedCourses.length === 0) {
    return null
  }

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Cursos Relacionados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
