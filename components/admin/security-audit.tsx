"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Key,
  Activity,
  MapPin,
  Smartphone,
  Monitor,
  Globe,
  Search,
  Download,
  RefreshCw,
  Ban,
  UserX,
  AlertCircle,
  Database,
  Server,
  Wifi,
  Settings,
} from "lucide-react"
import { format } from "date-fns"

// Mock security data
const securityMetrics = {
  threatLevel: "low",
  activeThreats: 3,
  blockedAttempts: 247,
  securityScore: 94,
  lastScan: "2024-03-11 14:30:00",
  vulnerabilities: {
    critical: 0,
    high: 1,
    medium: 3,
    low: 8,
  },
}

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-03-11 14:30:25",
    user: "admin@electricosespecializados.com",
    action: "user_login",
    resource: "admin_panel",
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    location: "Ciudad de México, México",
    status: "success",
    risk: "low",
    details: "Successful admin login from trusted location",
  },
  {
    id: 2,
    timestamp: "2024-03-11 14:28:15",
    user: "instructor@electricosespecializados.com",
    action: "course_update",
    resource: "course_123",
    ip: "10.0.0.45",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    location: "Guadalajara, México",
    status: "success",
    risk: "low",
    details: "Updated course content: Instalaciones Eléctricas Residenciales",
  },
  {
    id: 3,
    timestamp: "2024-03-11 14:25:42",
    user: "unknown",
    action: "failed_login",
    resource: "login_page",
    ip: "185.220.101.45",
    userAgent: "curl/7.68.0",
    location: "Unknown (VPN/Proxy)",
    status: "blocked",
    risk: "high",
    details: "Multiple failed login attempts detected - IP blocked",
  },
  {
    id: 4,
    timestamp: "2024-03-11 14:22:18",
    user: "student@example.com",
    action: "payment_processed",
    resource: "payment_gateway",
    ip: "201.175.45.123",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    location: "Monterrey, México",
    status: "success",
    risk: "low",
    details: "Course enrollment payment processed successfully",
  },
  {
    id: 5,
    timestamp: "2024-03-11 14:20:33",
    user: "system",
    action: "backup_completed",
    resource: "database",
    ip: "127.0.0.1",
    userAgent: "System/Automated",
    location: "Server Internal",
    status: "success",
    risk: "low",
    details: "Daily database backup completed successfully",
  },
  {
    id: 6,
    timestamp: "2024-03-11 14:18:07",
    user: "admin@electricosespecializados.com",
    action: "user_role_change",
    resource: "user_456",
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    location: "Ciudad de México, México",
    status: "success",
    risk: "medium",
    details: "Changed user role from student to instructor",
  },
  {
    id: 7,
    timestamp: "2024-03-11 14:15:29",
    user: "unknown",
    action: "suspicious_activity",
    resource: "api_endpoint",
    ip: "45.142.214.123",
    userAgent: "python-requests/2.28.1",
    location: "Russia",
    status: "blocked",
    risk: "critical",
    details: "Attempted SQL injection attack detected and blocked",
  },
]

const securityPolicies = [
  {
    id: 1,
    name: "Política de Contraseñas",
    description: "Requisitos mínimos para contraseñas de usuario",
    status: "active",
    lastUpdated: "2024-02-15",
    rules: [
      "Mínimo 8 caracteres",
      "Al menos 1 mayúscula",
      "Al menos 1 número",
      "Al menos 1 carácter especial",
      "No reutilizar últimas 5 contraseñas",
    ],
  },
  {
    id: 2,
    name: "Control de Acceso por IP",
    description: "Restricciones geográficas y de IP",
    status: "active",
    lastUpdated: "2024-03-01",
    rules: [
      "Bloquear IPs de países de alto riesgo",
      "Permitir solo IPs corporativas para admin",
      "Detectar y bloquear VPNs/Proxies",
      "Límite de 5 intentos de login por IP",
    ],
  },
  {
    id: 3,
    name: "Autenticación de Dos Factores",
    description: "2FA obligatorio para roles administrativos",
    status: "active",
    lastUpdated: "2024-01-20",
    rules: [
      "2FA obligatorio para administradores",
      "2FA opcional para instructores",
      "Soporte para TOTP y SMS",
      "Códigos de respaldo disponibles",
    ],
  },
  {
    id: 4,
    name: "Monitoreo de Sesiones",
    description: "Control y límites de sesiones activas",
    status: "active",
    lastUpdated: "2024-02-28",
    rules: [
      "Máximo 3 sesiones simultáneas",
      "Timeout de sesión: 2 horas",
      "Logout automático por inactividad",
      "Notificación de nuevos logins",
    ],
  },
]

const threatIntelligence = [
  {
    id: 1,
    type: "brute_force",
    severity: "high",
    source: "185.220.101.45",
    country: "Unknown",
    attempts: 127,
    blocked: true,
    firstSeen: "2024-03-11 13:45:00",
    lastSeen: "2024-03-11 14:25:42",
    description: "Automated brute force attack targeting login endpoints",
  },
  {
    id: 2,
    type: "sql_injection",
    severity: "critical",
    source: "45.142.214.123",
    country: "Russia",
    attempts: 23,
    blocked: true,
    firstSeen: "2024-03-11 14:10:15",
    lastSeen: "2024-03-11 14:15:29",
    description: "SQL injection attempts on API endpoints",
  },
  {
    id: 3,
    type: "suspicious_crawling",
    severity: "medium",
    source: "103.28.248.15",
    country: "China",
    attempts: 456,
    blocked: false,
    firstSeen: "2024-03-11 12:30:00",
    lastSeen: "2024-03-11 14:20:00",
    description: "Aggressive crawling behavior, possible data scraping",
  },
]

const complianceStatus = {
  gdpr: { status: "compliant", lastAudit: "2024-02-15", score: 98 },
  iso27001: { status: "compliant", lastAudit: "2024-01-30", score: 95 },
  pci_dss: { status: "compliant", lastAudit: "2024-03-01", score: 97 },
  lopd: { status: "compliant", lastAudit: "2024-02-20", score: 96 },
}

export function SecurityAudit() {
  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [filterRisk, setFilterRisk] = useState("all")
  const [filterAction, setFilterAction] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Crítico</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Alto</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medio</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Bajo</Badge>
      default:
        return <Badge variant="secondary">{risk}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Éxito</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">Bloqueado</Badge>
      case "failed":
        return <Badge className="bg-orange-100 text-orange-800">Fallido</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Activo</Badge>
      case "compliant":
        return <Badge className="bg-green-100 text-green-800">Cumple</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "user_login":
        return <Key className="h-4 w-4" />
      case "course_update":
        return <Settings className="h-4 w-4" />
      case "failed_login":
        return <XCircle className="h-4 w-4" />
      case "payment_processed":
        return <CheckCircle className="h-4 w-4" />
      case "backup_completed":
        return <Database className="h-4 w-4" />
      case "user_role_change":
        return <UserX className="h-4 w-4" />
      case "suspicious_activity":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-orange-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesRisk = filterRisk === "all" || log.risk === filterRisk
    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesSearch =
      searchTerm === "" ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesRisk && matchesAction && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nivel de Amenaza</CardTitle>
            <Shield className={`h-4 w-4 ${getThreatLevelColor(securityMetrics.threatLevel)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold capitalize ${getThreatLevelColor(securityMetrics.threatLevel)}`}>
              {securityMetrics.threatLevel === "low" ? "Bajo" : securityMetrics.threatLevel}
            </div>
            <div className="text-xs text-gray-600">{securityMetrics.activeThreats} amenazas activas</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntuación de Seguridad</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.securityScore}/100</div>
            <Progress value={securityMetrics.securityScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intentos Bloqueados</CardTitle>
            <Ban className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.blockedAttempts}</div>
            <div className="text-xs text-gray-600">Últimas 24 horas</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilidades</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityMetrics.vulnerabilities.critical + securityMetrics.vulnerabilities.high}
            </div>
            <div className="text-xs text-gray-600">Críticas y altas</div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Audit Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle>Seguridad y Auditoría</CardTitle>
          <CardDescription>Monitoreo de seguridad, logs de auditoría y cumplimiento normativo</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="audit-logs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="audit-logs">Logs de Auditoría</TabsTrigger>
              <TabsTrigger value="threats">Inteligencia de Amenazas</TabsTrigger>
              <TabsTrigger value="policies">Políticas de Seguridad</TabsTrigger>
              <TabsTrigger value="compliance">Cumplimiento</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoreo en Tiempo Real</TabsTrigger>
            </TabsList>

            {/* Audit Logs */}
            <TabsContent value="audit-logs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Logs de Auditoría</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar en logs..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterRisk} onValueChange={setFilterRisk}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los riesgos</SelectItem>
                      <SelectItem value="critical">Crítico</SelectItem>
                      <SelectItem value="high">Alto</SelectItem>
                      <SelectItem value="medium">Medio</SelectItem>
                      <SelectItem value="low">Bajo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterAction} onValueChange={setFilterAction}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las acciones</SelectItem>
                      <SelectItem value="user_login">Login</SelectItem>
                      <SelectItem value="failed_login">Login fallido</SelectItem>
                      <SelectItem value="course_update">Actualización</SelectItem>
                      <SelectItem value="payment_processed">Pago</SelectItem>
                      <SelectItem value="suspicious_activity">Actividad sospechosa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              <Card className="border border-gray-200">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {filteredLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-1">{getActionIcon(log.action)}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{log.user}</span>
                                <span className="text-xs text-gray-500">
                                  {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss")}
                                </span>
                                {getRiskBadge(log.risk)}
                                {getStatusBadge(log.status)}
                              </div>
                              <p className="text-sm text-gray-900 mb-1 capitalize">
                                {log.action.replace("_", " ")} - {log.resource}
                              </p>
                              <p className="text-xs text-gray-600 mb-2">{log.details}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  {log.ip}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {log.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  {log.userAgent.includes("Mobile") || log.userAgent.includes("iPhone") ? (
                                    <Smartphone className="h-3 w-3" />
                                  ) : (
                                    <Monitor className="h-3 w-3" />
                                  )}
                                  {log.userAgent.includes("Mobile") ? "Mobile" : "Desktop"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedLog(log)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Detalles del Log de Auditoría</DialogTitle>
                                <DialogDescription>Información completa del evento de seguridad</DialogDescription>
                              </DialogHeader>
                              {selectedLog && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Usuario</Label>
                                      <p className="text-sm">{selectedLog.user}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Acción</Label>
                                      <p className="text-sm capitalize">{selectedLog.action.replace("_", " ")}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Recurso</Label>
                                      <p className="text-sm">{selectedLog.resource}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Estado</Label>
                                      <div className="mt-1">{getStatusBadge(selectedLog.status)}</div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Nivel de Riesgo</Label>
                                      <div className="mt-1">{getRiskBadge(selectedLog.risk)}</div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Timestamp</Label>
                                      <p className="text-sm">
                                        {format(new Date(selectedLog.timestamp), "dd/MM/yyyy HH:mm:ss")}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Dirección IP</Label>
                                      <p className="text-sm font-mono">{selectedLog.ip}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Ubicación</Label>
                                      <p className="text-sm">{selectedLog.location}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">User Agent</Label>
                                    <p className="text-xs font-mono bg-gray-100 p-2 rounded mt-1">
                                      {selectedLog.userAgent}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Detalles</Label>
                                    <p className="text-sm mt-1">{selectedLog.details}</p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Threat Intelligence */}
            <TabsContent value="threats" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Inteligencia de Amenazas</h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar Feeds
                </Button>
              </div>

              <div className="space-y-4">
                {threatIntelligence.map((threat) => (
                  <Card key={threat.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold capitalize">{threat.type.replace("_", " ")}</h4>
                            {getRiskBadge(threat.severity)}
                            {threat.blocked ? (
                              <Badge className="bg-red-100 text-red-800">Bloqueado</Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800">Monitoreando</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{threat.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">IP de origen:</span>
                              <div className="font-mono">{threat.source}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">País:</span>
                              <div className="font-medium">{threat.country}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Intentos:</span>
                              <div className="font-medium">{threat.attempts}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Duración:</span>
                              <div className="font-medium">
                                {format(new Date(threat.firstSeen), "HH:mm")} -{" "}
                                {format(new Date(threat.lastSeen), "HH:mm")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Ban className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Security Policies */}
            <TabsContent value="policies" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Políticas de Seguridad</h3>
                <Button size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Nueva Política
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityPolicies.map((policy) => (
                  <Card key={policy.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{policy.name}</h4>
                          <p className="text-sm text-gray-600">{policy.description}</p>
                        </div>
                        <div className="flex items-center gap-2">{getStatusBadge(policy.status)}</div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <span className="text-sm font-medium text-gray-700">Reglas configuradas:</span>
                        <ul className="space-y-1">
                          {policy.rules.map((rule, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                        <span>Última actualización: {format(new Date(policy.lastUpdated), "dd/MM/yyyy")}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Compliance */}
            <TabsContent value="compliance" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Estado de Cumplimiento</h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Ejecutar Auditoría
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(complianceStatus).map(([standard, data]) => (
                  <Card key={standard} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg uppercase">{standard.replace("_", "-")}</h4>
                          <p className="text-sm text-gray-600">
                            {standard === "gdpr" && "Reglamento General de Protección de Datos"}
                            {standard === "iso27001" && "Gestión de Seguridad de la Información"}
                            {standard === "pci_dss" && "Estándar de Seguridad de Datos"}
                            {standard === "lopd" && "Ley Orgánica de Protección de Datos"}
                          </p>
                        </div>
                        {getStatusBadge(data.status)}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Puntuación de cumplimiento</span>
                            <span>{data.score}%</span>
                          </div>
                          <Progress value={data.score} className="h-2" />
                        </div>

                        <div className="text-sm text-gray-600">
                          <span>Última auditoría: </span>
                          <span className="font-medium">{format(new Date(data.lastAudit), "dd/MM/yyyy")}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Ver Reporte
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Todas las normativas están en cumplimiento. La próxima auditoría programada está prevista para el 15
                  de abril de 2024.
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Real-time Monitoring */}
            <TabsContent value="monitoring" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Monitoreo en Tiempo Real</h3>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                    En línea
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Alertas
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* System Health */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-blue-600" />
                      Estado del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memoria</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Disco</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Red</span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Active Connections */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-green-600" />
                      Conexiones Activas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">1,247</div>
                      <div className="text-sm text-gray-600">Usuarios conectados</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Estudiantes</span>
                        <span>1,156</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Instructores</span>
                        <span>78</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Administradores</span>
                        <span>13</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Alerts */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      Alertas de Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-900">Crítico</span>
                      </div>
                      <p className="text-xs text-red-700">Intento de SQL injection detectado</p>
                      <p className="text-xs text-red-600">Hace 5 minutos</p>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-900">Advertencia</span>
                      </div>
                      <p className="text-xs text-yellow-700">Múltiples intentos de login fallidos</p>
                      <p className="text-xs text-yellow-600">Hace 12 minutos</p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Info</span>
                      </div>
                      <p className="text-xs text-blue-700">Backup automático completado</p>
                      <p className="text-xs text-blue-600">Hace 1 hora</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
