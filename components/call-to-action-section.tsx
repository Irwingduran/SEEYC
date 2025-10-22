"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function CallToActionSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-grid-small-black/[0.2] bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.2]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-background/80 to-background"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="w-fit mx-auto">
            <Zap className="h-3 w-3 mr-1" />
            ¡Únete Hoy!
          </Badge>

          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-balance leading-tight">
              Transforma tu Carrera en el
              <span className="text-primary"> Sector Eléctrico</span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Únete a más de 2,500 profesionales que ya han potenciado sus carreras con nuestros cursos especializados.
              Comienza hoy y ve los resultados en semanas.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">✓</div>
              <div className="text-sm font-semibold">Acceso Inmediato</div>
              <div className="text-xs text-muted-foreground">Comienza a aprender desde el primer día</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">✓</div>
              <div className="text-sm font-semibold">Certificación Incluida</div>
              <div className="text-xs text-muted-foreground">Reconocida por la industria eléctrica</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">✓</div>
              <div className="text-sm font-semibold">Soporte 24/7</div>
              <div className="text-xs text-muted-foreground">Ayuda cuando la necesites</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/courses">
                <Play className="h-5 w-5 mr-2" />
                Comenzar Ahora
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/courses">
                Ver Cursos Disponibles
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-border/50">
            <div className="text-sm text-muted-foreground mb-4">
              Más de 500 empresas confían en nuestra capacitación
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-bold">EMPRESA A</div>
              <div className="text-lg font-bold">EMPRESA B</div>
              <div className="text-lg font-bold">EMPRESA C</div>
              <div className="text-lg font-bold">EMPRESA D</div>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
            <div className="text-sm font-semibold text-primary mb-2">🔥 Oferta Especial por Tiempo Limitado</div>
            <div className="text-sm text-muted-foreground">
              Inscríbete este mes y obtén acceso gratuito a nuestro curso de Seguridad Eléctrica (valor $69)
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
