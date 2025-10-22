"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Type,
  AlignLeft,
  List,
  CheckSquare,
  Circle,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FormField {
  id: number
  type: "text" | "textarea" | "select" | "checkbox" | "radio"
  label: string
  placeholder: string
  required: boolean
  options: string[] // Para select, checkbox, radio
  order: number
}

interface FormBuilderProps {
  content: {
    title: string
    description: string
    fields: FormField[]
    submitButtonText: string
  }
  onChange: (content: any) => void
}

export function FormBuilder({ content, onChange }: FormBuilderProps) {
  const [title, setTitle] = useState(content?.title || "")
  const [description, setDescription] = useState(content?.description || "")
  const [submitButtonText, setSubmitButtonText] = useState(
    content?.submitButtonText || "Enviar"
  )
  const [fields, setFields] = useState<FormField[]>(
    content?.fields || [
      {
        id: 1,
        type: "text",
        label: "",
        placeholder: "",
        required: false,
        options: [],
        order: 0,
      },
    ]
  )

  const fieldTypes = [
    { value: "text", label: "Texto Corto", icon: Type },
    { value: "textarea", label: "Texto Largo", icon: AlignLeft },
    { value: "select", label: "Selección", icon: List },
    { value: "checkbox", label: "Casillas", icon: CheckSquare },
    { value: "radio", label: "Opción Única", icon: Circle },
  ]

  const updateContent = (updatedFields?: FormField[]) => {
    const newFields = updatedFields || fields
    onChange({
      title,
      description,
      fields: newFields,
      submitButtonText,
    })
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    onChange({ title: value, description, fields, submitButtonText })
  }

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    onChange({ title, description: value, fields, submitButtonText })
  }

  const handleSubmitButtonTextChange = (value: string) => {
    setSubmitButtonText(value)
    onChange({ title, description, fields, submitButtonText: value })
  }

  const addField = () => {
    const newField: FormField = {
      id: Date.now(),
      type: "text",
      label: "",
      placeholder: "",
      required: false,
      options: [],
      order: fields.length,
    }
    const updatedFields = [...fields, newField]
    setFields(updatedFields)
    updateContent(updatedFields)
  }

  const removeField = (fieldId: number) => {
    const updatedFields = fields.filter((f) => f.id !== fieldId)
    setFields(updatedFields)
    updateContent(updatedFields)
  }

  const updateField = (fieldId: number, updates: Partial<FormField>) => {
    const updatedFields = fields.map((f) =>
      f.id === fieldId ? { ...f, ...updates } : f
    )
    setFields(updatedFields)
    updateContent(updatedFields)
  }

  const moveField = (fieldId: number, direction: "up" | "down") => {
    const index = fields.findIndex((f) => f.id === fieldId)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === fields.length - 1)
    ) {
      return
    }

    const newFields = [...fields]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    ;[newFields[index], newFields[targetIndex]] = [
      newFields[targetIndex],
      newFields[index],
    ]
    setFields(newFields)
    updateContent(newFields)
  }

  const addOption = (fieldId: number) => {
    const field = fields.find((f) => f.id === fieldId)
    if (field) {
      updateField(fieldId, { options: [...field.options, ""] })
    }
  }

  const removeOption = (fieldId: number, optionIndex: number) => {
    const field = fields.find((f) => f.id === fieldId)
    if (field) {
      const newOptions = field.options.filter((_, i) => i !== optionIndex)
      updateField(fieldId, { options: newOptions })
    }
  }

  const updateOption = (fieldId: number, optionIndex: number, value: string) => {
    const field = fields.find((f) => f.id === fieldId)
    if (field) {
      const newOptions = [...field.options]
      newOptions[optionIndex] = value
      updateField(fieldId, { options: newOptions })
    }
  }

  const needsOptions = (type: string) => {
    return ["select", "checkbox", "radio"].includes(type)
  }

  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find((ft) => ft.value === type)
    return fieldType ? fieldType.icon : Type
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Crear Formulario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Título del formulario */}
          <div className="space-y-2">
            <Label htmlFor="form-title">Título del Formulario</Label>
            <Input
              id="form-title"
              placeholder="Ej: Ejercicio - Cálculo de Caída de Tensión"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="form-description">Descripción (opcional)</Label>
            <Textarea
              id="form-description"
              placeholder="Instrucciones para completar el formulario..."
              rows={3}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </div>

          {/* Texto del botón de envío */}
          <div className="space-y-2">
            <Label htmlFor="submit-button">Texto del Botón de Envío</Label>
            <Input
              id="submit-button"
              placeholder="Enviar"
              value={submitButtonText}
              onChange={(e) => handleSubmitButtonTextChange(e.target.value)}
              className="w-48"
            />
          </div>
        </CardContent>
      </Card>

      {/* Campos del formulario */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Campos ({fields.length})</h3>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {fields.map((field, fieldIndex) => {
            const FieldIcon = getFieldIcon(field.type)
            return (
              <AccordionItem
                key={field.id}
                value={`field-${field.id}`}
                className="border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <FieldIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {field.label || `Campo ${fieldIndex + 1}`}
                    </span>
                    <Badge variant="outline" className="ml-auto mr-2">
                      {fieldTypes.find((ft) => ft.value === field.type)?.label}
                    </Badge>
                    {field.required && (
                      <Badge variant="secondary" className="mr-2">
                        Requerido
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4 pt-4">
                    {/* Tipo de campo */}
                    <div className="space-y-2">
                      <Label htmlFor={`type-${field.id}`}>Tipo de Campo</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value: any) => {
                          updateField(field.id, {
                            type: value,
                            options: needsOptions(value) ? [""] : [],
                          })
                        }}
                      >
                        <SelectTrigger id={`type-${field.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((ft) => {
                            const Icon = ft.icon
                            return (
                              <SelectItem key={ft.value} value={ft.value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {ft.label}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Etiqueta */}
                    <div className="space-y-2">
                      <Label htmlFor={`label-${field.id}`}>Etiqueta</Label>
                      <Input
                        id={`label-${field.id}`}
                        placeholder="Nombre del campo"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                      />
                    </div>

                    {/* Placeholder */}
                    {(field.type === "text" || field.type === "textarea") && (
                      <div className="space-y-2">
                        <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
                        <Input
                          id={`placeholder-${field.id}`}
                          placeholder="Texto de ayuda..."
                          value={field.placeholder}
                          onChange={(e) =>
                            updateField(field.id, { placeholder: e.target.value })
                          }
                        />
                      </div>
                    )}

                    {/* Opciones (para select, checkbox, radio) */}
                    {needsOptions(field.type) && (
                      <div className="space-y-2">
                        <Label>Opciones</Label>
                        <div className="space-y-2">
                          {field.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <Input
                                placeholder={`Opción ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) =>
                                  updateOption(field.id, optionIndex, e.target.value)
                                }
                              />
                              {field.options.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 flex-shrink-0"
                                  onClick={() => removeOption(field.id, optionIndex)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addOption(field.id)}
                            className="w-full border-dashed"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Opción
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Required toggle */}
                    <div className="flex items-center justify-between space-x-2 pt-2 border-t">
                      <Label htmlFor={`required-${field.id}`} className="cursor-pointer">
                        Campo Requerido
                      </Label>
                      <Switch
                        id={`required-${field.id}`}
                        checked={field.required}
                        onCheckedChange={(checked) =>
                          updateField(field.id, { required: checked })
                        }
                      />
                    </div>

                    {/* Acciones del campo */}
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={fieldIndex === 0}
                          onClick={() => moveField(field.id, "up")}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={fieldIndex === fields.length - 1}
                          onClick={() => moveField(field.id, "down")}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      {fields.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeField(field.id)}
                          className="ml-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar Campo
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {/* Botón para agregar campo */}
        <Button variant="outline" onClick={addField} className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Nuevo Campo
        </Button>
      </div>

      {/* Vista previa del formulario */}
      {fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa del Formulario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {title && <h3 className="text-xl font-bold">{title}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}

            <form className="space-y-4">
              {fields.map((field) => {
                const FieldIcon = getFieldIcon(field.type)
                return (
                  <div key={field.id} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FieldIcon className="h-4 w-4 text-muted-foreground" />
                      {field.label || "Campo sin etiqueta"}
                      {field.required && <span className="text-red-500">*</span>}
                    </Label>

                    {field.type === "text" && (
                      <Input
                        placeholder={field.placeholder}
                        disabled
                        className="bg-muted/50"
                      />
                    )}

                    {field.type === "textarea" && (
                      <Textarea
                        placeholder={field.placeholder}
                        rows={4}
                        disabled
                        className="bg-muted/50"
                      />
                    )}

                    {field.type === "select" && (
                      <Select disabled>
                        <SelectTrigger className="bg-muted/50">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option, i) => (
                            <SelectItem key={i} value={option || `option-${i}`}>
                              {option || `Opción ${i + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {field.type === "checkbox" && (
                      <div className="space-y-2">
                        {field.options.map((option, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`preview-checkbox-${field.id}-${i}`}
                              disabled
                              className="h-4 w-4"
                            />
                            <Label
                              htmlFor={`preview-checkbox-${field.id}-${i}`}
                              className="font-normal"
                            >
                              {option || `Opción ${i + 1}`}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}

                    {field.type === "radio" && (
                      <div className="space-y-2">
                        {field.options.map((option, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`preview-radio-${field.id}`}
                              id={`preview-radio-${field.id}-${i}`}
                              disabled
                              className="h-4 w-4"
                            />
                            <Label
                              htmlFor={`preview-radio-${field.id}-${i}`}
                              className="font-normal"
                            >
                              {option || `Opción ${i + 1}`}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <Button type="button" disabled className="mt-6">
                {submitButtonText}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
