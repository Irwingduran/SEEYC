"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Video, Play, Settings, Trash2, FileVideo, CheckCircle, AlertCircle, Eye } from "lucide-react"

interface VideoFile {
  id: string
  name: string
  size: number
  duration: number
  status: "uploading" | "processing" | "ready" | "error"
  progress: number
  url?: string
  thumbnail?: string
}

export function VideoUploader() {
  const [videos, setVideos] = useState<VideoFile[]>([])
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const videoFile: VideoFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          duration: 0,
          status: "uploading",
          progress: 0,
        }

        setVideos((prev) => [...prev, videoFile])

        // Simulate upload progress
        simulateUpload(videoFile.id)
      })
    }
  }

  const simulateUpload = (videoId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        setVideos((prev) =>
          prev.map((video) =>
            video.id === videoId
              ? {
                  ...video,
                  progress: 100,
                  status: "processing",
                  url: "/placeholder-video.mp4",
                  thumbnail: "/video-thumbnail.png",
                }
              : video,
          ),
        )

        // Simulate processing
        setTimeout(() => {
          setVideos((prev) =>
            prev.map((video) =>
              video.id === videoId
                ? { ...video, status: "ready", duration: Math.floor(Math.random() * 600) + 60 }
                : video,
            ),
          )
        }, 2000)
      } else {
        setVideos((prev) => prev.map((video) => (video.id === videoId ? { ...video, progress } : video)))
      }
    }, 500)
  }

  const deleteVideo = (videoId: string) => {
    setVideos((prev) => prev.filter((video) => video.id !== videoId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
        return <Upload className="w-4 h-4 text-blue-600" />
      case "processing":
        return <Settings className="w-4 h-4 text-orange-600 animate-spin" />
      case "ready":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <FileVideo className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploading":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "processing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "ready":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "uploading":
        return "Subiendo"
      case "processing":
        return "Procesando"
      case "ready":
        return "Listo"
      case "error":
        return "Error"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestor de Videos</h2>
          <p className="text-gray-600 dark:text-gray-300">Sube y gestiona los videos de tus lecciones</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Subir Videos</TabsTrigger>
          <TabsTrigger value="library">Biblioteca ({videos.length})</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-600" />
                Subir Nuevos Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Arrastra videos aquí o haz clic para seleccionar
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Formatos soportados: MP4, MOV, AVI, WMV (máximo 500MB por archivo)
                </p>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar Videos
                  </label>
                </Button>
              </div>

              {/* Upload Guidelines */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Recomendaciones para Videos</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Resolución mínima: 720p (1280x720)</li>
                  <li>• Resolución recomendada: 1080p (1920x1080)</li>
                  <li>• Formato preferido: MP4 con codificación H.264</li>
                  <li>• Audio: AAC, 44.1kHz, estéreo</li>
                  <li>• Duración recomendada: 5-20 minutos por lección</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="mt-6">
          {videos.length === 0 ? (
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardContent className="p-12 text-center">
                <FileVideo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay videos aún</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Sube tu primer video para comenzar a crear contenido
                </p>
                <Button onClick={() => setActiveTab("upload")} className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Video
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    {/* Video Thumbnail */}
                    <div className="relative mb-4">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <Video className="w-8 h-8 text-gray-400" />
                        </div>
                      )}

                      {video.status === "ready" && (
                        <Button
                          size="sm"
                          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
                        >
                          <Play className="w-6 h-6" />
                        </Button>
                      )}

                      {video.duration > 0 && (
                        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                          {formatDuration(video.duration)}
                        </Badge>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{video.name}</h3>

                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(video.status)}>
                          {getStatusIcon(video.status)}
                          <span className="ml-1">{getStatusText(video.status)}</span>
                        </Badge>
                        <span className="text-xs text-gray-500">{formatFileSize(video.size)}</span>
                      </div>

                      {/* Upload Progress */}
                      {(video.status === "uploading" || video.status === "processing") && (
                        <div className="space-y-1">
                          <Progress value={video.progress} className="h-2" />
                          <p className="text-xs text-gray-500 text-center">
                            {video.status === "uploading" ? "Subiendo" : "Procesando"} {Math.round(video.progress)}%
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {video.status === "ready" && (
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            Ver
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteVideo(video.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Configuración de Videos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="video-quality" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Calidad de Video por Defecto
                  </Label>
                  <select id="video-quality" className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800">
                    <option value="720p">720p (HD)</option>
                    <option value="1080p">1080p (Full HD)</option>
                    <option value="auto">Automática</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="auto-play" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reproducción Automática
                  </Label>
                  <select id="auto-play" className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800">
                    <option value="disabled">Deshabilitada</option>
                    <option value="enabled">Habilitada</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="video-speed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Velocidades de Reproducción Disponibles
                  </Label>
                  <div className="mt-2 space-y-2">
                    {["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"].map((speed) => (
                      <label key={speed} className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span className="text-sm">{speed}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="video-controls" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Controles de Video
                  </Label>
                  <div className="mt-2 space-y-2">
                    {[
                      "Barra de progreso",
                      "Control de volumen",
                      "Pantalla completa",
                      "Subtítulos",
                      "Descargar video",
                    ].map((control) => (
                      <label key={control} className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span className="text-sm">{control}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Guardar Configuración
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
