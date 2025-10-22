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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  Plug,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Activity,
  Zap,
  Mail,
  CreditCard,
  Cloud,
  MessageSquare,
  BarChart3,
  Webhook,
} from "lucide-react"

// Mock integration data
const integrations = [
  {
    id: 1,
    name: "Stripe",
    category: "payments",
    description: "Procesamiento de pagos y suscripciones",
    status: "connected",
    health: "healthy",
    lastSync: "2024-03-11 14:30:00",
    version: "2023-10-16",
    icon: CreditCard,
    config: {
      publicKey: "pk_live_••••••••••••••••",
      secretKey: "sk_live_••••••••••••••••",
      webhookUrl: "https://api.electricosespecializados.com/webhooks/stripe",
      currency: "MXN",
      testMode: false,
    },
    metrics: {
      requests: 15420,
      errors: 23,
      uptime: 99.8,
      avgResponse: 145,
    },
  },
  {
    id: 2,
    name: "SendGrid",
    category: "email",
    description: "Servicio de envío de emails transaccionales",
    status: "connected",
    health: "healthy",
    lastSync: "2024-03-11 14:25:00",
    version: "v3",
    icon: Mail,
    config: {
      apiKey: "SG.••••••••••••••••",
      fromEmail: "noreply@electricosespecializados.com",
      fromName: "Eléctricos Especializados",
      trackOpens: true,
      trackClicks: true,
    },
    metrics: {
      requests: 8934,
      errors: 12,
      uptime: 99.9,
      avgResponse: 89,
    },
  },
  {
    id: 3,
    name: "AWS S3",
    category: "storage",
    description: "Almacenamiento de archivos y contenido multimedia",
    status: "connected",
    health: "warning",
    lastSync: "2024-03-11 14:20:00",
    version: "2006-03-01",
    icon: Cloud,
    config: {
      accessKey: "AKIA••••••••••••••",
      secretKey: "••••••••••••••••••••••••••••••••••••••••",
      bucket: "electricos-content",
      region: "us-east-1",
      cdnEnabled: true,
    },
    metrics: {
      requests: 45230,
      errors: 156,
      uptime: 98.5,
      avgResponse: 234,
    },
  },
  {
    id: 4,
    name: "Google Analytics",
    category: "analytics",
    description: "Análisis de tráfico web y comportamiento de usuarios",
    status: "disconnected",
    health: "offline",
    lastSync: "2024-03-05 10:15:00",
    version: "GA4",
    icon: BarChart3,
    config: {
      measurementId: "G-••••••••••",
      apiSecret: "••••••••••••••••••••••••",
      trackingEnabled: false,
    },
    metrics: {
      requests: 0,
      errors: 0,
      uptime: 0,
      avgResponse: 0,
    },
  },
  {
    id: 5,
    name: "Slack",
    category: "notifications",
    description: "Notificaciones y alertas del sistema",
    status: "connected",
    health: "healthy",
    lastSync: "2024-03-11 14:15:00",
    version: "1.0",
    icon: MessageSquare,
    config: {
      webhookUrl: "https://hooks.slack.com/services/••••••••••••••••",
      channel: "#admin-alerts",
      username: "Sistema Eléctricos",
      enableAlerts: true,
    },
    metrics: {
      requests: 234,
      errors: 1,
      uptime: 99.6,
      avgResponse: 567,
    },
  },
  {
    id: 6,
    name: "Zoom",
    category: "video",
    description: "Clases en vivo y webinars",
    status: "pending",
    health: "pending",
    lastSync: null,
    version: "2.0",
    icon: Activity,
    config: {
      apiKey: "",
      apiSecret: "",
      webhookToken: "",
      defaultSettings: {},
    },
    metrics: {
      requests: 0,
      errors: 0,
      uptime: 0,
      avgResponse: 0,
    },
  },
]

const webhooks = [
  {
    id: 1,
    name: "Stripe Payment Webhook",
    url: "https://api.electricosespecializados.com/webhooks/stripe",
    events: ["payment_intent.succeeded", "invoice.payment_failed", "customer.subscription.updated"],
    status: "active",
    lastTriggered: "2024-03-11 14:30:00",
    successRate: 99.2,
  },
  {
    id: 2,
    name: "Course Completion Webhook",
    url: "https://api.electricosespecializados.com/webhooks/course-completion",
    events: ["course.completed", "certificate.generated"],
    status: "active",
    lastTriggered: "2024-03-11 13:45:00",
    successRate: 98.7,
  },
  {
    id: 3,
    name: "User Registration Webhook",
    url: "https://api.electricosespecializados.com/webhooks/user-registration",
    events: ["user.created", "user.verified"],
    status: "inactive",
    lastTriggered: "2024-03-10 16:20:00",
    successRate: 97.5,
  },
]

const availableIntegrations = [
  { name: "PayPal", category: "payments", description: "Procesamiento alternativo de pagos" },
  { name: "Mailchimp", category: "email", description: "Marketing por email y newsletters" },
  { name: "Twilio", category: "communications", description: "SMS y comunicaciones" },
  { name: "Microsoft Teams", category: "video", description: "Clases virtuales y reuniones" },
  { name: "Zapier", category: "automation", description: "Automatización de workflows" },
  { name: "HubSpot", category: "crm", description: "Gestión de relaciones con clientes" },
]

export function IntegrationManagement() {
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [showSecrets, setShowSecrets] = useState(false)
  const [testingConnection, setTestingConnection] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Conectado</Badge>
      case "disconnected":
        return <Badge className="bg-red-100 text-red-800">Desconectado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "offline":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "payments":
        return CreditCard
      case "email":
        return Mail
      case "storage":
        return Cloud
      case "analytics":
        return BarChart3
      case "notifications":
        return MessageSquare
      case "video":
        return Activity
      default:
        return Plug
    }
  }

  const testConnection = async (integrationId: number) => {
    setTestingConnection(integrationId)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTestingConnection(null)
  }

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Integraciones Activas</CardTitle>
            <Plug className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.filter((i) => i.status === "connected").length}</div>
            <div className="text-xs text-gray-600">de {integrations.length} configuradas</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado de Salud</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.4%</div>
            <div className="text-xs text-gray-600">Uptime promedio</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webhooks Activos</CardTitle>
            <Webhook className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhooks.filter((w) => w.status === "active").length}</div>
            <div className="text-xs text-gray-600">de {webhooks.length} configurados</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errores Recientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">192</div>
            <div className="text-xs text-gray-600">Últimas 24 horas</div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Management Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle>Gestión de Integraciones</CardTitle>
          <CardDescription>Administra conexiones con servicios externos y APIs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">Integraciones Activas</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="logs">Logs de Integración</TabsTrigger>
            </TabsList>

            {/* Active Integrations */}
            <TabsContent value="active" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {integrations.map((integration) => {
                  const IconComponent = integration.icon
                  return (
                    <Card key={integration.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{integration.name}</h3>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getHealthIcon(integration.health)}
                            {getStatusBadge(integration.status)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-600">Última sincronización:</span>
                            <div className="font-medium">{integration.lastSync || "Nunca"}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Versión:</span>
                            <div className="font-medium">{integration.version}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Uptime:</span>
                            <div className="font-medium">{integration.metrics.uptime}%</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Respuesta promedio:</span>
                            <div className="font-medium">{integration.metrics.avgResponse}ms</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tasa de éxito</span>
                            <span>
                              {(
                                ((integration.metrics.requests - integration.metrics.errors) /
                                  integration.metrics.requests) *
                                100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              ((integration.metrics.requests - integration.metrics.errors) /
                                integration.metrics.requests) *
                              100
                            }
                            className="h-2"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedIntegration(integration)}>
                                <Settings className="h-4 w-4 mr-2" />
                                Configurar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Configurar {integration.name}</DialogTitle>
                                <DialogDescription>
                                  Administra la configuración y credenciales de la integración
                                </DialogDescription>
                              </DialogHeader>
                              {selectedIntegration && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(selectedIntegration.config).map(([key, value]) => (
                                      <div key={key}>
                                        <Label htmlFor={key} className="capitalize">
                                          {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                                        </Label>
                                        <div className="relative">
                                          <Input
                                            id={key}
                                            type={
                                              key.includes("key") || key.includes("secret") || key.includes("password")
                                                ? showSecrets
                                                  ? "text"
                                                  : "password"
                                                : "text"
                                            }
                                            value={value as string}
                                            readOnly
                                          />
                                          {(key.includes("key") ||
                                            key.includes("secret") ||
                                            key.includes("password")) && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="absolute right-0 top-0 h-full px-3"
                                              onClick={() => setShowSecrets(!showSecrets)}
                                            >
                                              {showSecrets ? (
                                                <EyeOff className="h-4 w-4" />
                                              ) : (
                                                <Eye className="h-4 w-4" />
                                              )}
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button>Guardar Cambios</Button>
                                    <Button variant="outline">Regenerar Claves</Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => testConnection(integration.id)}
                            disabled={testingConnection === integration.id}
                          >
                            {testingConnection === integration.id ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Zap className="h-4 w-4 mr-2" />
                            )}
                            Probar
                          </Button>
                          {integration.status === "connected" && (
                            <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                              Desconectar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Webhooks Management */}
            <TabsContent value="webhooks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gestión de Webhooks</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Webhook
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Webhook</DialogTitle>
                      <DialogDescription>Configura un nuevo endpoint para recibir eventos</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="webhook-name">Nombre del Webhook</Label>
                        <Input id="webhook-name" placeholder="Ej: Payment Notifications" />
                      </div>
                      <div>
                        <Label htmlFor="webhook-url">URL del Endpoint</Label>
                        <Input id="webhook-url" placeholder="https://api.example.com/webhooks/..." />
                      </div>
                      <div>
                        <Label htmlFor="webhook-events">Eventos</Label>
                        <Textarea id="webhook-events" placeholder="payment.succeeded, user.created, ..." />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="webhook-active" defaultChecked />
                        <Label htmlFor="webhook-active">Webhook activo</Label>
                      </div>
                      <Button className="w-full">Crear Webhook</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <Card key={webhook.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{webhook.name}</h4>
                            <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                              {webhook.status === "active" ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{webhook.url}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {webhook.events.map((event, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Último evento:</span>
                              <div className="font-medium">{webhook.lastTriggered}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Tasa de éxito:</span>
                              <div className="font-medium">{webhook.successRate}%</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Zap className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Integration Marketplace */}
            <TabsContent value="marketplace" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Marketplace de Integraciones</h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar Catálogo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableIntegrations.map((integration, index) => {
                  const IconComponent = getCategoryIcon(integration.category)
                  return (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{integration.name}</h4>
                            <Badge variant="outline" className="text-xs capitalize">
                              {integration.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                        <Button size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Instalar
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Integration Logs */}
            <TabsContent value="logs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Logs de Integración</h3>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las integraciones</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="aws">AWS S3</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    Exportar Logs
                  </Button>
                </div>
              </div>

              <Card className="border border-gray-200">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {[
                      {
                        time: "14:30:25",
                        level: "INFO",
                        integration: "Stripe",
                        message: "Payment processed successfully",
                        details: "Payment ID: pi_1234567890",
                      },
                      {
                        time: "14:29:12",
                        level: "ERROR",
                        integration: "AWS S3",
                        message: "Failed to upload file",
                        details: "Bucket: electricos-content, Error: Access Denied",
                      },
                      {
                        time: "14:28:45",
                        level: "INFO",
                        integration: "SendGrid",
                        message: "Email sent successfully",
                        details: "To: user@example.com, Subject: Welcome",
                      },
                      {
                        time: "14:27:33",
                        level: "WARN",
                        integration: "Stripe",
                        message: "Webhook retry attempt",
                        details: "Attempt 2/3 for event: payment_intent.succeeded",
                      },
                      {
                        time: "14:26:18",
                        level: "INFO",
                        integration: "Slack",
                        message: "Notification sent",
                        details: "Channel: #admin-alerts, Message: System backup completed",
                      },
                    ].map((log, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Badge
                              variant={
                                log.level === "ERROR" ? "destructive" : log.level === "WARN" ? "secondary" : "default"
                              }
                              className="text-xs"
                            >
                              {log.level}
                            </Badge>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{log.integration}</span>
                                <span className="text-xs text-gray-500">{log.time}</span>
                              </div>
                              <p className="text-sm text-gray-900 mb-1">{log.message}</p>
                              <p className="text-xs text-gray-600">{log.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
