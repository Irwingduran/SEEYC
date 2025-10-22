"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface CourseBasicInfoProps {
  data: any
  onUpdate: (data: any) => void
}

const categories = [
  "Instalaciones Eléctricas Residenciales",
  "Instalaciones Industriales",
  "Automatización y Control",
  "Energías Renovables",
  "Seguridad Eléctrica",
  "Mantenimiento Eléctrico",
  "Sistemas de Protección",
  "Motores Eléctricos",
]

const levels = [
  { value: "beginner", label: "Principiante" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzado" },
  { value: "expert", label: "Experto" },
]

export function CourseBasicInfo({ data, onUpdate }: CourseBasicInfoProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    tags: [],
    language: "es",
    duration: "",
    ...data,
  })

  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleInputChange("tags", [...formData.tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  return (
    <div className="space-y-6">
      {/* Course Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Título del Curso *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Ej: Instalaciones Eléctricas Residenciales Básicas"
          className="bg-white/50 dark:bg-gray-800/50 border-white/20"
        />
      </div>

      {/* Course Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripción del Curso *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe qué aprenderán los estudiantes en este curso..."
          rows={4}
          className="bg-white/50 dark:bg-gray-800/50 border-white/20"
        />
      </div>

      {/* Category and Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Categoría *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nivel *</Label>
          <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
            <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
              <SelectValue placeholder="Selecciona el nivel" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Duración Estimada (horas)
        </Label>
        <Input
          id="duration"
          type="number"
          value={formData.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          placeholder="Ej: 20"
          className="bg-white/50 dark:bg-gray-800/50 border-white/20"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Etiquetas</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Agregar etiqueta..."
            className="bg-white/50 dark:bg-gray-800/50 border-white/20"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Agregar
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 hover:text-purple-600">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
