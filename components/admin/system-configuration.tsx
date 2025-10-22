"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Settings,
  Shield,
  Mail,
  Database,
  Globe,
  Bell,
  Server,
  Key,
  CheckCircle,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react"

// Mock system configuration data
const systemSettings = {
  general: {
    siteName: "Eléctricos Especializados",
    siteDescription: "Plataforma líder en educación eléctrica especializada",
    defaultLanguage: "es",
    timezone: "America/Mexico_City",
    maintenanceMode: false,
    registrationEnabled: true,
    maxFileSize: 100, // MB
    sessionTimeout: 30, // minutes
  },
  security: {
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutes
    twoFactorRequired: false,
    ipWhitelist: [],
    sslRequired: true,
    securityHeaders: true,
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "noreply@electricosespecializados.com",
    smtpPassword: "••••••••",
    fromName: "Eléctricos Especializados",
    fromEmail: "noreply@electricosespecializados.com",
    enableNotifications: true,
    welcomeEmailEnabled: true,
    certificateEmailEnabled: true,
  },
  database: {
    backupFrequency: "daily",
    retentionPeriod: 30, // days
    autoOptimize: true,
    connectionPoolSize: 20,
    queryTimeout: 30, // seconds
    lastBackup: "2024-03-11 02:00:00",
    backupSize: "2.4 GB",
    status: "healthy",
  },
  performance: {
    cacheEnabled: true,
    cacheTTL: 3600, // seconds
    compressionEnabled: true,
    cdnEnabled: true,
    imageOptimization: true,
    lazyLoading: true,
    minifyAssets: true,
    maxConcurrentUsers: 1000,
  },
  notifications: {
    systemAlerts: true,
    userRegistrations: true,
    courseCompletions: true,
    paymentNotifications: true,
    errorReports: true,
    maintenanceAlerts: true,
    slackWebhook: "",
    emailAlerts: true,
  },
}

const apiKeys = [
  { name: "Stripe", key: "sk_live_••••••••••••••••", status: "active", lastUsed: "2024-03-11" },
  { name: "SendGrid", key: "SG.••••••••••••••••", status: "active", lastUsed: "2024-03-11" },
  { name: "AWS S3", key: "AKIA••••••••••••••", status: "active", lastUsed: "2024-03-10" },
  { name: "Google Analytics", key: "G-••••••••••", status: "inactive", lastUsed: "2024-03-05" },
]

const systemLogs = [
  { timestamp: "2024-03-11 14:30:25", level: "INFO", message: "Sistema iniciado correctamente", source: "System" },
  { timestamp: "2024-03-11 14:25:12", level: "WARN", message: "Alto uso de CPU detectado", source: "Monitor" },
  { timestamp: "2024-03-11 14:20:08", level: "INFO", message: "Backup completado exitosamente", source: "Database" },
  { timestamp: "2024-03-11 14:15:33", level: "ERROR", message: "Fallo en conexión SMTP", source: "Email" },
  { timestamp: "2024-03-11 14:10:45", level: "INFO", message: "Cache limpiado automáticamente", source: "Cache" },
]

export function SystemConfiguration() {
  const [settings, setSettings] = useState(systemSettings)
  const [showPasswords, setShowPasswords] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }))
    setUnsavedChanges(true)
  }

  const handleSave = () => {
    // Save settings logic here
    setUnsavedChanges(false)
  }

  const handleReset = () => {
    setSettings(systemSettings)
    setUnsavedChanges(false)
  }

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case "ERROR":
        return <Badge className="bg-red-100 text-red-800">ERROR</Badge>
      case "WARN":
        return <Badge className="bg-yellow-100 text-yellow-800">WARN</Badge>
      case "INFO":
        return <Badge className="bg-blue-100 text-blue-800">INFO</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Configuración del Sistema</h2>
          <p className="text-gray-600">Administra configuraciones globales y parámetros del sistema</p>
        </div>
        <div className="flex gap-2">
          {unsavedChanges && (
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Descartar
            </Button>
          )}
          <Button onClick={handleSave} disabled={!unsavedChanges}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      {/* Configuration Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="database">Base de Datos</TabsTrigger>
              <TabsTrigger value="performance">Rendimiento</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuración General
                  </CardTitle>
                  <CardDescription>Configuraciones básicas de la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Nombre del Sitio</Label>
                      <Input
                        id="siteName"
                        value={settings.general.siteName}
                        onChange={(e) => handleSettingChange("general", "siteName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="defaultLanguage">Idioma Predeterminado</Label>
                      <Select
                        value={settings.general.defaultLanguage}
                        onValueChange={(value) => handleSettingChange("general", "defaultLanguage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">Descripción del Sitio</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.general.siteDescription}
                      onChange={(e) => handleSettingChange("general", "siteDescription", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timezone">Zona Horaria</Label>
                      <Select
                        value={settings.general.timezone}
                        onValueChange={(value) => handleSettingChange("general", "timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Mexico_City">Ciudad de México</SelectItem>
                          <SelectItem value="America/New_York">Nueva York</SelectItem>
                          <SelectItem value="Europe/Madrid">Madrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maxFileSize">Tamaño Máximo de Archivo (MB)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[settings.general.maxFileSize]}
                          onValueChange={(value) => handleSettingChange("general", "maxFileSize", value[0])}
                          max={500}
                          min={10}
                          step={10}
                        />
                        <div className="text-sm text-gray-600">{settings.general.maxFileSize} MB</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Modo de Mantenimiento</Label>
                      <p className="text-sm text-gray-600">Desactiva el acceso público al sitio</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={settings.general.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange("general", "maintenanceMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="registrationEnabled">Registro Habilitado</Label>
                      <p className="text-sm text-gray-600">Permite nuevos registros de usuarios</p>
                    </div>
                    <Switch
                      id="registrationEnabled"
                      checked={settings.general.registrationEnabled}
                      onCheckedChange={(checked) => handleSettingChange("general", "registrationEnabled", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Configuración de Seguridad
                  </CardTitle>
                  <CardDescription>Políticas de seguridad y autenticación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="passwordMinLength">Longitud Mínima de Contraseña</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) =>
                          handleSettingChange("security", "passwordMinLength", Number.parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxLoginAttempts">Máximo Intentos de Login</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) =>
                          handleSettingChange("security", "maxLoginAttempts", Number.parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireSpecialChars">Requerir Caracteres Especiales</Label>
                        <p className="text-sm text-gray-600">Las contraseñas deben incluir símbolos</p>
                      </div>
                      <Switch
                        id="requireSpecialChars"
                        checked={settings.security.requireSpecialChars}
                        onCheckedChange={(checked) => handleSettingChange("security", "requireSpecialChars", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireNumbers">Requerir Números</Label>
                        <p className="text-sm text-gray-600">Las contraseñas deben incluir números</p>
                      </div>
                      <Switch
                        id="requireNumbers"
                        checked={settings.security.requireNumbers}
                        onCheckedChange={(checked) => handleSettingChange("security", "requireNumbers", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactorRequired">Autenticación de Dos Factores</Label>
                        <p className="text-sm text-gray-600">Requerir 2FA para todos los usuarios</p>
                      </div>
                      <Switch
                        id="twoFactorRequired"
                        checked={settings.security.twoFactorRequired}
                        onCheckedChange={(checked) => handleSettingChange("security", "twoFactorRequired", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sslRequired">SSL Requerido</Label>
                        <p className="text-sm text-gray-600">Forzar conexiones HTTPS</p>
                      </div>
                      <Switch
                        id="sslRequired"
                        checked={settings.security.sslRequired}
                        onCheckedChange={(checked) => handleSettingChange("security", "sslRequired", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Keys Management */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Gestión de API Keys
                  </CardTitle>
                  <CardDescription>Administra claves de API y integraciones externas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiKeys.map((api, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{api.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{api.key}</span>
                            <Badge variant={api.status === "active" ? "default" : "secondary"}>
                              {api.status === "active" ? "Activa" : "Inactiva"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">Último uso: {api.lastUsed}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            Rotar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Settings */}
            <TabsContent value="email" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Configuración de Email
                  </CardTitle>
                  <CardDescription>Configuración SMTP y notificaciones por email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpHost">Servidor SMTP</Label>
                      <Input
                        id="smtpHost"
                        value={settings.email.smtpHost}
                        onChange={(e) => handleSettingChange("email", "smtpHost", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">Puerto SMTP</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={settings.email.smtpPort}
                        onChange={(e) => handleSettingChange("email", "smtpPort", Number.parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpUser">Usuario SMTP</Label>
                      <Input
                        id="smtpUser"
                        value={settings.email.smtpUser}
                        onChange={(e) => handleSettingChange("email", "smtpUser", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">Contraseña SMTP</Label>
                      <div className="relative">
                        <Input
                          id="smtpPassword"
                          type={showPasswords ? "text" : "password"}
                          value={settings.email.smtpPassword}
                          onChange={(e) => handleSettingChange("email", "smtpPassword", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromName">Nombre del Remitente</Label>
                      <Input
                        id="fromName"
                        value={settings.email.fromName}
                        onChange={(e) => handleSettingChange("email", "fromName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromEmail">Email del Remitente</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) => handleSettingChange("email", "fromEmail", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="welcomeEmailEnabled">Email de Bienvenida</Label>
                        <p className="text-sm text-gray-600">Enviar email automático a nuevos usuarios</p>
                      </div>
                      <Switch
                        id="welcomeEmailEnabled"
                        checked={settings.email.welcomeEmailEnabled}
                        onCheckedChange={(checked) => handleSettingChange("email", "welcomeEmailEnabled", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="certificateEmailEnabled">Email de Certificado</Label>
                        <p className="text-sm text-gray-600">Enviar certificados por email automáticamente</p>
                      </div>
                      <Switch
                        id="certificateEmailEnabled"
                        checked={settings.email.certificateEmailEnabled}
                        onCheckedChange={(checked) => handleSettingChange("email", "certificateEmailEnabled", checked)}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Probar Configuración
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Database Settings */}
            <TabsContent value="database" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Configuración de Base de Datos
                  </CardTitle>
                  <CardDescription>Configuración de respaldos y optimización</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-green-50 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Estado</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">Saludable</div>
                    </Card>
                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Último Backup</span>
                      </div>
                      <div className="text-sm font-medium">{settings.database.lastBackup}</div>
                    </Card>
                    <Card className="p-4 bg-purple-50 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Server className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Tamaño</span>
                      </div>
                      <div className="text-lg font-bold">{settings.database.backupSize}</div>
                    </Card>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="backupFrequency">Frecuencia de Backup</Label>
                      <Select
                        value={settings.database.backupFrequency}
                        onValueChange={(value) => handleSettingChange("database", "backupFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Cada hora</SelectItem>
                          <SelectItem value="daily">Diario</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="retentionPeriod">Período de Retención (días)</Label>
                      <Input
                        id="retentionPeriod"
                        type="number"
                        value={settings.database.retentionPeriod}
                        onChange={(e) =>
                          handleSettingChange("database", "retentionPeriod", Number.parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoOptimize">Optimización Automática</Label>
                      <p className="text-sm text-gray-600">Optimizar tablas automáticamente</p>
                    </div>
                    <Switch
                      id="autoOptimize"
                      checked={settings.database.autoOptimize}
                      onCheckedChange={(checked) => handleSettingChange("database", "autoOptimize", checked)}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Crear Backup Manual
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Restaurar Backup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Settings */}
            <TabsContent value="performance" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Configuración de Rendimiento
                  </CardTitle>
                  <CardDescription>Optimización de cache y rendimiento del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cacheEnabled">Cache Habilitado</Label>
                        <p className="text-sm text-gray-600">Mejora la velocidad de carga</p>
                      </div>
                      <Switch
                        id="cacheEnabled"
                        checked={settings.performance.cacheEnabled}
                        onCheckedChange={(checked) => handleSettingChange("performance", "cacheEnabled", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compressionEnabled">Compresión Habilitada</Label>
                        <p className="text-sm text-gray-600">Comprime archivos para transferencia más rápida</p>
                      </div>
                      <Switch
                        id="compressionEnabled"
                        checked={settings.performance.compressionEnabled}
                        onCheckedChange={(checked) => handleSettingChange("performance", "compressionEnabled", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cdnEnabled">CDN Habilitado</Label>
                        <p className="text-sm text-gray-600">Usa red de distribución de contenido</p>
                      </div>
                      <Switch
                        id="cdnEnabled"
                        checked={settings.performance.cdnEnabled}
                        onCheckedChange={(checked) => handleSettingChange("performance", "cdnEnabled", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="imageOptimization">Optimización de Imágenes</Label>
                        <p className="text-sm text-gray-600">Optimiza automáticamente las imágenes</p>
                      </div>
                      <Switch
                        id="imageOptimization"
                        checked={settings.performance.imageOptimization}
                        onCheckedChange={(checked) => handleSettingChange("performance", "imageOptimization", checked)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cacheTTL">Tiempo de Vida del Cache (segundos)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[settings.performance.cacheTTL]}
                        onValueChange={(value) => handleSettingChange("performance", "cacheTTL", value[0])}
                        max={86400}
                        min={300}
                        step={300}
                      />
                      <div className="text-sm text-gray-600">{settings.performance.cacheTTL} segundos</div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="maxConcurrentUsers">Máximo Usuarios Concurrentes</Label>
                    <Input
                      id="maxConcurrentUsers"
                      type="number"
                      value={settings.performance.maxConcurrentUsers}
                      onChange={(e) =>
                        handleSettingChange("performance", "maxConcurrentUsers", Number.parseInt(e.target.value))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Monitoring Settings */}
            <TabsContent value="monitoring" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Configuración de Monitoreo
                  </CardTitle>
                  <CardDescription>Alertas y notificaciones del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="systemAlerts">Alertas del Sistema</Label>
                        <p className="text-sm text-gray-600">Notificaciones de estado del sistema</p>
                      </div>
                      <Switch
                        id="systemAlerts"
                        checked={settings.notifications.systemAlerts}
                        onCheckedChange={(checked) => handleSettingChange("notifications", "systemAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="errorReports">Reportes de Error</Label>
                        <p className="text-sm text-gray-600">Notificaciones de errores críticos</p>
                      </div>
                      <Switch
                        id="errorReports"
                        checked={settings.notifications.errorReports}
                        onCheckedChange={(checked) => handleSettingChange("notifications", "errorReports", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="paymentNotifications">Notificaciones de Pago</Label>
                        <p className="text-sm text-gray-600">Alertas de transacciones</p>
                      </div>
                      <Switch
                        id="paymentNotifications"
                        checked={settings.notifications.paymentNotifications}
                        onCheckedChange={(checked) =>
                          handleSettingChange("notifications", "paymentNotifications", checked)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="slackWebhook">Webhook de Slack</Label>
                    <Input
                      id="slackWebhook"
                      placeholder="https://hooks.slack.com/services/..."
                      value={settings.notifications.slackWebhook}
                      onChange={(e) => handleSettingChange("notifications", "slackWebhook", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* System Logs */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Logs del Sistema
                  </CardTitle>
                  <CardDescription>Registro de actividad y eventos del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemLogs.map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getLogLevelBadge(log.level)}
                          <div>
                            <div className="font-medium text-sm">{log.message}</div>
                            <div className="text-xs text-gray-500">
                              {log.source} • {log.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" size="sm">
                      Ver Todos los Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
