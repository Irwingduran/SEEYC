"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Copy, Mail, ImageIcon, Video, FileText, Sparkles, Eye } from "lucide-react"

export function MarketingMaterials() {
  const [socialPost, setSocialPost] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailContent, setEmailContent] = useState("")

  const generateSocialPost = () => {
    const posts = [
      "🔌 ¿Quieres dominar las instalaciones eléctricas residenciales? Nuestro nuevo curso te enseña todo lo que necesitas saber. ¡Inscríbete ahora! #ElectricidadResidencial #Capacitación",
      "⚡ Aprende de los expertos: Instalaciones Eléctricas Residenciales Completas. 20 horas de contenido práctico + certificado incluido. ¡Comienza hoy! #CursoElectricidad #Profesional",
      "🏠 Conviértete en un experto en instalaciones eléctricas residenciales. Curso completo con casos reales y certificación oficial. ¡No te lo pierdas! #Electricista #Formación",
    ]
    setSocialPost(posts[Math.floor(Math.random() * posts.length)])
  }

  const generateEmailCampaign = () => {
    setEmailSubject("🔌 Nuevo Curso: Instalaciones Eléctricas Residenciales - 30% de Descuento")
    setEmailContent(`¡Hola!

¿Te interesa convertirte en un experto en instalaciones eléctricas residenciales?

Nuestro nuevo curso "Instalaciones Eléctricas Residenciales Completas" ya está disponible con un descuento especial del 30% para los primeros 100 estudiantes.

✅ 20 horas de contenido práctico
✅ 15 lecciones paso a paso
✅ Certificado oficial incluido
✅ Acceso de por vida
✅ Soporte del instructor

Precio regular: $99.00
Tu precio: $69.30 (30% de descuento)

¡Inscríbete ahora y comienza tu transformación profesional!

[INSCRIBIRSE AHORA]

Saludos,
El equipo de Eléctricos Especializados`)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Materiales de Marketing</h2>
          <p className="text-gray-600 dark:text-gray-300">Genera contenido promocional para tu curso</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Sparkles className="w-4 h-4 mr-2" />
          Generar Todo
        </Button>
      </div>

      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="graphics">Gráficos</TabsTrigger>
          <TabsTrigger value="landing">Landing Page</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Social Media Generator */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  Generador de Posts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="social-post">Contenido del Post</Label>
                  <Textarea
                    id="social-post"
                    value={socialPost}
                    onChange={(e) => setSocialPost(e.target.value)}
                    placeholder="Escribe tu post para redes sociales..."
                    rows={4}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                  <div className="text-xs text-gray-500 text-right">{socialPost.length}/280 caracteres</div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={generateSocialPost} variant="outline" className="flex-1 bg-transparent">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generar Post
                  </Button>
                  <Button onClick={() => copyToClipboard(socialPost)} variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                {/* Platform Templates */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Plantillas por Plataforma</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSocialPost(
                          "🔌 Nuevo curso disponible: Instalaciones Eléctricas Residenciales\n\n✅ 20 horas de contenido\n✅ Certificado incluido\n✅ Casos prácticos reales\n\n¡Inscríbete ahora! 👇\n\n#ElectricidadResidencial #Capacitación #CursoOnline",
                        )
                      }
                      className="justify-start"
                    >
                      📘 Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSocialPost(
                          "⚡ Domina las instalaciones eléctricas residenciales con nuestro curso completo. 20h de contenido + certificado. ¡Inscríbete! #ElectricidadResidencial #Profesional",
                        )
                      }
                      className="justify-start"
                    >
                      🐦 Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSocialPost(
                          "🏠 ¿Buscas especializarte en instalaciones eléctricas residenciales?\n\nNuestro curso completo incluye:\n• 15 lecciones prácticas\n• Casos reales de instalación\n• Certificado oficial\n• Acceso de por vida\n\n¡Comienza tu transformación profesional hoy!",
                        )
                      }
                      className="justify-start"
                    >
                      💼 LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSocialPost(
                          "🔌 NUEVO CURSO DISPONIBLE 🔌\n\nInstalaciones Eléctricas Residenciales Completas\n\n📚 20 horas de contenido\n🎯 15 lecciones paso a paso\n🏆 Certificado oficial\n💯 Casos prácticos reales\n\n¡Link en bio! 👆\n\n#ElectricidadResidencial #CursoOnline #Capacitación #Electricista",
                        )
                      }
                      className="justify-start"
                    >
                      📸 Instagram
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Preview */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Vista Previa del Post</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Facebook Preview */}
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        E
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Eléctricos Especializados</div>
                        <div className="text-xs text-gray-500">Hace 2 minutos</div>
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 mb-3 whitespace-pre-line">
                      {socialPost || "Tu contenido aparecerá aquí..."}
                    </p>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src="/electrical-lesson-thumbnail.jpg"
                        alt="Course preview"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3 bg-gray-50 dark:bg-gray-800">
                        <div className="font-semibold text-sm text-gray-900 dark:text-white">
                          Instalaciones Eléctricas Residenciales Completas
                        </div>
                        <div className="text-xs text-gray-500">cursos.electricosespecializados.com</div>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <div className="text-lg font-bold text-blue-600">245</div>
                      <div className="text-xs text-gray-500">Me gusta</div>
                    </div>
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="text-lg font-bold text-green-600">18</div>
                      <div className="text-xs text-gray-500">Comentarios</div>
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <div className="text-lg font-bold text-purple-600">32</div>
                      <div className="text-xs text-gray-500">Compartidos</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Campaign Generator */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  Generador de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Asunto del Email</Label>
                  <Input
                    id="email-subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Asunto atractivo para tu email..."
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-content">Contenido del Email</Label>
                  <Textarea
                    id="email-content"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Contenido del email..."
                    rows={12}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={generateEmailCampaign} variant="outline" className="flex-1 bg-transparent">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generar Email
                  </Button>
                  <Button onClick={() => copyToClipboard(`${emailSubject}\n\n${emailContent}`)} variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                {/* Email Templates */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Plantillas de Email</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmailSubject("🎉 ¡Nuevo Curso Disponible! Instalaciones Eléctricas Residenciales")
                        setEmailContent(
                          "¡Hola!\n\nTenemos excelentes noticias. Nuestro nuevo curso 'Instalaciones Eléctricas Residenciales Completas' ya está disponible.\n\n🔌 20 horas de contenido práctico\n📚 15 lecciones detalladas\n🏆 Certificado oficial\n💯 Casos reales\n\n¡Inscríbete ahora y comienza tu transformación profesional!\n\n[INSCRIBIRSE AHORA]\n\nSaludos,\nEl equipo de Eléctricos Especializados",
                        )
                      }}
                      className="w-full justify-start"
                    >
                      📧 Lanzamiento de Curso
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmailSubject("⏰ Últimas 24 horas - 30% de Descuento en Curso de Electricidad")
                        setEmailContent(
                          "¡Atención!\n\nQuedan menos de 24 horas para aprovechar el 30% de descuento en nuestro curso 'Instalaciones Eléctricas Residenciales Completas'.\n\nPrecio regular: $99.00\nTu precio: $69.30\n\nEste descuento especial termina mañana a las 23:59.\n\n¡No dejes pasar esta oportunidad!\n\n[INSCRIBIRSE CON DESCUENTO]\n\nSaludos,\nEl equipo de Eléctricos Especializados",
                        )
                      }}
                      className="w-full justify-start"
                    >
                      ⏰ Urgencia/Descuento
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmailSubject("🎓 ¡Felicidades! Has completado el curso de Instalaciones Eléctricas")
                        setEmailContent(
                          "¡Felicidades!\n\nHas completado exitosamente el curso 'Instalaciones Eléctricas Residenciales Completas'.\n\nTu certificado oficial está listo para descargar en tu panel de estudiante.\n\n🏆 Certificado oficial\n📊 Calificación final: 95%\n⭐ ¡Excelente trabajo!\n\nTe invitamos a:\n• Descargar tu certificado\n• Dejar una reseña del curso\n• Explorar nuestros otros cursos\n\n[DESCARGAR CERTIFICADO]\n\n¡Gracias por confiar en nosotros!\n\nSaludos,\nEl equipo de Eléctricos Especializados",
                        )
                      }}
                      className="w-full justify-start"
                    >
                      🎓 Finalización de Curso
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Preview */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Vista Previa del Email</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
                  <div className="border-b pb-3 mb-4">
                    <div className="text-sm text-gray-500 mb-1">De: cursos@electricosespecializados.com</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {emailSubject || "Asunto del email aparecerá aquí"}
                    </div>
                  </div>
                  <div className="whitespace-pre-line text-gray-800 dark:text-gray-200">
                    {emailContent || "El contenido del email aparecerá aquí..."}
                  </div>
                </div>

                {/* Email Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="text-lg font-bold text-blue-600">24.5%</div>
                    <div className="text-xs text-gray-500">Tasa de apertura</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="text-lg font-bold text-green-600">8.2%</div>
                    <div className="text-xs text-gray-500">Tasa de clics</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="graphics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Banner */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  Banner del Curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-2">Instalaciones Eléctricas</h3>
                      <p className="text-sm">Curso Completo</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">1920x1080px - PNG</div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Graphics */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  Gráficos Sociales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-xs">
                      Instagram
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center text-white text-xs">
                      Facebook
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Pack Completo
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">Múltiples formatos</div>
                </div>
              </CardContent>
            </Card>

            {/* Video Thumbnail */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-red-600" />
                  Miniatura de Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white relative">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1" />
                      </div>
                      <p className="text-sm font-bold">CURSO COMPLETO</p>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">NUEVO</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">1280x720px - JPG</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="landing" className="mt-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Generador de Landing Page
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Genera una landing page optimizada para conversiones para tu curso
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Elementos Incluidos:</h3>
                    <div className="space-y-2">
                      {[
                        "Headline optimizado para conversión",
                        "Descripción del curso y beneficios",
                        "Video de presentación",
                        "Testimonios de estudiantes",
                        "Curriculum detallado",
                        "Información del instructor",
                        "Precios y ofertas especiales",
                        "Formulario de inscripción",
                        "FAQ (Preguntas frecuentes)",
                        "Garantía y política de reembolso",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Vista Previa:</h3>
                    <div className="border rounded-lg p-4 bg-white dark:bg-gray-900">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-8 bg-purple-200 dark:bg-purple-800 rounded w-1/3" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generar Landing Page
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Vista Previa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
