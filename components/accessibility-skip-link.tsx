"use client"

import { Button } from "@/components/ui/button"

export function AccessibilitySkipLink() {
  return (
    <Button
      asChild
      className="absolute -top-40 left-4 z-[100] bg-slate-900 text-white border-2 border-white px-4 py-2 rounded-md font-medium transition-all duration-200 focus:top-4 hover:bg-slate-800 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <a href="#main-content">Saltar al contenido principal</a>
    </Button>
  )
}
