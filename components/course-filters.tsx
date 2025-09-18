"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { ScreenReaderOnly } from "@/components/screen-reader-only"

interface CourseFiltersProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string | null) => void
  onLevelFilter: (level: string | null) => void
  onPriceFilter: (priceRange: string | null) => void
  activeFilters: {
    category: string | null
    level: string | null
    priceRange: string | null
  }
}

const categories = [
  "Instalaciones Residenciales",
  "Sistemas Industriales",
  "Energías Renovables",
  "Automatización",
  "Seguridad Eléctrica",
  "Mantenimiento",
]

const levels = ["Principiante", "Intermedio", "Avanzado"]

const priceRanges = [
  { label: "Gratis", value: "free" },
  { label: "$1 - $50", value: "1-50" },
  { label: "$51 - $100", value: "51-100" },
  { label: "$101 - $200", value: "101-200" },
  { label: "$200+", value: "200+" },
]

export function CourseFilters({
  onSearch,
  onCategoryFilter,
  onLevelFilter,
  onPriceFilter,
  activeFilters,
}: CourseFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const clearFilter = (filterType: keyof typeof activeFilters) => {
    switch (filterType) {
      case "category":
        onCategoryFilter(null)
        break
      case "level":
        onLevelFilter(null)
        break
      case "priceRange":
        onPriceFilter(null)
        break
    }
  }

  const hasActiveFilters = Object.values(activeFilters).some((filter) => filter !== null)

  return (
    <div className="space-y-6" role="search" aria-label="Filtros de cursos">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <label htmlFor="course-search" className="sr-only">
          Buscar cursos
        </label>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          id="course-search"
          placeholder="Buscar cursos de electricidad..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background/60 backdrop-blur-sm border-border/40"
          aria-describedby="search-help"
        />
        <ScreenReaderOnly id="search-help">Escribe palabras clave para buscar cursos específicos</ScreenReaderOnly>
      </form>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4" role="group" aria-label="Controles de filtrado">
        <Select onValueChange={onCategoryFilter} value={activeFilters.category || ""}>
          <SelectTrigger
            className="w-[200px] bg-background/60 backdrop-blur-sm border-border/40"
            aria-label="Filtrar por categoría"
          >
            <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onLevelFilter} value={activeFilters.level || ""}>
          <SelectTrigger
            className="w-[150px] bg-background/60 backdrop-blur-sm border-border/40"
            aria-label="Filtrar por nivel"
          >
            <SelectValue placeholder="Nivel" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onPriceFilter} value={activeFilters.priceRange || ""}>
          <SelectTrigger
            className="w-[150px] bg-background/60 backdrop-blur-sm border-border/40"
            aria-label="Filtrar por precio"
          >
            <SelectValue placeholder="Precio" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2" role="region" aria-label="Filtros activos">
          <span className="text-sm text-muted-foreground">Filtros activos:</span>
          {activeFilters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {activeFilters.category}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => clearFilter("category")}
                aria-label={`Quitar filtro de categoría: ${activeFilters.category}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {activeFilters.level && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {activeFilters.level}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => clearFilter("level")}
                aria-label={`Quitar filtro de nivel: ${activeFilters.level}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {activeFilters.priceRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {priceRanges.find((r) => r.value === activeFilters.priceRange)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => clearFilter("priceRange")}
                aria-label={`Quitar filtro de precio: ${priceRanges.find((r) => r.value === activeFilters.priceRange)?.label}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
