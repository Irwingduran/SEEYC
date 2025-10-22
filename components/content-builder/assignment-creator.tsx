"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, FileText, Calendar, Clock, Upload, CheckCircle, AlertCircle } from "lucide-react"

interface Assignment {
  id: string
  title: string
  description: string
  instructions: string
  type: "essay" | "project" | "practical" | "report"
  dueDate?: string
  maxPoints: number
  allowLateSubmission: boolean
  attachments: string[]
  rubric?: {
    criteria: string
    points: number
  }[]
}

interface AssignmentCreatorProps {
  assignments: Assignment[]
  onUpdate: (assignments: Assignment[]) => void
}

export function AssignmentCreator({ assignments, onUpdate }: AssignmentCreatorProps) {
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    instructions: "",
    type: "project" as const,
    dueDate: "",
    maxPoints: 100,
    allowLateSubmission: true,
    attachments: [],
    rubric: [],
  })

  const createAssignment = () => {
    const assignment: Assignment = {
      id: Date.now().toString(),
      ...newAssignment,
    }
    onUpdate([...assignments, assignment])
    setNewAssignment({
      title: "",
      description: "",
      instructions: "",
      type: "project",
      dueDate: "",
      maxPoints: 100,
      allowLateSubmission: true,
      attachments: [],
      rubric: [],
    })
    setIsCreatingAssignment(false)
  }

  const deleteAssignment = (assignmentId: string) => {
    onUpdate(assignments.filter((assignment) => assignment.id !== assignmentId))
    if (editingAssignment?.id === assignmentId) {
      setEditingAssignment(null)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "essay":
        return <Edit className="w-4 h-4" />
      case "project":
        return <FileText className="w-4 h-4" />
      case "practical":
        return <CheckCircle className="w-4 h-4" />
      case "report":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "essay":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "project":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "practical":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "report":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "essay":
        return "Ensayo"
      case "project":
        return "Proyecto"
      case "practical":
        return "Práctica"
      case "report":
        return "Reporte"
      default:
        return "Tarea"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Creador de Tareas</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Diseña tareas y proyectos para evaluar el aprendizaje práctico
          </p>
        </div>
        <Dialog open={isCreatingAssignment} onOpenChange={setIsCreatingAssignment}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Crear Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm max-w-3xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="assignment-title">Título de la Tarea</Label>
                <Input
                  id="assignment-title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Diseño de Instalación Eléctrica Residencial"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignment-description">Descripción</Label>
                <Textarea
                  id="assignment-description"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Breve descripción de la tarea..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignment-instructions">Instrucciones Detalladas</Label>
                <Textarea
                  id="assignment-instructions"
                  value={newAssignment.instructions}
                  onChange={(e) => setNewAssignment((prev) => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Instrucciones paso a paso para completar la tarea..."
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Tarea</Label>
                  <Select
                    value={newAssignment.type}
                    onValueChange={(value: any) => setNewAssignment((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="essay">Ensayo</SelectItem>
                      <SelectItem value="project">Proyecto</SelectItem>
                      <SelectItem value="practical">Práctica</SelectItem>
                      <SelectItem value="report">Reporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-points">Puntuación Máxima</Label>
                  <Input
                    id="max-points"
                    type="number"
                    value={newAssignment.maxPoints}
                    onChange={(e) =>
                      setNewAssignment((prev) => ({ ...prev, maxPoints: Number.parseInt(e.target.value) || 100 }))
                    }
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date">Fecha de Entrega (Opcional)</Label>
                <Input
                  id="due-date"
                  type="datetime-local"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment((prev) => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Permitir Entregas Tardías</Label>
                  <p className="text-xs text-gray-500">Los estudiantes pueden entregar después de la fecha límite</p>
                </div>
                <Switch
                  checked={newAssignment.allowLateSubmission}
                  onCheckedChange={(checked) => setNewAssignment((prev) => ({ ...prev, allowLateSubmission: checked }))}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingAssignment(false)}>
                  Cancelar
                </Button>
                <Button onClick={createAssignment} disabled={!newAssignment.title}>
                  Crear Tarea
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignments List */}
        <div className="lg:col-span-1">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Mis Tareas ({assignments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">No hay tareas aún</p>
                  <Button
                    onClick={() => setIsCreatingAssignment(true)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Crear Primera Tarea
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        editingAssignment?.id === assignment.id
                          ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setEditingAssignment(assignment)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">{assignment.title}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteAssignment(assignment.id)
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge className={getTypeColor(assignment.type)}>
                          {getTypeIcon(assignment.type)}
                          <span className="ml-1">{getTypeName(assignment.type)}</span>
                        </Badge>
                        <Badge variant="secondary">{assignment.maxPoints} pts</Badge>
                        {assignment.dueDate && (
                          <Badge variant="secondary" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Assignment Details */}
        <div className="lg:col-span-2">
          {!editingAssignment ? (
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Selecciona una Tarea para Ver Detalles
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Elige una tarea de la lista o crea una nueva para comenzar
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Assignment Header */}
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{editingAssignment.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{editingAssignment.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(editingAssignment.type)}>
                        {getTypeIcon(editingAssignment.type)}
                        <span className="ml-1">{getTypeName(editingAssignment.type)}</span>
                      </Badge>
                      <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {editingAssignment.maxPoints} puntos
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {editingAssignment.dueDate
                          ? `Vence: ${new Date(editingAssignment.dueDate).toLocaleString()}`
                          : "Sin fecha límite"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>
                        {editingAssignment.allowLateSubmission
                          ? "Entregas tardías permitidas"
                          : "No se permiten entregas tardías"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Upload className="w-4 h-4" />
                      <span>{editingAssignment.attachments.length} archivos adjuntos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Instrucciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {editingAssignment.instructions || "No hay instrucciones específicas."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Assignment Templates */}
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Plantillas de Tareas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        Proyecto de Instalación
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Plantilla para proyectos de instalaciones eléctricas
                      </p>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Usar Plantilla
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Edit className="w-4 h-4 text-blue-600" />
                        Reporte de Análisis
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Plantilla para reportes de análisis técnico
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Usar Plantilla
                      </Button>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Práctica de Laboratorio
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Plantilla para prácticas de laboratorio
                      </p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Usar Plantilla
                      </Button>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        Análisis de Seguridad
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Plantilla para análisis de seguridad eléctrica
                      </p>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Usar Plantilla
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rubric Builder */}
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Rúbrica de Evaluación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Define los criterios de evaluación para esta tarea
                    </p>

                    <div className="space-y-3">
                      {[
                        { criteria: "Comprensión del tema", points: 25 },
                        { criteria: "Aplicación práctica", points: 30 },
                        { criteria: "Calidad técnica", points: 25 },
                        { criteria: "Presentación y documentación", points: 20 },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{item.criteria}</span>
                          <Badge variant="secondary">{item.points} puntos</Badge>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Personalizar Rúbrica
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
