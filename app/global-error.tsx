'use client'
 
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h2 className="text-2xl font-bold tracking-tight">Algo salió mal gravemente</h2>
            <p className="text-gray-500">
              Ha ocurrido un error crítico. Por favor, recarga la página.
            </p>
          </div>
          <Button onClick={() => reset()}>Recargar</Button>
        </div>
      </body>
    </html>
  )
}