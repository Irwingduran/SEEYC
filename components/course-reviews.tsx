"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp } from "lucide-react"

interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
}

interface CourseReviewsProps {
  courseId: string
}

const reviewsData: Record<string, Review[]> = {
  "1": [
    {
      id: "review-1",
      user: "Miguel Rodríguez",
      avatar: "/professional-man.png",
      rating: 5,
      date: "Hace 2 semanas",
      comment:
        "Excelente curso, muy bien explicado y con ejemplos prácticos. El instructor domina completamente el tema y hace que conceptos complejos sean fáciles de entender.",
      helpful: 12,
      verified: true,
    },
    {
      id: "review-2",
      user: "Ana Martínez",
      avatar: "/professional-woman-diverse.png",
      rating: 4,
      date: "Hace 1 mes",
      comment:
        "Muy buen contenido y materiales de apoyo. Me hubiera gustado más práctica con casos reales, pero en general cumple las expectativas.",
      helpful: 8,
      verified: true,
    },
    {
      id: "review-3",
      user: "Carlos Vega",
      avatar: "/engineer-man.png",
      rating: 5,
      date: "Hace 3 semanas",
      comment:
        "Como electricista con experiencia, puedo decir que este curso está muy actualizado con las normas vigentes. Recomendado 100%.",
      helpful: 15,
      verified: true,
    },
  ],
}

const ratingDistribution = [
  { stars: 5, percentage: 68, count: 340 },
  { stars: 4, percentage: 22, count: 110 },
  { stars: 3, percentage: 7, count: 35 },
  { stars: 2, percentage: 2, count: 10 },
  { stars: 1, percentage: 1, count: 5 },
]

export function CourseReviews({ courseId }: CourseReviewsProps) {
  const reviews = reviewsData[courseId] || []
  const averageRating = 4.8
  const totalReviews = 500

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Reseñas de Estudiantes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">{averageRating}</div>
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{totalReviews.toLocaleString()} reseñas</div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm">{rating.stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress value={rating.percentage} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground w-8">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          <h4 className="font-semibold">Reseñas Recientes</h4>
          {reviews.map((review) => (
            <div key={review.id} className="space-y-3 p-4 rounded-lg bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.user}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verificado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-pretty">{review.comment}</p>

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-xs">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Útil ({review.helpful})
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Ver Todas las Reseñas
        </Button>
      </CardContent>
    </Card>
  )
}
