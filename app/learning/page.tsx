"use client"

import { Navigation } from "@/components/navigation"
import { DashboardOverview } from "@/components/dashboard-overview"
import { EnrolledCourses } from "@/components/enrolled-courses"
import { LearningProgress } from "@/components/learning-progress"
import { Achievements } from "@/components/achievements"
import { LearningStats } from "@/components/learning-stats"
import { RecentActivity } from "@/components/recent-activity"

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-balance">
            <span className="text-primary">Mi</span> Aprendizaje
          </h1>
          <p className="text-muted-foreground mt-2">Sigue tu progreso y continúa tu formación eléctrica</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <DashboardOverview />
            <EnrolledCourses />
            <LearningProgress />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <LearningStats />
            <Achievements />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
