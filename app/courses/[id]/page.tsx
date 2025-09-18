"use client"

import { Navigation } from "@/components/navigation"
import { CourseHero } from "@/components/course-hero"
import { CourseCurriculum } from "@/components/course-curriculum"
import { CourseInstructor } from "@/components/course-instructor"
import { CourseReviews } from "@/components/course-reviews"
import { CourseEnrollment } from "@/components/course-enrollment"
import { RelatedCourses } from "@/components/related-courses"
import { coursesData } from "@/lib/course-data"
import { notFound } from "next/navigation"

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = coursesData.find((c) => c.id === params.id)

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
              <CourseCurriculum courseId={course.id} />
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
