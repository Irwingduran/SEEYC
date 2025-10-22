"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  CheckCircle,
  Circle,
  Bookmark,
  BookmarkCheck,
  Download,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseNavigationProps {
  course: any
  lessons: Array<{
    id: number
    title: string
    duration: string
    completed: boolean
    current?: boolean
  }>
  currentLesson: number
  isOpen: boolean
  onToggle: () => void
  onLessonSelect: (index: number) => void
}

export function CourseNavigation({
  course,
  lessons,
  currentLesson,
  isOpen,
  onToggle,
  onLessonSelect,
}: CourseNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarkedLessons, setBookmarkedLessons] = useState<number[]>([1, 3])

  const filteredLessons = lessons.filter((lesson) => lesson.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const completedLessons = lessons.filter((l) => l.completed).length
  const totalProgress = (completedLessons / lessons.length) * 100

  const toggleBookmark = (lessonId: number) => {
    setBookmarkedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId],
    )
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-white/20 transition-all duration-300 z-40",
        isOpen ? "w-80" : "w-16",
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-3 top-6 z-50 bg-white dark:bg-slate-800 border border-white/20 rounded-full p-2 shadow-lg"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </Button>

      {isOpen ? (
        <div className="p-6 h-full flex flex-col">
          {/* Course Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{course.title}</h2>
            <div className="space-y-2">
              <Progress value={totalProgress} className="h-2" />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  {completedLessons} de {lessons.length} lecciones
                </span>
                <span>{Math.round(totalProgress)}% completado</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar lecciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20"
            />
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredLessons.map((lesson, index) => {
              const isActive = index === currentLesson
              const isBookmarked = bookmarkedLessons.includes(lesson.id)

              return (
                <div
                  key={lesson.id}
                  className={cn(
                    "group relative p-3 rounded-lg cursor-pointer transition-all duration-200",
                    isActive
                      ? "bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700"
                      : "hover:bg-gray-50 dark:hover:bg-slate-800/50",
                  )}
                  onClick={() => onLessonSelect(index)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : isActive ? (
                        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>

                    {/* Lesson Content */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={cn(
                          "text-sm font-medium line-clamp-2 mb-1",
                          isActive ? "text-purple-900 dark:text-purple-100" : "text-gray-900 dark:text-white",
                        )}
                      >
                        {lesson.title}
                      </h4>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleBookmark(lesson.id)
                            }}
                            className="p-1 h-auto"
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-3 h-3 text-purple-500" />
                            ) : (
                              <Bookmark className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r" />}
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Download className="w-3 h-3 mr-1" />
                Descargar
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <BookOpen className="w-3 h-3 mr-1" />
                Materiales
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 h-full flex flex-col items-center">
          <Button variant="ghost" size="sm" className="mb-4 p-2">
            <BookOpen className="w-5 h-5" />
          </Button>

          {/* Mini Progress */}
          <div className="w-8 h-32 bg-gray-200 dark:bg-gray-700 rounded-full relative mb-4">
            <div
              className="absolute bottom-0 left-0 right-0 bg-purple-500 rounded-full transition-all duration-300"
              style={{ height: `${totalProgress}%` }}
            />
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {completedLessons}/{lessons.length}
          </div>
        </div>
      )}
    </div>
  )
}
