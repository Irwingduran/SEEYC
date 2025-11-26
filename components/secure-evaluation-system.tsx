"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ContentProtection } from "@/components/content-protection"
import { useEvaluationAccess } from "@/hooks/use-evaluation-access"
import {
  Evaluation,
  EvaluationQuestion,
  EvaluationAnswer,
  SuspiciousActivity,
} from "@/types/evaluation"
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Shield,
  Timer,
} from "lucide-react"
import { formatTimeUntilUnlock } from "@/lib/evaluation-tokens"

interface SecureEvaluationSystemProps {
  evaluation: Evaluation
  studentId: string
  courseId: number
  courseVersionId: number
  token: string
  onComplete?: (score: number, passed: boolean) => void
}

type EvaluationState = "locked" | "ready" | "instructions" | "in_progress" | "results"

export function SecureEvaluationSystem({
  evaluation,
  studentId,
  courseId,
  courseVersionId,
  token,
  onComplete,
}: SecureEvaluationSystemProps) {
  const {
    access,
    currentToken,
    loading,
    error,
    canAttempt,
    canAttemptReason,
    timeUntilUnlock,
    generateNewToken,
    startAttempt,
    recordSuspiciousActivity,
    completeAttempt,
  } = useEvaluationAccess({
    evaluationId: evaluation.id,
    studentId,
    courseId,
    courseVersionId,
    token,
  })

  const [state, setState] = useState<EvaluationState>("ready")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<string, string | string[]>>(new Map())
  const [timeRemaining, setTimeRemaining] = useState(evaluation.timeLimit * 60) // En segundos
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [finalPassed, setFinalPassed] = useState<boolean | null>(null)

  const currentQuestion = evaluation.questions[currentQuestionIndex]

  // Determinar el estado inicial basado en el acceso
  useEffect(() => {
    if (loading) return

    if (!canAttempt) {
      if (canAttemptReason === "locked") {
        setState("locked")
      } else if (canAttemptReason === "no_attempts") {
        setState("locked")
      }
    } else {
      setState("instructions")
    }
  }, [loading, canAttempt, canAttemptReason])

  // Timer de la evaluación
  useEffect(() => {
    if (state !== "in_progress") return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [state])

  // Registrar actividad sospechosa
  const handleSuspiciousActivity = useCallback(
    (activity: { type: string; timestamp: string; details?: string }) => {
      const suspiciousActivity: SuspiciousActivity = {
        type: activity.type as any,
        timestamp: activity.timestamp,
        details: activity.details,
        count: 1,
      }
      recordSuspiciousActivity(suspiciousActivity)
    },
    [recordSuspiciousActivity]
  )

  // Iniciar la evaluación
  const handleStartEvaluation = async () => {
    // Generar token si no existe
    let tokenToUse = currentToken

    if (!tokenToUse) {
      tokenToUse = await generateNewToken()
      if (!tokenToUse) return
    }

    // Iniciar el intento
    const attempt = await startAttempt(tokenToUse.id)
    if (!attempt) return

    setAttemptId(attempt.id)
    setState("in_progress")
    setTimeRemaining(evaluation.timeLimit * 60)
  }

  // Manejar respuesta a una pregunta
  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(new Map(answers.set(questionId, answer)))
  }

  // Navegar a la siguiente pregunta
  const handleNextQuestion = () => {
    if (currentQuestionIndex < evaluation.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Navegar a la pregunta anterior
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Calcular la puntuación
  const calculateScore = (): {
    score: number
    maxScore: number
    percentage: number
    passed: boolean
  } => {
    let earnedPoints = 0
    const maxScore = evaluation.questions.reduce((sum, q) => sum + q.points, 0)

    evaluation.questions.forEach((question) => {
      const userAnswer = answers.get(question.id)
      if (!userAnswer) return

      const correctAnswers = question.correctAnswers

      if (question.type === "multiple-select") {
        // Crédito parcial para respuestas múltiples
        const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer]
        const correctSelected = userAnswerArray.filter((answer) =>
          correctAnswers.includes(answer)
        ).length
        const incorrectSelected = userAnswerArray.filter(
          (answer) => !correctAnswers.includes(answer)
        ).length
        const partialScore = Math.max(
          0,
          (correctSelected - incorrectSelected) / correctAnswers.length
        )
        earnedPoints += partialScore * question.points
      } else {
        // Todo o nada para otros tipos
        const isCorrect = Array.isArray(userAnswer)
          ? userAnswer.length === 1 && correctAnswers.includes(userAnswer[0])
          : correctAnswers.includes(userAnswer)

        if (isCorrect) {
          earnedPoints += question.points
        }
      }
    })

    const percentage = (earnedPoints / maxScore) * 100
    const passed = percentage >= evaluation.passingScore

    return {
      score: earnedPoints,
      maxScore,
      percentage,
      passed,
    }
  }

  // Enviar la evaluación
  const handleSubmit = async () => {
    if (!attemptId) return

    const result = calculateScore()
    setFinalScore(result.percentage)
    setFinalPassed(result.passed)

    await completeAttempt(attemptId, result.score, result.passed)

    setState("results")

    if (onComplete) {
      onComplete(result.score, result.passed)
    }
  }

  // Manejar cuando se acaba el tiempo
  const handleTimeUp = () => {
    handleSubmit()
  }

  // Formatear tiempo
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Clock className="mx-auto h-12 w-12 animate-spin text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Cargando evaluación...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Vista de bloqueo
  if (state === "locked") {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-destructive" />
            <CardTitle>Evaluación Bloqueada</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {canAttemptReason === "locked" && timeUntilUnlock ? (
            <>
              <Alert>
                <Timer className="h-4 w-4" />
                <AlertTitle>Tiempo de espera requerido</AlertTitle>
                <AlertDescription>
                  Has agotado tus intentos disponibles. Debes esperar{" "}
                  <strong>48 horas</strong> antes de poder volver a intentarlo.
                </AlertDescription>
              </Alert>

              <div className="rounded-lg bg-muted p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Tiempo restante hasta desbloqueo:
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {formatTimeUntilUnlock(
                    access?.lockedUntil || new Date().toISOString()
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Información de tu acceso:</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Intentos usados:</span>
                    <p className="font-semibold">
                      {access?.attemptsUsed} / {access?.attemptsAllowed}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Intentos restantes:
                    </span>
                    <p className="font-semibold">{access?.remainingAttempts}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Sin intentos disponibles</AlertTitle>
              <AlertDescription>
                Has agotado todos tus intentos para esta evaluación. Contacta con tu
                instructor si necesitas asistencia.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    )
  }

  // Vista de instrucciones
  if (state === "instructions") {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{evaluation.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{evaluation.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Evaluación Protegida</AlertTitle>
            <AlertDescription>
              Esta evaluación está protegida contra copia y capturas de pantalla. Toda
              actividad sospechosa será registrada.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold">Información de la evaluación:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Preguntas</p>
                <p className="text-2xl font-bold">{evaluation.questions.length}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Tiempo límite</p>
                <p className="text-2xl font-bold">{evaluation.timeLimit} min</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Puntuación mínima</p>
                <p className="text-2xl font-bold">{evaluation.passingScore}%</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Intentos restantes</p>
                <p className="text-2xl font-bold">{access?.remainingAttempts}</p>
              </div>
            </div>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Tienes <strong>2 intentos</strong> para aprobar esta evaluación</li>
                <li>
                  Si fallas ambos intentos, deberás esperar <strong>48 horas</strong>{" "}
                  para volver a intentarlo
                </li>
                <li>
                  No puedes copiar, pegar o tomar capturas de pantalla del contenido
                </li>
                <li>El tiempo no se puede pausar una vez iniciada la evaluación</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Button onClick={handleStartEvaluation} className="w-full" size="lg">
            Iniciar Evaluación
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Vista de evaluación en progreso
  if (state === "in_progress") {
    const progress = ((currentQuestionIndex + 1) / evaluation.questions.length) * 100

    return (
      <ContentProtection
        onSuspiciousActivity={handleSuspiciousActivity}
        showWarnings={true}
        strictMode={true}
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Header con tiempo y progreso */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Progreso</p>
                  <p className="text-lg font-bold">
                    Pregunta {currentQuestionIndex + 1} de{" "}
                    {evaluation.questions.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tiempo restante
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      timeRemaining < 300 ? "text-destructive" : ""
                    }`}
                  >
                    <Clock className="mr-1 inline h-4 w-4" />
                    {formatTime(timeRemaining)}
                  </p>
                </div>
              </div>
              <Progress value={progress} className="mt-4" />
            </CardContent>
          </Card>

          {/* Pregunta actual */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant={currentQuestion.difficulty === "easy" ? "secondary" : currentQuestion.difficulty === "medium" ? "default" : "destructive"}>
                      {currentQuestion.difficulty === "easy"
                        ? "Fácil"
                        : currentQuestion.difficulty === "medium"
                          ? "Medio"
                          : "Difícil"}
                    </Badge>
                    <Badge variant="outline">{currentQuestion.points} puntos</Badge>
                  </div>
                  <CardTitle className="text-xl">
                    {currentQuestion.question}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.type === "multiple-choice" && (
                <div className="space-y-2">
                  {currentQuestion.options?.map((option, index) => (
                    <label
                      key={index}
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={answers.get(currentQuestion.id) === option}
                        onChange={(e) =>
                          handleAnswer(currentQuestion.id, e.target.value)
                        }
                        className="h-4 w-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === "multiple-select" && (
                <div className="space-y-2">
                  {currentQuestion.options?.map((option, index) => {
                    const currentAnswers = (answers.get(currentQuestion.id) as
                      | string[]
                      | undefined) || []
                    return (
                      <label
                        key={index}
                        className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={currentAnswers.includes(option)}
                          onChange={(e) => {
                            const newAnswers = e.target.checked
                              ? [...currentAnswers, option]
                              : currentAnswers.filter((a) => a !== option)
                            handleAnswer(currentQuestion.id, newAnswers)
                          }}
                          className="h-4 w-4"
                        />
                        <span>{option}</span>
                      </label>
                    )
                  })}
                </div>
              )}

              {currentQuestion.type === "true-false" && (
                <div className="space-y-2">
                  {["Verdadero", "Falso"].map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={answers.get(currentQuestion.id) === option}
                        onChange={(e) =>
                          handleAnswer(currentQuestion.id, e.target.value)
                        }
                        className="h-4 w-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === "short-answer" && (
                <textarea
                  value={(answers.get(currentQuestion.id) as string) || ""}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="min-h-[120px] w-full rounded-lg border p-4"
                  placeholder="Escribe tu respuesta aquí..."
                />
              )}
            </CardContent>
          </Card>

          {/* Navegación */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Anterior
            </Button>

            <div className="text-sm text-muted-foreground">
              {evaluation.questions.filter((q) => answers.has(q.id)).length} de{" "}
              {evaluation.questions.length} respondidas
            </div>

            {currentQuestionIndex < evaluation.questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>Siguiente</Button>
            ) : (
              <Button onClick={handleSubmit} variant="default">
                Enviar Evaluación
              </Button>
            )}
          </div>
        </div>
      </ContentProtection>
    )
  }

  // Vista de resultados
  if (state === "results") {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            {finalPassed ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-destructive" />
            )}
            <CardTitle>
              {finalPassed ? "¡Felicitaciones!" : "Evaluación No Aprobada"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-6xl font-bold">
              {finalScore?.toFixed(1)}%
            </p>
            <p className="mt-2 text-muted-foreground">
              Puntuación mínima requerida: {evaluation.passingScore}%
            </p>
          </div>

          {!finalPassed && access && access.remainingAttempts > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Te quedan intentos</AlertTitle>
              <AlertDescription>
                Tienes <strong>{access.remainingAttempts} intento(s)</strong> restantes.
                Revisa el material del curso y vuelve a intentarlo.
              </AlertDescription>
            </Alert>
          )}

          {!finalPassed && access && access.remainingAttempts === 0 && (
            <Alert variant="destructive">
              <Lock className="h-4 w-4" />
              <AlertTitle>Sin intentos restantes</AlertTitle>
              <AlertDescription>
                Has agotado todos tus intentos. Debes esperar{" "}
                <strong>48 horas</strong> antes de poder volver a intentarlo.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => window.history.back()}>
              Volver al Curso
            </Button>
            {!finalPassed && access && access.remainingAttempts > 0 && (
              <Button
                className="flex-1"
                onClick={() => {
                  setState("instructions")
                  setCurrentQuestionIndex(0)
                  setAnswers(new Map())
                  setFinalScore(null)
                  setFinalPassed(null)
                }}
              >
                Intentar de Nuevo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
