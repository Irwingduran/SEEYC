"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Globe,
  Bell,
  Shield,
  Save,
  RefreshCw,
  Upload,
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import React, { useState } from "react"
import { toast } from "sonner"
import type { GeneralSettings, NotificationSettings, SecuritySettings, PaymentSettings, AppearanceSettings } from "@/types/settings"

function SettingsContent() {
  const { isCollapsed } = useSidebar()
  const [isSaving, setIsSaving] = useState(false)

  // Estado para configuraciones generales
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    platformName: "Eléctricos Especializados y Capacitación",
    platformDescription: "Plataforma de e-learning para capacitación eléctrica especializada",
    platformUrl: "https://seeyc.com",
    supportEmail: "soporte@seeyc.com",
    language: "es",
    timezone: "America/Mexico_City",
    currency: "MXN",
    contactPhone: "+52 55 1234 5678",
    contactAddress: "Ciudad de México, México",
  })

  // Estado para notificaciones
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enableEmailNotifications: true,
    enablePushNotifications: true,
    enableSMSNotifications: false,
    studentEnrollmentConfirmation: true,
    studentCourseUpdates: true,
    studentCompletionCertificates: true,
    studentPaymentReceipts: true,
    studentReminders: true,
    instructorNewEnrollment: true,
    instructorCourseReviews: true,
    instructorPaymentUpdates: true,
    instructorStudentQuestions: true,
    adminNewUser: true,
    adminNewCourse: true,
    adminPaymentReceived: true,
    adminSystemAlerts: true,
  })

  // Estado para seguridad
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    enableTwoFactorAuth: false,
    requireEmailVerification: true,
    allowSocialLogin: true,
    socialProviders: {
      google: true,
      facebook: false,
      github: false,
    },
    minimumPasswordLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    passwordExpirationDays: 0,
    preventPasswordReuse: 3,
    sessionTimeout: 60,
    maxConcurrentSessions: 3,
    enableCaptcha: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    enableAuditLog: true,
  })

  // Estado para pagos
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    enablePayments: true,
    currency: "MXN",
    paymentMethods: {
      creditCard: true,
      debitCard: true,
      paypal: true,
      stripe: true,
      bankTransfer: false,
    },
    platformCommission: 20,
    instructorPayout: 80,
    minimumPurchaseAmount: 50,
    enableRefunds: true,
    refundPeriodDays: 14,
    autoPayoutEnabled: false,
    payoutFrequency: "monthly",
    enableTax: true,
    taxRate: 16,
    taxName: "IVA",
  })

  // Estado para apariencia
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    defaultTheme: "system",
    allowThemeSwitch: true,
    primaryColor: "#8b5cf6",
    secondaryColor: "#3b82f6",
    accentColor: "#ec4899",
    fontFamily: "Inter",
    fontSize: "medium",
    sidebarPosition: "left",
    navbarStyle: "fixed",
  })

  // Función para guardar configuraciones
  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Aquí iría la llamada a la API para guardar las configuraciones
      // await fetch('/api/settings', { method: 'PUT', body: JSON.stringify({ ... }) })

      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación

      toast.success("Configuración guardada", {
        description: "Los cambios se han aplicado correctamente",
      })
    } catch (error) {
      toast.error("Error al guardar", {
        description: "No se pudieron guardar los cambios",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <AdminSidebar />

      <main
        className={`min-h-screen p-4 md:p-5 lg:p-6 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-72"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Configuración</h1>
              <p className="text-muted-foreground text-lg">
                Administra la configuración de tu plataforma
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Restablecer
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs de configuración */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/60 backdrop-blur-sm">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notificaciones</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Seguridad</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: General */}
          <TabsContent value="general" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>Configuración básica de tu plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Nombre de la Plataforma</Label>
                    <Input
                      id="platformName"
                      value={generalSettings.platformName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platformUrl">URL de la Plataforma</Label>
                    <Input
                      id="platformUrl"
                      type="url"
                      value={generalSettings.platformUrl}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, platformUrl: e.target.value })}
                    />
                  </div>

                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="platformDescription">Descripción</Label>
                    <Textarea
                      id="platformDescription"
                      rows={3}
                      value={generalSettings.platformDescription}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, platformDescription: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Email de Soporte</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                    <Input
                      id="contactPhone"
                      value={generalSettings.contactPhone || ""}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma Predeterminado</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">Inglés</SelectItem>
                        <SelectItem value="pt">Portugués</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Zona Horaria</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Los Angeles (GMT-8)</SelectItem>
                        <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Moneda</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) => setGeneralSettings({ ...generalSettings, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                        <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="contactAddress">Dirección</Label>
                    <Input
                      id="contactAddress"
                      value={generalSettings.contactAddress || ""}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactAddress: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Marca y Logo</CardTitle>
                <CardDescription>Personaliza la identidad visual de tu plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Logo Principal</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Arrastra una imagen o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recomendado: 200x50px, PNG o SVG
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Arrastra una imagen o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recomendado: 32x32px, ICO o PNG
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Apariencia y Tema</CardTitle>
                <CardDescription>Personaliza los colores y el aspecto visual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultTheme">Tema Predeterminado</Label>
                    <Select
                      value={appearanceSettings.defaultTheme}
                      onValueChange={(value: any) =>
                        setAppearanceSettings({ ...appearanceSettings, defaultTheme: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="system">Automático (Sistema)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Tamaño de Fuente</Label>
                    <Select
                      value={appearanceSettings.fontSize}
                      onValueChange={(value: any) =>
                        setAppearanceSettings({ ...appearanceSettings, fontSize: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeño</SelectItem>
                        <SelectItem value="medium">Mediano</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Color Primario</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) =>
                          setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        value={appearanceSettings.primaryColor}
                        onChange={(e) =>
                          setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })
                        }
                        className="flex-1"
                        placeholder="#8b5cf6"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Color Secundario</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) =>
                          setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })
                        }
                        className="w-20 h-10"
                      />
                      <Input
                        value={appearanceSettings.secondaryColor}
                        onChange={(e) =>
                          setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })
                        }
                        className="flex-1"
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Permitir cambio de tema</Label>
                    <p className="text-sm text-muted-foreground">
                      Los usuarios pueden elegir entre tema claro y oscuro
                    </p>
                  </div>
                  <Switch
                    checked={appearanceSettings.allowThemeSwitch}
                    onCheckedChange={(checked) =>
                      setAppearanceSettings({ ...appearanceSettings, allowThemeSwitch: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Notificaciones */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Notificaciones por Email</CardTitle>
                <CardDescription>Configurar cuándo enviar notificaciones automáticas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                  <div className="space-y-0.5">
                    <Label>Habilitar Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Activar/desactivar todas las notificaciones por correo
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.enableEmailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableEmailNotifications: checked })
                    }
                  />
                </div>

                {notificationSettings.enableEmailNotifications && (
                  <>
                    <Separator className="my-4" />

                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold">Notificar cuando:</h3>

                      <div className="flex items-center justify-between">
                        <Label className="font-normal">Un estudiante se inscribe en un curso</Label>
                        <Switch
                          checked={notificationSettings.instructorNewEnrollment}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, instructorNewEnrollment: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="font-normal">Se completa un curso</Label>
                        <Switch
                          checked={notificationSettings.studentCompletionCertificates}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, studentCompletionCertificates: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="font-normal">Se recibe un pago</Label>
                        <Switch
                          checked={notificationSettings.adminPaymentReceived}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, adminPaymentReceived: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="font-normal">Se publica un nuevo curso</Label>
                        <Switch
                          checked={notificationSettings.adminNewCourse}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, adminNewCourse: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="font-normal">Se recibe una nueva reseña</Label>
                        <Switch
                          checked={notificationSettings.instructorCourseReviews}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, instructorCourseReviews: checked })
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Seguridad */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Autenticación y Acceso</CardTitle>
                <CardDescription>Configuración de métodos de autenticación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticación de Dos Factores</Label>
                      <p className="text-sm text-muted-foreground">
                        Requiere verificación adicional al iniciar sesión
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.enableTwoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, enableTwoFactorAuth: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Verificación de Email Obligatoria</Label>
                      <p className="text-sm text-muted-foreground">
                        Los usuarios deben verificar su email para acceder
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.requireEmailVerification}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, requireEmailVerification: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inicio de Sesión Social</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir inicio de sesión con redes sociales
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.allowSocialLogin}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, allowSocialLogin: checked })
                      }
                    />
                  </div>

                  {securitySettings.allowSocialLogin && (
                    <div className="ml-8 space-y-3 border-l-2 border-muted pl-4">
                      <div className="flex items-center justify-between">
                        <Label>Google</Label>
                        <Switch
                          checked={securitySettings.socialProviders.google}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              socialProviders: { ...securitySettings.socialProviders, google: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Facebook</Label>
                        <Switch
                          checked={securitySettings.socialProviders.facebook}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              socialProviders: { ...securitySettings.socialProviders, facebook: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>GitHub</Label>
                        <Switch
                          checked={securitySettings.socialProviders.github}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({
                              ...securitySettings,
                              socialProviders: { ...securitySettings.socialProviders, github: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>CAPTCHA en Formularios</Label>
                      <p className="text-sm text-muted-foreground">
                        Protección contra bots y spam
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.enableCaptcha}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, enableCaptcha: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Política de Contraseñas</CardTitle>
                <CardDescription>Requisitos de seguridad para las contraseñas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minPasswordLength">Longitud Mínima</Label>
                    <Input
                      id="minPasswordLength"
                      type="number"
                      min="6"
                      max="20"
                      value={securitySettings.minimumPasswordLength}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, minimumPasswordLength: parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preventReuse">Prevenir Reutilización</Label>
                    <Select
                      value={securitySettings.preventPasswordReuse.toString()}
                      onValueChange={(value) =>
                        setSecuritySettings({ ...securitySettings, preventPasswordReuse: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Permitir reutilización</SelectItem>
                        <SelectItem value="3">Últimas 3 contraseñas</SelectItem>
                        <SelectItem value="5">Últimas 5 contraseñas</SelectItem>
                        <SelectItem value="10">Últimas 10 contraseñas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Requiere mayúsculas</Label>
                    <Switch
                      checked={securitySettings.requireUppercase}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, requireUppercase: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Requiere minúsculas</Label>
                    <Switch
                      checked={securitySettings.requireLowercase}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, requireLowercase: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Requiere números</Label>
                    <Switch
                      checked={securitySettings.requireNumbers}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, requireNumbers: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Requiere caracteres especiales</Label>
                    <Switch
                      checked={securitySettings.requireSpecialChars}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, requireSpecialChars: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Protección de Cuenta</CardTitle>
                <CardDescription>Configuración de seguridad adicional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tiempo de inactividad (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min="5"
                      max="1440"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Cerrar sesión después de este tiempo sin actividad
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAttempts">Intentos de inicio de sesión</Label>
                    <Select
                      value={securitySettings.maxLoginAttempts.toString()}
                      onValueChange={(value) =>
                        setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 intentos</SelectItem>
                        <SelectItem value="5">5 intentos</SelectItem>
                        <SelectItem value="10">10 intentos</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Número de intentos antes de bloquear temporalmente
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>CAPTCHA en formularios</Label>
                    <p className="text-sm text-muted-foreground">
                      Protección contra bots y spam
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.enableCaptcha}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enableCaptcha: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botones de acción flotantes */}
        <div className="fixed bottom-6 right-6 flex gap-3">
          <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
            <RefreshCw className="h-5 w-5 mr-2" />
            Restablecer
          </Button>
          <Button size="lg" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </main>
    </>
  )
}

export default function SettingsPage() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-blue-950/30">
          <SettingsContent />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  )
}
