"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Plus,
  GripVertical,
  FileText,
  Image as ImageIcon,
  Video,
  CheckSquare,
  ClipboardList,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { TextEditor } from "@/components/lesson-editors/text-editor"
import { ImageUploader } from "@/components/lesson-editors/image-uploader"
import { VideoUploader } from "@/components/lesson-editors/video-uploader"
import { QuizBuilder } from "@/components/lesson-editors/quiz-builder"
import { FormBuilder } from "@/components/lesson-editors/form-builder"

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

interface CourseContentBuilderProps {
  modules: Module[]
  setModules: (modules: Module[]) => void
}

export function CourseContentBuilder({ modules, setModules }: CourseContentBuilderProps) {
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [isAddingLesson, setIsAddingLesson] = useState(false)
  const [selectedLessonType, setSelectedLessonType] = useState<string>("")
  const [editingLesson, setEditingLesson] = useState<{
    moduleId: number
    lessonId: number
  } | null>(null)

  // Tipos de recursos disponibles
  const resourceTypes = [
    {
      type: "text",
      icon: FileText,
      title: "Contenido de Texto",
      description: "Agrega texto, instrucciones o información",
      color: "bg-blue-500",
    },
    {
      type: "image",
      icon: ImageIcon,
      title: "Imagen",
      description: "Sube imágenes, diagramas o infografías",
      color: "bg-green-500",
    },
    {
      type: "video",
      icon: Video,
      title: "Video",
      description: "Agrega videos educativos",
      color: "bg-purple-500",
    },
    {
      type: "quiz",
      icon: CheckSquare,
      title: "Cuestionario",
      description: "Crea evaluaciones de opción múltiple",
      color: "bg-orange-500",
    },
    {
      type: "form",
      icon: ClipboardList,
      title: "Formulario",
      description: "Crea formularios para ejercicios",
      color: "bg-pink-500",
    },
  ]

  const addLesson = (moduleId: number, type: string) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        const newLesson: Lesson = {
          id: Date.now(),
          title: `Nueva lección`,
          type: type as any,
          content: {},
          order: module.lessons.length,
        }
        return {
          ...module,
          lessons: [...module.lessons, newLesson],
        }
      }
      return module
    })
    setModules(updatedModules)
    setIsAddingLesson(false)
    setSelectedLessonType("")
  }

  const updateModuleTitle = (moduleId: number, title: string) => {
    const updatedModules = modules.map((module) =>
      module.id === moduleId ? { ...module, title } : module
    )
    setModules(updatedModules)
  }

  const updateModuleDescription = (moduleId: number, description: string) => {
    const updatedModules = modules.map((module) =>
      module.id === moduleId ? { ...module, description } : module
    )
    setModules(updatedModules)
  }

  const removeLesson = (moduleId: number, lessonId: number) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
        }
      }
      return module
    })
    setModules(updatedModules)
  }

  const removeModule = (moduleId: number) => {
    setModules(modules.filter((m) => m.id !== moduleId))
  }

  const moveModule = (moduleId: number, direction: "up" | "down") => {
    const index = modules.findIndex((m) => m.id === moduleId)
    if ((direction === "up" && index === 0) || (direction === "down" && index === modules.length - 1)) {
      return
    }

    const newModules = [...modules]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    ;[newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]]
    setModules(newModules)
  }

  const getLessonIcon = (type: string) => {
    const resource = resourceTypes.find((r) => r.type === type)
    return resource ? resource.icon : FileText
  }

  const getLessonColor = (type: string) => {
    const resource = resourceTypes.find((r) => r.type === type)
    return resource ? resource.color : "bg-gray-500"
  }

  const updateLessonContent = (moduleId: number, lessonId: number, content: any) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, content, title: content.title || lesson.title } : lesson
          ),
        }
      }
      return module
    })
    setModules(updatedModules)
  }

  const getEditingLesson = () => {
    if (!editingLesson) return null
    const module = modules.find((m) => m.id === editingLesson.moduleId)
    if (!module) return null
    return module.lessons.find((l) => l.id === editingLesson.lessonId)
  }

  const renderLessonEditor = () => {
    const lesson = getEditingLesson()
    if (!lesson) return null

    const handleChange = (content: any) => {
      updateLessonContent(editingLesson!.moduleId, editingLesson!.lessonId, content)
    }

    switch (lesson.type) {
      case "text":
        return <TextEditor content={lesson.content} onChange={handleChange} />
      case "image":
        return <ImageUploader content={lesson.content} onChange={handleChange} />
      case "video":
        return <VideoUploader content={lesson.content} onChange={handleChange} />
      case "quiz":
        return <QuizBuilder content={lesson.content} onChange={handleChange} />
      case "form":
        return <FormBuilder content={lesson.content} onChange={handleChange} />
      default:
        return <p>Editor no disponible para este tipo de recurso</p>
    }
  }

  return (
    <div className="space-y-4">
      {modules.map((module, moduleIndex) => (
        <Card key={module.id} className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 cursor-move"
                  disabled={moduleIndex === 0}
                  onClick={() => moveModule(module.id, "up")}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 cursor-move"
                  disabled={moduleIndex === modules.length - 1}
                  onClick={() => moveModule(module.id, "down")}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Input
                      value={module.title}
                      onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                      placeholder="Título del módulo"
                      className="text-lg font-semibold border-0 px-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{module.lessons.length} lecciones</Badge>
                    <Button variant="ghost" size="icon" onClick={() => removeModule(module.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <Textarea
                  value={module.description}
                  onChange={(e) => updateModuleDescription(module.id, e.target.value)}
                  placeholder="Descripción del módulo (opcional)"
                  className="border-0 px-0 focus-visible:ring-0 resize-none"
                  rows={2}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Lecciones existentes */}
            {module.lessons.length > 0 && (
              <div className="space-y-2">
                {module.lessons.map((lesson) => {
                  const LessonIcon = getLessonIcon(lesson.type)
                  const lessonColor = getLessonColor(lesson.type)

                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg ${lessonColor} text-white`}>
                        <LessonIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{lesson.type}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            setEditingLesson({ moduleId: module.id, lessonId: lesson.id })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeLesson(module.id, lesson.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Botón para agregar lección */}
            <Dialog open={isAddingLesson && selectedModule === module.id} onOpenChange={setIsAddingLesson}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={() => {
                    setSelectedModule(module.id)
                    setIsAddingLesson(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Lección / Recurso
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Recurso</DialogTitle>
                  <DialogDescription>
                    Selecciona el tipo de contenido que deseas agregar a este módulo
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  {resourceTypes.map((resource) => {
                    const Icon = resource.icon
                    return (
                      <Card
                        key={resource.type}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedLessonType === resource.type
                            ? "border-primary border-2"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedLessonType(resource.type)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-lg ${resource.color} text-white`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingLesson(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedLessonType && selectedModule) {
                        addLesson(selectedModule, selectedLessonType)
                      }
                    }}
                    disabled={!selectedLessonType}
                  >
                    Agregar Recurso
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}

      {/* Dialog para editar lección */}
      <Dialog open={!!editingLesson} onOpenChange={() => setEditingLesson(null)}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Editar Lección -{" "}
              {getEditingLesson()
                ? resourceTypes.find((r) => r.type === getEditingLesson()!.type)?.title
                : ""}
            </DialogTitle>
            <DialogDescription>
              Completa la información de tu lección y guarda los cambios
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">{renderLessonEditor()}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingLesson(null)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
