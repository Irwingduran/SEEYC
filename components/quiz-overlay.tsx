"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, X } from "lucide-react"

interface QuizOverlayProps {
  onClose: () => void
  onComplete: () => void
}

export function QuizOverlay({ onClose, onComplete }: QuizOverlayProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 1,
      question: "¿Cuál es la tensión estándar en instalaciones residenciales en España?",
      options: ["110V", "220V", "230V", "240V"],
      correct: 2,
      explanation: "En España, la tensión estándar para instalaciones residenciales es de 230V.",
    },
    {
      id: 2,
      question: "¿Qué tipo de protección es obligatoria en circuitos de baño?",
      options: ["Magnetotérmico", "Diferencial", "Sobretensión", "Todas las anteriores"],
      correct: 3,
      explanation: "En baños se requiere protección magnetotérmica, diferencial y contra sobretensiones.",
    },
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleComplete = () => {
    onComplete()
  }

  const correctAnswers = selectedAnswers.filter((answer, index) => answer === questions[index].correct).length

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-600 dark:text-purple-400">¡Quiz Completado!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {correctAnswers}/{questions.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Respuestas correctas</p>
            </div>

            <div className="space-y-3">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-800"
                >
                  {selectedAnswers[index] === question.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">Pregunta {index + 1}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                Revisar
              </Button>
              <Button onClick={handleComplete} className="flex-1 bg-purple-500 hover:bg-purple-600">
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-purple-600 dark:text-purple-400">Quiz de Conocimientos</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Pregunta {currentQuestion + 1} de {questions.length}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {currentQuestion === questions.length - 1 ? "Finalizar" : "Siguiente"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
