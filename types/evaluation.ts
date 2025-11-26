// Tipos para el sistema de evaluaciones con controles de seguridad

export type EvaluationStatus = "not_started" | "in_progress" | "completed" | "failed" | "locked"
export type EvaluationAttemptStatus = "in_progress" | "submitted" | "graded" | "abandoned"

// Token único para acceder a una evaluación específica
export interface EvaluationToken {
  id: string
  token: string // Token único UUID v4
  evaluationId: string
  studentId: string
  createdAt: string
  expiresAt: string
  isUsed: boolean
  usedAt?: string
  ipAddress?: string
  userAgent?: string
}

// Control de acceso a evaluaciones
export interface EvaluationAccess {
  id: string
  evaluationId: string
  studentId: string
  courseId: number
  courseVersionId: number

  // Control de intentos
  attemptsAllowed: number // Siempre 2 según las reglas
  attemptsUsed: number
  remainingAttempts: number

  // Estado de bloqueo
  isLocked: boolean
  lockedUntil?: string // Fecha hasta la cual está bloqueado (48 horas)
  lockedReason?: "max_attempts" | "suspicious_activity" | "admin_lock"

  // Historial de intentos
  attempts: EvaluationAttempt[]

  // Fechas
  firstAccessedAt?: string
  lastAccessedAt?: string
}

// Registro de cada intento de evaluación
export interface EvaluationAttempt {
  id: string
  evaluationAccessId: string
  attemptNumber: number // 1 o 2
  tokenId: string // Link único usado para este intento

  // Estado del intento
  status: EvaluationAttemptStatus
  startedAt: string
  submittedAt?: string
  gradedAt?: string
  timeSpent?: number // En segundos

  // Resultados
  score?: number
  maxScore: number
  passingScore: number
  passed?: boolean

  // Respuestas
  answers: EvaluationAnswer[]

  // Seguridad y auditoría
  ipAddress: string
  userAgent: string
  suspiciousActivity: SuspiciousActivity[]
  screenshotAttempts?: number
  copyAttempts?: number
  tabSwitches?: number
  windowBlurs?: number
}

// Respuesta individual a una pregunta
export interface EvaluationAnswer {
  questionId: string
  studentAnswer: string | string[]
  isCorrect?: boolean
  pointsEarned: number
  maxPoints: number
  answeredAt: string
  timeSpent: number // Tiempo en esta pregunta en segundos
}

// Actividad sospechosa durante la evaluación
export interface SuspiciousActivity {
  type: "screenshot" | "copy" | "paste" | "tab_switch" | "window_blur" | "right_click" | "dev_tools" | "print_screen"
  timestamp: string
  details?: string
  count: number
}

// Definición de la evaluación (estructura base)
export interface Evaluation {
  id: string
  title: string
  description: string
  courseId: number
  courseVersionId: number
  moduleId?: number
  lessonId?: number

  // Configuración
  questions: EvaluationQuestion[]
  timeLimit: number // En minutos
  passingScore: number // Porcentaje mínimo para aprobar
  attemptsAllowed: number // Siempre 2
  lockoutPeriod: number // Siempre 48 horas en milisegundos
  randomizeQuestions: boolean
  randomizeAnswers: boolean
  showResultsImmediately: boolean
  showCorrectAnswers: boolean
  allowReview: boolean

  // Seguridad
  preventScreenshot: boolean // Siempre true
  preventCopy: boolean // Siempre true
  preventPrint: boolean // Siempre true
  trackTabSwitches: boolean // Siempre true
  requireFullscreen: boolean

  // Metadata
  createdAt: string
  updatedAt: string
  createdBy: string
  isActive: boolean
}

// Pregunta de evaluación
export interface EvaluationQuestion {
  id: string
  type: "multiple-choice" | "multiple-select" | "true-false" | "short-answer" | "essay"
  question: string
  options?: string[]
  correctAnswers: string[]
  explanation?: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  timeLimit?: number // Límite de tiempo individual por pregunta
  order: number
  tags?: string[]
}

// Resultado completo de una evaluación
export interface EvaluationResult {
  evaluationId: string
  studentId: string
  attemptId: string
  attemptNumber: number

  // Puntuación
  score: number
  maxScore: number
  percentage: number
  passed: boolean

  // Tiempo
  timeSpent: number
  completedAt: string

  // Detalles
  correctAnswers: number
  incorrectAnswers: number
  unansweredQuestions: number
  totalQuestions: number

  // Próximos pasos
  canRetry: boolean
  nextAttemptAvailableAt?: string
  remainingAttempts: number

  // Feedback
  feedback?: string
  certificateEligible: boolean
}

// Estadísticas de evaluación para instructores
export interface EvaluationStats {
  evaluationId: string
  totalAttempts: number
  uniqueStudents: number
  averageScore: number
  passRate: number
  averageTimeSpent: number

  // Distribución de puntuaciones
  scoreDistribution: {
    range: string // "0-20", "21-40", etc.
    count: number
    percentage: number
  }[]

  // Preguntas más difíciles
  hardestQuestions: {
    questionId: string
    question: string
    correctRate: number
    averageTimeSpent: number
  }[]

  // Actividad sospechosa
  suspiciousActivityCount: number
  studentsWithSuspiciousActivity: number
  mostCommonSuspiciousActivity: string
}
