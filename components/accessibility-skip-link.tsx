"use client"

import { Button } from "@/components/ui/button"

export function AccessibilitySkipLink() {
  return (
    <Button
      asChild
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-primary-foreground"
    >
      <a href="#main-content">Saltar al contenido principal</a>
    </Button>
  )
}
