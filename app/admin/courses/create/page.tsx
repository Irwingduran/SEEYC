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
  GripVertical,
  FileText,
  Image as ImageIcon,
  Video,
  CheckSquare,
  ClipboardList,
  Trash2,
  Edit,
  Upload,
  Settings,
  Users,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import { CourseContentBuilder } from "@/components/course-content-builder"
import { CoursePreview } from "@/components/course-preview"
import { createCourse } from "@/lib/course-service"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function CreateCourseContent() {
  const { isCollapsed } = useSidebar()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "Básico",
    language: "es",
    price: "",
    thumbnail: "",
    duration: "",
    prerequisites: "",
    objectives: [],
    tags: [],
    isPublished: false,
  })

  const handleSave = async () => {
    try {
      setIsSaving(true)
      
      // Validar datos mínimos
      if (!courseData.title) {
        toast.error("El título es obligatorio")
        return
      }

      await createCourse({
        title: courseData.title,
        subtitle: courseData.subtitle,
        description: courseData.description,
        category: courseData.category,
        level: courseData.level as any,
        price: Number(courseData.price) || 0,
        duration: courseData.duration,
        modules: modules as any,
        status: courseData.isPublished ? "published" : "draft"
      })

      toast.success("Curso creado exitosamente")
      router.push("/admin/courses")
    } catch (error) {
      console.error(error)
      toast.error("Error al crear el curso")
    } finally {
      setIsSaving(false)
    }
  }

  const [modules, setModules] = useState<any[]>([
    {
      id: 1,
      title: "Introducción al Curso",
      description: "",
      lessons: [],
      order: 0,
    },
  ])

  const categories = [
    "Automatización Industrial",
    "Instalaciones Eléctricas",
    "Energía Solar",
    "Seguridad Eléctrica",
    "Mantenimiento Industrial",
    "Control de Procesos",
  ]

  const levels = ["Básico", "Intermedio", "Avanzado", "Experto"]

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

  const removeModule = (moduleId: number) => {
    setModules(modules.filter((m) => m.id !== moduleId))
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Crear Nuevo Curso</h1>
              <p className="text-muted-foreground">
                Completa la información y agrega el contenido de tu curso
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar Borrador"}
              </Button>
              <Button size="sm" onClick={() => {
                setCourseData(prev => ({ ...prev, isPublished: true }))
                setTimeout(handleSave, 100)
              }} disabled={isSaving}>
                <Upload className="h-4 w-4 mr-2" />
                Publicar Curso
              </Button>
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
                    <p className="text-xs text-muted-foreground">
                      Un título claro y descriptivo ayuda a los estudiantes a encontrar tu curso
                    </p>
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
                    <Switch id="free" />
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
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emitir Certificado</Label>
                      <p className="text-sm text-muted-foreground">
                        Al completar el curso, los estudiantes reciben un certificado
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Habilitar Foro</Label>
                      <p className="text-sm text-muted-foreground">Espacio de discusión para estudiantes</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Acceso de por Vida</Label>
                      <p className="text-sm text-muted-foreground">
                        Los estudiantes pueden acceder indefinidamente
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
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

export default function CreateCoursePage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <CreateCourseContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
