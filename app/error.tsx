'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <h2 className="text-2xl font-bold tracking-tight">Algo salió mal</h2>
        <p className="text-muted-foreground">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
      </div>
      <Button onClick={() => reset()}>Intentar de nuevo</Button>
    </div>
  )
}