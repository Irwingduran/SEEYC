"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, FileText, Download, Users, Award } from "lucide-react"

interface InteractivePanelProps {
  activePanel: "notes" | "discussion" | "materials" | null
  onPanelChange: (panel: "notes" | "discussion" | "materials" | null) => void
  lesson: {
    id: number
    title: string
    duration: string
  }
}

export function InteractivePanel({ activePanel, onPanelChange, lesson }: InteractivePanelProps) {
  const panels = [
    {
      id: "notes" as const,
      label: "Notas",
      icon: FileText,
      count: 3,
      description: "Tus notas y marcadores",
    },
    {
      id: "discussion" as const,
      label: "Discusión",
      icon: MessageSquare,
      count: 12,
      description: "Preguntas y respuestas",
    },
    {
      id: "materials" as const,
      label: "Materiales",
      icon: Download,
      count: 5,
      description: "Recursos descargables",
    },
  ]

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-white/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recursos Interactivos</h3>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            <Users className="w-3 h-3 mr-1" />
            24 estudiantes activos
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Award className="w-3 h-3 mr-1" />
            Certificado disponible
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {panels.map((panel) => {
          const Icon = panel.icon
          const isActive = activePanel === panel.id

          return (
            <Button
              key={panel.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => onPanelChange(isActive ? null : panel.id)}
              className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 ${
                isActive
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "bg-white/50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{panel.label}</span>
                {panel.count > 0 && (
                  <Badge variant={isActive ? "secondary" : "default"} className="text-xs">
                    {panel.count}
                  </Badge>
                )}
              </div>
              <p className={`text-xs text-center ${isActive ? "text-purple-100" : "text-gray-500 dark:text-gray-400"}`}>
                {panel.description}
              </p>
            </Button>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">85%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Progreso</div>
        </div>
        <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">4.8</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
        </div>
        <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">2h 15m</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Tiempo</div>
        </div>
        <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">92%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Completado</div>
        </div>
      </div>
    </div>
  )
}
