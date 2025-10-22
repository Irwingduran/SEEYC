"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  points: number
}

interface QuizBuilderProps {
  content: {
    title: string
    description: string
    questions: QuizQuestion[]
    passingScore: number
  }
  onChange: (content: any) => void
}

export function QuizBuilder({ content, onChange }: QuizBuilderProps) {
  const [title, setTitle] = useState(content?.title || "")
  const [description, setDescription] = useState(content?.description || "")
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    content?.questions || [
      {
        id: 1,
        question: "",
        options: ["", ""],
        correctAnswer: 0,
        explanation: "",
        points: 1,
      },
    ]
  )
  const [passingScore, setPassingScore] = useState(content?.passingScore || 70)

  const updateContent = (updatedQuestions?: QuizQuestion[]) => {
    const newQuestions = updatedQuestions || questions
    onChange({
      title,
      description,
      questions: newQuestions,
      passingScore,
    })
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    onChange({ title: value, description, questions, passingScore })
  }

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    onChange({ title, description: value, questions, passingScore })
  }

  const handlePassingScoreChange = (value: string) => {
    const score = parseInt(value) || 0
    setPassingScore(score)
    onChange({ title, description, questions, passingScore: score })
  }

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now(),
      question: "",
      options: ["", ""],
      correctAnswer: 0,
      explanation: "",
      points: 1,
    }
    const updatedQuestions = [...questions, newQuestion]
    setQuestions(updatedQuestions)
    updateContent(updatedQuestions)
  }

  const removeQuestion = (questionId: number) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId)
    setQuestions(updatedQuestions)
    updateContent(updatedQuestions)
  }

  const updateQuestion = (questionId: number, field: string, value: any) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, [field]: value } : q
    )
    setQuestions(updatedQuestions)
    updateContent(updatedQuestions)
  }

  const addOption = (questionId: number) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, options: [...q.options, ""] } : q
    )
    setQuestions(updatedQuestions)
    updateContent(updatedQuestions)
  }

  const removeOption = (questionId: number, optionIndex: number) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const newOptions = q.options.filter((_, i) => i !== optionIndex)
        return {
          ...q,
          options: newOptions,
          correctAnswer: q.correctAnswer >= newOptions.length ? 0 : q.correctAnswer,
        }
      }
      return q
    })
    setQuestions(updatedQuestions)
    updateContent(updatedQuestions)
  }

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const newOptions = [...q.options]
        newOptions[optionIndex] = value
        return { ...q, options: newOptions }
      }
      return q
    })
    setQuestions(updatedQuestions)
    updateContent(updatedQuestions)
  }

  const getTotalPoints = () => {
    return questions.reduce((sum, q) => sum + q.points, 0)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Crear Cuestionario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Título del cuestionario */}
          <div className="space-y-2">
            <Label htmlFor="quiz-title">Título del Cuestionario</Label>
            <Input
              id="quiz-title"
              placeholder="Ej: Evaluación - Conceptos Básicos de Electricidad"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="quiz-description">Descripción (opcional)</Label>
            <Textarea
              id="quiz-description"
              placeholder="Instrucciones para el estudiante..."
              rows={3}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </div>

          {/* Configuración */}
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <Label htmlFor="passing-score">Puntaje para Aprobar (%)</Label>
              <Input
                id="passing-score"
                type="number"
                min="0"
                max="100"
                value={passingScore}
                onChange={(e) => handlePassingScoreChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Puntos Totales</Label>
              <div className="flex items-center h-10">
                <Badge variant="secondary" className="text-base">
                  {getTotalPoints()} puntos
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preguntas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Preguntas ({questions.length})
          </h3>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {questions.map((question, qIndex) => (
            <AccordionItem
              key={question.id}
              value={`question-${question.id}`}
              className="border rounded-lg bg-card"
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3 flex-1 text-left">
                  <Badge variant="outline">#{qIndex + 1}</Badge>
                  <span className="font-medium">
                    {question.question || "Nueva pregunta"}
                  </span>
                  <Badge variant="secondary" className="ml-auto mr-2">
                    {question.points} {question.points === 1 ? "punto" : "puntos"}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 pt-4">
                  {/* Pregunta */}
                  <div className="space-y-2">
                    <Label htmlFor={`question-${question.id}`}>Pregunta</Label>
                    <Textarea
                      id={`question-${question.id}`}
                      placeholder="Escribe tu pregunta aquí..."
                      rows={2}
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, "question", e.target.value)
                      }
                    />
                  </div>

                  {/* Puntos */}
                  <div className="space-y-2">
                    <Label htmlFor={`points-${question.id}`}>Puntos</Label>
                    <Input
                      id={`points-${question.id}`}
                      type="number"
                      min="1"
                      max="100"
                      value={question.points}
                      onChange={(e) =>
                        updateQuestion(
                          question.id,
                          "points",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-32"
                    />
                  </div>

                  {/* Opciones de respuesta */}
                  <div className="space-y-2">
                    <Label>Opciones de Respuesta</Label>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <Button
                            variant={
                              question.correctAnswer === optionIndex
                                ? "default"
                                : "outline"
                            }
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                            onClick={() =>
                              updateQuestion(question.id, "correctAnswer", optionIndex)
                            }
                            title={
                              question.correctAnswer === optionIndex
                                ? "Respuesta correcta"
                                : "Marcar como correcta"
                            }
                          >
                            {question.correctAnswer === optionIndex ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Circle className="h-4 w-4" />
                            )}
                          </Button>
                          <Input
                            placeholder={`Opción ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              updateOption(question.id, optionIndex, e.target.value)
                            }
                          />
                          {question.options.length > 2 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0"
                              onClick={() => removeOption(question.id, optionIndex)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                        className="w-full border-dashed"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Opción
                      </Button>
                    </div>
                  </div>

                  {/* Explicación */}
                  <div className="space-y-2">
                    <Label htmlFor={`explanation-${question.id}`}>
                      Explicación (opcional)
                    </Label>
                    <Textarea
                      id={`explanation-${question.id}`}
                      placeholder="Explica por qué esta es la respuesta correcta..."
                      rows={2}
                      value={question.explanation}
                      onChange={(e) =>
                        updateQuestion(question.id, "explanation", e.target.value)
                      }
                    />
                  </div>

                  {/* Eliminar pregunta */}
                  {questions.length > 1 && (
                    <div className="pt-2 border-t">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar Pregunta
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Botón para agregar pregunta */}
        <Button variant="outline" onClick={addQuestion} className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Nueva Pregunta
        </Button>
      </div>

      {/* Vista previa del quiz */}
      {questions.length > 0 && questions[0].question && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa del Cuestionario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {title && <h3 className="text-xl font-bold">{title}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary">
                {questions.length} {questions.length === 1 ? "pregunta" : "preguntas"}
              </Badge>
              <Badge variant="secondary">{getTotalPoints()} puntos totales</Badge>
              <Badge variant="outline">Aprueba con {passingScore}%</Badge>
            </div>

            <div className="space-y-6 pt-4">
              {questions.map((question, qIndex) => (
                <div key={question.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">#{qIndex + 1}</Badge>
                    <p className="font-medium flex-1">{question.question}</p>
                    <Badge variant="secondary" className="text-xs">
                      {question.points}pts
                    </Badge>
                  </div>
                  <RadioGroup value={question.correctAnswer.toString()}>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={optionIndex.toString()}
                          id={`preview-${question.id}-${optionIndex}`}
                        />
                        <Label
                          htmlFor={`preview-${question.id}-${optionIndex}`}
                          className="font-normal cursor-pointer"
                        >
                          {option || `Opción ${optionIndex + 1}`}
                          {question.correctAnswer === optionIndex && (
                            <CheckCircle2 className="inline h-4 w-4 ml-2 text-green-600" />
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-xs text-muted-foreground mb-1">
                            Explicación:
                          </p>
                          <p>{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
