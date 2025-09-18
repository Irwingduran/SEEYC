"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, BookOpen, GraduationCap, Users, BarChart3, Settings, Zap, Sun, Moon, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { ScreenReaderOnly } from "@/components/screen-reader-only"

const navigationItems = [
  { name: "Cursos", href: "/courses", icon: BookOpen },
  { name: "Mi Aprendizaje", href: "/learning", icon: GraduationCap },
  { name: "Instructores", href: "/instructors", icon: Users },
  { name: "Progreso", href: "/progress", icon: BarChart3 },
  { name: "Configuración", href: "/settings", icon: Settings },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Mock user state - in real app this would come from auth context
  const isAuthenticated = pathname.includes("/learning") || pathname.includes("/profile")

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          aria-label="Eléctricos Especializados - Ir al inicio"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <div className="hidden font-bold sm:inline-block">
            <span className="text-primary">ELÉCTRICOS</span>
            <span className="text-muted-foreground"> ESPECIALIZADOS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-6 text-sm font-medium"
          role="navigation"
          aria-label="Navegación principal"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              }`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 px-0 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <ScreenReaderOnly>Cambiar tema</ScreenReaderOnly>
          </Button>

          {/* User Actions */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Menú de usuario"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/user-avatar.jpg" alt="Foto de perfil de Juan Mendoza" />
                    <AvatarFallback className="bg-primary text-primary-foreground">JM</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">Juan Mendoza</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">juan.mendoza@email.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/learning" className="cursor-pointer">
                    <GraduationCap className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Mi Aprendizaje</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Registrarse</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 px-0 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Abrir menú de navegación"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
                <ScreenReaderOnly>Abrir menú</ScreenReaderOnly>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]" id="mobile-menu">
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <div className="font-bold">
                    <div className="text-primary">ELÉCTRICOS</div>
                    <div className="text-xs text-muted-foreground">ESPECIALIZADOS</div>
                  </div>
                </div>

                <nav role="navigation" aria-label="Navegación móvil">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 text-sm font-medium transition-colors p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        pathname === item.href ? "text-foreground bg-accent" : "text-foreground/60"
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/profile">
                          <User className="mr-2 h-4 w-4" aria-hidden="true" />
                          Mi Perfil
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/auth/login">Iniciar Sesión</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/auth/register">Registrarse</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
