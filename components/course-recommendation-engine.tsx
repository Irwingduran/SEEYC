"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course-card"
import { coursesData, type Course } from "@/lib/course-data"
import { Sparkles, TrendingUp, Users, Clock } from "lucide-react"

interface RecommendationEngine {
  personalizedRecommendations: Course[]
  trendingCourses: Course[]
  similarCourses: Course[]
  completionBasedRecommendations: Course[]
}

interface CourseRecommendationEngineProps {
  userId?: string
  currentCourseId?: string
  userPreferences?: {
    categories: string[]
    level: string
    completedCourses: string[]
  }
}

export function CourseRecommendationEngine({
  userId,
  currentCourseId,
  userPreferences,
}: CourseRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<RecommendationEngine>({
    personalizedRecommendations: [],
    trendingCourses: [],
    similarCourses: [],
    completionBasedRecommendations: [],
  })
  const [activeTab, setActiveTab] = useState<keyof RecommendationEngine>("personalizedRecommendations")

  useEffect(() => {
    generateRecommendations()
  }, [userId, currentCourseId, userPreferences])

  const generateRecommendations = () => {
    // Personalized recommendations based on user preferences and history
    const personalizedRecommendations = coursesData
      .filter((course) => {
        if (!userPreferences) return true
        const matchesCategory =
          userPreferences.categories.length === 0 || userPreferences.categories.includes(course.category)
        const matchesLevel = !userPreferences.level || course.level === userPreferences.level
        const notCompleted = !userPreferences.completedCourses.includes(course.id)
        return matchesCategory && matchesLevel && notCompleted
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)

    // Trending courses based on student count and rating
    const trendingCourses = coursesData.sort((a, b) => b.students * b.rating - a.students * a.rating).slice(0, 6)

    // Similar courses based on current course category
    const currentCourse = coursesData.find((c) => c.id === currentCourseId)
    const similarCourses = currentCourse
      ? coursesData
          .filter((course) => course.category === currentCourse.category && course.id !== currentCourseId)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6)
      : []

    // Completion-based recommendations (next level courses)
    const completionBasedRecommendations = userPreferences?.completedCourses.length
      ? coursesData
          .filter((course) => {
            const completedCategories = userPreferences.completedCourses
              .map((id) => coursesData.find((c) => c.id === id)?.category)
              .filter(Boolean)
            return (
              completedCategories.includes(course.category) &&
              course.level === "Avanzado" &&
              !userPreferences.completedCourses.includes(course.id)
            )
          })
          .slice(0, 6)
      : []

    setRecommendations({
      personalizedRecommendations,
      trendingCourses,
      similarCourses,
      completionBasedRecommendations,
    })
  }

  const tabs = [
    {
      key: "personalizedRecommendations" as const,
      label: "Para Ti",
      icon: Sparkles,
      description: "Cursos seleccionados según tus intereses",
    },
    {
      key: "trendingCourses" as const,
      label: "Tendencias",
      icon: TrendingUp,
      description: "Los cursos más populares",
    },
    {
      key: "similarCourses" as const,
      label: "Similares",
      icon: Users,
      description: "Relacionados con tu curso actual",
    },
    {
      key: "completionBasedRecommendations" as const,
      label: "Siguiente Nivel",
      icon: Clock,
      description: "Avanza en tu especialización",
    },
  ]

  const activeRecommendations = recommendations[activeTab]

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>Recomendaciones de Cursos</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recommendation Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            const hasRecommendations = recommendations[tab.key].length > 0

            return (
              <Button
                key={tab.key}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                disabled={!hasRecommendations}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {hasRecommendations && (
                  <Badge variant="secondary" className="ml-1">
                    {recommendations[tab.key].length}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>

        {/* Active Tab Description */}
        <div className="text-sm text-muted-foreground">{tabs.find((tab) => tab.key === activeTab)?.description}</div>

        {/* Recommendations Grid */}
        {activeRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRecommendations.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="text-muted-foreground">No hay recomendaciones disponibles para esta categoría</div>
            <Button variant="outline" onClick={() => setActiveTab("trendingCourses")}>
              Ver Cursos Populares
            </Button>
          </div>
        )}

        {/* Recommendation Insights */}
        {activeRecommendations.length > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="text-sm space-y-2">
              <div className="font-medium">¿Por qué estos cursos?</div>
              <div className="text-muted-foreground">
                {activeTab === "personalizedRecommendations" &&
                  "Basado en tus preferencias de categoría y nivel de experiencia"}
                {activeTab === "trendingCourses" && "Los cursos con mayor demanda y mejores calificaciones"}
                {activeTab === "similarCourses" && "Cursos relacionados con el que estás viendo actualmente"}
                {activeTab === "completionBasedRecommendations" &&
                  "Cursos avanzados en áreas donde ya tienes experiencia"}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
