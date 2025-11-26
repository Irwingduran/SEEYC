"use client"

import { useState, useEffect, useCallback } from "react"
import {
  EvaluationAccess,
  EvaluationToken,
  EvaluationAttempt,
  SuspiciousActivity,
} from "@/types/evaluation"
import {
  canAttemptEvaluation,
  validateToken,
  createEvaluationToken,
  updateAccessAfterFailedAttempt,
  updateAccessAfterPassedAttempt,
  getTimeUntilUnlock,
} from "@/lib/evaluation-tokens"

interface UseEvaluationAccessProps {
  evaluationId: string
  studentId: string
  courseId: number
  courseVersionId: number
  token?: string
}

interface UseEvaluationAccessReturn {
  access: EvaluationAccess | null
  currentToken: EvaluationToken | null
  loading: boolean
  error: string | null
  canAttempt: boolean
  canAttemptReason?: string
  timeUntilUnlock: {
    hours: number
    minutes: number
    seconds: number
    totalSeconds: number
  } | null
  generateNewToken: () => Promise<EvaluationToken | null>
  validateCurrentToken: () => boolean
  startAttempt: (tokenId: string) => Promise<EvaluationAttempt | null>
  recordSuspiciousActivity: (activity: SuspiciousActivity) => void
  completeAttempt: (
    attemptId: string,
    score: number,
    passed: boolean
  ) => Promise<void>
}

/**
 * Hook personalizado para manejar el acceso a evaluaciones
 * Controla tokens únicos, intentos, bloqueos y actividad sospechosa
 */
export function useEvaluationAccess({
  evaluationId,
  studentId,
  courseId,
  courseVersionId,
  token,
}: UseEvaluationAccessProps): UseEvaluationAccessReturn {
  const [access, setAccess] = useState<EvaluationAccess | null>(null)
  const [currentToken, setCurrentToken] = useState<EvaluationToken | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeUntilUnlock, setTimeUntilUnlock] = useState<{
    hours: number
    minutes: number
    seconds: number
    totalSeconds: number
  } | null>(null)

  // Cargar el acceso a la evaluación desde la API
  const loadAccess = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`/api/evaluations/${evaluationId}/access?studentId=${studentId}`)
      // const data = await response.json()

      // Simulación - en producción esto vendrá de la base de datos
      const mockAccess: EvaluationAccess = {
        id: "access-1",
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

      setAccess(mockAccess)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar acceso a evaluación"
      )
    } finally {
      setLoading(false)
    }
  }, [evaluationId, studentId, courseId, courseVersionId])

  // Validar token actual si existe
  const validateCurrentToken = useCallback((): boolean => {
    if (!currentToken) return false
    const validation = validateToken(currentToken)
    if (!validation.valid) {
      setError(validation.reason || "Token inválido")
      return false
    }
    return true
  }, [currentToken])

  // Generar un nuevo token para el siguiente intento
  const generateNewToken = useCallback(async (): Promise<EvaluationToken | null> => {
    try {
      if (!access) {
        setError("No hay acceso a evaluación disponible")
        return null
      }

      const canAttemptCheck = canAttemptEvaluation(access)
      if (!canAttemptCheck.canAttempt) {
        setError("No puedes generar un nuevo token en este momento")
        return null
      }

      // TODO: Llamar a la API para generar y guardar el token
      // const response = await fetch(`/api/evaluations/${evaluationId}/tokens`, {
      //   method: 'POST',
      //   body: JSON.stringify({ studentId })
      // })
      // const newToken = await response.json()

      const newToken = createEvaluationToken(evaluationId, studentId)
      setCurrentToken(newToken)

      return newToken
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar token")
      return null
    }
  }, [access, evaluationId, studentId])

  // Iniciar un intento de evaluación
  const startAttempt = useCallback(
    async (tokenId: string): Promise<EvaluationAttempt | null> => {
      try {
        if (!access) {
          setError("No hay acceso a evaluación disponible")
          return null
        }

        if (!validateCurrentToken()) {
          return null
        }

        // TODO: Llamar a la API para registrar el inicio del intento
        // const response = await fetch(`/api/evaluations/${evaluationId}/attempts`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     studentId,
        //     tokenId,
        //     attemptNumber: access.attemptsUsed + 1
        //   })
        // })
        // const attempt = await response.json()

        const newAttempt: EvaluationAttempt = {
          id: crypto.randomUUID(),
          evaluationAccessId: access.id,
          attemptNumber: access.attemptsUsed + 1,
          tokenId,
          status: "in_progress",
          startedAt: new Date().toISOString(),
          maxScore: 100,
          passingScore: 70,
          answers: [],
          ipAddress: "0.0.0.0", // TODO: Obtener IP real
          userAgent: navigator.userAgent,
          suspiciousActivity: [],
        }

        // Actualizar el acceso
        setAccess((prev) =>
          prev
            ? {
                ...prev,
                attempts: [...prev.attempts, newAttempt],
                firstAccessedAt: prev.firstAccessedAt || new Date().toISOString(),
                lastAccessedAt: new Date().toISOString(),
              }
            : null
        )

        return newAttempt
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al iniciar intento")
        return null
      }
    },
    [access, validateCurrentToken, evaluationId, studentId]
  )

  // Registrar actividad sospechosa
  const recordSuspiciousActivity = useCallback(
    (activity: SuspiciousActivity) => {
      // TODO: Enviar a la API
      // fetch(`/api/evaluations/${evaluationId}/suspicious-activity`, {
      //   method: 'POST',
      //   body: JSON.stringify({ studentId, activity })
      // })

      console.warn("[Evaluación] Actividad sospechosa:", activity)

      // Actualizar el intento actual
      setAccess((prev) => {
        if (!prev || prev.attempts.length === 0) return prev

        const updatedAttempts = [...prev.attempts]
        const currentAttempt = updatedAttempts[updatedAttempts.length - 1]

        // Agregar la actividad sospechosa
        currentAttempt.suspiciousActivity.push(activity)

        // Actualizar contadores específicos
        if (activity.type === "screenshot") {
          currentAttempt.screenshotAttempts =
            (currentAttempt.screenshotAttempts || 0) + 1
        } else if (activity.type === "copy") {
          currentAttempt.copyAttempts = (currentAttempt.copyAttempts || 0) + 1
        } else if (activity.type === "tab_switch") {
          currentAttempt.tabSwitches = (currentAttempt.tabSwitches || 0) + 1
        } else if (activity.type === "window_blur") {
          currentAttempt.windowBlurs = (currentAttempt.windowBlurs || 0) + 1
        }

        return {
          ...prev,
          attempts: updatedAttempts,
        }
      })
    },
    [evaluationId, studentId]
  )

  // Completar un intento
  const completeAttempt = useCallback(
    async (attemptId: string, score: number, passed: boolean) => {
      try {
        if (!access) return

        // TODO: Llamar a la API para completar el intento
        // await fetch(`/api/evaluations/${evaluationId}/attempts/${attemptId}/complete`, {
        //   method: 'POST',
        //   body: JSON.stringify({ score, passed })
        // })

        // Actualizar el acceso según el resultado
        if (passed) {
          setAccess(updateAccessAfterPassedAttempt(access))
        } else {
          setAccess(updateAccessAfterFailedAttempt(access))
        }

        // Marcar el token como usado
        if (currentToken) {
          setCurrentToken({
            ...currentToken,
            isUsed: true,
            usedAt: new Date().toISOString(),
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al completar intento")
      }
    },
    [access, currentToken, evaluationId]
  )

  // Cargar acceso al montar el componente
  useEffect(() => {
    loadAccess()
  }, [loadAccess])

  // Actualizar el tiempo hasta desbloqueo cada segundo si está bloqueado
  useEffect(() => {
    if (access?.isLocked && access.lockedUntil) {
      const updateTimer = () => {
        const time = getTimeUntilUnlock(access.lockedUntil!)
        setTimeUntilUnlock(time)

        // Si ya se desbloqueó, recargar el acceso
        if (time.totalSeconds <= 0) {
          loadAccess()
        }
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)

      return () => clearInterval(interval)
    } else {
      setTimeUntilUnlock(null)
    }
  }, [access?.isLocked, access?.lockedUntil, loadAccess])

  // Verificar si puede intentar
  const canAttemptCheck = access ? canAttemptEvaluation(access) : null

  return {
    access,
    currentToken,
    loading,
    error,
    canAttempt: canAttemptCheck?.canAttempt ?? false,
    canAttemptReason: canAttemptCheck?.reason,
    timeUntilUnlock,
    generateNewToken,
    validateCurrentToken,
    startAttempt,
    recordSuspiciousActivity,
    completeAttempt,
  }
}
