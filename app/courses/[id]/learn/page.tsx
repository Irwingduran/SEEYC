"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { VideoPlayer } from "@/components/video-player"
import { CourseNavigation } from "@/components/course-navigation"
import { InteractivePanel } from "@/components/interactive-panel"
import { ProgressBar } from "@/components/progress-bar"
import { QuizOverlay } from "@/components/quiz-overlay"
import { NotesPanel } from "@/components/notes-panel"
import { DiscussionPanel } from "@/components/discussion-panel"
import { courses } from "@/lib/course-data"

export default function CoursePlayerPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = courses.find((c) => c.id === courseId)

  const [currentLesson, setCurrentLesson] = useState(0)
  const [isNavigationOpen, setIsNavigationOpen] = useState(true)
  const [activePanel, setActivePanel] = useState<"notes" | "discussion" | "materials" | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!course) {
    return <div>Course not found</div>
  }

  const lessons = [
    { id: 1, title: "Introducción a Instalaciones Eléctricas", duration: "15:30", completed: true },
    { id: 2, title: "Herramientas y Equipos Básicos", duration: "22:45", completed: true },
    { id: 3, title: "Códigos y Normativas Eléctricas", duration: "18:20", completed: false, current: true },
    { id: 4, title: "Cálculo de Cargas Eléctricas", duration: "25:15", completed: false },
    { id: 5, title: "Instalación de Circuitos Básicos", duration: "30:00", completed: false },
  ]

  const handleLessonComplete = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
      setProgress(((currentLesson + 1) / lessons.length) * 100)
    }
  }

  const handleQuizTrigger = () => {
    setShowQuiz(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      <div className="flex h-screen">
        {/* Course Navigation Sidebar */}
        <CourseNavigation
          course={course}
          lessons={lessons}
          currentLesson={currentLesson}
          isOpen={isNavigationOpen}
          onToggle={() => setIsNavigationOpen(!isNavigationOpen)}
          onLessonSelect={setCurrentLesson}
        />

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isNavigationOpen ? "ml-80" : "ml-16"}`}>
          {/* Video Player */}
          <div className="flex-1 relative">
            <VideoPlayer
              lesson={lessons[currentLesson]}
              onComplete={handleLessonComplete}
              onQuizTrigger={handleQuizTrigger}
              onTimeUpdate={setPlaybackTime}
              isFullscreen={isFullscreen}
              onFullscreenChange={setIsFullscreen}
            />

            {/* Quiz Overlay */}
            {showQuiz && (
              <QuizOverlay
                onClose={() => setShowQuiz(false)}
                onComplete={() => {
                  setShowQuiz(false)
                  handleLessonComplete()
                }}
              />
            )}
          </div>

          {/* Interactive Panel */}
          <InteractivePanel activePanel={activePanel} onPanelChange={setActivePanel} lesson={lessons[currentLesson]} />
        </div>

        {/* Side Panels */}
        {activePanel === "notes" && (
          <NotesPanel
            lessonId={lessons[currentLesson].id}
            currentTime={playbackTime}
            onClose={() => setActivePanel(null)}
          />
        )}

        {activePanel === "discussion" && (
          <DiscussionPanel lessonId={lessons[currentLesson].id} onClose={() => setActivePanel(null)} />
        )}
      </div>
    </div>
  )
}
