"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Video,
  Code,
  Quote,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Eye,
} from "lucide-react"

export function RichTextEditor() {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
  }

  const insertMedia = (type: "image" | "video") => {
    const url = prompt(`Ingresa la URL del ${type === "image" ? "imagen" : "video"}:`)
    if (url) {
      if (type === "image") {
        formatText("insertImage", url)
      } else {
        const videoEmbed = `<video controls width="100%"><source src="${url}" type="video/mp4"></video>`
        formatText("insertHTML", videoEmbed)
      }
    }
  }

  const insertLink = () => {
    const url = prompt("Ingresa la URL del enlace:")
    const text = prompt("Ingresa el texto del enlace:")
    if (url && text) {
      formatText("insertHTML", `<a href="${url}" target="_blank">${text}</a>`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Editor de Texto Enriquecido</h2>
          <p className="text-gray-600 dark:text-gray-300">Crea contenido de texto con formato para tus lecciones</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? "Editar" : "Vista Previa"}
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Title Input */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <Label htmlFor="content-title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Título del Contenido
          </Label>
          <Input
            id="content-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Fundamentos de Electricidad"
            className="mt-2 bg-white/50 dark:bg-gray-800/50 border-white/20"
          />
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg">Contenido de la Lección</CardTitle>
        </CardHeader>
        <CardContent>
          {!isPreview ? (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r pr-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("bold")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("italic")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("underline")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Underline className="w-4 h-4" />
                  </Button>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r pr-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("formatBlock", "h1")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Heading1 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("formatBlock", "h2")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Heading2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r pr-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("insertUnorderedList")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("insertOrderedList")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r pr-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("justifyLeft")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("justifyCenter")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("justifyRight")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <AlignRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Media & Links */}
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={insertLink}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertMedia("image")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => insertMedia("video")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("formatBlock", "blockquote")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Quote className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => formatText("formatBlock", "pre")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Editor Area */}
              <div
                contentEditable
                className="min-h-[400px] p-4 border rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ whiteSpace: "pre-wrap" }}
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                placeholder="Comienza a escribir el contenido de tu lección..."
              />
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title || "Título del Contenido"}</h1>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content || "<p>El contenido aparecerá aquí...</p>" }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Templates */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg">Plantillas de Contenido</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="theory" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="theory">Teoría</TabsTrigger>
              <TabsTrigger value="practical">Práctica</TabsTrigger>
              <TabsTrigger value="safety">Seguridad</TabsTrigger>
              <TabsTrigger value="troubleshooting">Solución de Problemas</TabsTrigger>
            </TabsList>

            <TabsContent value="theory" className="mt-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Plantilla de Teoría</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Estructura para explicar conceptos teóricos
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    const template = `
                      <h1>Concepto: [Nombre del Concepto]</h1>
                      <h2>Definición</h2>
                      <p>[Explicación clara del concepto]</p>
                      <h2>Principios Fundamentales</h2>
                      <ul>
                        <li>[Principio 1]</li>
                        <li>[Principio 2]</li>
                        <li>[Principio 3]</li>
                      </ul>
                      <h2>Aplicaciones Prácticas</h2>
                      <p>[Dónde se aplica este concepto]</p>
                      <h2>Ejemplos</h2>
                      <p>[Ejemplos concretos]</p>
                    `
                    setContent(template)
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Usar Plantilla
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="practical" className="mt-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Plantilla de Práctica</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Estructura para ejercicios prácticos</p>
                <Button
                  size="sm"
                  onClick={() => {
                    const template = `
                      <h1>Ejercicio Práctico: [Nombre del Ejercicio]</h1>
                      <h2>Objetivo</h2>
                      <p>[Qué se va a lograr con este ejercicio]</p>
                      <h2>Materiales Necesarios</h2>
                      <ul>
                        <li>[Material 1]</li>
                        <li>[Material 2]</li>
                        <li>[Material 3]</li>
                      </ul>
                      <h2>Procedimiento</h2>
                      <ol>
                        <li>[Paso 1]</li>
                        <li>[Paso 2]</li>
                        <li>[Paso 3]</li>
                      </ol>
                      <h2>Resultados Esperados</h2>
                      <p>[Qué debe observar el estudiante]</p>
                    `
                    setContent(template)
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Usar Plantilla
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="safety" className="mt-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Plantilla de Seguridad</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Estructura para normas de seguridad</p>
                <Button
                  size="sm"
                  onClick={() => {
                    const template = `
                      <h1>Normas de Seguridad: [Tema]</h1>
                      <blockquote>⚠️ ADVERTENCIA: [Riesgo principal]</blockquote>
                      <h2>Riesgos Identificados</h2>
                      <ul>
                        <li>[Riesgo 1]</li>
                        <li>[Riesgo 2]</li>
                        <li>[Riesgo 3]</li>
                      </ul>
                      <h2>Medidas Preventivas</h2>
                      <ol>
                        <li>[Medida 1]</li>
                        <li>[Medida 2]</li>
                        <li>[Medida 3]</li>
                      </ol>
                      <h2>Equipo de Protección Personal</h2>
                      <p>[EPP requerido]</p>
                      <h2>Procedimientos de Emergencia</h2>
                      <p>[Qué hacer en caso de accidente]</p>
                    `
                    setContent(template)
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Usar Plantilla
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="troubleshooting" className="mt-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold mb-2">Plantilla de Solución de Problemas</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Estructura para guías de diagnóstico</p>
                <Button
                  size="sm"
                  onClick={() => {
                    const template = `
                      <h1>Guía de Solución de Problemas: [Sistema/Equipo]</h1>
                      <h2>Síntomas Comunes</h2>
                      <ul>
                        <li>[Síntoma 1]</li>
                        <li>[Síntoma 2]</li>
                        <li>[Síntoma 3]</li>
                      </ul>
                      <h2>Diagnóstico Paso a Paso</h2>
                      <ol>
                        <li><strong>Verificar:</strong> [Qué verificar]</li>
                        <li><strong>Medir:</strong> [Qué medir]</li>
                        <li><strong>Inspeccionar:</strong> [Qué inspeccionar]</li>
                      </ol>
                      <h2>Posibles Causas y Soluciones</h2>
                      <table>
                        <tr><th>Causa</th><th>Solución</th></tr>
                        <tr><td>[Causa 1]</td><td>[Solución 1]</td></tr>
                        <tr><td>[Causa 2]</td><td>[Solución 2]</td></tr>
                      </table>
                    `
                    setContent(template)
                  }}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Usar Plantilla
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
