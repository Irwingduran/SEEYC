"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Target,
  Brain,
  Zap,
  AlertCircle,
  CheckCircle,
  Download,
} from "lucide-react"

// Advanced analytics mock data
const predictiveData = [
  { month: "Abr", predicted: 320000, actual: 284750, confidence: 85 },
  { month: "May", predicted: 365000, actual: null, confidence: 82 },
  { month: "Jun", predicted: 410000, actual: null, confidence: 78 },
  { month: "Jul", predicted: 445000, actual: null, confidence: 75 },
]

const learningPathAnalytics = [
  { path: "Electricista Residencial", completionRate: 78, avgTime: 45, students: 2340 },
  { path: "Técnico Industrial", completionRate: 65, avgTime: 62, students: 1890 },
  { path: "Especialista en Motores", completionRate: 82, avgTime: 38, students: 1560 },
  { path: "Automatización", completionRate: 71, avgTime: 55, students: 980 },
]

const engagementMetrics = [
  { metric: "Tiempo Promedio por Sesión", value: "42 min", change: 8.5, trend: "up" },
  { metric: "Tasa de Finalización", value: "73.2%", change: -2.1, trend: "down" },
  { metric: "Interacciones por Curso", value: "156", change: 12.3, trend: "up" },
  { metric: "Retención a 30 días", value: "84.7%", change: 5.2, trend: "up" },
]

const cohortAnalysis = [
  { cohort: "Ene 2024", month1: 100, month2: 85, month3: 72, month4: 65 },
  { cohort: "Feb 2024", month1: 100, month2: 88, month3: 76, month4: null },
  { cohort: "Mar 2024", month1: 100, month2: 91, month3: null, month4: null },
]

const performanceByRegion = [
  { region: "CDMX", students: 4250, revenue: 89500, avgRating: 4.7, growth: 15.2 },
  { region: "Guadalajara", students: 2890, revenue: 62300, avgRating: 4.6, growth: 12.8 },
  { region: "Monterrey", students: 2340, revenue: 51200, avgRating: 4.8, growth: 18.5 },
  { region: "Puebla", students: 1890, revenue: 41800, avgRating: 4.5, growth: 9.3 },
  { region: "Tijuana", students: 1560, revenue: 34900, avgRating: 4.6, growth: 14.7 },
]

const skillsRadarData = [
  { skill: "Instalaciones", current: 78, target: 85 },
  { skill: "Motores", current: 65, target: 75 },
  { skill: "Protecciones", current: 82, target: 88 },
  { skill: "Automatización", current: 71, target: 80 },
  { skill: "Renovables", current: 45, target: 65 },
  { skill: "Seguridad", current: 89, target: 92 },
]

const riskFactors = [
  {
    factor: "Alta tasa de abandono en Automatización",
    severity: "high",
    impact: "Pérdida potencial de $45,000 MXN/mes",
    recommendation: "Revisar contenido y agregar más práctica",
  },
  {
    factor: "Baja participación en foros",
    severity: "medium",
    impact: "Reducción en satisfacción del estudiante",
    recommendation: "Implementar gamificación en discusiones",
  },
  {
    factor: "Concentración geográfica alta",
    severity: "medium",
    impact: "Dependencia excesiva de mercados específicos",
    recommendation: "Expandir marketing a nuevas regiones",
  },
]

export function AdvancedAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Alto Riesgo</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Riesgo Medio</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Bajo Riesgo</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Advanced Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engagementMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/70 backdrop-blur-sm border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(metric.change)}% vs mes anterior
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Analytics Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Análisis Avanzado</CardTitle>
              <CardDescription>Insights profundos y análisis predictivo</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Últimos 3 meses</SelectItem>
                  <SelectItem value="6months">Últimos 6 meses</SelectItem>
                  <SelectItem value="12months">Último año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="predictive" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="predictive">Análisis Predictivo</TabsTrigger>
              <TabsTrigger value="cohort">Análisis de Cohortes</TabsTrigger>
              <TabsTrigger value="learning">Rutas de Aprendizaje</TabsTrigger>
              <TabsTrigger value="geographic">Análisis Geográfico</TabsTrigger>
              <TabsTrigger value="risk">Gestión de Riesgos</TabsTrigger>
            </TabsList>

            {/* Predictive Analytics */}
            <TabsContent value="predictive" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      Predicción de Ingresos
                    </CardTitle>
                    <CardDescription>Proyección basada en IA para los próximos 4 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={predictiveData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="actual"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          name="Ingresos Reales"
                          connectNulls={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="predicted"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Predicción"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {predictiveData.slice(1).map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.month} 2024:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">${item.predicted.toLocaleString()} MXN</span>
                            <Badge variant="outline" className="text-xs">
                              {item.confidence}% confianza
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Análisis de Competencias
                    </CardTitle>
                    <CardDescription>Progreso vs objetivos por área de conocimiento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={skillsRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Actual"
                          dataKey="current"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="Objetivo"
                          dataKey="target"
                          stroke="#3b82f6"
                          fill="transparent"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Cohort Analysis */}
            <TabsContent value="cohort" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Análisis de Retención por Cohortes
                  </CardTitle>
                  <CardDescription>Retención de estudiantes por mes de registro</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cohortAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="cohort" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="month1" stroke="#10b981" strokeWidth={2} name="Mes 1" />
                      <Line type="monotone" dataKey="month2" stroke="#3b82f6" strokeWidth={2} name="Mes 2" />
                      <Line type="monotone" dataKey="month3" stroke="#8b5cf6" strokeWidth={2} name="Mes 3" />
                      <Line type="monotone" dataKey="month4" stroke="#f59e0b" strokeWidth={2} name="Mes 4" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-600">Mes 1</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">88%</div>
                      <div className="text-sm text-gray-600">Mes 2</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">74%</div>
                      <div className="text-sm text-gray-600">Mes 3</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">65%</div>
                      <div className="text-sm text-gray-600">Mes 4</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Learning Path Analytics */}
            <TabsContent value="learning" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                    Análisis de Rutas de Aprendizaje
                  </CardTitle>
                  <CardDescription>Rendimiento y eficiencia por programa educativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {learningPathAnalytics.map((path, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{path.path}</h4>
                            <p className="text-sm text-gray-600">{path.students.toLocaleString()} estudiantes</p>
                          </div>
                          <Badge
                            className={
                              path.completionRate >= 80
                                ? "bg-green-100 text-green-800"
                                : path.completionRate >= 70
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {path.completionRate}% completado
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Tasa de Finalización:</span>
                            <div className="font-semibold">{path.completionRate}%</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Tiempo Promedio:</span>
                            <div className="font-semibold">{path.avgTime} días</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Estudiantes Activos:</span>
                            <div className="font-semibold">{path.students.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${path.completionRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Geographic Analysis */}
            <TabsContent value="geographic" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-cyan-600" />
                    Rendimiento por Región
                  </CardTitle>
                  <CardDescription>Análisis de mercado y oportunidades geográficas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceByRegion}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="region" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="students" fill="#8b5cf6" name="Estudiantes" />
                      </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart data={performanceByRegion}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="students" name="Estudiantes" stroke="#64748b" />
                        <YAxis dataKey="revenue" name="Ingresos" stroke="#64748b" />
                        <Tooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Scatter dataKey="revenue" fill="#3b82f6" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 space-y-3">
                    {performanceByRegion.map((region, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full" />
                          <span className="font-medium">{region.region}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-gray-600">Estudiantes: </span>
                            <span className="font-medium">{region.students.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Ingresos: </span>
                            <span className="font-medium">${region.revenue.toLocaleString()} MXN</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Rating: </span>
                            <span className="font-medium">⭐ {region.avgRating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-green-600 font-medium">+{region.growth}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Risk Management */}
            <TabsContent value="risk" className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Gestión de Riesgos
                  </CardTitle>
                  <CardDescription>Identificación y mitigación de riesgos operacionales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskFactors.map((risk, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{risk.factor}</h4>
                              {getSeverityBadge(risk.severity)}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Impacto:</strong> {risk.impact}
                            </p>
                            <p className="text-sm text-blue-600">
                              <strong>Recomendación:</strong> {risk.recommendation}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline">
                              Revisar
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Implementar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Factores de Éxito</h4>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Alta satisfacción del estudiante (4.7/5 promedio)</li>
                      <li>• Crecimiento constante en todas las regiones</li>
                      <li>• Diversificación exitosa de contenido</li>
                      <li>• Retención superior al promedio de la industria</li>
                    </ul>
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
