import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
        <h2 className="text-2xl font-bold tracking-tight">Página no encontrada</h2>
        <p className="text-muted-foreground">
          No pudimos encontrar el recurso que estás buscando.
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard">Volver al Dashboard</Link>
      </Button>
    </div>
  )
}