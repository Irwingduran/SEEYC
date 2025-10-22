"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, GripVertical, Edit, Trash2, Video, FileText, HelpCircle, Clock, BookOpen } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  type: "video" | "text" | "quiz" | "assignment"
  duration: number
  order: number
}

interface LessonOrganizerProps {
  lessons: Lesson[]
  onUpdate: (lessons: Lesson[]) => void
}

export function LessonOrganizer({ lessons, onUpdate }: LessonOrganizerProps) {
  const [isAddingLesson, setIsAddingLesson] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    type: "video" as const,
    duration: 0,
  })

  const addLesson = () => {
    const lesson: Lesson = {
      id: Date.now().toString(),
      ...newLesson,
      order: lessons.length + 1,
    }
    onUpdate([...lessons, lesson])
    setNewLesson({ title: "", description: "", type: "video", duration: 0 })
    setIsAddingLesson(false)
  }

  const updateLesson = (updatedLesson: Lesson) => {
    onUpdate(lessons.map((lesson) => (lesson.id === updatedLesson.id ? updatedLesson : lesson)))
    setEditingLesson(null)
  }

  const deleteLesson = (lessonId: string) => {
    onUpdate(lessons.filter((lesson) => lesson.id !== lessonId))
  }

  const moveLesson = (lessonId: string, direction: "up" | "down") => {
    const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId)
    if ((direction === "up" && lessonIndex > 0) || (direction === "down" && lessonIndex < lessons.length - 1)) {
      const newLessons = [...lessons]
      const targetIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1
      ;[newLessons[lessonIndex], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[lessonIndex]]

      // Update order numbers
      newLessons.forEach((lesson, index) => {
        lesson.order = index + 1
      })

      onUpdate(newLessons)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "text":
        return <FileText className="w-4 h-4" />
      case "quiz":
        return <HelpCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "text":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "quiz":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Organizador de Lecciones</h2>
          <p className="text-gray-600 dark:text-gray-300">Arrastra y organiza las lecciones de tu curso</p>
        </div>
        <Dialog open={isAddingLesson} onOpenChange={setIsAddingLesson}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Lección
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle>Crear Nueva Lección</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lesson-title">Título de la Lección</Label>
                <Input
                  id="lesson-title"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Introducción a los Circuitos Eléctricos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lesson-description">Descripción</Label>
                <Input
                  id="lesson-description"
                  value={newLesson.description}
                  onChange={(e) => setNewLesson((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Breve descripción de la lección..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lesson-type">Tipo de Contenido</Label>
                  <select
                    id="lesson-type"
                    value={newLesson.type}
                    onChange={(e) => setNewLesson((prev) => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                  >
                    <option value="video">Video</option>
                    <option value="text">Texto</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Tarea</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lesson-duration">Duración (minutos)</Label>
                  <Input
                    id="lesson-duration"
                    type="number"
                    value={newLesson.duration}
                    onChange={(e) =>
                      setNewLesson((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) || 0 }))
                    }
                    placeholder="15"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingLesson(false)}>
                  Cancelar
                </Button>
                <Button onClick={addLesson} disabled={!newLesson.title}>
                  Crear Lección
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lessons List */}
      {lessons.length === 0 ? (
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay lecciones aún</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Comienza agregando tu primera lección al curso</p>
            <Button onClick={() => setIsAddingLesson(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Crear Primera Lección
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveLesson(lesson.id, "up")}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => moveLesson(lesson.id, "down")}
                      disabled={index === lessons.length - 1}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Lesson Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-200">{lesson.order}</span>
                  </div>

                  {/* Lesson Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{lesson.title}</h3>
                      <Badge className={getTypeColor(lesson.type)}>
                        {getTypeIcon(lesson.type)}
                        <span className="ml-1 capitalize">{lesson.type}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{lesson.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration} min
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingLesson(lesson)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteLesson(lesson.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Course Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-lg">Resumen del Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{lessons.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Lecciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {lessons.reduce((total, lesson) => total + lesson.duration, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Minutos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {lessons.filter((lesson) => lesson.type === "video").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {lessons.filter((lesson) => lesson.type === "quiz").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Quizzes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
