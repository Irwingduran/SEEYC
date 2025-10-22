"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share, Calendar, Star, CheckCircle, Trophy, Medal, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface CertificateData {
  id: string
  studentName: string
  courseName: string
  instructorName: string
  completionDate: Date
  duration: string
  grade: number
  skills: string[]
  certificateNumber: string
  issueDate: Date
}

interface CourseCompletionCertificateProps {
  certificateData: CertificateData
  onDownload?: () => void
  onShare?: () => void
  showActions?: boolean
}

export function CourseCompletionCertificate({
  certificateData,
  onDownload,
  onShare,
  showActions = true,
}: CourseCompletionCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    try {
      // In a real implementation, you would use a library like jsPDF or html2canvas
      // For now, we'll simulate the download
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a download link
      const link = document.createElement("a")
      link.href = "#" // In real implementation, this would be the PDF blob URL
      link.download = `certificado-${certificateData.certificateNumber}.pdf`
      link.click()

      onDownload?.()
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificado de ${certificateData.courseName}`,
        text: `¡He completado exitosamente el curso "${certificateData.courseName}"!`,
        url: window.location.href,
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`¡He completado exitosamente el curso "${certificateData.courseName}"! 🎓`)
    }
    onShare?.()
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600"
    if (grade >= 80) return "text-blue-600"
    if (grade >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeBadge = (grade: number) => {
    if (grade >= 95) return { icon: Trophy, label: "Excelencia", color: "bg-yellow-500" }
    if (grade >= 90) return { icon: Medal, label: "Sobresaliente", color: "bg-blue-500" }
    if (grade >= 80) return { icon: Star, label: "Notable", color: "bg-green-500" }
    return { icon: CheckCircle, label: "Aprobado", color: "bg-gray-500" }
  }

  const gradeBadge = getGradeBadge(certificateData.grade)
  const GradeBadgeIcon = gradeBadge.icon

  return (
    <div className="space-y-6">
      {/* Certificate */}
      <div
        ref={certificateRef}
        className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-8 rounded-lg border-2 border-blue-200 dark:border-blue-800 shadow-2xl"
        style={{ aspectRatio: "4/3", minHeight: "600px" }}
      >
        {/* Decorative Border */}
        <div className="absolute inset-4 border-2 border-blue-300 dark:border-blue-700 rounded-lg opacity-30" />
        <div className="absolute inset-6 border border-blue-200 dark:border-blue-800 rounded-lg opacity-20" />

        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Award className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100">CERTIFICADO DE FINALIZACIÓN</h1>
            <p className="text-lg text-blue-700 dark:text-blue-300">Academia de Sistemas Eléctricos</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg text-blue-800 dark:text-blue-200">Se certifica que</p>
            <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-100 border-b-2 border-blue-300 dark:border-blue-700 pb-2 inline-block">
              {certificateData.studentName}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-blue-800 dark:text-blue-200">ha completado exitosamente el curso</p>
            <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 px-4">
              "{certificateData.courseName}"
            </h3>
          </div>

          {/* Achievement Details */}
          <div className="flex justify-center items-center space-x-8 my-6">
            <div className="text-center">
              <div className={cn("text-3xl font-bold", getGradeColor(certificateData.grade))}>
                {certificateData.grade}%
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Calificación</p>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white", gradeBadge.color)}
              >
                <GradeBadgeIcon className="h-6 w-6" />
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{gradeBadge.label}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{certificateData.duration}</div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Duración</p>
            </div>
          </div>

          {/* Skills Acquired */}
          {certificateData.skills.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Competencias adquiridas:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {certificateData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex justify-between items-end">
            <div className="text-left space-y-1">
              <div className="border-t-2 border-blue-300 dark:border-blue-700 pt-2 w-48">
                <p className="font-semibold text-blue-900 dark:text-blue-100">{certificateData.instructorName}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Instructor Certificado</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">Sello Oficial</p>
            </div>

            <div className="text-right space-y-1">
              <div className="space-y-1">
                <div className="flex items-center justify-end space-x-1 text-sm text-blue-600 dark:text-blue-400">
                  <Calendar className="h-4 w-4" />
                  <span>{certificateData.completionDate.toLocaleDateString("es-ES")}</span>
                </div>
                <p className="text-xs text-blue-500 dark:text-blue-500">
                  Certificado N° {certificateData.certificateNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex justify-center space-x-4">
          <Button onClick={handleDownloadPDF} disabled={isGenerating} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>{isGenerating ? "Generando PDF..." : "Descargar PDF"}</span>
          </Button>
          <Button variant="outline" onClick={handleShare} className="flex items-center space-x-2 bg-transparent">
            <Share className="h-4 w-4" />
            <span>Compartir</span>
          </Button>
        </div>
      )}
    </div>
  )
}
