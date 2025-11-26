"use client"

import { Navigation } from "@/components/navigation"
import { CourseHero } from "@/components/course-hero"
import { CourseCurriculum } from "@/components/course-curriculum"
import { CourseInstructor } from "@/components/course-instructor"
import { CourseReviews } from "@/components/course-reviews"
import { CourseEnrollment } from "@/components/course-enrollment"
import { RelatedCourses } from "@/components/related-courses"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { getCourseById } from "@/lib/course-service"
import { Course as NewCourse } from "@/types/course"
import { Course as OldCourse } from "@/lib/course-data"

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const [course, setCourse] = useState<OldCourse | null>(null)
  const [modules, setModules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
          setLoading(false)
          return
        }
        const fetchedCourse = await getCourseById(id)
        
        if (fetchedCourse) {
          // Map new course to old course structure
          const mappedCourse: OldCourse = {
            id: fetchedCourse.id.toString(),
            title: fetchedCourse.title,
            description: fetchedCourse.description,
            instructor: fetchedCourse.instructor.name,
            duration: fetchedCourse.duration,
            students: fetchedCourse.students,
            rating: fetchedCourse.rating,
            price: fetchedCourse.price,
            level: fetchedCourse.level === "Básico" ? "Principiante" : (fetchedCourse.level as any),
            category: fetchedCourse.category,
            image: fetchedCourse.thumbnail || "/images/course-placeholder.jpg",
            isEnrolled: false
          }
          setCourse(mappedCourse)

          // Map modules
          const mappedModules = fetchedCourse.modules.map(m => ({
            id: m.id.toString(),
            title: m.title,
            duration: m.duration || "0m",
            lessons: m.lessons.map(l => ({
              id: l.id.toString(),
              title: l.title,
              type: l.type === "text" ? "reading" : l.type,
              duration: l.duration || "0m",
              isPreview: l.isPreview
            }))
          }))
          setModules(mappedModules)
        }
      } catch (error) {
        console.error("Error fetching course:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div> // Or a proper skeleton
  }

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <CourseHero course={course} />

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <CourseCurriculum courseId={course.id} modules={modules} />
              <CourseInstructor instructor={course.instructor} />
              <CourseReviews courseId={course.id} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CourseEnrollment course={course} />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <RelatedCourses currentCourseId={course.id} category={course.category} />
          </div>
        </div>
      </main>
    </div>
  )
}
