"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Video as VideoIcon, Upload, Link as LinkIcon, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VideoUploaderProps {
  content: {
    title: string
    videoUrl: string
    duration: string
    description: string
  }
  onChange: (content: any) => void
}

export function VideoUploader({ content, onChange }: VideoUploaderProps) {
  const [title, setTitle] = useState(content?.title || "")
  const [videoUrl, setVideoUrl] = useState(content?.videoUrl || "")
  const [duration, setDuration] = useState(content?.duration || "")
  const [description, setDescription] = useState(content?.description || "")
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (field: string, value: string) => {
    const updated = { title, videoUrl, duration, description, [field]: value }
    onChange(updated)

    switch (field) {
      case "title":
        setTitle(value)
        break
      case "videoUrl":
        setVideoUrl(value)
        break
      case "duration":
        setDuration(value)
        break
      case "description":
        setDescription(value)
        break
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    console.log("Archivos de video:", files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      console.log("Archivo de video seleccionado:", files[0])
      const mockUrl = URL.createObjectURL(files[0])
      handleChange("videoUrl", mockUrl)
    }
  }

  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }
    // Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0]
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url
    }
    return url
  }

  const isEmbeddable = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agregar Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="video-title">Título de la Lección</Label>
            <Input
              id="video-title"
              placeholder="Ej: Instalación de Sistemas Trifásicos"
              value={title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Tabs para subir o URL */}
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">URL de Video</TabsTrigger>
              <TabsTrigger value="upload">Subir Archivo</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-url">URL del Video</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="video-url"
                      placeholder="https://youtube.com/watch?v=... o https://vimeo.com/..."
                      value={videoUrl}
                      onChange={(e) => handleChange("videoUrl", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Soporta URLs de YouTube y Vimeo
                </p>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              {/* Zona de drag & drop */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <VideoIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra un video aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground mb-4">MP4, WebM, MOV hasta 500MB</p>
                <input
                  type="file"
                  id="video-upload"
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileSelect}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("video-upload")?.click()}
                  type="button"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Seleccionar Video
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Duración */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duración (opcional)</Label>
            <Input
              id="duration"
              placeholder="Ej: 15:30 o 15 minutos"
              value={duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="video-description">Descripción del Video (opcional)</Label>
            <Textarea
              id="video-description"
              placeholder="Explica qué se enseña en este video y los puntos clave..."
              rows={4}
              value={description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Vista previa */}
          {videoUrl && (
            <div className="space-y-2">
              <Label>Vista Previa</Label>
              <div className="border rounded-lg p-4 bg-background">
                <div className="relative max-w-2xl mx-auto">
                  {isEmbeddable(videoUrl) ? (
                    <div className="aspect-video">
                      <iframe
                        src={getEmbedUrl(videoUrl)}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <video
                        src={videoUrl}
                        controls
                        className="w-full h-full rounded-lg"
                        onError={(e) => {
                          console.error("Error al cargar video")
                        }}
                      >
                        Tu navegador no soporta el elemento de video.
                      </video>
                    </div>
                  )}
                  {title && (
                    <h3 className="text-lg font-semibold mt-4">{title}</h3>
                  )}
                  {duration && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Duración: {duration}
                    </p>
                  )}
                </div>
                {description && (
                  <div className="mt-4 text-sm">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
