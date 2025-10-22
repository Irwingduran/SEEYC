"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Save,
  Eye,
  BookOpen,
  Plus,
  Image as ImageIcon,
  Upload,
  Settings,
  DollarSign,
  FileText,
  Trash2,
  Archive,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState, useEffect } from "react"
import { CourseContentBuilder } from "@/components/course-content-builder"
import { CoursePreview } from "@/components/course-preview"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

function EditCourseContent() {
  const { isCollapsed } = useSidebar()
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Form state
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "es",
    price: "",
    thumbnail: "",
    duration: "",
    prerequisites: "",
    objectives: [],
    tags: [],
    isFree: false,
    isPublished: false,
    allowDownloads: true,
    hasCertificate: true,
    hasForum: true,
    lifetimeAccess: true,
  })

  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Introducción al Curso",
      description: "",
      lessons: [],
      order: 0,
    },
  ])

  const [courseStatus, setCourseStatus] = useState<"published" | "draft" | "archived">("draft")

  // Cargar datos del curso
  useEffect(() => {
    const loadCourseData = async () => {
      setIsLoading(true)
      try {
        // Aquí normalmente harías una llamada a tu API
        // const response = await fetch(`/api/courses/${courseId}`)
        // const data = await response.json()

        // Datos de ejemplo para demostración
        const mockData = {
          id: courseId,
          title: "Automatización Industrial con PLC",
          subtitle: "Aprende a programar y configurar PLCs industriales",
          description: "En este curso aprenderás los fundamentos y técnicas avanzadas de automatización industrial utilizando PLCs. Cubriremos desde la programación básica hasta proyectos complejos.",
          category: "Automatización Industrial",
          level: "Avanzado",
          language: "es",
          price: "149.99",
          duration: "12 horas",
          prerequisites: "Conocimientos básicos de electricidad y electrónica",
          status: "published",
          isFree: false,
          allowDownloads: true,
          hasCertificate: true,
          hasForum: true,
          lifetimeAccess: true,
          modules: [
            {
              id: 1,
              title: "Introducción a los PLCs",
              description: "Conceptos fundamentales",
              lessons: [
                {
                  id: 1,
                  title: "¿Qué es un PLC?",
                  type: "video",
                  duration: "15:30",
                },
                {
                  id: 2,
                  title: "Componentes de un PLC",
                  type: "text",
                  duration: "10:00",
                },
              ],
              order: 0,
            },
            {
              id: 2,
              title: "Programación Ladder",
              description: "Aprende el lenguaje Ladder",
              lessons: [
                {
                  id: 3,
                  title: "Introducción a Ladder",
                  type: "video",
                  duration: "20:00",
                },
              ],
              order: 1,
            },
          ],
        }

        setCourseData({
          title: mockData.title,
          subtitle: mockData.subtitle,
          description: mockData.description,
          category: mockData.category,
          level: mockData.level,
          language: mockData.language,
          price: mockData.price,
          thumbnail: "",
          duration: mockData.duration,
          prerequisites: mockData.prerequisites,
          objectives: [],
          tags: [],
          isFree: mockData.isFree,
          isPublished: mockData.status === "published",
          allowDownloads: mockData.allowDownloads,
          hasCertificate: mockData.hasCertificate,
          hasForum: mockData.hasForum,
          lifetimeAccess: mockData.lifetimeAccess,
        })

        setModules(mockData.modules)
        setCourseStatus(mockData.status as any)
      } catch (error) {
        console.error("Error al cargar el curso:", error)
        toast.error("Error al cargar los datos del curso")
      } finally {
        setIsLoading(false)
      }
    }

    loadCourseData()
  }, [courseId])

  const categories = [
    "Automatización Industrial",
    "Instalaciones Eléctricas",
    "Energía Solar",
    "Seguridad Eléctrica",
    "Mantenimiento Industrial",
    "Control de Procesos",
  ]

  const levels = ["Básico", "Intermedio", "Avanzado", "Experto"]

  const handleSaveDraft = async () => {
    try {
      // Aquí llamarías a tu API para guardar
      // await fetch(`/api/courses/${courseId}`, { method: 'PUT', body: JSON.stringify(courseData) })
      toast.success("Borrador guardado exitosamente")
    } catch (error) {
      toast.error("Error al guardar el borrador")
    }
  }

  const handlePublish = async () => {
    try {
      // Validaciones
      if (!courseData.title || !courseData.description || !courseData.category || !courseData.level) {
        toast.error("Por favor completa todos los campos requeridos")
        return
      }

      // Aquí llamarías a tu API
      // await fetch(`/api/courses/${courseId}/publish`, { method: 'POST' })
      setCourseStatus("published")
      toast.success("Curso publicado exitosamente")
    } catch (error) {
      toast.error("Error al publicar el curso")
    }
  }

  const handleArchive = async () => {
    try {
      // await fetch(`/api/courses/${courseId}/archive`, { method: 'POST' })
      setCourseStatus("archived")
      toast.success("Curso archivado exitosamente")
    } catch (error) {
      toast.error("Error al archivar el curso")
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      // await fetch(`/api/courses/${courseId}`, { method: 'DELETE' })
      toast.success("Curso eliminado exitosamente")
      router.push("/admin/courses")
    } catch (error) {
      toast.error("Error al eliminar el curso")
    }
  }

  const addModule = () => {
    const newModule = {
      id: modules.length + 1,
      title: `Módulo ${modules.length + 1}`,
      description: "",
      lessons: [],
      order: modules.length,
    }
    setModules([...modules, newModule])
  }

  if (isLoading) {
    return (
      <>
        <AdminSidebar />
        <main
          className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
            isCollapsed ? "lg:ml-16" : "lg:ml-72"
          }`}
        >
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando curso...</p>
            </div>
          </div>
        </main>
      </>
    )
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
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Cursos
              </Link>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Editar Curso</h1>
                {courseStatus === "published" && (
                  <Badge className="bg-green-500/10 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Publicado
                  </Badge>
                )}
                {courseStatus === "draft" && (
                  <Badge variant="secondary">Borrador</Badge>
                )}
                {courseStatus === "archived" && (
                  <Badge variant="outline">Archivado</Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Actualiza la información y contenido de tu curso
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              {courseStatus === "draft" && (
                <Button size="sm" onClick={handlePublish}>
                  <Upload className="h-4 w-4 mr-2" />
                  Publicar
                </Button>
              )}
              {courseStatus === "published" && (
                <Button size="sm" variant="secondary" onClick={handleArchive}>
                  <Archive className="h-4 w-4 mr-2" />
                  Archivar
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-card/60 backdrop-blur-sm">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Información</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Contenido</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Precio</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configuración</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Información Básica */}
          <TabsContent value="info" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Información del Curso</CardTitle>
                <CardDescription>Datos básicos que verán tus estudiantes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Título */}
                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="title">
                      Título del Curso <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Ej: Automatización Industrial con PLC Avanzado"
                      value={courseData.title}
                      onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                      className="text-lg"
                    />
                  </div>

                  {/* Subtítulo */}
                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="subtitle">Subtítulo</Label>
                    <Input
                      id="subtitle"
                      placeholder="Breve descripción del curso"
                      value={courseData.subtitle}
                      onChange={(e) => setCourseData({ ...courseData, subtitle: e.target.value })}
                    />
                  </div>

                  {/* Categoría */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Categoría <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) => setCourseData({ ...courseData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Nivel */}
                  <div className="space-y-2">
                    <Label htmlFor="level">
                      Nivel <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={courseData.level}
                      onValueChange={(value) => setCourseData({ ...courseData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duración estimada */}
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración Estimada</Label>
                    <Input
                      id="duration"
                      placeholder="Ej: 8 semanas, 40 horas"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    />
                  </div>

                  {/* Idioma */}
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={courseData.language}
                      onValueChange={(value) => setCourseData({ ...courseData, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">Inglés</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descripción completa */}
                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="description">
                      Descripción del Curso <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe detalladamente lo que aprenderán los estudiantes..."
                      rows={6}
                      value={courseData.description}
                      onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    />
                  </div>

                  {/* Prerequisitos */}
                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="prerequisites">Prerequisitos</Label>
                    <Textarea
                      id="prerequisites"
                      placeholder="¿Qué conocimientos previos necesitan los estudiantes?"
                      rows={3}
                      value={courseData.prerequisites}
                      onChange={(e) => setCourseData({ ...courseData, prerequisites: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Imagen del curso */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Imagen del Curso</CardTitle>
                <CardDescription>Sube una imagen atractiva (1280x720px recomendado)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Arrastra una imagen aquí o haz clic para seleccionar
                  </p>
                  <Button variant="outline" size="sm">
                    Seleccionar Imagen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Contenido del Curso */}
          <TabsContent value="content" className="space-y-6">
            <CourseContentBuilder modules={modules} setModules={setModules} />

            {/* Botón para agregar módulo */}
            <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
              <CardContent className="p-6">
                <Button variant="outline" onClick={addModule} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Nuevo Módulo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Precio */}
          <TabsContent value="pricing" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Configuración de Precio</CardTitle>
                <CardDescription>Define el precio y opciones de pago</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio del Curso (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        value={courseData.price}
                        onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2 pt-8">
                    <Label htmlFor="free" className="flex flex-col space-y-1">
                      <span>Curso Gratuito</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Hacer este curso gratuito para todos
                      </span>
                    </Label>
                    <Switch
                      id="free"
                      checked={courseData.isFree}
                      onCheckedChange={(checked) => setCourseData({ ...courseData, isFree: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Configuración */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Configuración Avanzada</CardTitle>
                <CardDescription>Opciones adicionales del curso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Permitir Descargas</Label>
                      <p className="text-sm text-muted-foreground">
                        Los estudiantes pueden descargar recursos
                      </p>
                    </div>
                    <Switch
                      checked={courseData.allowDownloads}
                      onCheckedChange={(checked) => setCourseData({ ...courseData, allowDownloads: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emitir Certificado</Label>
                      <p className="text-sm text-muted-foreground">
                        Al completar el curso, los estudiantes reciben un certificado
                      </p>
                    </div>
                    <Switch
                      checked={courseData.hasCertificate}
                      onCheckedChange={(checked) => setCourseData({ ...courseData, hasCertificate: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Habilitar Foro</Label>
                      <p className="text-sm text-muted-foreground">Espacio de discusión para estudiantes</p>
                    </div>
                    <Switch
                      checked={courseData.hasForum}
                      onCheckedChange={(checked) => setCourseData({ ...courseData, hasForum: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Acceso de por Vida</Label>
                      <p className="text-sm text-muted-foreground">
                        Los estudiantes pueden acceder indefinidamente
                      </p>
                    </div>
                    <Switch
                      checked={courseData.lifetimeAccess}
                      onCheckedChange={(checked) => setCourseData({ ...courseData, lifetimeAccess: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zona de peligro */}
            <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Zona de Peligro</CardTitle>
                <CardDescription>Acciones irreversibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Eliminar Curso</p>
                    <p className="text-sm text-muted-foreground">
                      Una vez eliminado, no podrás recuperar este curso
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Course Preview Dialog */}
        <CoursePreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          courseData={courseData}
          modules={modules}
        />
      </main>
    </>
  )
}

export default function EditCoursePage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <EditCourseContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
