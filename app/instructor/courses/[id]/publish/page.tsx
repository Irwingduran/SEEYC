"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CoursePreview } from "@/components/publishing/course-preview"
import { SEOOptimization } from "@/components/publishing/seo-optimization"
import { MarketingMaterials } from "@/components/publishing/marketing-materials"
import { PublicationChecklist } from "@/components/publishing/publication-checklist"
import { ApprovalWorkflow } from "@/components/publishing/approval-workflow"
import { Eye, Search, Megaphone, CheckSquare, Send, Globe, AlertCircle, CheckCircle } from "lucide-react"

export default function PublishCoursePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("preview")
  const [publishingStatus, setPublishingStatus] = useState<"draft" | "review" | "approved" | "published">("draft")
  const [completionScore, setCompletionScore] = useState(75)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "published":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <AlertCircle className="w-4 h-4" />
      case "review":
        return <Eye className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "published":
        return <Globe className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Borrador"
      case "review":
        return "En Revisión"
      case "approved":
        return "Aprobado"
      case "published":
        return "Publicado"
      default:
        return "Desconocido"
    }
  }

  const handlePublish = () => {
    if (completionScore >= 80) {
      setPublishingStatus("review")
      // Simulate approval process
      setTimeout(() => {
        setPublishingStatus("approved")
        setTimeout(() => {
          setPublishingStatus("published")
        }, 2000)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Publicar Curso</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Revisa, optimiza y publica tu curso de capacitación eléctrica
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={getStatusColor(publishingStatus)}>
              {getStatusIcon(publishingStatus)}
              <span className="ml-1">{getStatusText(publishingStatus)}</span>
            </Badge>
            <Button
              onClick={handlePublish}
              disabled={completionScore < 80 || publishingStatus !== "draft"}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {publishingStatus === "draft" ? "Enviar a Revisión" : "Publicando..."}
            </Button>
          </div>
        </div>

        {/* Completion Progress */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progreso de Publicación</h3>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {completionScore}% completado
              </span>
            </div>
            <Progress value={completionScore} className="mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Contenido creado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Información básica</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-gray-700 dark:text-gray-300">SEO optimizado</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-gray-700 dark:text-gray-300">Materiales de marketing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Tabs */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100/50 dark:bg-gray-800/50">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Vista Previa</span>
                </TabsTrigger>
                <TabsTrigger value="seo" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">SEO</span>
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4" />
                  <span className="hidden sm:inline">Marketing</span>
                </TabsTrigger>
                <TabsTrigger value="checklist" className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Checklist</span>
                </TabsTrigger>
                <TabsTrigger value="approval" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Aprobación</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-6">
                <CoursePreview />
              </TabsContent>

              <TabsContent value="seo" className="mt-6">
                <SEOOptimization onScoreUpdate={setCompletionScore} />
              </TabsContent>

              <TabsContent value="marketing" className="mt-6">
                <MarketingMaterials />
              </TabsContent>

              <TabsContent value="checklist" className="mt-6">
                <PublicationChecklist onScoreUpdate={setCompletionScore} />
              </TabsContent>

              <TabsContent value="approval" className="mt-6">
                <ApprovalWorkflow status={publishingStatus} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
