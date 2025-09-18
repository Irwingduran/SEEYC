"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star, Play, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ScreenReaderOnly } from "@/components/screen-reader-only"

interface CourseCardProps {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  students: number
  rating: number
  price: number
  level: "Principiante" | "Intermedio" | "Avanzado"
  category: string
  image: string
  progress?: number
  isEnrolled?: boolean
}

export function CourseCard({
  id,
  title,
  description,
  instructor,
  duration,
  students,
  rating,
  price,
  level,
  category,
  image,
  progress,
  isEnrolled = false,
}: CourseCardProps) {
  const levelColors = {
    Principiante: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    Intermedio: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    Avanzado: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  }

  return (
    <article>
      <Link
        href={`/courses/${id}`}
        className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        aria-label={`Ver detalles del curso: ${title}`}
      >
        <Card className="group overflow-hidden border-0 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-card/80 cursor-pointer">
          <div className="relative overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Imagen del curso: ${title}`}
              width={400}
              height={200}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className={levelColors[level]}>{level}</Badge>
            </div>
            {isEnrolled && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>Progreso del curso</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-2 bg-white/20"
                    aria-label={`Progreso del curso: ${progress}%`}
                  />
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
              <p className="text-sm font-medium text-foreground">Instructor: {instructor}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{duration}</span>
                  <ScreenReaderOnly>de duración</ScreenReaderOnly>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  <span>{students.toLocaleString()}</span>
                  <ScreenReaderOnly>estudiantes inscritos</ScreenReaderOnly>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="font-medium">{rating}</span>
                <ScreenReaderOnly>de 5 estrellas</ScreenReaderOnly>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary" aria-label={`Precio: ${price} pesos`}>
                ${price.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Pago único</div>
            </div>
            <Button className="flex items-center space-x-2">
              {isEnrolled ? (
                <>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  <span>Continuar</span>
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>Ver Curso</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </article>
  )
}
