"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { WelcomeSection } from "@/components/welcome-section"
import { ContinueLearning } from "@/components/continue-learning"
import { RecommendedCourses } from "@/components/recommended-courses"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { Achievements } from "@/components/achievements"
import { ErrorBoundary } from "@/components/error-boundary"
import { useSession } from "next-auth/react"

function DashboardContent() {
  const { isCollapsed } = useSidebar()
  const { data: session } = useSession()

  return (
    <>
      <DashboardSidebar />

      {/* Main Content */}
      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
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
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
          <DashboardContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
