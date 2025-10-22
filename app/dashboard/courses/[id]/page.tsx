"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Play,
  Star,
  Users,
  Award,
  Video,
  FileText,
  CheckCircle,
  Lock,
  Download,
  Share2,
  Heart,
  ChevronRight,
  BarChart3,
  MessageSquare,
  Calendar,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "document" | "quiz"
  completed: boolean
  locked: boolean
}

interface Module {
  id: number
  title: string
  lessons: Lesson[]
  duration: string
}

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
}

function CourseDetailContent() {
  const { isCollapsed } = useSidebar()
  const params = useParams()
  const courseId = params.id
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock course data - vendría del backend
  const course = {
    id: courseId,
    title: "Automatización Industrial con PLC",
    description:
      "Aprende a programar y configurar PLCs (Controladores Lógicos Programables) para automatizar procesos industriales. Este curso te llevará desde los fundamentos hasta aplicaciones avanzadas.",
    longDescription:
      "Este curso integral te enseñará todo lo necesario para convertirte en un experto en automatización industrial utilizando PLCs. Comenzaremos con los conceptos básicos de la electricidad y control, para luego adentrarnos en la programación ladder, bloques de función y texto estructurado. Aprenderás a diseñar sistemas de control completos, desde la selección del hardware hasta la implementación y puesta en marcha.",
    instructor: {
      name: "Ing. Carlos Rodríguez",
      avatar: "/instructor-avatar.jpg",
      title: "Ingeniero Electrónico Especialista en Automatización",
      experience: "15 años de experiencia",
      students: 2450,
      courses: 8,
      rating: 4.9,
    },
    category: "Automatización",
    level: "Intermedio",
    duration: "12 horas",
    enrolled: true,
    progress: 60,
    rating: 4.9,
    totalRatings: 342,
    students: 1985,
    lessons: 36,
    modules: 8,
    language: "Español",
    lastUpdated: "Enero 2024",
    price: 2800,
    requirements: [
      "Conocimientos básicos de electricidad",
      "Manejo de computadora a nivel usuario",
      "Ganas de aprender automatización industrial",
    ],
    objectives: [
      "Comprender los fundamentos de los PLCs y su aplicación en la industria",
      "Programar PLCs utilizando lenguaje Ladder y bloques de función",
      "Diseñar y implementar sistemas de control industrial",
      "Realizar diagnóstico y solución de problemas en sistemas automatizados",
      "Conectar y configurar dispositivos de entrada/salida",
      "Implementar sistemas SCADA básicos",
    ],
    includes: [
      { icon: Video, text: "36 videos HD" },
      { icon: FileText, text: "15 recursos descargables" },
      { icon: Award, text: "Certificado de finalización" },
      { icon: Clock, text: "Acceso de por vida" },
      { icon: Download, text: "Material complementario" },
      { icon: MessageSquare, text: "Soporte del instructor" },
    ],
  }

  const modules: Module[] = [
    {
      id: 1,
      title: "Introducción a la Automatización Industrial",
      duration: "1h 30min",
      lessons: [
        { id: 1, title: "¿Qué es la automatización industrial?", duration: "15min", type: "video", completed: true, locked: false },
        { id: 2, title: "Historia y evolución de los PLCs", duration: "20min", type: "video", completed: true, locked: false },
        { id: 3, title: "Componentes de un sistema automatizado", duration: "25min", type: "video", completed: true, locked: false },
        { id: 4, title: "Quiz: Fundamentos", duration: "10min", type: "quiz", completed: true, locked: false },
      ],
    },
    {
      id: 2,
      title: "Hardware de PLCs",
      duration: "2h 15min",
      lessons: [
        { id: 5, title: "Arquitectura interna del PLC", duration: "30min", type: "video", completed: true, locked: false },
        { id: 6, title: "Módulos de entrada y salida", duration: "35min", type: "video", completed: true, locked: false },
        { id: 7, title: "Selección de hardware según aplicación", duration: "40min", type: "video", completed: false, locked: false },
        { id: 8, title: "Práctica: Identificación de componentes", duration: "30min", type: "document", completed: false, locked: false },
      ],
    },
    {
      id: 3,
      title: "Programación Ladder Básica",
      duration: "2h 45min",
      lessons: [
        { id: 9, title: "Introducción al lenguaje Ladder", duration: "25min", type: "video", completed: false, locked: false },
        { id: 10, title: "Instrucciones básicas: Contactos y bobinas", duration: "35min", type: "video", completed: false, locked: false },
        { id: 11, title: "Temporizadores y contadores", duration: "40min", type: "video", completed: false, locked: true },
        { id: 12, title: "Ejercicios prácticos", duration: "45min", type: "document", completed: false, locked: true },
        { id: 13, title: "Quiz: Programación básica", duration: "20min", type: "quiz", completed: false, locked: true },
      ],
    },
    {
      id: 4,
      title: "Programación Avanzada",
      duration: "3h 00min",
      lessons: [
        { id: 14, title: "Bloques de función", duration: "40min", type: "video", completed: false, locked: true },
        { id: 15, title: "Texto estructurado", duration: "45min", type: "video", completed: false, locked: true },
        { id: 16, title: "Subrutinas y organización de código", duration: "50min", type: "video", completed: false, locked: true },
        { id: 17, title: "Proyecto integrador", duration: "45min", type: "document", completed: false, locked: true },
      ],
    },
  ]

  const reviews: Review[] = [
    {
      id: 1,
      user: "Ana Martínez",
      avatar: "/avatar-1.jpg",
      rating: 5,
      date: "Hace 1 semana",
      comment: "Excelente curso, muy bien explicado. El instructor tiene mucha experiencia y se nota en cada clase. Los ejemplos prácticos son muy útiles.",
    },
    {
      id: 2,
      user: "Luis García",
      avatar: "/avatar-2.jpg",
      rating: 5,
      date: "Hace 2 semanas",
      comment: "Superó mis expectativas. Venía sin conocimientos previos y ahora me siento capaz de programar PLCs básicos. Muy recomendado.",
    },
    {
      id: 3,
      user: "María López",
      avatar: "/avatar-3.jpg",
      rating: 4,
      date: "Hace 1 mes",
      comment: "Muy buen contenido, aunque me hubiera gustado más material de práctica. En general, muy satisfecha con el curso.",
    },
  ]

  const handleEnroll = () => {
    toast.success("¡Te has inscrito al curso exitosamente!")
  }

  const handleStartLesson = (lessonId: number, locked: boolean) => {
    if (locked) {
      toast.error("Completa las lecciones anteriores para desbloquear esta")
      return
    }
    // Navegar a la lección
    window.location.href = `/dashboard/courses/${courseId}/learn?lesson=${lessonId}`
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "document":
        return FileText
      case "quiz":
        return CheckCircle
      default:
        return FileText
    }
  }

  return (
    <>
      <DashboardSidebar />

      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/dashboard/courses" className="hover:text-foreground transition-colors">
            Mis Cursos
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{course.title}</span>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">
                        {course.level}
                      </Badge>
                      <Badge variant="outline">{course.category}</Badge>
                      {course.enrolled && (
                        <Badge className="bg-green-500/10 text-green-700">Inscrito</Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
                    <p className="text-muted-foreground text-lg mb-4">{course.description}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold text-foreground">{course.rating}</span>
                        <span>({course.totalRatings} calificaciones)</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students.toLocaleString()} estudiantes
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Actualizado {course.lastUpdated}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="shrink-0"
                  >
                    <Heart
                      className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                </div>

                {/* Progress if enrolled */}
                {course.enrolled && (
                  <div className="mt-6 p-4 rounded-lg bg-primary/5 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Tu progreso</span>
                      <span className="text-sm font-bold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-3" />
                    <Button className="w-full" asChild>
                      <Link href={`/dashboard/courses/${courseId}/learn`}>
                        <Play className="h-4 w-4 mr-2" />
                        Continuar Aprendiendo
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="content" className="space-y-4">
              <TabsList className="grid w-full max-w-2xl grid-cols-4">
                <TabsTrigger value="content">Contenido</TabsTrigger>
                <TabsTrigger value="about">Acerca de</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle>Contenido del Curso</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {course.modules} módulos • {course.lessons} lecciones • {course.duration} total
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {modules.map((module) => (
                      <div key={module.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4 bg-muted/50 flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {module.lessons.length} lecciones • {module.duration}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {module.lessons.filter((l) => l.completed).length}/{module.lessons.length}
                          </Badge>
                        </div>
                        <div className="divide-y">
                          {module.lessons.map((lesson) => {
                            const Icon = getLessonIcon(lesson.type)
                            return (
                              <div
                                key={lesson.id}
                                className={`p-3 flex items-center justify-between hover:bg-muted/30 transition-colors ${
                                  lesson.locked ? "opacity-50" : "cursor-pointer"
                                }`}
                                onClick={() => handleStartLesson(lesson.id, lesson.locked)}
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : lesson.locked ? (
                                    <Lock className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <Icon className="h-5 w-5 text-primary" />
                                  )}
                                  <div>
                                    <p className="font-medium text-sm">{lesson.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {lesson.duration}
                                    </p>
                                  </div>
                                </div>
                                {!lesson.locked && !lesson.completed && (
                                  <Play className="h-4 w-4 text-primary" />
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle>Acerca del Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Descripción</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.longDescription}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Lo que aprenderás</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.objectives.map((obj, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground">{obj}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Requisitos</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">{req}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Este curso incluye</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.includes.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <item.icon className="h-5 w-5 text-primary" />
                            <p className="text-sm">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Instructor Tab */}
              <TabsContent value="instructor">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={course.instructor.avatar} />
                        <AvatarFallback className="text-lg">
                          {course.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{course.instructor.name}</h3>
                        <p className="text-muted-foreground mb-3">{course.instructor.title}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            {course.instructor.rating} calificación
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.instructor.students.toLocaleString()} estudiantes
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {course.instructor.courses} cursos
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h4 className="font-semibold mb-3">Experiencia</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.instructor.experience} en el campo de la automatización industrial.
                        Ha trabajado en proyectos para diversas industrias incluyendo automotriz,
                        alimenticia y farmacéutica. Actualmente se dedica a la formación de nuevos
                        profesionales en el área de automatización.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Reseñas de Estudiantes</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.totalRatings} calificaciones
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                          <span className="text-3xl font-bold">{course.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">de 5</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-lg border bg-background/50">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{review.user}</h4>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-500 text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sticky Card */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                {/* Course Preview Image */}
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-16 w-16 text-primary" />
                </div>

                {/* Price or Enrolled Status */}
                {course.enrolled ? (
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso del curso</span>
                      <span className="font-bold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold">${course.price}</span>
                      <span className="text-muted-foreground">MXN</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pago único • Acceso de por vida</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 mb-6">
                  {course.enrolled ? (
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/dashboard/courses/${courseId}/learn`}>
                        <Play className="h-4 w-4 mr-2" />
                        Continuar Curso
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button className="w-full" size="lg" onClick={handleEnroll}>
                        Inscribirse Ahora
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        Vista Previa Gratuita
                      </Button>
                    </>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Course Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Incluye:</h4>
                  {course.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Share */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

export default function CourseDetailPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
          <CourseDetailContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
