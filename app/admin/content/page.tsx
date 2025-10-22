"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File,
  Upload,
  Search,
  Grid3x3,
  List,
  Download,
  Trash2,
  Eye,
  MoreVertical,
  Clock,
  HardDrive,
  TrendingUp,
  Filter,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import React, { useState } from "react"
import { toast } from "sonner"
import type { MediaFile, MediaStats, MediaType } from "@/types/media"

type ViewMode = "grid" | "list"

function ContentLibraryContent() {
  const { isCollapsed } = useSidebar()
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<MediaType | "all">("all")
  const [sortBy, setSortBy] = useState("recent")

  // Upload dialog state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMetadata, setUploadMetadata] = useState({
    category: "",
    tags: "",
    description: "",
  })

  // Datos de ejemplo
  const mediaFiles: MediaFile[] = [
    {
      id: "1",
      name: "Introducción a PLCs - Video Tutorial.mp4",
      type: "video",
      format: "mp4",
      size: 125000000, // 125 MB
      url: "/videos/intro-plc.mp4",
      duration: 1240, // 20:40 min
      uploadedBy: {
        id: "1",
        name: "María González",
        avatar: "/avatar-1.jpg",
      },
      uploadedAt: "2024-01-20",
      usedInCourses: 3,
      tags: ["PLC", "Tutorial", "Introducción"],
      category: "Automatización",
      status: "ready",
    },
    {
      id: "2",
      name: "Manual Seguridad Eléctrica NOM.pdf",
      type: "document",
      format: "pdf",
      size: 8500000, // 8.5 MB
      url: "/docs/manual-seguridad.pdf",
      uploadedBy: {
        id: "1",
        name: "María González",
      },
      uploadedAt: "2024-01-18",
      usedInCourses: 5,
      tags: ["Seguridad", "Manual", "NOM"],
      category: "Seguridad",
      status: "ready",
    },
    {
      id: "3",
      name: "Diagrama Instalación Solar.jpg",
      type: "image",
      format: "jpg",
      size: 2300000, // 2.3 MB
      url: "/images/diagrama-solar.jpg",
      thumbnailUrl: "/images/diagrama-solar-thumb.jpg",
      uploadedBy: {
        id: "1",
        name: "María González",
      },
      uploadedAt: "2024-01-15",
      usedInCourses: 2,
      tags: ["Solar", "Diagrama", "Instalación"],
      category: "Energía Solar",
      status: "ready",
    },
    {
      id: "4",
      name: "Webinar Mantenimiento Industrial.mp4",
      type: "video",
      format: "mp4",
      size: 450000000, // 450 MB
      url: "/videos/webinar-mantenimiento.mp4",
      duration: 3600, // 1 hora
      uploadedBy: {
        id: "1",
        name: "María González",
      },
      uploadedAt: "2024-01-10",
      usedInCourses: 1,
      tags: ["Webinar", "Mantenimiento"],
      category: "Mantenimiento",
      status: "ready",
    },
    {
      id: "5",
      name: "Plantilla Certificado Curso.docx",
      type: "document",
      format: "docx",
      size: 150000, // 150 KB
      url: "/docs/plantilla-certificado.docx",
      uploadedBy: {
        id: "1",
        name: "María González",
      },
      uploadedAt: "2024-01-08",
      usedInCourses: 10,
      tags: ["Certificado", "Plantilla"],
      category: "Recursos",
      status: "ready",
    },
  ]

  const stats: MediaStats = {
    totalFiles: mediaFiles.length,
    totalSize: mediaFiles.reduce((sum, file) => sum + file.size, 0),
    byType: {
      videos: mediaFiles.filter((f) => f.type === "video").length,
      documents: mediaFiles.filter((f) => f.type === "document").length,
      images: mediaFiles.filter((f) => f.type === "image").length,
      audio: mediaFiles.filter((f) => f.type === "audio").length,
      other: mediaFiles.filter((f) => f.type === "other").length,
    },
    recentUploads: 2,
  }

  // Filtrar archivos
  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || file.type === selectedType
    return matchesSearch && matchesType
  })

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  // Formatear duración
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Obtener icono por tipo
  const getFileIcon = (type: MediaType) => {
    switch (type) {
      case "video":
        return <Video className="h-8 w-8" />
      case "document":
        return <FileText className="h-8 w-8" />
      case "image":
        return <ImageIcon className="h-8 w-8" />
      case "audio":
        return <Music className="h-8 w-8" />
      default:
        return <File className="h-8 w-8" />
    }
  }

  // Obtener color por tipo
  const getTypeColor = (type: MediaType) => {
    switch (type) {
      case "video":
        return "bg-purple-500/10 text-purple-700"
      case "document":
        return "bg-blue-500/10 text-blue-700"
      case "image":
        return "bg-green-500/10 text-green-700"
      case "audio":
        return "bg-orange-500/10 text-orange-700"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar "${fileName}"?`)) {
      return
    }

    toast.success("Archivo eliminado", {
      description: `${fileName} ha sido eliminado correctamente`,
    })
  }

  // Drag & drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...files])
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("No hay archivos seleccionados")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simular carga de archivos
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simular el tiempo de carga
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast.success("Archivos subidos exitosamente", {
      description: `${selectedFiles.length} archivo(s) han sido agregados a la biblioteca`,
    })

    // Limpiar estado
    setIsUploading(false)
    setUploadProgress(0)
    setSelectedFiles([])
    setUploadMetadata({ category: "", tags: "", description: "" })
    setUploadDialogOpen(false)
  }

  const getFileTypeFromExtension = (filename: string): MediaType => {
    const ext = filename.split(".").pop()?.toLowerCase()
    if (!ext) return "other"

    const videoExts = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
    const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"]
    const audioExts = ["mp3", "wav", "ogg", "m4a", "flac"]
    const docExts = ["pdf", "doc", "docx", "txt", "rtf", "odt"]

    if (videoExts.includes(ext)) return "video"
    if (imageExts.includes(ext)) return "image"
    if (audioExts.includes(ext)) return "audio"
    if (docExts.includes(ext)) return "document"
    return "other"
  }

  return (
    <>
      <AdminSidebar />

      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Biblioteca de Contenido
              </h1>
              <p className="text-muted-foreground text-lg">
                Gestiona videos, documentos e imágenes para tus cursos
              </p>
            </div>
            <Button size="sm" onClick={() => setUploadDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Subir Archivo
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <File className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+{stats.recentUploads}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total de Archivos</p>
                <p className="text-3xl font-bold">{stats.totalFiles}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Video className="h-5 w-5 text-purple-600" />
                </div>
                <Badge variant="secondary">{stats.byType.videos}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Videos</p>
                <p className="text-3xl font-bold">{stats.byType.videos}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                </div>
                <Badge variant="secondary">{stats.byType.images}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Imágenes</p>
                <p className="text-3xl font-bold">{stats.byType.images}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <HardDrive className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Espacio Usado</p>
                <p className="text-3xl font-bold">{formatFileSize(stats.totalSize)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Búsqueda */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar archivos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap lg:flex-nowrap gap-2">
                <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                  <SelectTrigger className="w-full lg:w-[160px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="document">Documentos</SelectItem>
                    <SelectItem value="image">Imágenes</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-[160px]">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="oldest">Más antiguos</SelectItem>
                    <SelectItem value="name">Nombre A-Z</SelectItem>
                    <SelectItem value="size">Tamaño</SelectItem>
                    <SelectItem value="usage">Más usados</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen de resultados */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{filteredFiles.length}</span> de{" "}
            <span className="font-semibold text-foreground">{mediaFiles.length}</span> archivos
          </p>
          {(searchQuery || selectedType !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedType("all")
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Grid de archivos */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card
                key={file.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/60 backdrop-blur-sm overflow-hidden"
              >
                {/* Preview */}
                <div className={`relative h-40 ${getTypeColor(file.type)} flex items-center justify-center`}>
                  <div className="text-muted-foreground">{getFileIcon(file.type)}</div>
                  {file.duration && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                      {formatDuration(file.duration)}
                    </Badge>
                  )}
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    {file.format.toUpperCase()}
                  </Badge>
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2">{file.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{file.usedInCourses} cursos</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(file.id, file.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Lista de archivos */
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-3 rounded-lg ${getTypeColor(file.type)}`}>
                      {getFileIcon(file.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{file.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <Badge variant="outline" className="text-xs">
                          {file.format.toUpperCase()}
                        </Badge>
                        <span>{formatFileSize(file.size)}</span>
                        {file.duration && <span>{formatDuration(file.duration)}</span>}
                        <span>•</span>
                        <span>Usado en {file.usedInCourses} cursos</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{file.uploadedAt}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(file.id, file.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {filteredFiles.length === 0 && (
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-12 text-center">
              <File className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron archivos</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || selectedType !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Comienza subiendo tu primer archivo"}
              </p>
              {!searchQuery && selectedType === "all" && (
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Archivo
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Subir Archivos</DialogTitle>
              <DialogDescription>
                Arrastra archivos aquí o haz clic para seleccionarlos
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="video/*,image/*,audio/*,.pdf,.doc,.docx,.txt"
                />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-1">
                  {isDragging ? "Suelta los archivos aquí" : "Arrastra archivos aquí"}
                </p>
                <p className="text-sm text-muted-foreground">
                  o haz clic para seleccionar archivos
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Formatos soportados: Videos, Imágenes, Audio, Documentos (PDF, DOC, DOCX)
                </p>
              </div>

              {/* Selected Files List */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Archivos seleccionados ({selectedFiles.length})
                  </Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedFiles.map((file, index) => {
                      const fileType = getFileTypeFromExtension(file.name)
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border"
                        >
                          <div className={`p-2 rounded-lg ${getTypeColor(fileType)}`}>
                            {getFileIcon(fileType)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {fileType}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFile(index)}
                            disabled={isUploading}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Metadata Inputs */}
              {selectedFiles.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select
                        value={uploadMetadata.category}
                        onValueChange={(value) =>
                          setUploadMetadata((prev) => ({ ...prev, category: value }))
                        }
                        disabled={isUploading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatizacion">Automatización</SelectItem>
                          <SelectItem value="seguridad">Seguridad</SelectItem>
                          <SelectItem value="energia-solar">Energía Solar</SelectItem>
                          <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                          <SelectItem value="recursos">Recursos</SelectItem>
                          <SelectItem value="otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Etiquetas</Label>
                      <Input
                        id="tags"
                        placeholder="PLC, Tutorial, Básico (separadas por comas)"
                        value={uploadMetadata.tags}
                        onChange={(e) =>
                          setUploadMetadata((prev) => ({ ...prev, tags: e.target.value }))
                        }
                        disabled={isUploading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción (opcional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe brevemente el contenido..."
                      rows={3}
                      value={uploadMetadata.description}
                      onChange={(e) =>
                        setUploadMetadata((prev) => ({ ...prev, description: e.target.value }))
                      }
                      disabled={isUploading}
                    />
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subiendo archivos...</span>
                    <span className="font-semibold">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setUploadDialogOpen(false)
                  setSelectedFiles([])
                  setUploadMetadata({ category: "", tags: "", description: "" })
                }}
                disabled={isUploading}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpload} disabled={selectedFiles.length === 0 || isUploading}>
                {isUploading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Subir {selectedFiles.length > 0 && `(${selectedFiles.length})`}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}

export default function ContentPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <ContentLibraryContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
