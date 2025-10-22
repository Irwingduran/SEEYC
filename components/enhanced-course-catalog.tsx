"use client"

import { useState, useMemo } from "react"
import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { CourseRecommendationEngine } from "@/components/course-recommendation-engine"
import { coursesData } from "@/lib/course-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, TrendingUp, Award, Filter, Grid, List } from "lucide-react"

export function EnhancedCourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    category: null as string | null,
    level: null as string | null,
    priceRange: null as string | null,
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"rating" | "students" | "price" | "newest">("rating")

  // Mock user preferences for demonstration
  const userPreferences = {
    categories: ["Instalaciones Residenciales", "Automatización"],
    level: "Intermedio",
    completedCourses: ["1", "4"],
  }

  const filteredCourses = useMemo(() => {
    const filtered = coursesData.filter((course) => {
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

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "students":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "price":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "newest":
        // Mock newest sort - in real app would use creation date
        filtered.sort((a, b) => b.id.localeCompare(a.id))
        break
    }

    return filtered
  }, [searchQuery, activeFilters, sortBy])

  const stats = [
    { label: "Cursos Disponibles", value: coursesData.length, icon: BookOpen },
    { label: "Estudiantes Activos", value: "2,500+", icon: TrendingUp },
    { label: "Certificaciones", value: "50+", icon: Award },
  ]

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2 p-6 bg-card/60 backdrop-blur-sm rounded-lg shadow-lg">
            <stat.icon className="h-8 w-8 mx-auto text-primary" />
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Course Discovery Tabs */}
      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="catalog" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Catálogo Completo</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Recomendaciones</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-6">
          {/* Filters and Controls */}
          <div className="space-y-4">
            <CourseFilters
              onSearch={setSearchQuery}
              onCategoryFilter={(category) => setActiveFilters((prev) => ({ ...prev, category }))}
              onLevelFilter={(level) => setActiveFilters((prev) => ({ ...prev, level }))}
              onPriceFilter={(priceRange) => setActiveFilters((prev) => ({ ...prev, priceRange }))}
              activeFilters={activeFilters}
            />

            {/* View Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border rounded px-2 py-1 bg-background"
                  >
                    <option value="rating">Mejor calificados</option>
                    <option value="students">Más populares</option>
                    <option value="price">Precio (menor a mayor)</option>
                    <option value="newest">Más recientes</option>
                  </select>
                </div>
                <Badge variant="secondary">
                  {filteredCourses.length} resultado{filteredCourses.length !== 1 ? "s" : ""}
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Course Grid/List */}
          {filteredCourses.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
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
        </TabsContent>

        <TabsContent value="recommendations">
          <CourseRecommendationEngine userId="user-123" userPreferences={userPreferences} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
