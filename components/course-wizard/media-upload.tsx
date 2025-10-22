"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, ImageIcon, Video, X, Check } from "lucide-react"

interface CourseMediaUploadProps {
  data: any
  onUpdate: (data: any) => void
}

export function CourseMediaUpload({ data, onUpdate }: CourseMediaUploadProps) {
  const [formData, setFormData] = useState({
    thumbnail: null,
    thumbnailPreview: "",
    previewVideo: null,
    previewVideoUrl: "",
    uploadProgress: 0,
    isUploading: false,
    ...data,
  })

  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleInputChange("thumbnail", file)
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange("thumbnailPreview", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleInputChange("previewVideo", file)
      handleInputChange("isUploading", true)

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        handleInputChange("uploadProgress", progress)
        if (progress >= 100) {
          clearInterval(interval)
          handleInputChange("isUploading", false)
          handleInputChange("previewVideoUrl", URL.createObjectURL(file))
        }
      }, 200)
    }
  }

  const removeThumbnail = () => {
    handleInputChange("thumbnail", null)
    handleInputChange("thumbnailPreview", "")
  }

  const removeVideo = () => {
    handleInputChange("previewVideo", null)
    handleInputChange("previewVideoUrl", "")
    handleInputChange("uploadProgress", 0)
  }

  return (
    <div className="space-y-6">
      {/* Course Thumbnail */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ImageIcon className="w-5 h-5 text-purple-600" />
            Miniatura del Curso
          </CardTitle>
          <CardDescription>Sube una imagen atractiva que represente tu curso (recomendado: 1280x720px)</CardDescription>
        </CardHeader>
        <CardContent>
          {!formData.thumbnailPreview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Arrastra y suelta una imagen aquí, o haz clic para seleccionar
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
                id="thumbnail-upload"
              />
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar Imagen
                </label>
              </Button>
            </div>
          ) : (
            <div className="relative">
              <img
                src={formData.thumbnailPreview || "/placeholder.svg"}
                alt="Course thumbnail"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button onClick={removeThumbnail} size="sm" variant="destructive" className="absolute top-2 right-2">
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Video */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Video className="w-5 h-5 text-blue-600" />
            Video de Vista Previa
          </CardTitle>
          <CardDescription>
            Sube un video corto (1-3 minutos) que muestre lo que aprenderán los estudiantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!formData.previewVideoUrl && !formData.isUploading ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Arrastra y suelta un video aquí, o haz clic para seleccionar
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Formatos soportados: MP4, MOV, AVI (máximo 100MB)
              </p>
              <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="video-upload" />
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar Video
                </label>
              </Button>
            </div>
          ) : formData.isUploading ? (
            <div className="p-8 text-center">
              <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-4">Subiendo video...</p>
              <Progress value={formData.uploadProgress} className="mb-2" />
              <p className="text-sm text-gray-500">{formData.uploadProgress}% completado</p>
            </div>
          ) : (
            <div className="relative">
              <video src={formData.previewVideoUrl} controls className="w-full h-64 rounded-lg" />
              <Button onClick={removeVideo} size="sm" variant="destructive" className="absolute top-2 right-2">
                <X className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2 mt-2 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm">Video subido exitosamente</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Guidelines */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg">Recomendaciones para Medios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Miniatura del Curso</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Resolución: 1280x720px (16:9)</li>
                <li>• Formato: JPG, PNG</li>
                <li>• Tamaño máximo: 2MB</li>
                <li>• Imagen clara y atractiva</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Video de Vista Previa</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Duración: 1-3 minutos</li>
                <li>• Formato: MP4, MOV, AVI</li>
                <li>• Tamaño máximo: 100MB</li>
                <li>• Calidad HD recomendada</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
