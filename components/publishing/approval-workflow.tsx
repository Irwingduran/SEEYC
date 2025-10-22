"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  Eye,
  MessageSquare,
  User,
  Calendar,
  Globe,
  FileText,
} from "lucide-react"

interface ApprovalWorkflowProps {
  status: "draft" | "review" | "approved" | "published"
}

export function ApprovalWorkflow({ status }: ApprovalWorkflowProps) {
  const getStatusInfo = (currentStatus: string) => {
    switch (currentStatus) {
      case "draft":
        return {
          title: "Borrador",
          description: "Tu curso está en desarrollo",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
          icon: <FileText className="w-4 h-4" />,
          progress: 25,
        }
      case "review":
        return {
          title: "En Revisión",
          description: "Tu curso está siendo revisado por nuestro equipo",
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          icon: <Clock className="w-4 h-4" />,
          progress: 50,
        }
      case "approved":
        return {
          title: "Aprobado",
          description: "Tu curso ha sido aprobado y está listo para publicar",
          color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
          progress: 75,
        }
      case "published":
        return {
          title: "Publicado",
          description: "Tu curso está disponible para los estudiantes",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
          icon: <Globe className="w-4 h-4" />,
          progress: 100,
        }
      default:
        return {
          title: "Desconocido",
          description: "Estado desconocido",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
          icon: <AlertCircle className="w-4 h-4" />,
          progress: 0,
        }
    }
  }

  const statusInfo = getStatusInfo(status)

  const workflowSteps = [
    {
      id: "draft",
      title: "Borrador",
      description: "Crear y editar contenido",
      icon: <FileText className="w-4 h-4" />,
      completed: ["review", "approved", "published"].includes(status),
      active: status === "draft",
    },
    {
      id: "review",
      title: "Revisión",
      description: "Revisión del equipo de calidad",
      icon: <Eye className="w-4 h-4" />,
      completed: ["approved", "published"].includes(status),
      active: status === "review",
    },
    {
      id: "approved",
      title: "Aprobado",
      description: "Listo para publicación",
      icon: <CheckCircle className="w-4 h-4" />,
      completed: status === "published",
      active: status === "approved",
    },
    {
      id: "published",
      title: "Publicado",
      description: "Disponible para estudiantes",
      icon: <Globe className="w-4 h-4" />,
      completed: false,
      active: status === "published",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Flujo de Aprobación</h2>
          <p className="text-gray-600 dark:text-gray-300">Sigue el progreso de tu curso hacia la publicación</p>
        </div>
        <Badge className={statusInfo.color}>
          {statusInfo.icon}
          <span className="ml-1">{statusInfo.title}</span>
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Progreso de Publicación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 dark:text-gray-300">{statusInfo.description}</span>
                <span className="text-gray-500">{statusInfo.progress}% completado</span>
              </div>
              <Progress value={statusInfo.progress} className="mb-4" />
            </div>

            {/* Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      step.completed
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : step.active
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        step.completed
                          ? "bg-green-600 text-white"
                          : step.active
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {step.completed ? <CheckCircle className="w-4 h-4" /> : step.icon}
                    </div>
                    <h3
                      className={`font-semibold text-sm mb-1 ${
                        step.completed || step.active ? "text-gray-900 dark:text-white" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs ${
                        step.completed || step.active ? "text-gray-600 dark:text-gray-300" : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-2 w-4 h-0.5 bg-gray-300 dark:bg-gray-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status-specific Content */}
      {status === "draft" && (
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-600" />
              Enviar para Revisión
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Una vez que hayas completado tu curso y verificado todos los elementos de la lista de verificación, puedes
              enviarlo para revisión.
            </p>

            <div className="space-y-2">
              <Label htmlFor="submission-notes">Notas para el Revisor (Opcional)</Label>
              <Textarea
                id="submission-notes"
                placeholder="Agrega cualquier información adicional para el equipo de revisión..."
                rows={3}
                className="bg-white/50 dark:bg-gray-800/50 border-white/20"
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Antes de enviar, asegúrate de:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>✓ Completar todos los elementos requeridos</li>
                <li>✓ Revisar la calidad de audio y video</li>
                <li>✓ Verificar que todo el contenido sea original</li>
                <li>✓ Establecer el precio y configuración de acceso</li>
              </ul>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Enviar para Revisión
            </Button>
          </CardContent>
        </Card>
      )}

      {status === "review" && (
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              En Proceso de Revisión
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Tu curso está siendo revisado</h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Nuestro equipo de calidad está revisando tu curso. Este proceso generalmente toma 2-3 días hábiles.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Qué estamos revisando:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Calidad del contenido",
                  "Audio y video",
                  "Información del curso",
                  "Cumplimiento de políticas",
                  "Experiencia del estudiante",
                  "Materiales complementarios",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900 dark:text-white">Revisor Asignado</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                María González - Especialista en Contenido Técnico
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>Revisión iniciada: 15 de Enero, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "approved" && (
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Curso Aprobado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">¡Felicidades!</h4>
              <p className="text-sm text-green-800 dark:text-green-200">
                Tu curso ha sido aprobado y está listo para ser publicado. Puedes publicarlo ahora o programar una fecha
                de lanzamiento.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Comentarios del Revisor:</h4>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900 dark:text-white">María González</span>
                  <span className="text-xs text-gray-500">Hace 2 horas</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Excelente curso con contenido de alta calidad. Las explicaciones son claras y los ejemplos prácticos
                  son muy útiles. El audio y video tienen buena calidad. ¡Aprobado para publicación!
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Globe className="w-4 h-4 mr-2" />
                Publicar Ahora
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Programar Publicación
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "published" && (
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Curso Publicado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">¡Tu curso está en vivo!</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Tu curso está ahora disponible para los estudiantes. Puedes ver las estadísticas y gestionar las
                inscripciones desde tu panel de instructor.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Estudiantes</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$0</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Ingresos</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Reseñas</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">0%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Completado</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Ver Curso Público
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <MessageSquare className="w-4 h-4 mr-2" />
                Gestionar Estudiantes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support Contact */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            ¿Necesitas Ayuda?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Si tienes preguntas sobre el proceso de publicación o necesitas asistencia, nuestro equipo está aquí para
            ayudarte.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contactar Soporte
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              Guía de Publicación
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
