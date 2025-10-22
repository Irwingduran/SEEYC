"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XCircle, Clock, Award, RotateCcw, ArrowRight, ArrowLeft, Lightbulb, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  id: string
  type: "multiple-choice" | "multiple-select" | "true-false" | "short-answer"
  question: string
  options?: string[]
  correctAnswers: string[]
  explanation: string
  points: number
  timeLimit?: number
  difficulty: "easy" | "medium" | "hard"
}

interface QuizData {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit: number
  passingScore: number
  attempts: number
}

interface InteractiveQuizSystemProps {
  quizData: QuizData
  onComplete: (score: number, passed: boolean) => void
  onClose: () => void
}

export function InteractiveQuizSystem({ quizData, onComplete, onClose }: InteractiveQuizSystemProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60)
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (quizStarted && timeRemaining > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizStarted, timeRemaining, showResults])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: string, answer: string, isMultiSelect = false) => {
    setAnswers((prev) => {
      if (isMultiSelect) {
        const currentAnswers = prev[questionId] || []
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter((a) => a !== answer)
          : [...currentAnswers, answer]
        return { ...prev, [questionId]: newAnswers }
      } else {
        return { ...prev, [questionId]: [answer] }
      }
    })
  }

  const calculateScore = () => {
    let totalPoints = 0
    let earnedPoints = 0

    quizData.questions.forEach((question) => {
      totalPoints += question.points
      const userAnswers = answers[question.id] || []
      const correctAnswers = question.correctAnswers

      if (question.type === "multiple-select") {
        // Partial credit for multiple select
        const correctSelected = userAnswers.filter((answer) => correctAnswers.includes(answer)).length
        const incorrectSelected = userAnswers.filter((answer) => !correctAnswers.includes(answer)).length
        const partialScore = Math.max(0, (correctSelected - incorrectSelected) / correctAnswers.length)
        earnedPoints += partialScore * question.points
      } else {
        // All or nothing for other types
        const isCorrect =
          userAnswers.length === correctAnswers.length && userAnswers.every((answer) => correctAnswers.includes(answer))
        if (isCorrect) earnedPoints += question.points
      }
    })

    return { earnedPoints, totalPoints, percentage: (earnedPoints / totalPoints) * 100 }
  }

  const handleSubmitQuiz = () => {
    const score = calculateScore()
    const passed = score.percentage >= quizData.passingScore
    setShowResults(true)
    onComplete(score.percentage, passed)
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setTimeRemaining(quizData.timeLimit * 60)
    setShowResults(false)
    setQuizStarted(false)
    setShowExplanation(false)
  }

  const currentQuestionData = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const score = showResults ? calculateScore() : null

  if (!quizStarted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl mx-4 border-0 bg-card/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{quizData.title}</CardTitle>
            <p className="text-muted-foreground">{quizData.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{quizData.questions.length}</div>
                <div className="text-sm text-muted-foreground">Preguntas</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{quizData.timeLimit}</div>
                <div className="text-sm text-muted-foreground">Minutos</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{quizData.passingScore}%</div>
                <div className="text-sm text-muted-foreground">Para aprobar</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{quizData.attempts}</div>
                <div className="text-sm text-muted-foreground">Intentos</div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span>Instrucciones</span>
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>• Lee cada pregunta cuidadosamente antes de responder</li>
                <li>• Puedes navegar entre preguntas usando los botones</li>
                <li>• El tiempo es limitado, mantén un ritmo constante</li>
                <li>• Revisa tus respuestas antes de enviar</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button onClick={() => setQuizStarted(true)} className="flex-1">
                Comenzar Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const passed = score!.percentage >= quizData.passingScore
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl mx-4 border-0 bg-card/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div
              className={cn(
                "mx-auto w-16 h-16 rounded-full flex items-center justify-center",
                passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
              )}
            >
              {passed ? <Award className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
            </div>
            <CardTitle className="text-2xl">{passed ? "¡Felicitaciones!" : "Necesitas mejorar"}</CardTitle>
            <p className="text-muted-foreground">
              {passed ? "Has aprobado el quiz exitosamente" : `Necesitas ${quizData.passingScore}% para aprobar`}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">{Math.round(score!.percentage)}%</div>
              <div className="text-sm text-muted-foreground">
                {score!.earnedPoints.toFixed(1)} de {score!.totalPoints} puntos
              </div>
              <Progress value={score!.percentage} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-lg font-semibold text-green-600">
                  {
                    quizData.questions.filter((q) => {
                      const userAnswers = answers[q.id] || []
                      return (
                        userAnswers.length === q.correctAnswers.length &&
                        userAnswers.every((answer) => q.correctAnswers.includes(answer))
                      )
                    }).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Correctas</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-red-600">
                  {
                    quizData.questions.filter((q) => {
                      const userAnswers = answers[q.id] || []
                      return !(
                        userAnswers.length === q.correctAnswers.length &&
                        userAnswers.every((answer) => q.correctAnswers.includes(answer))
                      )
                    }).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Incorrectas</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-blue-600">
                  {formatTime(quizData.timeLimit * 60 - timeRemaining)}
                </div>
                <div className="text-sm text-muted-foreground">Tiempo usado</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleRetakeQuiz} className="flex-1 bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reintentar
              </Button>
              <Button onClick={onClose} className="flex-1">
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 h-[90vh] border-0 bg-card/95 backdrop-blur-sm shadow-2xl flex flex-col">
        {/* Header */}
        <CardHeader className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">{quizData.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>
                  Pregunta {currentQuestion + 1} de {quizData.questions.length}
                </span>
                <Badge
                  variant={
                    currentQuestionData.difficulty === "easy"
                      ? "secondary"
                      : currentQuestionData.difficulty === "medium"
                        ? "default"
                        : "destructive"
                  }
                >
                  {currentQuestionData.difficulty === "easy"
                    ? "Fácil"
                    : currentQuestionData.difficulty === "medium"
                      ? "Medio"
                      : "Difícil"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={cn("font-mono", timeRemaining < 300 && "text-red-600 font-bold")}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        {/* Question Content */}
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium leading-relaxed">{currentQuestionData.question}</h3>
              <div className="text-sm text-muted-foreground">
                {currentQuestionData.points} punto{currentQuestionData.points !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-4">
              {currentQuestionData.type === "multiple-choice" && (
                <RadioGroup
                  value={answers[currentQuestionData.id]?.[0] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestionData.id, value)}
                >
                  {currentQuestionData.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestionData.type === "multiple-select" && (
                <div className="space-y-2">
                  {currentQuestionData.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                      <Checkbox
                        id={`option-${index}`}
                        checked={answers[currentQuestionData.id]?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleAnswerChange(currentQuestionData.id, option, true)
                          } else {
                            setAnswers((prev) => ({
                              ...prev,
                              [currentQuestionData.id]: (prev[currentQuestionData.id] || []).filter(
                                (a) => a !== option,
                              ),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestionData.type === "true-false" && (
                <RadioGroup
                  value={answers[currentQuestionData.id]?.[0] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestionData.id, value)}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="true" id="true" />
                    <Label htmlFor="true" className="flex-1 cursor-pointer">
                      Verdadero
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false" className="flex-1 cursor-pointer">
                      Falso
                    </Label>
                  </div>
                </RadioGroup>
              )}

              {currentQuestionData.type === "short-answer" && (
                <Textarea
                  placeholder="Escribe tu respuesta aquí..."
                  value={answers[currentQuestionData.id]?.[0] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestionData.id, e.target.value)}
                  className="min-h-[100px]"
                />
              )}
            </div>

            {/* Explanation (shown after answering) */}
            {showExplanation && answers[currentQuestionData.id] && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Explicación</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">{currentQuestionData.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <div className="flex-shrink-0 border-t p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExplanation(!showExplanation)}
                disabled={!answers[currentQuestionData.id]}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {showExplanation ? "Ocultar" : "Ver"} explicación
              </Button>
            </div>

            {currentQuestion === quizData.questions.length - 1 ? (
              <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">
                Enviar Quiz
              </Button>
            ) : (
              <Button onClick={() => setCurrentQuestion(Math.min(quizData.questions.length - 1, currentQuestion + 1))}>
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
