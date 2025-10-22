"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { WelcomeSection } from "@/components/welcome-section"
import { ContinueLearning } from "@/components/continue-learning"
import { RecommendedCourses } from "@/components/recommended-courses"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { Achievements } from "@/components/achievements"
import { RecentActivity } from "@/components/recent-activity"
import { ErrorBoundary } from "@/components/error-boundary"

function LearningContent() {
  const { isCollapsed } = useSidebar()

  return (
    <>
      <DashboardSidebar />

      {/* Main Content */}
      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
            <WelcomeSection />

            {/* Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-5 mt-6">
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
    </>
  )
}

export default function LearningPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
          <LearningContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
