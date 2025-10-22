"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, BookOpen } from "lucide-react"
import Image from "next/image"

const continueCourses = [
  {
    id: 1,
    title: "Automatización Industrial con PLC",
    instructor: "Ing. María González",
    progress: 75,
    nextLesson: "Programación de Temporizadores",
    timeLeft: "45 min",
    image: "/industrial-automation-plc.jpg",
    level: "Intermedio",
  },
  {
    id: 2,
    title: "Instalaciones Solares Residenciales",
    instructor: "Ing. Roberto Silva",
    progress: 60,
    nextLesson: "Cálculo de Dimensionamiento",
    timeLeft: "30 min",
    image: "/solar-panels-installation.jpg",
    level: "Avanzado",
  },
  {
    id: 3,
    title: "Seguridad Eléctrica Industrial",
    instructor: "Ing. Ana Martínez",
    progress: 40,
    nextLesson: "Protocolos de Bloqueo",
    timeLeft: "25 min",
    image: "/electrical-safety-equipment.jpg",
    level: "Básico",
  },
]

export function ContinueLearning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Continuar Aprendiendo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {continueCourses.map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{course.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Próxima lección: {course.nextLesson}</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progreso</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {course.timeLeft}
                  </div>
                </div>
              </div>

              <Button size="sm" className="flex-shrink-0">
                <Play className="h-4 w-4 mr-1" />
                Continuar
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
