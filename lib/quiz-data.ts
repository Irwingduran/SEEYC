import type { QuizQuestion } from "@/components/interactive-quiz-system"

export interface QuizData {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit: number
  passingScore: number
  attempts: number
}

export const sampleQuizzes: QuizData[] = [
  {
    id: "electrical-basics-quiz",
    title: "Fundamentos de Electricidad",
    description: "Evalúa tus conocimientos básicos sobre conceptos eléctricos fundamentales",
    timeLimit: 15,
    passingScore: 70,
    attempts: 3,
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "¿Cuál es la unidad de medida de la corriente eléctrica?",
        options: ["Voltio (V)", "Amperio (A)", "Ohmio (Ω)", "Watt (W)"],
        correctAnswers: ["Amperio (A)"],
        explanation:
          "El amperio (A) es la unidad básica del Sistema Internacional para medir la intensidad de corriente eléctrica.",
        points: 2,
        difficulty: "easy",
      },
      {
        id: "q2",
        type: "multiple-select",
        question:
          "¿Cuáles de los siguientes son componentes de seguridad en instalaciones eléctricas? (Selecciona todas las correctas)",
        options: [
          "Interruptor diferencial",
          "Fusibles",
          "Puesta a tierra",
          "Cable de cobre",
          "Interruptor termomagnético",
        ],
        correctAnswers: ["Interruptor diferencial", "Fusibles", "Puesta a tierra", "Interruptor termomagnético"],
        explanation:
          "Todos estos elementos son componentes de seguridad, excepto el cable de cobre que es un conductor.",
        points: 3,
        difficulty: "medium",
      },
      {
        id: "q3",
        type: "true-false",
        question: "La ley de Ohm establece que V = I × R",
        correctAnswers: ["true"],
        explanation:
          "Correcto. La ley de Ohm establece que el voltaje (V) es igual a la corriente (I) multiplicada por la resistencia (R).",
        points: 1,
        difficulty: "easy",
      },
      {
        id: "q4",
        type: "multiple-choice",
        question: "¿Qué tipo de corriente se utiliza comúnmente en las instalaciones residenciales?",
        options: ["Corriente continua (DC)", "Corriente alterna (AC)", "Corriente mixta", "Corriente pulsante"],
        correctAnswers: ["Corriente alterna (AC)"],
        explanation:
          "Las instalaciones residenciales utilizan corriente alterna (AC) porque es más eficiente para la transmisión a larga distancia.",
        points: 2,
        difficulty: "easy",
      },
      {
        id: "q5",
        type: "short-answer",
        question: "Explica brevemente qué es un cortocircuito y por qué es peligroso.",
        correctAnswers: [
          "Un cortocircuito ocurre cuando la corriente eléctrica toma un camino de menor resistencia, causando un flujo excesivo de corriente que puede generar calor, chispas e incendios.",
        ],
        explanation:
          "Un cortocircuito es una conexión accidental entre dos puntos de diferente potencial, creando un camino de baja resistencia que permite el flujo excesivo de corriente, generando calor peligroso.",
        points: 4,
        difficulty: "hard",
      },
    ],
  },
]
