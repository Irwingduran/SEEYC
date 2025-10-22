"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, BookOpen, DollarSign, Brain, Settings, GraduationCap, Wrench } from "lucide-react"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

// Admin Components
import { KpiOverview } from "@/components/admin/kpi-overview"
import { UserManagement } from "@/components/admin/user-management"
import { ContentManagement } from "@/components/admin/content-management"
import { FinancialManagement } from "@/components/admin/financial-management"
import { AdvancedAnalytics } from "@/components/admin/advanced-analytics"
import { SystemConfiguration } from "@/components/admin/system-configuration"

// Instructor Components
import { AnalyticsOverview } from "@/components/analytics-overview"
import { CourseManagement } from "@/components/course-management"
import { StudentManagement } from "@/components/student-management"
import { InstructorTools } from "@/components/instructor-tools"

export default function UnifiedDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Panel de Administración e Instrucción
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Control total de la plataforma y gestión de cursos</p>
            </div>
          </div>
        </div>

        {/* Unified Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            {/* Platform Management */}
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden lg:inline">Vista General</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Brain className="h-4 w-4" />
              <span className="hidden lg:inline">Analíticas</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              <span className="hidden lg:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden lg:inline">Contenido</span>
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <DollarSign className="h-4 w-4" />
              <span className="hidden lg:inline">Finanzas</span>
            </TabsTrigger>

            {/* Teaching Management */}
            <TabsTrigger
              value="teaching"
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden lg:inline">Mis Cursos</span>
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden lg:inline">Gestión Cursos</span>
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              <span className="hidden lg:inline">Estudiantes</span>
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Wrench className="h-4 w-4" />
              <span className="hidden lg:inline">Herramientas</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden lg:inline">Configuración</span>
            </TabsTrigger>
          </TabsList>

          {/* Platform Management Tabs */}
          <TabsContent value="overview">
            <Suspense fallback={<DashboardSkeleton />}>
              <KpiOverview />
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics">
            <Suspense fallback={<DashboardSkeleton />}>
              <AdvancedAnalytics />
            </Suspense>
          </TabsContent>

          <TabsContent value="users">
            <Suspense fallback={<DashboardSkeleton />}>
              <UserManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="content">
            <Suspense fallback={<DashboardSkeleton />}>
              <ContentManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="financial">
            <Suspense fallback={<DashboardSkeleton />}>
              <FinancialManagement />
            </Suspense>
          </TabsContent>

          {/* Teaching Management Tabs */}
          <TabsContent value="teaching">
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

          <TabsContent value="settings">
            <Suspense fallback={<DashboardSkeleton />}>
              <SystemConfiguration />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
