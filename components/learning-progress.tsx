"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Calendar, Clock } from "lucide-react"

const weeklyProgress = [
  { day: "Lun", hours: 2.5, lessons: 3 },
  { day: "Mar", hours: 1.8, lessons: 2 },
  { day: "Mié", hours: 3.2, lessons: 4 },
  { day: "Jue", hours: 0, lessons: 0 },
  { day: "Vie", hours: 2.1, lessons: 2 },
  { day: "Sáb", hours: 4.5, lessons: 6 },
  { day: "Dom", hours: 1.2, lessons: 1 },
]

const monthlyProgress = [
  { month: "Sep", completed: 2, started: 1 },
  { month: "Oct", completed: 1, started: 2 },
  { month: "Nov", completed: 0, started: 1 },
  { month: "Dic", completed: 1, started: 0 },
]

const skillProgress = [
  { skill: "Instalaciones Residenciales", progress: 85, level: "Avanzado" },
  { skill: "Seguridad Eléctrica", progress: 65, level: "Intermedio" },
  { skill: "Automatización Industrial", progress: 25, level: "Principiante" },
  { skill: "Energías Renovables", progress: 0, level: "No iniciado" },
]

export function LearningProgress() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Weekly Activity */}
      <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Actividad Semanal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">15.3h</p>
              <p className="text-sm text-muted-foreground">Esta semana</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">18</p>
              <p className="text-sm text-muted-foreground">Lecciones completadas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Tendencia Mensual</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="started"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm">Completados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm">Iniciados</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Progress */}
      <Card className="lg:col-span-2 border-0 bg-card/60 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Progreso por Habilidades</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {skillProgress.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{skill.skill}</h4>
                <Badge
                  variant={
                    skill.level === "Avanzado"
                      ? "default"
                      : skill.level === "Intermedio"
                        ? "secondary"
                        : skill.level === "Principiante"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {skill.level}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progreso</span>
                  <span className="font-medium">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
