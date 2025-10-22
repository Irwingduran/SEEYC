"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KpiOverview } from "@/components/admin/kpi-overview"
import { UserManagement } from "@/components/admin/user-management"
import { ContentManagement } from "@/components/admin/content-management"
import { FinancialManagement } from "@/components/admin/financial-management"
import { AdvancedAnalytics } from "@/components/admin/advanced-analytics"
import { SystemConfiguration } from "@/components/admin/system-configuration"
import { IntegrationManagement } from "@/components/admin/integration-management"
import { AutomatedReporting } from "@/components/admin/automated-reporting"
import { SecurityAudit } from "@/components/admin/security-audit"
import { Shield, Users, BookOpen, DollarSign, Brain, Settings, Plug, FileText, Lock } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Control total de la plataforma Eléctricos Especializados</p>
            </div>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="kpi" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-white/70 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="kpi" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              KPI Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Análisis Avanzado
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Contenido
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Finanzas
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Plug className="h-4 w-4" />
              Integraciones
            </TabsTrigger>
            <TabsTrigger value="reporting" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reportes
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Sistema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kpi">
            <KpiOverview />
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialManagement />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationManagement />
          </TabsContent>

          <TabsContent value="reporting">
            <AutomatedReporting />
          </TabsContent>

          <TabsContent value="security">
            <SecurityAudit />
          </TabsContent>

          <TabsContent value="system">
            <SystemConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
