"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Monitor, Smartphone, Tablet, Play, Star, Clock, Users, BookOpen, Award } from "lucide-react"

export function CoursePreview() {
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const getDeviceClass = () => {
    switch (previewDevice) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      default:
        return "w-full"
    }
  }

  return (
    <div className="space-y-6">
      {/* Device Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vista Previa del Curso</h2>
          <p className="text-gray-600 dark:text-gray-300">Ve cómo se verá tu curso para los estudiantes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={previewDevice === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewDevice("desktop")}
            className="bg-white/70 dark:bg-gray-800/70"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={previewDevice === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewDevice("tablet")}
            className="bg-white/70 dark:bg-gray-800/70"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={previewDevice === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewDevice("mobile")}
            className="bg-white/70 dark:bg-gray-800/70"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className={`transition-all duration-300 ${getDeviceClass()}`}>
        <Card className="bg-white dark:bg-gray-800 shadow-2xl">
          <CardContent className="p-0">
            {/* Course Header */}
            <div className="relative">
              <img
                src="/electrical-lesson-thumbnail.jpg"
                alt="Course thumbnail"
                className="w-full h-48 md:h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-t-lg flex items-center justify-center">
                <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20">
                  <Play className="w-6 h-6 mr-2" />
                  Ver Vista Previa
                </Button>
              </div>
              <Badge className="absolute top-4 left-4 bg-purple-600 text-white">Instalaciones Eléctricas</Badge>
              <Badge className="absolute top-4 right-4 bg-green-600 text-white">$99.00</Badge>
            </div>

            <div className="p-6">
              {/* Course Title and Rating */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Instalaciones Eléctricas Residenciales Completas
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span>4.8 (234 reseñas)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>1,247 estudiantes</span>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">20 horas</div>
                  <div className="text-xs text-gray-500">Duración</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">15 lecciones</div>
                  <div className="text-xs text-gray-500">Contenido</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Award className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Certificado</div>
                  <div className="text-xs text-gray-500">Incluido</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Intermedio</div>
                  <div className="text-xs text-gray-500">Nivel</div>
                </div>
              </div>

              {/* Course Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Descripción del Curso</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Aprende todo lo necesario para realizar instalaciones eléctricas residenciales seguras y eficientes.
                  Este curso completo te guiará desde los conceptos básicos hasta las técnicas avanzadas, incluyendo
                  normativas, seguridad y mejores prácticas del sector.
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Lo que Aprenderás</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Fundamentos de electricidad residencial",
                    "Lectura e interpretación de planos eléctricos",
                    "Instalación de circuitos y tableros",
                    "Normativas y códigos eléctricos",
                    "Sistemas de protección y seguridad",
                    "Mantenimiento preventivo y correctivo",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content Preview */}
              <Tabs defaultValue="curriculum" className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curriculum">Contenido</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="mt-4">
                  <div className="space-y-3">
                    {[
                      { title: "Introducción a la Electricidad", lessons: 3, duration: "45 min" },
                      { title: "Herramientas y Materiales", lessons: 2, duration: "30 min" },
                      { title: "Circuitos Básicos", lessons: 4, duration: "80 min" },
                      { title: "Instalación de Tableros", lessons: 3, duration: "60 min" },
                      { title: "Sistemas de Protección", lessons: 3, duration: "55 min" },
                    ].map((section, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">{section.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{section.lessons} lecciones</span>
                            <span>•</span>
                            <span>{section.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="mt-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="Instructor"
                      className="w-15 h-15 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Ing. Carlos Rodríguez</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Ingeniero Eléctrico con 15 años de experiencia
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>⭐ 4.9 calificación</span>
                        <span>👥 5,234 estudiantes</span>
                        <span>📚 12 cursos</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-4">
                    {[
                      {
                        name: "María González",
                        rating: 5,
                        comment: "Excelente curso, muy completo y bien explicado.",
                        date: "Hace 2 días",
                      },
                      {
                        name: "Juan Pérez",
                        rating: 5,
                        comment: "Las explicaciones son muy claras y los ejemplos prácticos son útiles.",
                        date: "Hace 1 semana",
                      },
                    ].map((review, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">{review.name}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Enrollment Button */}
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3">
                Inscribirse Ahora - $99.00
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
