"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ContentProtectionProps {
  children: React.ReactNode
  onSuspiciousActivity?: (activity: {
    type: string
    timestamp: string
    details?: string
  }) => void
  showWarnings?: boolean
  strictMode?: boolean // Si es true, cierra la sesión después de múltiples intentos
}

/**
 * Componente que protege el contenido del curso contra copia, screenshots y robo
 * Implementa múltiples capas de seguridad:
 * - Prevención de screenshots
 * - Prevención de copia de texto
 * - Detección de DevTools
 * - Marca de agua visual
 * - Monitoreo de actividad sospechosa
 */
export function ContentProtection({
  children,
  onSuspiciousActivity,
  showWarnings = true,
  strictMode = false,
}: ContentProtectionProps) {
  const [suspiciousActivityCount, setSuspiciousActivityCount] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const logActivity = (
    type: string,
    details?: string
  ) => {
    const activity = {
      type,
      timestamp: new Date().toISOString(),
      details,
    }

    // Incrementar contador
    setSuspiciousActivityCount((prev) => prev + 1)

    // Mostrar advertencia
    if (showWarnings) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 5000)
    }

    // Notificar al componente padre
    if (onSuspiciousActivity) {
      onSuspiciousActivity(activity)
    }

    // En modo estricto, después de 5 intentos, redirigir
    if (strictMode && suspiciousActivityCount >= 4) {
      alert(
        "Se ha detectado actividad sospechosa repetida. Por seguridad, se cerrará esta sesión."
      )
      window.location.href = "/dashboard"
    }

    console.warn(`[Seguridad] Actividad sospechosa detectada: ${type}`, details)
  }

  useEffect(() => {
    // Prevenir captura de pantalla mediante Print Screen
    const handleKeyDown = (e: KeyboardEvent) => {
      // Print Screen
      if (e.key === "PrintScreen") {
        e.preventDefault()
        logActivity("print_screen", "Intento de captura con Print Screen")
        // Limpiar portapapeles
        navigator.clipboard.writeText("")
      }

      // Ctrl+P (Imprimir)
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault()
        logActivity("print_attempt", "Intento de imprimir página")
        return false
      }

      // Ctrl+S (Guardar)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        logActivity("save_attempt", "Intento de guardar página")
        return false
      }

      // Ctrl+C (Copiar)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault()
        logActivity("copy_attempt", "Intento de copiar contenido")
        return false
      }

      // Ctrl+X (Cortar)
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault()
        logActivity("cut_attempt", "Intento de cortar contenido")
        return false
      }

      // F12 o Ctrl+Shift+I (DevTools)
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault()
        logActivity("devtools_attempt", "Intento de abrir DevTools")
        return false
      }

      // Ctrl+U (Ver código fuente)
      if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault()
        logActivity("view_source", "Intento de ver código fuente")
        return false
      }
    }

    // Prevenir clic derecho
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      logActivity("right_click", "Intento de clic derecho")
      return false
    }

    // Prevenir arrastrar imágenes
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      logActivity("drag_attempt", "Intento de arrastrar contenido")
      return false
    }

    // Prevenir copiar
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      logActivity("copy_event", "Evento de copia detectado")
      return false
    }

    // Prevenir cortar
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault()
      logActivity("cut_event", "Evento de corte detectado")
      return false
    }

    // Detectar cambio de visibilidad (posible screenshot en móvil)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logActivity("visibility_change", "Página ocultada (posible screenshot)")
      }
    }

    // Detectar DevTools abiertos (cambio de tamaño de ventana sospechoso)
    let devToolsOpen = false
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true
          logActivity("devtools_detected", "DevTools detectado abierto")
        }
      } else {
        devToolsOpen = false
      }
    }

    // Prevenir selección de texto
    const preventSelection = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Agregar event listeners
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("dragstart", handleDragStart)
    document.addEventListener("copy", handleCopy)
    document.addEventListener("cut", handleCut)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("selectstart", preventSelection)

    // Detectar DevTools cada segundo
    const devToolsInterval = setInterval(detectDevTools, 1000)

    // Deshabilitar selección de texto via CSS
    if (containerRef.current) {
      containerRef.current.style.userSelect = "none"
      containerRef.current.style.webkitUserSelect = "none"
    }

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("dragstart", handleDragStart)
      document.removeEventListener("copy", handleCopy)
      document.removeEventListener("cut", handleCut)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("selectstart", preventSelection)
      clearInterval(devToolsInterval)
    }
  }, [suspiciousActivityCount, strictMode])

  return (
    <div ref={containerRef} className="relative">
      {/* Advertencia de actividad sospechosa */}
      {showWarning && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Actividad Sospechosa Detectada</AlertTitle>
            <AlertDescription>
              Se ha detectado un intento de copiar o capturar el contenido. Esta acción
              está prohibida y ha sido registrada.
              {strictMode && suspiciousActivityCount >= 3 && (
                <span className="block mt-2 font-semibold">
                  Advertencia: {5 - suspiciousActivityCount} intentos restantes antes de
                  cerrar la sesión.
                </span>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Marca de agua invisible para rastreo */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-5"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(0, 0, 0, 0.03) 100px,
            rgba(0, 0, 0, 0.03) 200px
          )`,
        }}
      >
        <div className="flex h-full items-center justify-center text-4xl font-bold text-muted-foreground">
          CONTENIDO PROTEGIDO
        </div>
      </div>

      {/* Contenido protegido */}
      <div className="relative select-none">{children}</div>

      {/* Capa invisible para prevenir clic derecho en toda el área */}
      <div
        className="pointer-events-none absolute inset-0"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  )
}
