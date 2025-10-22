"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourseCompletionCertificate } from "@/components/course-completion-certificate"
import { Award, Search, Calendar, Trophy, Medal, Star, CheckCircle, Download, Share, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface Certificate {
  id: string
  studentName: string
  courseName: string
  instructorName: string
  completionDate: Date
  duration: string
  grade: number
  skills: string[]
  certificateNumber: string
  issueDate: Date
  category: string
}

interface CertificateGalleryProps {
  studentName?: string
}

export function CertificateGallery({ studentName = "Juan Pérez" }: CertificateGalleryProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "cert-001",
      studentName,
      courseName: "Fundamentos de Instalaciones Eléctricas Residenciales",
      instructorName: "Ing. Carlos Mendoza",
      completionDate: new Date("2024-01-15"),
      duration: "8 semanas",
      grade: 95,
      skills: ["Cableado residencial", "Normativas eléctricas", "Seguridad eléctrica"],
      certificateNumber: "AEE-2024-001",
      issueDate: new Date("2024-01-15"),
      category: "Instalaciones Residenciales",
    },
    {
      id: "cert-002",
      studentName,
      courseName: "Sistemas de Automatización Industrial",
      instructorName: "Ing. María González",
      completionDate: new Date("2024-02-28"),
      duration: "12 semanas",
      grade: 88,
      skills: ["PLC Programming", "Sensores industriales", "HMI Design"],
      certificateNumber: "AEE-2024-002",
      issueDate: new Date("2024-02-28"),
      category: "Automatización",
    },
    {
      id: "cert-003",
      studentName,
      courseName: "Energía Solar Fotovoltaica: Diseño e Instalación",
      instructorName: "Ing. Roberto Silva",
      completionDate: new Date("2024-03-20"),
      duration: "10 semanas",
      grade: 92,
      skills: ["Dimensionamiento solar", "Instalación FV", "Conexión a red"],
      certificateNumber: "AEE-2024-003",
      issueDate: new Date("2024-03-20"),
      category: "Energías Renovables",
    },
  ])

  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "grade" | "name">("date")

  const filteredCertificates = certificates
    .filter((cert) => {
      const matchesSearch =
        searchQuery === "" ||
        cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = filterCategory === "all" || cert.category === filterCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "grade":
          return b.grade - a.grade
        case "name":
          return a.courseName.localeCompare(b.courseName)
        default:
          return b.completionDate.getTime() - a.completionDate.getTime()
      }
    })

  const categories = ["all", ...Array.from(new Set(certificates.map((cert) => cert.category)))]

  const getGradeIcon = (grade: number) => {
    if (grade >= 95) return Trophy
    if (grade >= 90) return Medal
    if (grade >= 80) return Star
    return CheckCircle
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 95) return "text-yellow-600 bg-yellow-100"
    if (grade >= 90) return "text-blue-600 bg-blue-100"
    if (grade >= 80) return "text-green-600 bg-green-100"
    return "text-gray-600 bg-gray-100"
  }

  const totalCertificates = certificates.length
  const averageGrade = certificates.reduce((sum, cert) => sum + cert.grade, 0) / certificates.length
  const excellentCertificates = certificates.filter((cert) => cert.grade >= 90).length

  if (selectedCertificate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedCertificate(null)}>
            ← Volver a la galería
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
        <CourseCompletionCertificate certificateData={selectedCertificate} showActions={false} />
      </div>
    )
  }

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center space-x-2">
            <Award className="h-6 w-6 text-primary" />
            <span>Mis Certificados</span>
          </CardTitle>
          <Badge variant="secondary" className="text-sm">
            {totalCertificates} certificado{totalCertificates !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2 p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalCertificates}</div>
            <div className="text-sm text-muted-foreground">Certificados obtenidos</div>
          </div>
          <div className="text-center space-y-2 p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{Math.round(averageGrade)}%</div>
            <div className="text-sm text-muted-foreground">Promedio general</div>
          </div>
          <div className="text-center space-y-2 p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{excellentCertificates}</div>
            <div className="text-sm text-muted-foreground">Con excelencia (90%+)</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar certificados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Fecha reciente</SelectItem>
              <SelectItem value="grade">Mejor calificación</SelectItem>
              <SelectItem value="name">Nombre del curso</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => {
              const GradeIcon = getGradeIcon(certificate.grade)
              return (
                <Card
                  key={certificate.id}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-1">
                            {certificate.category}
                          </Badge>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                          getGradeColor(certificate.grade),
                        )}
                      >
                        <GradeIcon className="h-3 w-3" />
                        <span>{certificate.grade}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {certificate.courseName}
                      </h3>
                      <p className="text-xs text-muted-foreground">Instructor: {certificate.instructorName}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{certificate.completionDate.toLocaleDateString("es-ES")}</span>
                      </div>
                      <span>{certificate.duration}</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Competencias:</p>
                      <div className="flex flex-wrap gap-1">
                        {certificate.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                            {skill}
                          </Badge>
                        ))}
                        {certificate.skills.length > 2 && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">
                            +{certificate.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">N° {certificate.certificateNumber}</span>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-60 group-hover:opacity-100">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-60 group-hover:opacity-100">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-60 group-hover:opacity-100">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <Award className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground">No se encontraron certificados</h3>
            <p className="text-muted-foreground">Intenta ajustar los filtros o buscar con términos diferentes.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
