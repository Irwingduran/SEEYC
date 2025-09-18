"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, BookOpen, Download, Users, Clock, Award, Shield } from "lucide-react"
import type { Course } from "@/lib/course-data"

interface CourseEnrollmentProps {
  course: Course
}

export function CourseEnrollment({ course }: CourseEnrollmentProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)

  const handleEnrollment = async () => {
    setIsEnrolling(true)
    // Simulate enrollment process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsEnrolling(false)
  }

  const features = [
    { icon: Play, text: "Acceso de por vida al curso" },
    { icon: Download, text: "Materiales descargables" },
    { icon: Award, text: "Certificado de finalización" },
    { icon: Users, text: "Acceso a la comunidad" },
    { icon: Shield, text: "Garantía de 30 días" },
  ]

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader className="text-center">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">${course.price.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Pago único • Acceso de por vida</div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Enrollment Button */}
        <Button className="w-full text-lg py-6" size="lg" onClick={handleEnrollment} disabled={isEnrolling}>
          {isEnrolling ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Procesando...
            </>
          ) : (
            <>
              <BookOpen className="h-5 w-5 mr-2" />
              Inscribirse Ahora
            </>
          )}
        </Button>

        <Button variant="outline" className="w-full bg-transparent" size="lg">
          <Play className="h-5 w-5 mr-2" />
          Vista Previa Gratuita
        </Button>

        <Separator />

        {/* Course Info */}
        <div className="space-y-4">
          <h4 className="font-semibold">Este curso incluye:</h4>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Course Stats */}
        <div className="space-y-4">
          <h4 className="font-semibold">Detalles del curso:</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Duración</span>
              </div>
              <span className="text-sm font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Estudiantes</span>
              </div>
              <span className="text-sm font-medium">{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Nivel</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {course.level}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Guarantee */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Garantía de satisfacción de 30 días
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Si no estás satisfecho, te devolvemos tu dinero</p>
        </div>
      </CardContent>
    </Card>
  )
}
