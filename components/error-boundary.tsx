"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (!error.message.includes("MetaMask") && !error.message.includes("Failed to connect")) {
      console.error("Error caught by boundary:", error, errorInfo)
    }
  }

  componentDidMount() {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress MetaMask connection errors
      if (
        event.reason?.message?.includes("MetaMask") ||
        event.reason?.message?.includes("Failed to connect") ||
        event.reason?.toString?.().includes("MetaMask")
      ) {
        event.preventDefault()
        console.log("[v0] Suppressed MetaMask connection error:", event.reason)
        return
      }

      // Log other unhandled rejections
      console.error("[v0] Unhandled promise rejection:", event.reason)
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-xl">Algo salió mal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Ha ocurrido un error inesperado. Puedes intentar recargar la página.
          </p>
          {error && process.env.NODE_ENV === "development" && (
            <details className="text-xs bg-gray-100 p-2 rounded">
              <summary className="cursor-pointer font-medium">Detalles del error</summary>
              <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
            </details>
          )}
          <div className="flex gap-2 justify-center">
            <Button onClick={resetError} variant="outline" className="flex items-center gap-2 bg-transparent">
              <RefreshCw className="w-4 h-4" />
              Reintentar
            </Button>
            <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Recargar página
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
