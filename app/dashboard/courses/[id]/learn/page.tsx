"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Video,
  FileText,
  CheckCircle,
  Lock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Download,
  Menu,
  X,
  Star,
  MessageSquare,
  FileDown,
  PlayCircle,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "document" | "quiz"
  completed: boolean
  locked: boolean
}

interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

interface Resource {
  id: number
  title: string
  type: string
  size: string
}

function LearnContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const courseId = params.id
  const lessonId = searchParams.get("lesson") || "1"

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2])
  const [currentLessonId, setCurrentLessonId] = useState(Number.parseInt(lessonId))
  const [userNote, setUserNote] = useState("")

  // Mock data
  const course = {
    title: "Automatización Industrial con PLC",
    totalLessons: 36,
    completedLessons: 8,
    progress: 22,
  }

  const modules: Module[] = [
    {
      id: 1,
      title: "Introducción a la Automatización Industrial",
      lessons: [
        { id: 1, title: "¿Qué es la automatización industrial?", duration: "15min", type: "video", completed: true, locked: false },
        { id: 2, title: "Historia y evolución de los PLCs", duration: "20min", type: "video", completed: true, locked: false },
        { id: 3, title: "Componentes de un sistema automatizado", duration: "25min", type: "video", completed: true, locked: false },
        { id: 4, title: "Quiz: Fundamentos", duration: "10min", type: "quiz", completed: true, locked: false },
      ],
    },
    {
      id: 2,
      title: "Hardware de PLCs",
      lessons: [
        { id: 5, title: "Arquitectura interna del PLC", duration: "30min", type: "video", completed: true, locked: false },
        { id: 6, title: "Módulos de entrada y salida", duration: "35min", type: "video", completed: true, locked: false },
        { id: 7, title: "Selección de hardware según aplicación", duration: "40min", type: "video", completed: true, locked: false },
        { id: 8, title: "Práctica: Identificación de componentes", duration: "30min", type: "document", completed: true, locked: false },
      ],
    },
    {
      id: 3,
      title: "Programación Ladder Básica",
      lessons: [
        { id: 9, title: "Introducción al lenguaje Ladder", duration: "25min", type: "video", completed: false, locked: false },
        { id: 10, title: "Instrucciones básicas: Contactos y bobinas", duration: "35min", type: "video", completed: false, locked: false },
        { id: 11, title: "Temporizadores y contadores", duration: "40min", type: "video", completed: false, locked: true },
        { id: 12, title: "Ejercicios prácticos", duration: "45min", type: "document", completed: false, locked: true },
      ],
    },
  ]

  const currentLesson = modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === currentLessonId) || modules[0].lessons[0]

  const allLessons = modules.flatMap((m) => m.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId)
  const nextLesson = allLessons[currentIndex + 1]
  const prevLesson = allLessons[currentIndex - 1]

  const resources: Resource[] = [
    { id: 1, title: "Guía de PLCs - Conceptos Básicos", type: "PDF", size: "2.5 MB" },
    { id: 2, title: "Diagramas Ladder - Ejemplos", type: "PDF", size: "1.8 MB" },
    { id: 3, title: "Código fuente - Ejercicio 1", type: "ZIP", size: "450 KB" },
  ]

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )
  }

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.locked) {
      toast.error("Completa las lecciones anteriores para desbloquear esta")
      return
    }
    setCurrentLessonId(lesson.id)
  }

  const handleMarkComplete = () => {
    toast.success("¡Lección completada!")
    // Aquí se actualizaría el progreso en el backend
  }

  const handleSaveNote = () => {
    toast.success("Nota guardada")
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "document":
        return FileText
      case "quiz":
        return CheckCircle
      default:
        return FileText
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Course Content Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-background border-r transition-all duration-300",
          sidebarOpen ? "w-80" : "w-0"
        )}
      >
        <div className={cn("flex flex-col h-full", !sidebarOpen && "hidden")}>
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <Link
                  href={`/dashboard/courses/${courseId}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Volver al curso
                </Link>
                <h2 className="font-bold mt-2 line-clamp-2">{course.title}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  {course.completedLessons} de {course.totalLessons} lecciones
                </span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto">
            {modules.map((module) => {
              const isExpanded = expandedModules.includes(module.id)
              const completedCount = module.lessons.filter((l) => l.completed).length

              return (
                <div key={module.id} className="border-b">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-sm mb-1">{module.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {completedCount}/{module.lessons.length} completadas
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-muted/30">
                      {module.lessons.map((lesson) => {
                        const Icon = getLessonIcon(lesson.type)
                        const isActive = lesson.id === currentLessonId

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            disabled={lesson.locked}
                            className={cn(
                              "w-full p-3 pl-6 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left",
                              isActive && "bg-primary/10 border-l-4 border-primary",
                              lesson.locked && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            ) : lesson.locked ? (
                              <Lock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            ) : (
                              <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-sm font-medium mb-1", isActive && "text-primary")}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("flex-1 flex flex-col transition-all duration-300", sidebarOpen && "ml-80")}>
        {/* Top Bar */}
        <div className="h-16 border-b bg-background flex items-center px-4 gap-4">
          {!sidebarOpen && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold truncate">{currentLesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              Lección {currentLessonId} de {course.totalLessons}
            </p>
          </div>
          <Button onClick={handleMarkComplete} variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar como completada
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Video/Content Player */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayCircle className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Reproductor de Video</p>
                  <p className="text-sm text-white/70 mt-2">
                    {currentLesson.type === "video" ? "Contenido de video aquí" : "Contenido del documento"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                disabled={!prevLesson}
                onClick={() => prevLesson && setCurrentLessonId(prevLesson.id)}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{currentLesson.type}</Badge>
                <Badge variant="outline">{currentLesson.duration}</Badge>
              </div>
              <Button
                disabled={!nextLesson || nextLesson.locked}
                onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
              >
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full max-w-2xl grid-cols-3">
                <TabsTrigger value="overview">Descripción</TabsTrigger>
                <TabsTrigger value="resources">Recursos</TabsTrigger>
                <TabsTrigger value="notes">Mis Notas</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Acerca de esta lección</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        En esta lección aprenderás los conceptos fundamentales de la automatización
                        industrial. Exploraremos qué es un sistema automatizado, sus componentes
                        principales y cómo se aplican en diferentes industrias.
                      </p>
                      <h4 className="font-semibold mt-6 mb-3">Lo que aprenderás:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Definición y alcance de la automatización industrial</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Componentes básicos de un sistema automatizado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>Aplicaciones en diferentes industrias</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Recursos de la lección</h3>
                    <div className="space-y-3">
                      {resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <FileDown className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {resource.type} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Mis notas de esta lección</h3>
                    <Textarea
                      placeholder="Escribe tus notas aquí..."
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      className="min-h-[200px] mb-4"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleSaveNote}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Guardar nota
                      </Button>
                    </div>

                    {/* Previous notes */}
                    <Separator className="my-6" />
                    <h4 className="font-semibold mb-3">Notas anteriores</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg border bg-background/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Lección 2</span>
                          <span className="text-xs text-muted-foreground">Hace 2 días</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Los PLCs evolucionaron desde relés mecánicos. Importante recordar la
                          diferencia entre PLC y microcontrolador.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function LearnPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <LearnContent />
      </SidebarProvider>
    </ErrorBoundary>
  )
}
