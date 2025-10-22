"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock, FileText, Video, Image, Settings, Users } from "lucide-react"

interface ChecklistItem {
  id: string
  category: string
  title: string
  description: string
  completed: boolean
  required: boolean
  icon: React.ReactNode
}

interface PublicationChecklistProps {
  onScoreUpdate: (score: number) => void
}

export function PublicationChecklist({ onScoreUpdate }: PublicationChecklistProps) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Content Requirements
    {
      id: "course-title",
      category: "Contenido",
      title: "Título del curso definido",
      description: "El curso tiene un título claro y descriptivo",
      completed: true,
      required: true,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "course-description",
      category: "Contenido",
      title: "Descripción completa",
      description: "Descripción detallada del curso y objetivos de aprendizaje",
      completed: true,
      required: true,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "course-lessons",
      category: "Contenido",
      title: "Lecciones creadas",
      description: "Al menos 5 lecciones con contenido completo",
      completed: true,
      required: true,
      icon: <Video className="w-4 h-4" />,
    },
    {
      id: "course-thumbnail",
      category: "Contenido",
      title: "Miniatura del curso",
      description: "Imagen atractiva de 1280x720px para el curso",
      completed: false,
      required: true,
      icon: <Image className="w-4 h-4" />,
    },
    {
      id: "preview-video",
      category: "Contenido",
      title: "Video de vista previa",
      description: "Video promocional de 1-3 minutos del curso",
      completed: false,
      required: false,
      icon: <Video className="w-4 h-4" />,
    },

    // Technical Requirements
    {
      id: "video-quality",
      category: "Técnico",
      title: "Calidad de video",
      description: "Todos los videos en HD (720p mínimo)",
      completed: true,
      required: true,
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "audio-quality",
      category: "Técnico",
      title: "Calidad de audio",
      description: "Audio claro sin ruido de fondo",
      completed: true,
      required: true,
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "mobile-optimization",
      category: "Técnico",
      title: "Optimización móvil",
      description: "Contenido optimizado para dispositivos móviles",
      completed: false,
      required: true,
      icon: <Settings className="w-4 h-4" />,
    },

    // Marketing Requirements
    {
      id: "seo-optimization",
      category: "Marketing",
      title: "SEO optimizado",
      description: "Título, descripción y palabras clave optimizadas",
      completed: false,
      required: false,
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "pricing-set",
      category: "Marketing",
      title: "Precio establecido",
      description: "Precio del curso y configuración de acceso definidos",
      completed: true,
      required: true,
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "target-audience",
      category: "Marketing",
      title: "Audiencia objetivo",
      description: "Audiencia objetivo y prerrequisitos definidos",
      completed: true,
      required: true,
      icon: <Users className="w-4 h-4" />,
    },

    // Legal Requirements
    {
      id: "terms-conditions",
      category: "Legal",
      title: "Términos y condiciones",
      description: "Términos de uso y política de reembolso establecidos",
      completed: true,
      required: true,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "copyright-check",
      category: "Legal",
      title: "Verificación de derechos",
      description: "Todo el contenido es original o tiene licencia apropiada",
      completed: true,
      required: true,
      icon: <FileText className="w-4 h-4" />,
    },
  ])

  const toggleItem = (itemId: string) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
    )
  }

  const calculateProgress = () => {
    const totalItems = checklistItems.length
    const completedItems = checklistItems.filter((item) => item.completed).length
    const requiredItems = checklistItems.filter((item) => item.required).length
    const completedRequiredItems = checklistItems.filter((item) => item.required && item.completed).length

    const overallProgress = (completedItems / totalItems) * 100
    const requiredProgress = (completedRequiredItems / requiredItems) * 100

    return { overallProgress, requiredProgress, completedItems, totalItems, completedRequiredItems, requiredItems }
  }

  const { overallProgress, requiredProgress, completedItems, totalItems, completedRequiredItems, requiredItems } =
    calculateProgress()

  useEffect(() => {
    onScoreUpdate(Math.round(overallProgress))
  }, [overallProgress, onScoreUpdate])

  const categories = ["Contenido", "Técnico", "Marketing", "Legal"]

  const getStatusIcon = (completed: boolean, required: boolean) => {
    if (completed) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (required) return <AlertCircle className="w-5 h-5 text-red-600" />
    return <Clock className="w-5 h-5 text-yellow-600" />
  }

  const getCategoryProgress = (category: string) => {
    const categoryItems = checklistItems.filter((item) => item.category === category)
    const completedCategoryItems = categoryItems.filter((item) => item.completed)
    return (completedCategoryItems.length / categoryItems.length) * 100
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lista de Verificación</h2>
          <p className="text-gray-600 dark:text-gray-300">Asegúrate de que tu curso esté listo para publicar</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{Math.round(overallProgress)}%</div>
          <div className="text-sm text-gray-500">Completado</div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Progreso General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 dark:text-gray-300">Progreso Total</span>
                <span className="text-gray-500">
                  {completedItems}/{totalItems} elementos
                </span>
              </div>
              <Progress value={overallProgress} className="mb-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 dark:text-gray-300">Elementos Requeridos</span>
                <span className="text-gray-500">
                  {completedRequiredItems}/{requiredItems} requeridos
                </span>
              </div>
              <Progress value={requiredProgress} className="mb-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {categories.map((category) => (
                <div key={category} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{Math.round(getCategoryProgress(category))}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{category}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category}</CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                >
                  {Math.round(getCategoryProgress(category))}% completado
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklistItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-3 rounded-lg border transition-colors cursor-pointer ${
                        item.completed
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : item.required
                            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                            : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex-shrink-0">{getStatusIcon(item.completed, item.required)}</div>
                      <div className="flex-shrink-0 text-gray-600 dark:text-gray-400">{item.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.required && (
                          <Badge variant="destructive" size="sm">
                            Requerido
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant={item.completed ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleItem(item.id)
                          }}
                        >
                          {item.completed ? "Completado" : "Marcar"}
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Publication Readiness */}
      <Card
        className={`backdrop-blur-sm border-white/20 ${
          requiredProgress === 100
            ? "bg-green-50/70 dark:bg-green-900/20 border-green-200 dark:border-green-800"
            : "bg-orange-50/70 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
        }`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {requiredProgress === 100 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-600" />
            )}
            Estado de Publicación
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requiredProgress === 100 ? (
            <div className="text-green-800 dark:text-green-200">
              <p className="font-semibold mb-2">✅ Tu curso está listo para publicar</p>
              <p className="text-sm">
                Has completado todos los elementos requeridos. Puedes proceder con la publicación de tu curso.
              </p>
            </div>
          ) : (
            <div className="text-orange-800 dark:text-orange-200">
              <p className="font-semibold mb-2">⚠️ Elementos requeridos pendientes</p>
              <p className="text-sm mb-3">
                Completa los elementos marcados como "Requerido" antes de publicar tu curso.
              </p>
              <div className="text-sm">
                <strong>Elementos pendientes:</strong>
                <ul className="list-disc list-inside mt-1">
                  {checklistItems
                    .filter((item) => item.required && !item.completed)
                    .map((item) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
