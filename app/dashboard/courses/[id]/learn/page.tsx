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
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { ContentProtection } from "@/components/content-protection"
import { SecureEvaluationSystem } from "@/components/secure-evaluation-system"
import { Evaluation } from "@/types/evaluation"
import { getEnrolledCourse, updateProgress } from "@/lib/user-service"
import { getCourseById, getEvaluationByLessonId, getEvaluationTokenForStudent } from "@/lib/course-service"
import { getCourseContentForStudent } from "@/lib/course-versioning"
import { VideoPlayer } from "@/components/video-player"

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "document" | "quiz"
  completed: boolean
  locked: boolean
  content?: string
  videoUrl?: string
  description?: string
  resources?: Resource[]
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
  url?: string
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
  const [courseProgress, setCourseProgress] = useState(0)
  const [courseTitle, setCourseTitle] = useState("")
  const [modules, setModules] = useState<Module[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [evaluationToken, setEvaluationToken] = useState<string>("")

  useEffect(() => {
    const loadCourseData = async () => {
      const id = Number(courseId)
      const enrolled = await getEnrolledCourse(id)
      const course = await getCourseById(id)

      let modulesToUse: any[] = []

      if (enrolled) {
        setCourseProgress(enrolled.progress)
        
        // Try to get versioned content
        if (enrolled.courseVersionId) {
          const versionContent = await getCourseContentForStudent(id, enrolled.courseVersionId)
          if (versionContent) {
            modulesToUse = versionContent.modules
            console.log(`Loaded version ${versionContent.version} for student`)
          }
        }
      }

      // Fallback to current course modules if no versioned content found
      if (modulesToUse.length === 0 && course) {
        modulesToUse = course.modules
      }

      if (course) {
        setCourseTitle(course.title)
        // Map modules
        const mappedModules: Module[] = modulesToUse.map(m => ({
          id: m.id,
          title: m.title,
          lessons: m.lessons.map((l: any) => ({
            id: l.id,
            title: l.title,
            duration: l.duration || "10 min",
            type: l.type === "text" ? "document" : l.type as any,
            completed: false, // TODO: track completion
            locked: false, // TODO: track locking
            content: l.content,
            videoUrl: l.videoUrl,
            description: l.description,
            resources: l.resources?.map((r: any) => ({
              id: r.id,
              title: r.title,
              type: r.type,
              size: r.size || "Unknown",
              url: r.url
            }))
          }))
        }))
        setModules(mappedModules)
      }
    }
    loadCourseData()
  }, [courseId])

  useEffect(() => {
    const loadEvaluation = async () => {
      const currentLesson = modules.flatMap(m => m.lessons).find(l => l.id === currentLessonId)
      if (currentLesson?.type === 'quiz') {
        const evalData = await getEvaluationByLessonId(currentLessonId)
        if (evalData) {
           setEvaluation(evalData)
           // Generate token for this student/evaluation
           const token = await getEvaluationTokenForStudent(evalData.id, "student-1") // TODO: Use real student ID
           setEvaluationToken(token)
        }
      } else {
        setEvaluation(null)
        setEvaluationToken("")
      }
    }
    if (modules.length > 0) {
        loadEvaluation()
    }
  }, [currentLessonId, modules])

  // Mock evaluation data removed in favor of dynamic loading

  // Mock data
  const course = {
    title: courseTitle || "Cargando...",
    totalLessons: modules.reduce((acc, m) => acc + m.lessons.length, 0),
    completedLessons: Math.floor((courseProgress / 100) * modules.reduce((acc, m) => acc + m.lessons.length, 0)),
    progress: courseProgress,
  }

  const currentLesson = modules.length > 0 
    ? (modules.flatMap((m) => m.lessons).find((l) => l.id === currentLessonId) || modules[0].lessons[0])
    : null

  const allLessons = modules.flatMap((m) => m.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId)
  const nextLesson = allLessons[currentIndex + 1]
  const prevLesson = allLessons[currentIndex - 1]

  if (!currentLesson) {
    return <div className="flex items-center justify-center min-h-screen">Cargando contenido...</div>
  }

  const resources: Resource[] = currentLesson.resources || []

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

  const handleMarkComplete = async () => {
    toast.success("¡Lección completada!")
    
    // Calcular nuevo progreso (simulado)
    const newProgress = Math.min(courseProgress + 5, 100)
    setCourseProgress(newProgress)
    
    // Encontrar siguiente lección
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId)
    const nextLesson = allLessons[currentIndex + 1]
    
    await updateProgress(
      Number(courseId), 
      newProgress, 
      nextLesson?.id,
      nextLesson?.title
    )
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

  const handleTimeUpdate = (time: number) => {
    // Track time
  }

  const handleQuizTrigger = () => {
    toast.info("Quiz triggered!")
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
          <ContentProtection>
            <div className="max-w-6xl mx-auto p-6 space-y-6">
              {currentLesson.type === "quiz" ? (
                evaluation && evaluationToken ? (
                  <SecureEvaluationSystem
                    evaluation={evaluation}
                    studentId="student-1"
                    courseId={Number(courseId)}
                    courseVersionId={1}
                    token={evaluationToken}
                    onComplete={(score, passed) => {
                      if (passed) {
                        toast.success(`¡Felicidades! Aprobaste con ${score}%`)
                        handleMarkComplete()
                      } else {
                        toast.error(`No aprobado. Calificación: ${score}%`)
                      }
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )
              ) : (
                <>
                  {/* Video/Content Player */}
                  <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg overflow-hidden">
                    {currentLesson.type === "video" ? (
                      <div className="aspect-video bg-black">
                        <VideoPlayer
                          lesson={currentLesson}
                          src={currentLesson.videoUrl}
                          onComplete={handleMarkComplete}
                          onQuizTrigger={handleQuizTrigger}
                          onTimeUpdate={handleTimeUpdate}
                          isFullscreen={isFullscreen}
                          onFullscreenChange={setIsFullscreen}
                        />
                      </div>
                    ) : (
                      <div className="min-h-[400px] p-8 bg-white dark:bg-slate-900">
                        {currentLesson.content ? (
                          <div 
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <FileText className="h-16 w-16 mb-4 opacity-20" />
                            <p>Contenido de lectura</p>
                          </div>
                        )}
                      </div>
                    )}
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
                              {currentLesson.description || "Sin descripción disponible para esta lección."}
                            </p>
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
                          <h3 className="text-xl font-bold mb-4">
                            Mis notas de esta lección
                          </h3>
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
                                <span className="text-xs text-muted-foreground">
                                  Hace 2 días
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Los PLCs evolucionaron desde relés mecánicos. Importante
                                recordar la diferencia entre PLC y microcontrolador.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          </ContentProtection>
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
