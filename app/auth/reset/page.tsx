"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Zap, ArrowLeft, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset email
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsEmailSent(true)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-small-black/[0.2] bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/80 to-background" />

        <div className="relative w-full max-w-md">
          <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">Correo Enviado</CardTitle>
                <CardDescription>
                  Hemos enviado las instrucciones para restablecer tu contraseña a <strong>{email}</strong>
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Revisa tu bandeja de entrada y sigue las instrucciones del correo. Si no lo encuentras, revisa tu
                  carpeta de spam.
                </p>
                <Button asChild className="w-full">
                  <Link href="/auth/login">Volver al inicio de sesión</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.2] bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/80 to-background" />

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link href="/auth/login">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio de sesión
          </Link>
        </Button>

        <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">Restablecer Contraseña</CardTitle>
              <CardDescription>
                Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/60 backdrop-blur-sm border-border/40"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Instrucciones"
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿Recordaste tu contraseña? </span>
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Inicia sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
