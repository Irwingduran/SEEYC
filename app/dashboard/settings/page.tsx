"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Settings,
  User,
  Lock,
  Bell,
  Eye,
  Globe,
  Palette,
  BookOpen,
  Camera,
  Mail,
  Shield,
  Save,
  Trash2,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

function SettingsContent() {
  const { isCollapsed } = useSidebar()
  const { theme, setTheme } = useTheme()

  // User data
  const [userData, setUserData] = useState({
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    phone: "+52 123 456 7890",
    bio: "Estudiante de ingeniería eléctrica apasionado por la automatización industrial",
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    newContent: false,
    reminders: true,
    newsletter: false,
    achievements: true,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showProgress: true,
    showCertificates: true,
  })

  // Learning preferences
  const [learningPrefs, setLearningPrefs] = useState({
    language: "es",
    autoPlay: true,
    playbackSpeed: "1",
    emailDigest: "weekly",
  })

  const handleSaveProfile = () => {
    toast.success("Perfil actualizado correctamente")
  }

  const handleChangePassword = () => {
    toast.success("Contraseña actualizada correctamente")
  }

  const handleSaveNotifications = () => {
    toast.success("Preferencias de notificaciones guardadas")
  }

  const handleDeleteAccount = () => {
    toast.error("Esta acción requiere confirmación adicional")
  }

  return (
    <>
      <DashboardSidebar />

      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-slate-600 to-slate-800">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Configuración</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Administra tu cuenta y preferencias de la plataforma
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notificaciones</span>
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Apariencia</span>
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Aprendizaje</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 max-w-3xl">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualiza tu información de perfil y cómo otros te ven
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/user-avatar.jpg" />
                      <AvatarFallback className="text-lg">CR</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Cambiar foto
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG o GIF. Máx. 2MB.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Input
                        id="bio"
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Breve descripción para tu perfil
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancelar</Button>
                    <Button onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid gap-6 max-w-3xl">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                  <CardDescription>
                    Asegúrate de usar una contraseña segura y única
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <Button onClick={handleChangePassword} className="w-full sm:w-auto">
                    <Lock className="h-4 w-4 mr-2" />
                    Actualizar contraseña
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Autenticación de Dos Factores</CardTitle>
                  <CardDescription>
                    Añade una capa extra de seguridad a tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Autenticación 2FA</p>
                      <p className="text-sm text-muted-foreground">
                        No configurada
                      </p>
                    </div>
                    <Button variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-red-500/5 backdrop-blur-sm shadow-lg border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
                  <CardDescription>
                    Acciones irreversibles para tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Eliminar cuenta</p>
                        <p className="text-sm text-muted-foreground">
                          Eliminar permanentemente tu cuenta y todos tus datos
                        </p>
                      </div>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="grid gap-6 max-w-3xl">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>
                    Controla qué notificaciones quieres recibir
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Notificaciones por correo</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Recibe actualizaciones por email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Actualizaciones de cursos</p>
                        <p className="text-sm text-muted-foreground">
                          Nuevo contenido en tus cursos inscritos
                        </p>
                      </div>
                      <Switch
                        checked={notifications.courseUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, courseUpdates: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Nuevo contenido disponible</p>
                        <p className="text-sm text-muted-foreground">
                          Notificación cuando haya nuevos cursos
                        </p>
                      </div>
                      <Switch
                        checked={notifications.newContent}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, newContent: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Recordatorios de estudio</p>
                        <p className="text-sm text-muted-foreground">
                          Recordatorios para mantener tu racha
                        </p>
                      </div>
                      <Switch
                        checked={notifications.reminders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, reminders: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Logros y certificados</p>
                        <p className="text-sm text-muted-foreground">
                          Notificaciones de logros desbloqueados
                        </p>
                      </div>
                      <Switch
                        checked={notifications.achievements}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, achievements: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Boletín mensual con novedades
                        </p>
                      </div>
                      <Switch
                        checked={notifications.newsletter}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, newsletter: checked })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar preferencias
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <div className="grid gap-6 max-w-3xl">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Apariencia</CardTitle>
                  <CardDescription>
                    Personaliza cómo se ve la plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTheme("light")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === "light"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-full h-20 bg-white rounded mb-2 border" />
                        <p className="text-sm font-medium">Claro</p>
                      </button>

                      <button
                        onClick={() => setTheme("dark")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === "dark"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-full h-20 bg-slate-900 rounded mb-2 border" />
                        <p className="text-sm font-medium">Oscuro</p>
                      </button>

                      <button
                        onClick={() => setTheme("system")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === "system"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-full h-20 bg-gradient-to-r from-white to-slate-900 rounded mb-2 border" />
                        <p className="text-sm font-medium">Sistema</p>
                      </button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Modo compacto</p>
                        <p className="text-sm text-muted-foreground">
                          Reduce el espaciado en la interfaz
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Animaciones reducidas</p>
                        <p className="text-sm text-muted-foreground">
                          Desactiva animaciones para mejor rendimiento
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Privacidad del Perfil</CardTitle>
                  <CardDescription>
                    Controla qué información es visible para otros
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Perfil público</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Permite que otros vean tu perfil
                      </p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, profileVisible: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Mostrar progreso</p>
                      <p className="text-sm text-muted-foreground">
                        Visible tu progreso de cursos
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showProgress}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showProgress: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Mostrar certificados</p>
                      <p className="text-sm text-muted-foreground">
                        Muestra tus certificados en tu perfil
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showCertificates}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showCertificates: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Learning Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid gap-6 max-w-3xl">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Preferencias de Aprendizaje</CardTitle>
                  <CardDescription>
                    Personaliza tu experiencia de aprendizaje
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select value={learningPrefs.language} onValueChange={(value) => setLearningPrefs({ ...learningPrefs, language: value })}>
                        <SelectTrigger id="language">
                          <Globe className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="playback-speed">Velocidad de reproducción</Label>
                      <Select value={learningPrefs.playbackSpeed} onValueChange={(value) => setLearningPrefs({ ...learningPrefs, playbackSpeed: value })}>
                        <SelectTrigger id="playback-speed">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5">0.5x</SelectItem>
                          <SelectItem value="0.75">0.75x</SelectItem>
                          <SelectItem value="1">1x (Normal)</SelectItem>
                          <SelectItem value="1.25">1.25x</SelectItem>
                          <SelectItem value="1.5">1.5x</SelectItem>
                          <SelectItem value="2">2x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="digest">Frecuencia de resumen</Label>
                      <Select value={learningPrefs.emailDigest} onValueChange={(value) => setLearningPrefs({ ...learningPrefs, emailDigest: value })}>
                        <SelectTrigger id="digest">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diario</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensual</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Recibe un resumen de tu progreso por email
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Reproducción automática</p>
                        <p className="text-sm text-muted-foreground">
                          Continúa a la siguiente lección automáticamente
                        </p>
                      </div>
                      <Switch
                        checked={learningPrefs.autoPlay}
                        onCheckedChange={(checked) =>
                          setLearningPrefs({ ...learningPrefs, autoPlay: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Subtítulos por defecto</p>
                        <p className="text-sm text-muted-foreground">
                          Activa subtítulos al iniciar videos
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Descargar para ver sin conexión</p>
                        <p className="text-sm text-muted-foreground">
                          Permite descargar contenido
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar preferencias
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default function SettingsPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
          <SettingsContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
