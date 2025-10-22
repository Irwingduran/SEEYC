"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote,
} from "lucide-react"

interface TextEditorProps {
  content: {
    title: string
    body: string
  }
  onChange: (content: any) => void
}

export function TextEditor({ content, onChange }: TextEditorProps) {
  const [title, setTitle] = useState(content?.title || "")
  const [body, setBody] = useState(content?.body || "")

  const handleTitleChange = (value: string) => {
    setTitle(value)
    onChange({ title: value, body })
  }

  const handleBodyChange = (value: string) => {
    setBody(value)
    onChange({ title, body: value })
  }

  const formatButtons = [
    { icon: Bold, label: "Negrita", action: "bold" },
    { icon: Italic, label: "Cursiva", action: "italic" },
    { icon: Underline, label: "Subrayado", action: "underline" },
    { icon: List, label: "Lista", action: "list" },
    { icon: ListOrdered, label: "Lista numerada", action: "orderedList" },
    { icon: Link, label: "Enlace", action: "link" },
    { icon: Code, label: "Código", action: "code" },
    { icon: Quote, label: "Cita", action: "quote" },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Editor de Texto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Título de la lección */}
          <div className="space-y-2">
            <Label htmlFor="lesson-title">Título de la Lección</Label>
            <Input
              id="lesson-title"
              placeholder="Ej: Introducción a los Circuitos Eléctricos"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          {/* Barra de herramientas */}
          <div className="flex flex-wrap gap-1 p-2 border rounded-lg bg-muted/50">
            {formatButtons.map((button) => {
              const Icon = button.icon
              return (
                <Button
                  key={button.action}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title={button.label}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              )
            })}
          </div>

          {/* Área de contenido */}
          <div className="space-y-2">
            <Label htmlFor="lesson-content">Contenido de la Lección</Label>
            <Textarea
              id="lesson-content"
              placeholder="Escribe el contenido de tu lección aquí. Puedes incluir instrucciones, explicaciones, teoría, ejemplos, etc."
              value={body}
              onChange={(e) => handleBodyChange(e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Escribe tu contenido en texto plano. Puedes usar markdown para formato.
            </p>
          </div>

          {/* Vista previa del contenido */}
          {body && (
            <div className="space-y-2">
              <Label>Vista Previa</Label>
              <div className="p-4 border rounded-lg bg-background">
                {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
                <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                  {body}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
