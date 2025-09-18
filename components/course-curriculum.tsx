"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Play, FileText, Download, Clock, CheckCircle } from "lucide-react"

interface Module {
  id: string
  title: string
  duration: string
  lessons: Lesson[]
  isCompleted?: boolean
}

interface Lesson {
  id: string
  title: string
  type: "video" | "reading" | "quiz" | "assignment"
  duration: string
  isCompleted?: boolean
  isPreview?: boolean
}

interface CourseCurriculumProps {
  courseId: string
}

const curriculumData: Record<string, Module[]> = {
  "1": [
    {
      id: "module-1",
      title: "Introducción a las Instalaciones Eléctricas",
      duration: "2h 30m",
      lessons: [
        { id: "lesson-1", title: "Conceptos básicos de electricidad", type: "video", duration: "25m", isPreview: true },
        { id: "lesson-2", title: "Herramientas y materiales", type: "video", duration: "20m" },
        { id: "lesson-3", title: "Normas de seguridad", type: "reading", duration: "15m" },
        { id: "lesson-4", title: "Evaluación del módulo", type: "quiz", duration: "10m" },
      ],
    },
    {
      id: "module-2",
      title: "Circuitos Eléctricos Residenciales",
      duration: "3h 15m",
      lessons: [
        { id: "lesson-5", title: "Tipos de circuitos", type: "video", duration: "30m" },
        { id: "lesson-6", title: "Cálculo de cargas", type: "video", duration: "35m" },
        { id: "lesson-7", title: "Diseño de circuitos", type: "assignment", duration: "45m" },
        { id: "lesson-8", title: "Práctica de instalación", type: "video", duration: "45m" },
      ],
    },
    {
      id: "module-3",
      title: "Tableros y Protecciones",
      duration: "2h 45m",
      lessons: [
        { id: "lesson-9", title: "Componentes del tablero", type: "video", duration: "25m" },
        { id: "lesson-10", title: "Interruptores y fusibles", type: "video", duration: "30m" },
        { id: "lesson-11", title: "Conexión de protecciones", type: "video", duration: "40m" },
        { id: "lesson-12", title: "Pruebas y verificación", type: "video", duration: "30m" },
      ],
    },
  ],
}

const lessonIcons = {
  video: Play,
  reading: FileText,
  quiz: CheckCircle,
  assignment: Download,
}

export function CourseCurriculum({ courseId }: CourseCurriculumProps) {
  const [openModules, setOpenModules] = useState<string[]>(["module-1"])
  const modules = curriculumData[courseId] || []

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const totalDuration = modules.reduce((acc, module) => {
    const [hours, minutes] = module.duration.split("h ")
    const totalMinutes = Number.parseInt(hours) * 60 + Number.parseInt(minutes.replace("m", ""))
    return acc + totalMinutes
  }, 0)

  const totalHours = Math.floor(totalDuration / 60)
  const remainingMinutes = totalDuration % 60

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Contenido del Curso</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>
                {totalHours}h {remainingMinutes}m
              </span>
            </div>
            <Badge variant="secondary">{modules.length} módulos</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <Collapsible
            key={module.id}
            open={openModules.includes(module.id)}
            onOpenChange={() => toggleModule(module.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto bg-muted/50 hover:bg-muted/80 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {openModules.includes(module.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <div className="text-left">
                    <div className="font-medium">{module.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {module.lessons.length} lecciones • {module.duration}
                    </div>
                  </div>
                </div>
                {module.isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2 ml-4">
              {module.lessons.map((lesson) => {
                const Icon = lessonIcons[lesson.type]
                return (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-sm">{lesson.title}</div>
                        <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {lesson.isPreview && (
                        <Badge variant="outline" className="text-xs">
                          Vista previa
                        </Badge>
                      )}
                      {lesson.isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                )
              })}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
