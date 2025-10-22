"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  FileText,
  Image as ImageIcon,
  Video,
  CheckSquare,
  ClipboardList,
  Clock,
  BookOpen,
  Award,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  Home,
  Check,
  Circle,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Lesson {
  id: number
  title: string
  type: "text" | "image" | "video" | "quiz" | "form"
  content: any
  order: number
}

interface Module {
  id: number
  title: string
  description: string
  lessons: Lesson[]
  order: number
}

interface CoursePreviewProps {
  isOpen: boolean
  onClose: () => void
  courseData: {
    title: string
    subtitle: string
    description: string
    category: string
    level: string
    duration: string
    thumbnail: string
  }
  modules: Module[]
}

export function CoursePreview({
  isOpen,
  onClose,
  courseData,
  modules,
}: CoursePreviewProps) {
  const [selectedLesson, setSelectedLesson] = useState<{
    moduleId: number
    lessonId: number
  } | null>(null)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState<"home" | "lesson">("home")

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView("home")
      setSelectedLesson(null)
      setCompletedLessons(new Set())
    }
  }, [isOpen])

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "text":
        return FileText
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "quiz":
        return CheckSquare
      case "form":
        return ClipboardList
      default:
        return FileText
    }
  }

  const getLessonColor = (type: string) => {
    switch (type) {
      case "text":
        return "bg-blue-500"
      case "image":
        return "bg-green-500"
      case "video":
        return "bg-purple-500"
      case "quiz":
        return "bg-orange-500"
      case "form":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLessonBorderColor = (type: string) => {
    switch (type) {
      case "text":
        return "border-blue-500"
      case "image":
        return "border-green-500"
      case "video":
        return "border-purple-500"
      case "quiz":
        return "border-orange-500"
      case "form":
        return "border-pink-500"
      default:
        return "border-gray-500"
    }
  }

  const getTotalLessons = () => {
    return modules.reduce((total, module) => total + module.lessons.length, 0)
  }

  const getProgressPercentage = () => {
    const total = getTotalLessons()
    if (total === 0) return 0
    return Math.round((completedLessons.size / total) * 100)
  }

  const getSelectedLesson = () => {
    if (!selectedLesson) return null
    const module = modules.find((m) => m.id === selectedLesson.moduleId)
    if (!module) return null
    return module.lessons.find((l) => l.id === selectedLesson.lessonId)
  }

  const getCurrentModule = () => {
    if (!selectedLesson) return null
    return modules.find((m) => m.id === selectedLesson.moduleId)
  }

  const toggleLessonComplete = (lessonId: number) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId)
      } else {
        newSet.add(lessonId)
      }
      return newSet
    })
  }

  const goToNextLesson = () => {
    if (!selectedLesson) return

    const currentModule = modules.find((m) => m.id === selectedLesson.moduleId)
    if (!currentModule) return

    const currentLessonIndex = currentModule.lessons.findIndex(
      (l) => l.id === selectedLesson.lessonId
    )

    // Try next lesson in same module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setSelectedLesson({
        moduleId: currentModule.id,
        lessonId: currentModule.lessons[currentLessonIndex + 1].id,
      })
      return
    }

    // Try first lesson of next module
    const currentModuleIndex = modules.findIndex((m) => m.id === currentModule.id)
    if (currentModuleIndex < modules.length - 1) {
      const nextModule = modules[currentModuleIndex + 1]
      if (nextModule.lessons.length > 0) {
        setSelectedLesson({
          moduleId: nextModule.id,
          lessonId: nextModule.lessons[0].id,
        })
      }
    }
  }

  const goToPreviousLesson = () => {
    if (!selectedLesson) return

    const currentModule = modules.find((m) => m.id === selectedLesson.moduleId)
    if (!currentModule) return

    const currentLessonIndex = currentModule.lessons.findIndex(
      (l) => l.id === selectedLesson.lessonId
    )

    // Try previous lesson in same module
    if (currentLessonIndex > 0) {
      setSelectedLesson({
        moduleId: currentModule.id,
        lessonId: currentModule.lessons[currentLessonIndex - 1].id,
      })
      return
    }

    // Try last lesson of previous module
    const currentModuleIndex = modules.findIndex((m) => m.id === currentModule.id)
    if (currentModuleIndex > 0) {
      const prevModule = modules[currentModuleIndex - 1]
      if (prevModule.lessons.length > 0) {
        setSelectedLesson({
          moduleId: prevModule.id,
          lessonId: prevModule.lessons[prevModule.lessons.length - 1].id,
        })
      }
    }
  }

  const hasNextLesson = () => {
    if (!selectedLesson) return false
    const currentModule = modules.find((m) => m.id === selectedLesson.moduleId)
    if (!currentModule) return false

    const currentLessonIndex = currentModule.lessons.findIndex(
      (l) => l.id === selectedLesson.lessonId
    )
    const currentModuleIndex = modules.findIndex((m) => m.id === currentModule.id)

    return (
      currentLessonIndex < currentModule.lessons.length - 1 ||
      currentModuleIndex < modules.length - 1
    )
  }

  const hasPreviousLesson = () => {
    if (!selectedLesson) return false
    const currentModule = modules.find((m) => m.id === selectedLesson.moduleId)
    if (!currentModule) return false

    const currentLessonIndex = currentModule.lessons.findIndex(
      (l) => l.id === selectedLesson.lessonId
    )
    const currentModuleIndex = modules.findIndex((m) => m.id === currentModule.id)

    return currentLessonIndex > 0 || currentModuleIndex > 0
  }

  const startLesson = (moduleId: number, lessonId: number) => {
    setSelectedLesson({ moduleId, lessonId })
    setCurrentView("lesson")
  }

  const renderMarkdownText = (text: string) => {
    if (!text) return null

    // Simple markdown parsing
    let formatted = text
      .split("\n")
      .map((line) => {
        // Headers
        if (line.startsWith("### ")) {
          return `<h3 class="text-lg font-semibold mt-4 mb-2">${line.replace("### ", "")}</h3>`
        }
        if (line.startsWith("## ")) {
          return `<h2 class="text-xl font-semibold mt-5 mb-3">${line.replace("## ", "")}</h2>`
        }
        if (line.startsWith("# ")) {
          return `<h1 class="text-2xl font-bold mt-6 mb-4">${line.replace("# ", "")}</h1>`
        }

        // Lists
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return `<li class="ml-6 list-disc">${line.replace(/^[-*] /, "")}</li>`
        }
        if (line.match(/^\d+\. /)) {
          return `<li class="ml-6 list-decimal">${line.replace(/^\d+\. /, "")}</li>`
        }

        // Bold and italic
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
        line = line.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')

        // Code
        line = line.replace(/`(.+?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')

        // Empty lines
        if (line.trim() === "") {
          return '<div class="h-4"></div>'
        }

        return `<p class="mb-3 leading-relaxed">${line}</p>`
      })
      .join("")

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />
  }

  const renderLessonContent = (lesson: Lesson) => {
    const currentLesson = getSelectedLesson()
    const isCompleted = completedLessons.has(lesson.id)

    switch (lesson.type) {
      case "text":
        return (
          <div className="space-y-6">
            {lesson.content.title && (
              <div>
                <h1 className="text-3xl font-bold mb-2">{lesson.content.title}</h1>
                <Separator className="mt-4" />
              </div>
            )}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {renderMarkdownText(lesson.content.body)}
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-6">
            {lesson.content.title && (
              <div>
                <h1 className="text-3xl font-bold mb-2">{lesson.content.title}</h1>
                <Separator className="mt-4" />
              </div>
            )}
            {lesson.content.imageUrl && (
              <Card className="overflow-hidden border-2">
                <CardContent className="p-0">
                  <img
                    src={lesson.content.imageUrl}
                    alt={lesson.content.caption || lesson.content.title}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            )}
            {lesson.content.caption && (
              <p className="text-center text-muted-foreground italic text-sm">
                {lesson.content.caption}
              </p>
            )}
            {lesson.content.description && (
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="leading-relaxed">{lesson.content.description}</p>
              </div>
            )}
          </div>
        )

      case "video":
        const isEmbeddable = (url: string) => {
          return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com")
        }

        const getEmbedUrl = (url: string) => {
          if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.includes("youtu.be")
              ? url.split("youtu.be/")[1]?.split("?")[0]
              : url.split("v=")[1]?.split("&")[0]
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url
          }
          if (url.includes("vimeo.com")) {
            const videoId = url.split("vimeo.com/")[1]?.split("?")[0]
            return videoId ? `https://player.vimeo.com/video/${videoId}` : url
          }
          return url
        }

        return (
          <div className="space-y-6">
            {lesson.content.title && (
              <div>
                <h1 className="text-3xl font-bold mb-2">{lesson.content.title}</h1>
                <Separator className="mt-4" />
              </div>
            )}
            {lesson.content.videoUrl && (
              <Card className="overflow-hidden border-2">
                <CardContent className="p-0">
                  {isEmbeddable(lesson.content.videoUrl) ? (
                    <div className="aspect-video">
                      <iframe
                        src={getEmbedUrl(lesson.content.videoUrl)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-black">
                      <video src={lesson.content.videoUrl} controls className="w-full h-full">
                        Tu navegador no soporta el elemento de video.
                      </video>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            {lesson.content.duration && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Duración: {lesson.content.duration}</span>
              </div>
            )}
            {lesson.content.description && (
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="leading-relaxed">{lesson.content.description}</p>
              </div>
            )}
          </div>
        )

      case "quiz":
        return (
          <div className="space-y-6">
            {lesson.content.title && (
              <div>
                <h1 className="text-3xl font-bold mb-2">{lesson.content.title}</h1>
                <Separator className="mt-4" />
              </div>
            )}
            {lesson.content.description && (
              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-lg p-4">
                <p className="text-sm">{lesson.content.description}</p>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary" className="gap-1">
                <CheckSquare className="h-3 w-3" />
                {lesson.content.questions?.length || 0} preguntas
              </Badge>
              <Badge variant="outline">
                Aprueba con {lesson.content.passingScore || 70}%
              </Badge>
            </div>

            <div className="space-y-6">
              {lesson.content.questions?.map((question: any, qIndex: number) => (
                <Card key={qIndex} className="border-2">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-0.5">Pregunta {qIndex + 1}</Badge>
                      <p className="font-medium flex-1 text-lg">{question.question}</p>
                      <Badge variant="secondary" className="text-xs">
                        {question.points} pts
                      </Badge>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      {question.options?.map((option: string, oIndex: number) => (
                        <div
                          key={oIndex}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-muted/50",
                            question.correctAnswer === oIndex
                              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                              : "border-border"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center w-6 h-6 rounded-full border-2",
                              question.correctAnswer === oIndex
                                ? "border-green-600 bg-green-600"
                                : "border-muted-foreground"
                            )}
                          >
                            {question.correctAnswer === oIndex && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span className="flex-1">{option}</span>
                          {question.correctAnswer === oIndex && (
                            <Badge variant="outline" className="text-green-700 border-green-700">
                              Correcta
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-lg p-4">
                        <p className="text-sm font-medium mb-1">💡 Explicación:</p>
                        <p className="text-sm">{question.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "form":
        return (
          <div className="space-y-6">
            {lesson.content.title && (
              <div>
                <h1 className="text-3xl font-bold mb-2">{lesson.content.title}</h1>
                <Separator className="mt-4" />
              </div>
            )}
            {lesson.content.description && (
              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-lg p-4">
                <p className="text-sm">{lesson.content.description}</p>
              </div>
            )}

            <Card className="border-2">
              <CardContent className="pt-6">
                <form className="space-y-6">
                  {lesson.content.fields?.map((field: any, fIndex: number) => {
                    const FieldIcon = getLessonIcon("text")
                    return (
                      <div key={fIndex} className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === "text" && (
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            className="w-full p-3 border-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        )}
                        {field.type === "textarea" && (
                          <textarea
                            placeholder={field.placeholder}
                            rows={4}
                            className="w-full p-3 border-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          />
                        )}
                        {field.type === "select" && (
                          <select className="w-full p-3 border-2 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">Selecciona una opción</option>
                            {field.options?.map((option: string, i: number) => (
                              <option key={i} value={option}>
                                {option || `Opción ${i + 1}`}
                              </option>
                            ))}
                          </select>
                        )}
                        {field.type === "checkbox" && (
                          <div className="space-y-3">
                            {field.options?.map((option: string, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  id={`field-${fIndex}-option-${i}`}
                                  className="w-4 h-4 rounded border-2"
                                />
                                <label
                                  htmlFor={`field-${fIndex}-option-${i}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {option || `Opción ${i + 1}`}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {field.type === "radio" && (
                          <div className="space-y-3">
                            {field.options?.map((option: string, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name={`field-${fIndex}`}
                                  id={`field-${fIndex}-option-${i}`}
                                  className="w-4 h-4"
                                />
                                <label
                                  htmlFor={`field-${fIndex}-option-${i}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {option || `Opción ${i + 1}`}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  <Button type="button" size="lg" className="w-full">
                    {lesson.content.submitButtonText || "Enviar"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <p>Tipo de contenido no soportado</p>
    }
  }

  const renderHomeView = () => (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="space-y-6">
        {courseData.thumbnail ? (
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-2">
            <img
              src={courseData.thumbnail}
              alt={courseData.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 w-full">
                <h1 className="text-4xl font-bold text-white mb-2">{courseData.title}</h1>
                {courseData.subtitle && (
                  <p className="text-xl text-white/90">{courseData.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{courseData.title || "Vista Previa del Curso"}</h1>
            {courseData.subtitle && (
              <p className="text-2xl text-muted-foreground">{courseData.subtitle}</p>
            )}
          </div>
        )}

        {/* Course Metadata */}
        <div className="flex flex-wrap gap-3">
          {courseData.category && (
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              {courseData.category}
            </Badge>
          )}
          {courseData.level && (
            <Badge variant="outline" className="px-4 py-2 text-sm">
              {courseData.level}
            </Badge>
          )}
          {courseData.duration && (
            <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
              <Clock className="h-4 w-4" />
              {courseData.duration}
            </Badge>
          )}
          <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
            <BookOpen className="h-4 w-4" />
            {modules.length} {modules.length === 1 ? "módulo" : "módulos"}
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
            <PlayCircle className="h-4 w-4" />
            {getTotalLessons()} {getTotalLessons() === 1 ? "lección" : "lecciones"}
          </Badge>
        </div>
      </div>

      {/* Description */}
      {courseData.description && (
        <Card className="border-2">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">Acerca de este curso</h2>
            <p className="text-muted-foreground leading-relaxed">{courseData.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Course Content */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Contenido del Curso</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {modules.map((module, moduleIndex) => {
            const moduleLessons = module.lessons.length
            const completedInModule = module.lessons.filter((l) =>
              completedLessons.has(l.id)
            ).length

            return (
              <AccordionItem
                key={module.id}
                value={`module-${module.id}`}
                className="border-2 rounded-lg bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-4 text-left w-full">
                    <Badge variant="outline" className="mt-1 px-3">
                      {moduleIndex + 1}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{module.title}</h3>
                      {module.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {module.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{moduleLessons} lecciones</span>
                        {completedInModule > 0 && (
                          <span className="text-green-600 dark:text-green-400">
                            {completedInModule} completadas
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-2 mt-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const LessonIcon = getLessonIcon(lesson.type)
                      const isCompleted = completedLessons.has(lesson.id)

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => startLesson(module.id, lesson.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:bg-muted/50 hover:border-primary group"
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg text-white transition-transform group-hover:scale-110",
                              getLessonColor(lesson.type)
                            )}
                          >
                            <LessonIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="font-medium text-sm truncate">
                              {lessonIndex + 1}. {lesson.title || `Lección ${lessonIndex + 1}`}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {lesson.type === "text" && "Contenido de texto"}
                              {lesson.type === "image" && "Imagen"}
                              {lesson.type === "video" && "Video"}
                              {lesson.type === "quiz" && "Cuestionario"}
                              {lesson.type === "form" && "Formulario"}
                            </p>
                          </div>
                          {isCompleted ? (
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                Completada
                              </span>
                            </div>
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      {/* Start Button */}
      {modules.length > 0 && modules[0].lessons.length > 0 && (
        <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">¿Listo para comenzar?</h3>
              <p className="text-sm text-muted-foreground">
                Inicia con la primera lección del curso
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => startLesson(modules[0].id, modules[0].lessons[0].id)}
              className="gap-2"
            >
              Comenzar Curso
              <PlayCircle className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderLessonView = () => {
    const lesson = getSelectedLesson()
    const module = getCurrentModule()
    if (!lesson || !module) return null

    const isCompleted = completedLessons.has(lesson.id)

    return (
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Inicio del curso</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{module.title}</span>
          </button>
        </div>

        {/* Lesson Content */}
        <div className="mb-8">{renderLessonContent(lesson)}</div>

        {/* Lesson Actions */}
        <Card className="border-2 sticky bottom-0 bg-background/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={goToPreviousLesson}
                disabled={!hasPreviousLesson()}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>

              <Button
                variant={isCompleted ? "outline" : "default"}
                onClick={() => toggleLessonComplete(lesson.id)}
                className="gap-2"
              >
                {isCompleted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Completada
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" />
                    Marcar como completada
                  </>
                )}
              </Button>

              <Button
                onClick={goToNextLesson}
                disabled={!hasNextLesson()}
                className="gap-2"
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] w-[98vw] h-[98vh] p-0 gap-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b bg-background sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">{courseData.title || "Vista Previa del Curso"}</h2>
              {currentView === "lesson" && (
                <Badge variant="secondary" className="gap-1">
                  <BookOpen className="h-3 w-3" />
                  Modo Estudiante
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              {getProgressPercentage() > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Progreso:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={getProgressPercentage()} className="w-24 h-2" />
                    <span className="font-medium min-w-[3ch] text-right">
                      {getProgressPercentage()}%
                    </span>
                  </div>
                </div>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
            {currentView === "home" ? renderHomeView() : renderLessonView()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
