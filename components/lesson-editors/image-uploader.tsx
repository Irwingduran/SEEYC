"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon, Upload, X, Link as LinkIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ImageUploaderProps {
  content: {
    title: string
    imageUrl: string
    caption: string
    description: string
  }
  onChange: (content: any) => void
}

export function ImageUploader({ content, onChange }: ImageUploaderProps) {
  const [title, setTitle] = useState(content?.title || "")
  const [imageUrl, setImageUrl] = useState(content?.imageUrl || "")
  const [caption, setCaption] = useState(content?.caption || "")
  const [description, setDescription] = useState(content?.description || "")
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (field: string, value: string) => {
    const updated = { title, imageUrl, caption, description, [field]: value }
    onChange(updated)

    switch (field) {
      case "title":
        setTitle(value)
        break
      case "imageUrl":
        setImageUrl(value)
        break
      case "caption":
        setCaption(value)
        break
      case "description":
        setDescription(value)
        break
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Aquí irá la lógica de upload real
    const files = Array.from(e.dataTransfer.files)
    console.log("Archivos:", files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Aquí irá la lógica de upload real
      console.log("Archivo seleccionado:", files[0])
      // Simular URL de imagen subida
      const mockUrl = URL.createObjectURL(files[0])
      handleChange("imageUrl", mockUrl)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agregar Imagen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="image-title">Título de la Lección</Label>
            <Input
              id="image-title"
              placeholder="Ej: Diagrama de Circuito en Serie"
              value={title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Tabs para subir o URL */}
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Subir Archivo</TabsTrigger>
              <TabsTrigger value="url">URL de Imagen</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              {/* Zona de drag & drop */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground mb-4">PNG, JPG, GIF hasta 10MB</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  type="button"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Seleccionar Imagen
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">URL de la Imagen</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="image-url"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={imageUrl}
                      onChange={(e) => handleChange("imageUrl", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Pie de foto */}
          <div className="space-y-2">
            <Label htmlFor="caption">Pie de Foto (opcional)</Label>
            <Input
              id="caption"
              placeholder="Descripción breve de la imagen"
              value={caption}
              onChange={(e) => handleChange("caption", e.target.value)}
            />
          </div>

          {/* Descripción adicional */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción Detallada (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Explica qué muestra la imagen y por qué es importante..."
              rows={4}
              value={description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Vista previa */}
          {imageUrl && (
            <div className="space-y-2">
              <Label>Vista Previa</Label>
              <div className="border rounded-lg p-4 bg-background">
                <div className="relative max-w-2xl mx-auto">
                  <img
                    src={imageUrl}
                    alt={caption || title}
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.png"
                    }}
                  />
                  {caption && (
                    <p className="text-sm text-center text-muted-foreground mt-2 italic">{caption}</p>
                  )}
                </div>
                {description && (
                  <div className="mt-4 text-sm">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
