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
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  FileText,
  CalendarIcon,
  Clock,
  Send,
  Download,
  Eye,
  Settings,
  Plus,
  Edit,
  Play,
  Pause,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Mock data for reports
const scheduledReports = [
  {
    id: 1,
    name: "Reporte Semanal de Ventas",
    description: "Análisis completo de ventas, inscripciones y ingresos semanales",
    frequency: "weekly",
    nextRun: "2024-03-18 09:00:00",
    lastRun: "2024-03-11 09:00:00",
    status: "active",
    recipients: ["admin@electricosespecializados.com", "ventas@electricosespecializados.com"],
    format: "pdf",
    template: "sales-weekly",
    metrics: ["revenue", "enrollments", "completion_rate", "user_growth"],
    filters: {
      dateRange: "last_7_days",
      courses: "all",
      userType: "all",
    },
  },
  {
    id: 2,
    name: "Dashboard Mensual Ejecutivo",
    description: "Resumen ejecutivo mensual con KPIs principales y tendencias",
    frequency: "monthly",
    nextRun: "2024-04-01 08:00:00",
    lastRun: "2024-03-01 08:00:00",
    status: "active",
    recipients: ["ceo@electricosespecializados.com", "cfo@electricosespecializados.com"],
    format: "pdf",
    template: "executive-monthly",
    metrics: ["revenue", "profit_margin", "user_growth", "course_performance", "market_share"],
    filters: {
      dateRange: "last_30_days",
      courses: "all",
      userType: "all",
    },
  },
  {
    id: 3,
    name: "Análisis de Rendimiento de Cursos",
    description: "Evaluación detallada del rendimiento de cada curso",
    frequency: "bi-weekly",
    nextRun: "2024-03-25 10:00:00",
    lastRun: "2024-03-11 10:00:00",
    status: "active",
    recipients: ["educacion@electricosespecializados.com"],
    format: "excel",
    template: "course-performance",
    metrics: ["completion_rate", "student_satisfaction", "engagement_time", "quiz_scores"],
    filters: {
      dateRange: "last_14_days",
      courses: "all",
      userType: "students",
    },
  },
  {
    id: 4,
    name: "Reporte de Usuarios Inactivos",
    description: "Identificación de usuarios con baja actividad para campañas de reactivación",
    frequency: "weekly",
    nextRun: "2024-03-15 14:00:00",
    lastRun: "2024-03-08 14:00:00",
    status: "paused",
    recipients: ["marketing@electricosespecializados.com"],
    format: "csv",
    template: "inactive-users",
    metrics: ["last_login", "course_progress", "engagement_score"],
    filters: {
      dateRange: "last_30_days",
      courses: "all",
      userType: "inactive",
    },
  },
]

const reportTemplates = [
  {
    id: "sales-weekly",
    name: "Ventas Semanal",
    description: "Reporte completo de ventas e ingresos",
    category: "financial",
    metrics: ["revenue", "enrollments", "conversion_rate", "avg_order_value"],
    charts: ["line", "bar", "pie"],
    sections: ["summary", "trends", "top_courses", "geographic_breakdown"],
  },
  {
    id: "executive-monthly",
    name: "Ejecutivo Mensual",
    description: "Dashboard ejecutivo con KPIs principales",
    category: "executive",
    metrics: ["revenue", "profit_margin", "user_growth", "course_performance"],
    charts: ["line", "bar", "gauge", "heatmap"],
    sections: ["executive_summary", "financial_overview", "growth_metrics", "recommendations"],
  },
  {
    id: "course-performance",
    name: "Rendimiento de Cursos",
    description: "Análisis detallado de cada curso",
    category: "educational",
    metrics: ["completion_rate", "student_satisfaction", "engagement_time", "quiz_scores"],
    charts: ["bar", "line", "scatter", "box"],
    sections: ["course_overview", "student_progress", "content_analysis", "improvement_suggestions"],
  },
  {
    id: "user-engagement",
    name: "Engagement de Usuarios",
    description: "Análisis de comportamiento y engagement",
    category: "user_analytics",
    metrics: ["session_duration", "page_views", "feature_usage", "retention_rate"],
    charts: ["line", "heatmap", "funnel", "cohort"],
    sections: ["engagement_overview", "user_journey", "feature_adoption", "churn_analysis"],
  },
]

const reportHistory = [
  {
    id: 1,
    name: "Reporte Semanal de Ventas",
    generatedAt: "2024-03-11 09:15:23",
    status: "completed",
    fileSize: "2.4 MB",
    format: "pdf",
    downloadUrl: "/reports/sales-weekly-2024-03-11.pdf",
    recipients: 2,
    executionTime: "45s",
  },
  {
    id: 2,
    name: "Dashboard Mensual Ejecutivo",
    generatedAt: "2024-03-01 08:12:45",
    status: "completed",
    fileSize: "5.1 MB",
    format: "pdf",
    downloadUrl: "/reports/executive-monthly-2024-03-01.pdf",
    recipients: 2,
    executionTime: "1m 23s",
  },
  {
    id: 3,
    name: "Análisis de Rendimiento de Cursos",
    generatedAt: "2024-03-11 10:08:12",
    status: "completed",
    fileSize: "8.7 MB",
    format: "excel",
    downloadUrl: "/reports/course-performance-2024-03-11.xlsx",
    recipients: 1,
    executionTime: "2m 15s",
  },
  {
    id: 4,
    name: "Reporte de Usuarios Inactivos",
    generatedAt: "2024-03-08 14:05:33",
    status: "failed",
    error: "Database connection timeout",
    recipients: 0,
    executionTime: "timeout",
  },
]

export function AutomatedReporting() {
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [isCreatingReport, setIsCreatingReport] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [generatingReport, setGeneratingReport] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Pausado</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completado</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Diario"
      case "weekly":
        return "Semanal"
      case "bi-weekly":
        return "Quincenal"
      case "monthly":
        return "Mensual"
      case "quarterly":
        return "Trimestral"
      default:
        return frequency
    }
  }

  const generateReport = async (reportId: number) => {
    setGeneratingReport(reportId)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setGeneratingReport(null)
  }

  return (
    <div className="space-y-6">
      {/* Reporting Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Activos</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledReports.filter((r) => r.status === "active").length}</div>
            <div className="text-xs text-gray-600">de {scheduledReports.length} configurados</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Generados</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="text-xs text-gray-600">Este mes</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Reporte</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h 15m</div>
            <div className="text-xs text-gray-600">Ventas Semanal</div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <div className="text-xs text-gray-600">Últimos 30 días</div>
          </CardContent>
        </Card>
      </div>

      {/* Automated Reporting Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle>Sistema de Reportes Automatizados</CardTitle>
          <CardDescription>Genera y programa reportes automáticos con análisis avanzados</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scheduled" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="scheduled">Reportes Programados</TabsTrigger>
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="insights">Insights Automáticos</TabsTrigger>
            </TabsList>

            {/* Scheduled Reports */}
            <TabsContent value="scheduled" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Reportes Programados</h3>
                <Dialog open={isCreatingReport} onOpenChange={setIsCreatingReport}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Reporte
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Reporte Automatizado</DialogTitle>
                      <DialogDescription>
                        Configura un reporte que se genere automáticamente según tu programación
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="report-name">Nombre del Reporte</Label>
                          <Input id="report-name" placeholder="Ej: Reporte Mensual de Ventas" />
                        </div>
                        <div>
                          <Label htmlFor="report-description">Descripción</Label>
                          <Textarea id="report-description" placeholder="Describe el propósito del reporte..." />
                        </div>
                        <div>
                          <Label htmlFor="report-template">Plantilla</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una plantilla" />
                            </SelectTrigger>
                            <SelectContent>
                              {reportTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name} - {template.description}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="report-frequency">Frecuencia</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Con qué frecuencia?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Diario</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                              <SelectItem value="bi-weekly">Quincenal</SelectItem>
                              <SelectItem value="monthly">Mensual</SelectItem>
                              <SelectItem value="quarterly">Trimestral</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="report-format">Formato</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Formato de salida" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="html">HTML</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Métricas a Incluir</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "revenue",
                              "enrollments",
                              "completion_rate",
                              "user_growth",
                              "engagement",
                              "satisfaction",
                            ].map((metric) => (
                              <div key={metric} className="flex items-center space-x-2">
                                <Checkbox id={metric} />
                                <Label htmlFor={metric} className="text-sm capitalize">
                                  {metric.replace("_", " ")}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="recipients">Destinatarios</Label>
                          <Textarea
                            id="recipients"
                            placeholder="admin@example.com, manager@example.com"
                            className="h-20"
                          />
                        </div>
                        <div>
                          <Label>Fecha de Inicio</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Selecciona una fecha"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="auto-send" defaultChecked />
                          <Label htmlFor="auto-send">Enviar automáticamente por email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="slack-notify" />
                          <Label htmlFor="slack-notify">Notificar en Slack</Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button className="flex-1">Crear Reporte</Button>
                      <Button variant="outline" onClick={() => setIsCreatingReport(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <Card key={report.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{report.name}</h4>
                            {getStatusBadge(report.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Frecuencia:</span>
                              <div className="font-medium">{getFrequencyText(report.frequency)}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Próxima ejecución:</span>
                              <div className="font-medium">{format(new Date(report.nextRun), "dd/MM/yyyy HH:mm")}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Última ejecución:</span>
                              <div className="font-medium">{format(new Date(report.lastRun), "dd/MM/yyyy HH:mm")}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Destinatarios:</span>
                              <div className="font-medium">{report.recipients.length} personas</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {report.metrics.map((metric, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {metric.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generateReport(report.id)}
                            disabled={generatingReport === report.id}
                          >
                            {generatingReport === report.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                          {report.status === "active" ? (
                            <Button size="sm" variant="outline">
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Report Templates */}
            <TabsContent value="templates" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Plantillas de Reportes</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Plantilla
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {template.category.replace("_", " ")}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Métricas incluidas:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {template.metrics.map((metric, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {metric.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-gray-700">Tipos de gráficos:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {template.charts.map((chart, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {chart}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-medium text-gray-700">Secciones:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {template.sections.map((section, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {section.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          Vista Previa
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Report History */}
            <TabsContent value="history" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Historial de Reportes</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Buscar reportes..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>

              <Card className="border border-gray-200">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {reportHistory.map((report) => (
                      <div key={report.id} className="p-6 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{report.name}</h4>
                              {getStatusBadge(report.status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span>Generado:</span>
                                <div className="font-medium text-gray-900">
                                  {format(new Date(report.generatedAt), "dd/MM/yyyy HH:mm")}
                                </div>
                              </div>
                              <div>
                                <span>Formato:</span>
                                <div className="font-medium text-gray-900 uppercase">{report.format}</div>
                              </div>
                              <div>
                                <span>Tamaño:</span>
                                <div className="font-medium text-gray-900">{report.fileSize || "N/A"}</div>
                              </div>
                              <div>
                                <span>Tiempo de ejecución:</span>
                                <div className="font-medium text-gray-900">{report.executionTime}</div>
                              </div>
                            </div>
                            {report.status === "failed" && report.error && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                <AlertCircle className="h-4 w-4 inline mr-1" />
                                Error: {report.error}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            {report.status === "completed" && (
                              <>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Send className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {report.status === "failed" && (
                              <Button size="sm" variant="outline">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Automated Insights */}
            <TabsContent value="insights" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Insights Automáticos</h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar Insights
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Performance Insights */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Insights de Rendimiento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900">Crecimiento Excepcional</h4>
                          <p className="text-sm text-green-700">
                            Las inscripciones han aumentado un 34% esta semana comparado con la semana anterior. El
                            curso "Instalaciones Eléctricas Residenciales" lidera con 89 nuevas inscripciones.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Patrón de Engagement</h4>
                          <p className="text-sm text-blue-700">
                            Los usuarios son más activos los martes y miércoles entre 19:00-21:00. Considera programar
                            contenido nuevo en estos horarios.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-purple-900">Retención Mejorada</h4>
                          <p className="text-sm text-purple-700">
                            La tasa de finalización de cursos ha mejorado un 12% tras la implementación de recordatorios
                            automáticos y gamificación.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Insights */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Insights Financieros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-900">Oportunidad de Ingresos</h4>
                          <p className="text-sm text-yellow-700">
                            El 23% de usuarios gratuitos han completado más del 80% de un curso. Considera una campaña
                            de conversión dirigida a este segmento.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900">Ingresos Recurrentes</h4>
                          <p className="text-sm text-green-700">
                            Los ingresos por suscripciones mensuales han crecido un 28% este trimestre. El plan Premium
                            tiene la mayor tasa de renovación (94%).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-900">Riesgo de Churn</h4>
                          <p className="text-sm text-red-700">
                            47 usuarios premium no han accedido en los últimos 14 días. Se recomienda una campaña de
                            reactivación inmediata.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Insights */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      Insights de Contenido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Contenido Popular</h4>
                          <p className="text-sm text-blue-700">
                            Los videos de "Seguridad Eléctrica" tienen un 95% de finalización. Considera crear más
                            contenido similar o expandir este tema.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-orange-900">Contenido con Bajo Engagement</h4>
                          <p className="text-sm text-orange-700">
                            El módulo "Cálculos Avanzados" tiene una tasa de abandono del 67%. Considera dividirlo en
                            secciones más pequeñas o agregar ejemplos prácticos.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900">Feedback Positivo</h4>
                          <p className="text-sm text-green-700">
                            Los ejercicios prácticos reciben una calificación promedio de 4.8/5. Los estudiantes valoran
                            especialmente los casos reales de instalaciones.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Predictive Insights */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      Insights Predictivos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <BarChart3 className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-purple-900">Proyección de Crecimiento</h4>
                          <p className="text-sm text-purple-700">
                            Basado en las tendencias actuales, se proyecta alcanzar 2,500 estudiantes activos para
                            finales del próximo trimestre (+45% vs. actual).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-indigo-900">Demanda de Cursos</h4>
                          <p className="text-sm text-indigo-700">
                            El análisis de búsquedas sugiere alta demanda para cursos de "Energías Renovables" y
                            "Domótica". Considera desarrollar contenido en estas áreas.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-teal-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-teal-900">Optimización de Precios</h4>
                          <p className="text-sm text-teal-700">
                            El análisis de elasticidad sugiere que un aumento del 15% en el plan Premium podría
                            incrementar los ingresos en un 22% con mínimo impacto en conversiones.
                          </p>
                        </div>
                      </div>
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
