"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, HelpCircle, CheckCircle, Clock, Target, Award } from "lucide-react"

interface QuizQuestion {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer" | "matching"
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit?: number
  passingScore: number
  allowRetakes: boolean
  showCorrectAnswers: boolean
}

interface QuizBuilderProps {
  quizzes: Quiz[]
  onUpdate: (quizzes: Quiz[]) => void
}

export function QuizBuilder({ quizzes, onUpdate }: QuizBuilderProps) {
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    timeLimit: 0,
    passingScore: 70,
    allowRetakes: true,
    showCorrectAnswers: true,
  })
  const [newQuestion, setNewQuestion] = useState({
    type: "multiple-choice" as const,
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    points: 1,
  })

  const createQuiz = () => {
    const quiz: Quiz = {
      id: Date.now().toString(),
      ...newQuiz,
      questions: [],
    }
    onUpdate([...quizzes, quiz])
    setNewQuiz({
      title: "",
      description: "",
      timeLimit: 0,
      passingScore: 70,
      allowRetakes: true,
      showCorrectAnswers: true,
    })
    setIsCreatingQuiz(false)
    setEditingQuiz(quiz)
  }

  const addQuestion = () => {
    if (!editingQuiz) return

    const question: QuizQuestion = {
      id: Date.now().toString(),
      ...newQuestion,
      options: newQuestion.type === "multiple-choice" ? newQuestion.options.filter((opt) => opt.trim()) : undefined,
    }

    const updatedQuiz = {
      ...editingQuiz,
      questions: [...editingQuiz.questions, question],
    }

    onUpdate(quizzes.map((quiz) => (quiz.id === editingQuiz.id ? updatedQuiz : quiz)))
    setEditingQuiz(updatedQuiz)
    setNewQuestion({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
      points: 1,
    })
    setIsAddingQuestion(false)
  }

  const deleteQuestion = (questionId: string) => {
    if (!editingQuiz) return

    const updatedQuiz = {
      ...editingQuiz,
      questions: editingQuiz.questions.filter((q) => q.id !== questionId),
    }

    onUpdate(quizzes.map((quiz) => (quiz.id === editingQuiz.id ? updatedQuiz : quiz)))
    setEditingQuiz(updatedQuiz)
  }

  const deleteQuiz = (quizId: string) => {
    onUpdate(quizzes.filter((quiz) => quiz.id !== quizId))
    if (editingQuiz?.id === quizId) {
      setEditingQuiz(null)
    }
  }

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return <CheckCircle className="w-4 h-4" />
      case "true-false":
        return <HelpCircle className="w-4 h-4" />
      case "short-answer":
        return <Edit className="w-4 h-4" />
      default:
        return <HelpCircle className="w-4 h-4" />
    }
  }

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "true-false":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "short-answer":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Constructor de Quizzes</h2>
          <p className="text-gray-600 dark:text-gray-300">Crea evaluaciones interactivas para tus lecciones</p>
        </div>
        <Dialog open={isCreatingQuiz} onOpenChange={setIsCreatingQuiz}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Crear Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Título del Quiz</Label>
                <Input
                  id="quiz-title"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Evaluación de Circuitos Eléctricos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiz-description">Descripción</Label>
                <Textarea
                  id="quiz-description"
                  value={newQuiz.description}
                  onChange={(e) => setNewQuiz((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe qué evalúa este quiz..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time-limit">Límite de Tiempo (minutos)</Label>
                  <Input
                    id="time-limit"
                    type="number"
                    value={newQuiz.timeLimit}
                    onChange={(e) =>
                      setNewQuiz((prev) => ({ ...prev, timeLimit: Number.parseInt(e.target.value) || 0 }))
                    }
                    placeholder="0 = Sin límite"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passing-score">Puntuación Mínima (%)</Label>
                  <Input
                    id="passing-score"
                    type="number"
                    value={newQuiz.passingScore}
                    onChange={(e) =>
                      setNewQuiz((prev) => ({ ...prev, passingScore: Number.parseInt(e.target.value) || 70 }))
                    }
                    placeholder="70"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Permitir Reintentos</Label>
                    <p className="text-xs text-gray-500">Los estudiantes pueden repetir el quiz</p>
                  </div>
                  <Switch
                    checked={newQuiz.allowRetakes}
                    onCheckedChange={(checked) => setNewQuiz((prev) => ({ ...prev, allowRetakes: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mostrar Respuestas Correctas</Label>
                    <p className="text-xs text-gray-500">Mostrar respuestas después de completar</p>
                  </div>
                  <Switch
                    checked={newQuiz.showCorrectAnswers}
                    onCheckedChange={(checked) => setNewQuiz((prev) => ({ ...prev, showCorrectAnswers: checked }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingQuiz(false)}>
                  Cancelar
                </Button>
                <Button onClick={createQuiz} disabled={!newQuiz.title}>
                  Crear Quiz
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz List */}
        <div className="lg:col-span-1">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Mis Quizzes ({quizzes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {quizzes.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">No hay quizzes aún</p>
                  <Button
                    onClick={() => setIsCreatingQuiz(true)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Crear Primer Quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        editingQuiz?.id === quiz.id
                          ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setEditingQuiz(quiz)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">{quiz.title}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteQuiz(quiz.id)
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant="secondary" className="text-xs">
                          {quiz.questions.length} preguntas
                        </Badge>
                        {quiz.timeLimit > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {quiz.timeLimit}min
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quiz Editor */}
        <div className="lg:col-span-2">
          {!editingQuiz ? (
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardContent className="p-12 text-center">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Selecciona un Quiz para Editar
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Elige un quiz de la lista o crea uno nuevo para comenzar a agregar preguntas
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Quiz Header */}
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{editingQuiz.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{editingQuiz.description}</p>
                    </div>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      <Award className="w-4 h-4 mr-1" />
                      {editingQuiz.passingScore}% para aprobar
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span>{editingQuiz.questions.length} preguntas</span>
                      {editingQuiz.timeLimit > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {editingQuiz.timeLimit} minutos
                        </span>
                      )}
                      <span>{editingQuiz.questions.reduce((total, q) => total + q.points, 0)} puntos totales</span>
                    </div>
                    <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Agregar Pregunta
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Agregar Nueva Pregunta</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Tipo de Pregunta</Label>
                              <Select
                                value={newQuestion.type}
                                onValueChange={(value: any) => setNewQuestion((prev) => ({ ...prev, type: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="multiple-choice">Opción Múltiple</SelectItem>
                                  <SelectItem value="true-false">Verdadero/Falso</SelectItem>
                                  <SelectItem value="short-answer">Respuesta Corta</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="question-points">Puntos</Label>
                              <Input
                                id="question-points"
                                type="number"
                                value={newQuestion.points}
                                onChange={(e) =>
                                  setNewQuestion((prev) => ({ ...prev, points: Number.parseInt(e.target.value) || 1 }))
                                }
                                min="1"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="question-text">Pregunta</Label>
                            <Textarea
                              id="question-text"
                              value={newQuestion.question}
                              onChange={(e) => setNewQuestion((prev) => ({ ...prev, question: e.target.value }))}
                              placeholder="Escribe tu pregunta aquí..."
                              rows={3}
                            />
                          </div>

                          {newQuestion.type === "multiple-choice" && (
                            <div className="space-y-2">
                              <Label>Opciones de Respuesta</Label>
                              {newQuestion.options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...newQuestion.options]
                                      newOptions[index] = e.target.value
                                      setNewQuestion((prev) => ({ ...prev, options: newOptions }))
                                    }}
                                    placeholder={`Opción ${index + 1}`}
                                  />
                                  <Button
                                    size="sm"
                                    variant={newQuestion.correctAnswer === option ? "default" : "outline"}
                                    onClick={() => setNewQuestion((prev) => ({ ...prev, correctAnswer: option }))}
                                  >
                                    {newQuestion.correctAnswer === option ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      "Correcta"
                                    )}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}

                          {newQuestion.type === "true-false" && (
                            <div className="space-y-2">
                              <Label>Respuesta Correcta</Label>
                              <div className="flex gap-2">
                                <Button
                                  variant={newQuestion.correctAnswer === "true" ? "default" : "outline"}
                                  onClick={() => setNewQuestion((prev) => ({ ...prev, correctAnswer: "true" }))}
                                >
                                  Verdadero
                                </Button>
                                <Button
                                  variant={newQuestion.correctAnswer === "false" ? "default" : "outline"}
                                  onClick={() => setNewQuestion((prev) => ({ ...prev, correctAnswer: "false" }))}
                                >
                                  Falso
                                </Button>
                              </div>
                            </div>
                          )}

                          {newQuestion.type === "short-answer" && (
                            <div className="space-y-2">
                              <Label htmlFor="correct-answer">Respuesta Correcta</Label>
                              <Input
                                id="correct-answer"
                                value={newQuestion.correctAnswer as string}
                                onChange={(e) => setNewQuestion((prev) => ({ ...prev, correctAnswer: e.target.value }))}
                                placeholder="Respuesta esperada..."
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label htmlFor="explanation">Explicación (Opcional)</Label>
                            <Textarea
                              id="explanation"
                              value={newQuestion.explanation}
                              onChange={(e) => setNewQuestion((prev) => ({ ...prev, explanation: e.target.value }))}
                              placeholder="Explica por qué esta es la respuesta correcta..."
                              rows={2}
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddingQuestion(false)}>
                              Cancelar
                            </Button>
                            <Button
                              onClick={addQuestion}
                              disabled={!newQuestion.question || !newQuestion.correctAnswer}
                            >
                              Agregar Pregunta
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Questions List */}
              {editingQuiz.questions.length === 0 ? (
                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
                  <CardContent className="p-12 text-center">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay preguntas aún</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Agrega tu primera pregunta para comenzar a crear el quiz
                    </p>
                    <Button onClick={() => setIsAddingQuestion(true)} className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Primera Pregunta
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {editingQuiz.questions.map((question, index) => (
                    <Card
                      key={question.id}
                      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <Badge className={getQuestionTypeColor(question.type)}>
                                {getQuestionTypeIcon(question.type)}
                                <span className="ml-1 capitalize">
                                  {question.type === "multiple-choice"
                                    ? "Opción Múltiple"
                                    : question.type === "true-false"
                                      ? "V/F"
                                      : "Respuesta Corta"}
                                </span>
                              </Badge>
                              <Badge variant="secondary" className="ml-2">
                                {question.points} {question.points === 1 ? "punto" : "puntos"}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteQuestion(question.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">{question.question}</h3>

                        {question.type === "multiple-choice" && question.options && (
                          <div className="space-y-2 mb-3">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded border text-sm ${
                                  option === question.correctAnswer
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                }`}
                              >
                                <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                                {option}
                                {option === question.correctAnswer && (
                                  <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "true-false" && (
                          <div className="mb-3">
                            <Badge
                              className={
                                question.correctAnswer === "true"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }
                            >
                              Respuesta: {question.correctAnswer === "true" ? "Verdadero" : "Falso"}
                            </Badge>
                          </div>
                        )}

                        {question.type === "short-answer" && (
                          <div className="mb-3">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Respuesta: {question.correctAnswer}
                            </Badge>
                          </div>
                        )}

                        {question.explanation && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              <strong>Explicación:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
