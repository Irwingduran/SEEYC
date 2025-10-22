"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  courses: [
    { name: "Instalaciones Residenciales", href: "/courses/residential" },
    { name: "Sistemas Industriales", href: "/courses/industrial" },
    { name: "Energías Renovables", href: "/courses/renewable" },
    { name: "Seguridad Eléctrica", href: "/courses/safety" },
    { name: "Automatización", href: "/courses/automation" },
  ],
  company: [
    { name: "Acerca de Nosotros", href: "/about" },
    { name: "Nuestros Instructores", href: "/instructors" },
    { name: "Metodología", href: "/methodology" },
    { name: "Certificaciones", href: "/certifications" },
    { name: "Empresas", href: "/corporate" },
  ],
  support: [
    { name: "Centro de Ayuda", href: "/help" },
    { name: "Preguntas Frecuentes", href: "/faq" },
    { name: "Soporte Técnico", href: "/support" },
    { name: "Contacto", href: "/contact" },
    { name: "Comunidad", href: "/community" },
  ],
  legal: [
    { name: "Términos de Servicio", href: "/terms" },
    { name: "Política de Privacidad", href: "/privacy" },
    { name: "Política de Cookies", href: "/cookies" },
    { name: "Política de Reembolso", href: "/refund" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
]

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="font-bold">
                <div className="text-primary text-lg">ELÉCTRICOS</div>
                <div className="text-sidebar-foreground text-sm">ESPECIALIZADOS</div>
              </div>
            </Link>

            <p className="text-sidebar-foreground/80 text-pretty max-w-md">
              La plataforma líder en capacitación eléctrica especializada. Formamos a los mejores profesionales del
              sector con cursos prácticos y certificaciones reconocidas.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@electricosespecializados.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Ciudad de México, México</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold">Mantente Actualizado</h4>
              <p className="text-sm text-sidebar-foreground/80">Recibe las últimas noticias y ofertas especiales</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Tu email"
                  className="bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-border"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-4">Cursos</h4>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`Síguenos en ${social.name}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
          <div className="text-sm text-sidebar-foreground/60">
            © 2024 Eléctricos Especializados. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-sidebar-foreground/60 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
