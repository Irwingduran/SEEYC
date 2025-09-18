"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { coursesData } from "@/lib/course-data"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, Award } from "lucide-react"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    category: null as string | null,
    level: null as string | null,
    priceRange: null as string | null,
  })

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      // Search filter
      if (
        searchQuery &&
        !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (activeFilters.category && course.category !== activeFilters.category) {
        return false
      }

      // Level filter
      if (activeFilters.level && course.level !== activeFilters.level) {
        return false
      }

      // Price filter
      if (activeFilters.priceRange) {
        const price = course.price
        switch (activeFilters.priceRange) {
          case "free":
            if (price !== 0) return false
            break
          case "1-50":
            if (price < 1 || price > 50) return false
            break
          case "51-100":
            if (price < 51 || price > 100) return false
            break
          case "101-200":
            if (price < 101 || price > 200) return false
            break
          case "200+":
            if (price < 200) return false
            break
        }
      }

      return true
    })
  }, [searchQuery, activeFilters])

  const stats = [
    { label: "Cursos Disponibles", value: coursesData.length, icon: BookOpen },
    { label: "Estudiantes Activos", value: "2,500+", icon: TrendingUp },
    { label: "Certificaciones", value: "50+", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="space-y-6 mb-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">
              <span className="text-primary">Catálogo</span> de Cursos
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Descubre nuestra amplia selección de cursos especializados en sistemas eléctricos, desde instalaciones
              básicas hasta tecnologías avanzadas de automatización.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CourseFilters
            onSearch={setSearchQuery}
            onCategoryFilter={(category) => setActiveFilters((prev) => ({ ...prev, category }))}
            onLevelFilter={(level) => setActiveFilters((prev) => ({ ...prev, level }))}
            onPriceFilter={(priceRange) => setActiveFilters((prev) => ({ ...prev, priceRange }))}
            activeFilters={activeFilters}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold">Cursos Encontrados</h2>
              <Badge variant="secondary" className="text-sm">
                {filteredCourses.length} resultado{filteredCourses.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground">No se encontraron cursos</h3>
              <p className="text-muted-foreground">Intenta ajustar los filtros o buscar con términos diferentes.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
