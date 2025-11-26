import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import Providers from "@/components/session-provider"
import { AccessibilitySkipLink } from "@/components/accessibility-skip-link"
import { Toaster } from "sonner"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Eléctricos Especializados y Capacitación",
  description: "Plataforma de e-learning para capacitación eléctrica especializada",
  generator: "v0.app",
  keywords: "capacitación eléctrica, cursos electricidad, instalaciones eléctricas, automatización industrial",
  authors: [{ name: "Eléctricos Especializados" }],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#8b5cf6" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <AccessibilitySkipLink />
              <div id="main-content">{children}</div>
              <Toaster position="top-right" richColors closeButton />
            </ThemeProvider>
          </Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
