import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { CourseManagement } from "@/components/course-management"
import { StudentManagement } from "@/components/student-management"
import { InstructorTools } from "@/components/instructor-tools"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function InstructorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Centro de Control del Instructor</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gestiona tus cursos, estudiantes y analíticas desde un solo lugar
          </p>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Analíticas
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Cursos
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Estudiantes
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Herramientas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <Suspense fallback={<DashboardSkeleton />}>
              <AnalyticsOverview />
            </Suspense>
          </TabsContent>

          <TabsContent value="courses">
            <Suspense fallback={<DashboardSkeleton />}>
              <CourseManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="students">
            <Suspense fallback={<DashboardSkeleton />}>
              <StudentManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="tools">
            <Suspense fallback={<DashboardSkeleton />}>
              <InstructorTools />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
