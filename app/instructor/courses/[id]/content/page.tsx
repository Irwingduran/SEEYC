"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LessonOrganizer } from "@/components/content-builder/lesson-organizer"
import { RichTextEditor } from "@/components/content-builder/rich-text-editor"
import { VideoUploader } from "@/components/content-builder/video-uploader"
import { QuizBuilder } from "@/components/content-builder/quiz-builder"
import { AssignmentCreator } from "@/components/content-builder/assignment-creator"
import { Save, Eye, Settings, BookOpen, Video, HelpCircle, FileText } from "lucide-react"

export default function CourseContentPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("lessons")
  const [courseContent, setCourseContent] = useState({
    lessons: [],
    quizzes: [],
    assignments: [],
  })

  const handleSave = () => {
    console.log("[v0] Saving course content:", courseContent)
    // Save course content logic here
  }

  const handlePreview = () => {
    console.log("[v0] Opening course preview")
    // Preview course logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Constructor de Contenido</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organiza y crea el contenido de tu curso de capacitación eléctrica
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>

        {/* Content Builder Tabs */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100/50 dark:bg-gray-800/50">
                <TabsTrigger value="lessons" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Lecciones</span>
                </TabsTrigger>
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Editor</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">Videos</span>
                </TabsTrigger>
                <TabsTrigger value="quizzes" className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Quizzes</span>
                </TabsTrigger>
                <TabsTrigger value="assignments" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Tareas</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="mt-6">
                <LessonOrganizer
                  lessons={courseContent.lessons}
                  onUpdate={(lessons) => setCourseContent((prev) => ({ ...prev, lessons }))}
                />
              </TabsContent>

              <TabsContent value="editor" className="mt-6">
                <RichTextEditor />
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <VideoUploader />
              </TabsContent>

              <TabsContent value="quizzes" className="mt-6">
                <QuizBuilder
                  quizzes={courseContent.quizzes}
                  onUpdate={(quizzes) => setCourseContent((prev) => ({ ...prev, quizzes }))}
                />
              </TabsContent>

              <TabsContent value="assignments" className="mt-6">
                <AssignmentCreator
                  assignments={courseContent.assignments}
                  onUpdate={(assignments) => setCourseContent((prev) => ({ ...prev, assignments }))}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
