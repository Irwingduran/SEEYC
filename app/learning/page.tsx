"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { WelcomeSection } from "@/components/welcome-section"
import { ContinueLearning } from "@/components/continue-learning"
import { RecommendedCourses } from "@/components/recommended-courses"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { Achievements } from "@/components/achievements"
import { RecentActivity } from "@/components/recent-activity"
import { ErrorBoundary } from "@/components/error-boundary"

export default function LearningPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <div className="flex">
          <DashboardSidebar />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 p-6">
            <WelcomeSection />

            {/* Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mt-6">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-6">
                <ErrorBoundary>
                  <ContinueLearning />
                </ErrorBoundary>
                <ErrorBoundary>
                  <RecommendedCourses />
                </ErrorBoundary>
              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-1 space-y-6">
                <ErrorBoundary>
                  <UpcomingDeadlines />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Achievements />
                </ErrorBoundary>
                <ErrorBoundary>
                  <RecentActivity />
                </ErrorBoundary>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
