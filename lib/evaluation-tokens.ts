import { EvaluationToken, EvaluationAccess } from "@/types/evaluation"

/**
 * Utilidades para generar y validar tokens únicos de evaluación
 */

// Genera un token único UUID v4
export function generateEvaluationToken(): string {
  return crypto.randomUUID()
}

// Genera un objeto completo de token de evaluación
export function createEvaluationToken(
  evaluationId: string,
  studentId: string,
  expirationHours: number = 24
): EvaluationToken {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + expirationHours * 60 * 60 * 1000)

  return {
    id: crypto.randomUUID(),
    token: generateEvaluationToken(),
    evaluationId,
    studentId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    isUsed: false,
    ipAddress: undefined,
    userAgent: undefined,
  }
}

// Valida si un token es válido
export function validateToken(token: EvaluationToken): {
  valid: boolean
  reason?: string
} {
  // Verificar si ya fue usado
  if (token.isUsed) {
    return {
      valid: false,
      reason: "El token ya ha sido utilizado",
    }
  }

  // Verificar si expiró
  const now = new Date()
  const expiresAt = new Date(token.expiresAt)

  if (now > expiresAt) {
    return {
      valid: false,
      reason: "El token ha expirado",
    }
  }

  return { valid: true }
}

// Calcula el tiempo restante hasta que un bloqueo expire
export function getTimeUntilUnlock(lockedUntil: string): {
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
} {
  const now = new Date()
  const unlockTime = new Date(lockedUntil)
  const diffMs = unlockTime.getTime() - now.getTime()

  if (diffMs <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 }
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { hours, minutes, seconds, totalSeconds }
}

// Formatea el tiempo restante en un string legible
export function formatTimeUntilUnlock(lockedUntil: string): string {
  const time = getTimeUntilUnlock(lockedUntil)

  if (time.totalSeconds <= 0) {
    return "Disponible ahora"
  }

  const parts: string[] = []

  if (time.hours > 0) {
    parts.push(`${time.hours} hora${time.hours !== 1 ? "s" : ""}`)
  }

  if (time.minutes > 0) {
    parts.push(`${time.minutes} minuto${time.minutes !== 1 ? "s" : ""}`)
  }

  if (time.hours === 0 && time.seconds > 0) {
    parts.push(`${time.seconds} segundo${time.seconds !== 1 ? "s" : ""}`)
  }

  return parts.join(", ")
}

// Calcula la fecha de desbloqueo (48 horas desde ahora)
export function calculateLockoutDate(): string {
  const now = new Date()
  const lockoutDate = new Date(now.getTime() + 48 * 60 * 60 * 1000) // 48 horas
  return lockoutDate.toISOString()
}

// Verifica si un usuario puede intentar una evaluación
export function canAttemptEvaluation(access: EvaluationAccess): {
  canAttempt: boolean
  reason?: string
  unlockTime?: string
} {
  // Verificar si está bloqueado
  if (access.isLocked && access.lockedUntil) {
    const now = new Date()
    const unlockTime = new Date(access.lockedUntil)

    if (now < unlockTime) {
      return {
        canAttempt: false,
        reason: "locked",
        unlockTime: access.lockedUntil,
      }
    }
  }

  // Verificar si tiene intentos restantes
  if (access.remainingAttempts <= 0) {
    return {
      canAttempt: false,
      reason: "no_attempts",
    }
  }

  return { canAttempt: true }
}

// Genera la URL única para una evaluación con token
export function generateEvaluationUrl(
  evaluationId: string,
  token: string,
  baseUrl: string = ""
): string {
  return `${baseUrl}/evaluations/${evaluationId}?token=${token}`
}

// Extrae y valida el token de una URL
export function extractTokenFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.searchParams.get("token")
  } catch {
    return null
  }
}

// Crea un objeto de acceso inicial a evaluación
export function createEvaluationAccess(
  evaluationId: string,
  studentId: string,
  courseId: number,
  courseVersionId: number
): EvaluationAccess {
  return {
    id: crypto.randomUUID(),
    evaluationId,
    studentId,
    courseId,
    courseVersionId,
    attemptsAllowed: 2,
    attemptsUsed: 0,
    remainingAttempts: 2,
    isLocked: false,
    attempts: [],
  }
}

// Actualiza el acceso después de un intento fallido
export function updateAccessAfterFailedAttempt(
  access: EvaluationAccess
): EvaluationAccess {
  const newAttemptsUsed = access.attemptsUsed + 1
  const newRemainingAttempts = access.attemptsAllowed - newAttemptsUsed

  // Si ya no tiene intentos restantes, bloquear por 48 horas
  const shouldLock = newRemainingAttempts <= 0
  const lockedUntil = shouldLock ? calculateLockoutDate() : undefined

  return {
    ...access,
    attemptsUsed: newAttemptsUsed,
    remainingAttempts: newRemainingAttempts,
    isLocked: shouldLock,
    lockedUntil,
    lockedReason: shouldLock ? "max_attempts" : undefined,
    lastAccessedAt: new Date().toISOString(),
  }
}

// Actualiza el acceso después de un intento exitoso
export function updateAccessAfterPassedAttempt(
  access: EvaluationAccess
): EvaluationAccess {
  return {
    ...access,
    attemptsUsed: access.attemptsUsed + 1,
    remainingAttempts: access.attemptsAllowed - access.attemptsUsed - 1,
    lastAccessedAt: new Date().toISOString(),
  }
}
