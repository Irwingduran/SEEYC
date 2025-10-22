"use client"

import React, { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Image as ImageIcon,
  Video,
  FileArchive,
  Link as LinkIcon,
  Upload,
  Search,
  Filter,
  Grid3x3,
  List,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Folder,
  HardDrive,
  Files,
  TrendingUp,
  Plus,
  X,
  File,
  Calendar,
  User,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { cn } from "@/lib/utils"

type ResourceType = "document" | "image" | "video" | "archive" | "link"

interface Resource {
  id: number
  name: string
  type: ResourceType
  category: string
  url: string
  thumbnail?: string
  size?: string
  uploadedBy: string
  uploadedDate: string
  usedInCourses: number
  downloads: number
  description?: string
}

const mockResources: Resource[] = [
  {
    id: 1,
    name: "Manual de Instalaciones Eléctricas Residenciales.pdf",
    type: "document",
    category: "Manuales",
    url: "/resources/manual-instalaciones.pdf",
    size: "2.5 MB",
    uploadedBy: "Admin",
    uploadedDate: "2024-01-15",
    usedInCourses: 3,
    downloads: 145,
    description: "Guía completa sobre instalaciones eléctricas en viviendas",
  },
  {
    id: 2,
    name: "Diagrama de Circuito en Serie.png",
    type: "image",
    category: "Diagramas",
    url: "/resources/circuito-serie.png",
    thumbnail: "https://via.placeholder.com/300x200?text=Circuito+Serie",
    size: "450 KB",
    uploadedBy: "Admin",
    uploadedDate: "2024-01-20",
    usedInCourses: 5,
    downloads: 89,
    description: "Diagrama ilustrativo de conexión en serie",
  },
  {
    id: 3,
    name: "Tutorial Instalación de Tablero Eléctrico.mp4",
    type: "video",
    category: "Videos",
    url: "/resources/tutorial-tablero.mp4",
    thumbnail: "https://via.placeholder.com/300x200?text=Tutorial+Tablero",
    size: "125 MB",
    uploadedBy: "Instructor García",
    uploadedDate: "2024-02-05",
    usedInCourses: 2,
    downloads: 234,
    description: "Video tutorial paso a paso para instalación de tableros",
  },
  {
    id: 4,
    name: "Ejercicios Prácticos - Ley de Ohm.zip",
    type: "archive",
    category: "Ejercicios",
    url: "/resources/ejercicios-ohm.zip",
    size: "5.2 MB",
    uploadedBy: "Admin",
    uploadedDate: "2024-02-12",
    usedInCourses: 4,
    downloads: 178,
    description: "Conjunto de ejercicios prácticos sobre la Ley de Ohm",
  },
  {
    id: 5,
    name: "Norma NEC 2024 - Código Eléctrico Nacional",
    type: "link",
    category: "Referencias",
    url: "https://nfpa.org/nec",
    uploadedBy: "Admin",
    uploadedDate: "2024-02-18",
    usedInCourses: 6,
    downloads: 312,
    description: "Enlace oficial al Código Eléctrico Nacional actualizado",
  },
  {
    id: 6,
    name: "Tabla de Calibres de Cable AWG.pdf",
    type: "document",
    category: "Tablas",
    url: "/resources/tabla-awg.pdf",
    size: "890 KB",
    uploadedBy: "Instructor García",
    uploadedDate: "2024-03-01",
    usedInCourses: 7,
    downloads: 267,
    description: "Tabla de referencia de calibres de cable AWG",
  },
  {
    id: 7,
    name: "Simbología Eléctrica Completa.png",
    type: "image",
    category: "Diagramas",
    url: "/resources/simbologia.png",
    thumbnail: "https://via.placeholder.com/300x200?text=Simbología",
    size: "1.2 MB",
    uploadedBy: "Admin",
    uploadedDate: "2024-03-10",
    usedInCourses: 8,
    downloads: 456,
    description: "Infografía con todos los símbolos eléctricos estándar",
  },
  {
    id: 8,
    name: "Curso Completo PLC Allen Bradley.mp4",
    type: "video",
    category: "Videos",
    url: "/resources/plc-curso.mp4",
    thumbnail: "https://via.placeholder.com/300x200?text=PLC+Curso",
    size: "850 MB",
    uploadedBy: "Instructor López",
    uploadedDate: "2024-03-15",
    usedInCourses: 1,
    downloads: 98,
    description: "Curso completo de programación PLC",
  },
  {
    id: 9,
    name: "Plantillas de Proyectos AutoCAD.zip",
    type: "archive",
    category: "Plantillas",
    url: "/resources/plantillas-autocad.zip",
    size: "15 MB",
    uploadedBy: "Admin",
    uploadedDate: "2024-03-20",
    usedInCourses: 2,
    downloads: 123,
    description: "Colección de plantillas para proyectos eléctricos",
  },
  {
    id: 10,
    name: "Simulador de Circuitos Online",
    type: "link",
    category: "Herramientas",
    url: "https://www.circuitlab.com",
    uploadedBy: "Instructor López",
    uploadedDate: "2024-03-25",
    usedInCourses: 5,
    downloads: 201,
    description: "Herramienta web para simulación de circuitos",
  },
  {
    id: 11,
    name: "Diagrama de Conexión Trifásica.png",
    type: "image",
    category: "Diagramas",
    url: "/resources/trifasica.png",
    thumbnail: "https://via.placeholder.com/300x200?text=Trifásica",
    size: "680 KB",
    uploadedBy: "Admin",
    uploadedDate: "2024-04-01",
    usedInCourses: 4,
    downloads: 156,
    description: "Esquema de conexión de sistemas trifásicos",
  },
  {
    id: 12,
    name: "Guía de Seguridad Eléctrica.pdf",
    type: "document",
    category: "Manuales",
    url: "/resources/seguridad.pdf",
    size: "3.8 MB",
    uploadedBy: "Admin",
    uploadedDate: "2024-04-05",
    usedInCourses: 9,
    downloads: 389,
    description: "Manual de normas de seguridad en trabajos eléctricos",
  },
]

function ResourcesContent() {
  const { isCollapsed } = useSidebar()
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Statistics
  const totalResources = resources.length
  const totalSize = resources
    .filter((r) => r.size)
    .reduce((sum, r) => {
      const size = parseFloat(r.size?.replace(/[^0-9.]/g, "") || "0")
      const unit = r.size?.includes("MB") ? 1 : r.size?.includes("GB") ? 1024 : 0.001
      return sum + size * unit
    }, 0)
  const documentCount = resources.filter((r) => r.type === "document").length
  const imageCount = resources.filter((r) => r.type === "image").length
  const videoCount = resources.filter((r) => r.type === "video").length
  const totalDownloads = resources.reduce((sum, r) => sum + r.downloads, 0)

  // Get unique categories
  const categories = Array.from(new Set(resources.map((r) => r.category)))

  // Filtered resources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || resource.type === typeFilter
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "document":
        return FileText
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "archive":
        return FileArchive
      case "link":
        return LinkIcon
      default:
        return File
    }
  }

  const getResourceColor = (type: ResourceType) => {
    switch (type) {
      case "document":
        return "bg-blue-500"
      case "image":
        return "bg-green-500"
      case "video":
        return "bg-purple-500"
      case "archive":
        return "bg-orange-500"
      case "link":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeBadge = (type: ResourceType) => {
    const labels = {
      document: "Documento",
      image: "Imagen",
      video: "Video",
      archive: "Archivo",
      link: "Enlace",
    }
    return labels[type] || type
  }

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource)
    setIsViewModalOpen(true)
  }

  const handleDeleteResource = (resource: Resource) => {
    setSelectedResource(resource)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (selectedResource) {
      setResources(resources.filter((r) => r.id !== selectedResource.id))
      setIsDeleteModalOpen(false)
      setSelectedResource(null)
    }
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
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Biblioteca de Recursos
              </h1>
              <p className="text-muted-foreground">
                Gestiona archivos, documentos y materiales educativos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? (
                  <>
                    <List className="h-4 w-4" />
                    Lista
                  </>
                ) : (
                  <>
                    <Grid3x3 className="h-4 w-4" />
                    Grid
                  </>
                )}
              </Button>
              <Button
                size="sm"
                className="gap-2"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <Upload className="h-4 w-4" />
                Subir Recurso
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Recursos
                  </p>
                  <h3 className="text-3xl font-bold mt-2">{totalResources}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {categories.length} categorías
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-full">
                  <Files className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Almacenamiento
                  </p>
                  <h3 className="text-3xl font-bold mt-2">
                    {totalSize.toFixed(1)} MB
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    de 10 GB disponibles
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-full">
                  <HardDrive className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Descargas Totales
                  </p>
                  <h3 className="text-3xl font-bold mt-2">{totalDownloads}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +24% este mes
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-full">
                  <Download className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Por Tipo</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-center">
                      <p className="text-lg font-bold">{documentCount}</p>
                      <p className="text-xs text-muted-foreground">Docs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{imageCount}</p>
                      <p className="text-xs text-muted-foreground">Imgs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{videoCount}</p>
                      <p className="text-xs text-muted-foreground">Videos</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-orange-500 rounded-full">
                  <Folder className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 bg-card/60 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar recursos por nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Tipo de recurso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="document">Documentos</SelectItem>
                  <SelectItem value="image">Imágenes</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="archive">Archivos</SelectItem>
                  <SelectItem value="link">Enlaces</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Resources Display */}
        <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Recursos ({filteredResources.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredResources.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Files className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg mb-2">
                  No se encontraron recursos
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Intenta ajustar los filtros o sube nuevos recursos
                </p>
                <Button onClick={() => setIsUploadModalOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Recurso
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredResources.map((resource) => {
                  const ResourceIcon = getResourceIcon(resource.type)
                  return (
                    <Card
                      key={resource.id}
                      className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                      onClick={() => handleViewResource(resource)}
                    >
                      <CardContent className="p-0">
                        {/* Thumbnail */}
                        <div
                          className={cn(
                            "h-40 flex items-center justify-center relative overflow-hidden",
                            resource.thumbnail
                              ? "bg-background"
                              : getResourceColor(resource.type)
                          )}
                        >
                          {resource.thumbnail ? (
                            <img
                              src={resource.thumbnail}
                              alt={resource.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ResourceIcon className="h-16 w-16 text-white" />
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="gap-1">
                              <ResourceIcon className="h-3 w-3" />
                              {getTypeBadge(resource.type)}
                            </Badge>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                              {resource.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {resource.category}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{resource.size || "N/A"}</span>
                            <span>{resource.downloads} descargas</span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {resource.uploadedBy}
                            </span>
                            <span>{resource.usedInCourses} cursos</span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-2 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 gap-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewResource(resource)
                              }}
                            >
                              <Eye className="h-3 w-3" />
                              Ver
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button size="sm" variant="ghost">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Compartir
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteResource(resource)
                                  }}
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
                  )
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredResources.map((resource) => {
                  const ResourceIcon = getResourceIcon(resource.type)
                  return (
                    <div
                      key={resource.id}
                      className="flex items-center gap-4 p-4 rounded-lg border-2 hover:bg-muted/50 hover:border-primary transition-all cursor-pointer group"
                      onClick={() => handleViewResource(resource)}
                    >
                      <div
                        className={cn(
                          "p-3 rounded-lg",
                          getResourceColor(resource.type)
                        )}
                      >
                        <ResourceIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{resource.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                          <span>{resource.size || "N/A"}</span>
                          <span>{resource.downloads} descargas</span>
                          <span>{resource.usedInCourses} cursos</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Compartir
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteResource(resource)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Resource Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalles del Recurso</DialogTitle>
              <DialogDescription>Información completa del recurso</DialogDescription>
            </DialogHeader>
            {selectedResource && (
              <div className="space-y-6">
                {/* Preview */}
                {selectedResource.thumbnail && (
                  <div className="rounded-lg border-2 overflow-hidden">
                    <img
                      src={selectedResource.thumbnail}
                      alt={selectedResource.name}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedResource.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge>{getTypeBadge(selectedResource.type)}</Badge>
                      <Badge variant="outline">{selectedResource.category}</Badge>
                    </div>
                  </div>

                  {selectedResource.description && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm">{selectedResource.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <HardDrive className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Tamaño</p>
                            <p className="font-medium">
                              {selectedResource.size || "N/A"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Download className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Descargas</p>
                            <p className="font-medium">{selectedResource.downloads}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Subido por</p>
                            <p className="font-medium">{selectedResource.uploadedBy}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Fecha</p>
                            <p className="font-medium">{selectedResource.uploadedDate}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Usado en cursos
                          </p>
                          <p className="text-2xl font-bold">
                            {selectedResource.usedInCourses}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver cursos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Cerrar
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upload Resource Modal */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Subir Nuevo Recurso</DialogTitle>
              <DialogDescription>
                Agrega documentos, imágenes, videos o enlaces a la biblioteca
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs defaultValue="file">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file">Subir Archivo</TabsTrigger>
                  <TabsTrigger value="link">Agregar Enlace</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Arrastra archivos aquí o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Soporta PDF, imágenes, videos, archivos comprimidos
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Seleccionar Archivos
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="link" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="link-url">URL del Recurso</Label>
                    <Input
                      id="link-url"
                      placeholder="https://ejemplo.com/recurso"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resource-name">Nombre del Recurso</Label>
                  <Input
                    id="resource-name"
                    placeholder="Ej: Manual de Instalaciones Eléctricas"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource-type">Tipo</Label>
                    <Select>
                      <SelectTrigger id="resource-type">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Documento</SelectItem>
                        <SelectItem value="image">Imagen</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="archive">Archivo</SelectItem>
                        <SelectItem value="link">Enlace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resource-category">Categoría</Label>
                    <Select>
                      <SelectTrigger id="resource-category">
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manuales">Manuales</SelectItem>
                        <SelectItem value="diagramas">Diagramas</SelectItem>
                        <SelectItem value="videos">Videos</SelectItem>
                        <SelectItem value="ejercicios">Ejercicios</SelectItem>
                        <SelectItem value="referencias">Referencias</SelectItem>
                        <SelectItem value="herramientas">Herramientas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resource-description">
                    Descripción (opcional)
                  </Label>
                  <Textarea
                    id="resource-description"
                    placeholder="Describe el contenido y utilidad de este recurso..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Subir Recurso
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Resource Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar Recurso</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. ¿Estás seguro de que deseas
                eliminar este recurso?
              </DialogDescription>
            </DialogHeader>
            {selectedResource && (
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div
                  className={cn(
                    "p-3 rounded-lg",
                    getResourceColor(selectedResource.type)
                  )}
                >
                  {React.createElement(getResourceIcon(selectedResource.type), {
                    className: "h-6 w-6 text-white",
                  })}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedResource.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Usado en {selectedResource.usedInCourses} cursos
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}

export default function ResourcesPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <ResourcesContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
