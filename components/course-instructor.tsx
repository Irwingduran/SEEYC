"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, BookOpen, Award, MessageCircle } from "lucide-react"

interface CourseInstructorProps {
  instructor: string
}

const instructorData: Record<string, any> = {
  "Ing. Carlos Mendoza": {
    name: "Ing. Carlos Mendoza",
    title: "Especialista en Instalaciones Eléctricas Residenciales",
    avatar: "/professional-electrical-engineer.jpg",
    rating: 4.9,
    students: 3200,
    courses: 12,
    experience: "15+ años",
    bio: "Ingeniero Eléctrico con más de 15 años de experiencia en instalaciones residenciales y comerciales. Certificado por el Colegio de Ingenieros y especialista en sistemas de automatización domótica.",
    achievements: [
      "Certificación en Sistemas Domóticos",
      "Instructor Certificado NFPA 70E",
      "Especialista en Energías Renovables",
      "Consultor en Eficiencia Energética",
    ],
  },
  "Ing. María González": {
    name: "Ing. María González",
    title: "Experta en Automatización Industrial",
    avatar: "/professional-female-electrical-engineer.jpg",
    rating: 4.9,
    students: 2800,
    courses: 8,
    experience: "12+ años",
    bio: "Ingeniera en Automatización con amplia experiencia en sistemas PLC, SCADA y robótica industrial. Ha trabajado en proyectos de automatización para las principales industrias del país.",
    achievements: [
      "Certificación Siemens PLC",
      "Especialista en Robótica Industrial",
      "Consultora en Industria 4.0",
      "Instructora Certificada Allen-Bradley",
    ],
  },
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  const instructorInfo = instructorData[instructor] || instructorData["Ing. Carlos Mendoza"]

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Instructor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Instructor Avatar and Basic Info */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={instructorInfo.avatar || "/placeholder.svg"} alt={instructorInfo.name} />
              <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                {instructorInfo.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold">{instructorInfo.name}</h3>
              <p className="text-muted-foreground">{instructorInfo.title}</p>
            </div>
          </div>

          {/* Instructor Stats */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{instructorInfo.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground">Calificación</div>
              </div>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{instructorInfo.students.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground">Estudiantes</div>
              </div>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{instructorInfo.courses}</span>
                </div>
                <div className="text-xs text-muted-foreground">Cursos</div>
              </div>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{instructorInfo.experience}</span>
                </div>
                <div className="text-xs text-muted-foreground">Experiencia</div>
              </div>
            </div>

            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contactar Instructor
            </Button>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <h4 className="font-semibold">Acerca del Instructor</h4>
          <p className="text-muted-foreground text-pretty">{instructorInfo.bio}</p>
        </div>

        {/* Achievements */}
        <div className="space-y-4">
          <h4 className="font-semibold">Certificaciones y Logros</h4>
          <div className="flex flex-wrap gap-2">
            {instructorInfo.achievements.map((achievement: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {achievement}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
