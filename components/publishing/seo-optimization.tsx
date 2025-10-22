"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, TrendingUp, Target, CheckCircle, AlertCircle, Lightbulb } from "lucide-react"

interface SEOOptimizationProps {
  onScoreUpdate: (score: number) => void
}

export function SEOOptimization({ onScoreUpdate }: SEOOptimizationProps) {
  const [seoData, setSeoData] = useState({
    title: "Instalaciones Eléctricas Residenciales Completas",
    metaDescription: "",
    keywords: [],
    slug: "instalaciones-electricas-residenciales-completas",
    focusKeyword: "instalaciones eléctricas residenciales",
  })

  const [keywordInput, setKeywordInput] = useState("")
  const [seoScore, setSeoScore] = useState(65)

  useEffect(() => {
    onScoreUpdate(seoScore)
  }, [seoScore, onScoreUpdate])

  const addKeyword = () => {
    if (keywordInput.trim() && !seoData.keywords.includes(keywordInput.trim())) {
      setSeoData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }))
      setKeywordInput("")
      updateSEOScore()
    }
  }

  const removeKeyword = (keyword: string) => {
    setSeoData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
    updateSEOScore()
  }

  const updateSEOScore = () => {
    let score = 0

    // Title optimization (25 points)
    if (seoData.title.length >= 30 && seoData.title.length <= 60) score += 25
    else if (seoData.title.length > 0) score += 15

    // Meta description (25 points)
    if (seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160) score += 25
    else if (seoData.metaDescription.length > 0) score += 15

    // Keywords (25 points)
    if (seoData.keywords.length >= 5) score += 25
    else if (seoData.keywords.length >= 3) score += 15
    else if (seoData.keywords.length > 0) score += 10

    // Focus keyword (25 points)
    if (seoData.focusKeyword && seoData.title.toLowerCase().includes(seoData.focusKeyword.toLowerCase())) {
      score += 25
    } else if (seoData.focusKeyword) {
      score += 10
    }

    setSeoScore(score)
  }

  const handleInputChange = (field: string, value: string) => {
    setSeoData((prev) => ({ ...prev, [field]: value }))
    setTimeout(updateSEOScore, 100)
  }

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getSEOScoreText = (score: number) => {
    if (score >= 80) return "Excelente"
    if (score >= 60) return "Bueno"
    return "Necesita mejoras"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Optimización SEO</h2>
          <p className="text-gray-600 dark:text-gray-300">Optimiza tu curso para motores de búsqueda</p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getSEOScoreColor(seoScore)}`}>{seoScore}/100</div>
          <div className="text-sm text-gray-500">{getSEOScoreText(seoScore)}</div>
        </div>
      </div>

      {/* SEO Score Overview */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Puntuación SEO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={seoScore} className="mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {seoData.title.length >= 30 && seoData.title.length <= 60 ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Título</div>
              <div className="text-xs text-gray-500">{seoData.title.length}/60 caracteres</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160 ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Descripción</div>
              <div className="text-xs text-gray-500">{seoData.metaDescription.length}/160 caracteres</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {seoData.keywords.length >= 5 ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Palabras Clave</div>
              <div className="text-xs text-gray-500">{seoData.keywords.length}/5+ palabras</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {seoData.focusKeyword && seoData.title.toLowerCase().includes(seoData.focusKeyword.toLowerCase()) ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Palabra Clave Principal</div>
              <div className="text-xs text-gray-500">En título</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Settings */}
        <div className="space-y-6">
          {/* Title Optimization */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Título SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">Título del Curso</Label>
                <Input
                  id="seo-title"
                  value={seoData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Título optimizado para SEO..."
                  className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                />
                <div className="flex justify-between text-xs">
                  <span
                    className={
                      seoData.title.length >= 30 && seoData.title.length <= 60 ? "text-green-600" : "text-orange-600"
                    }
                  >
                    {seoData.title.length >= 30 && seoData.title.length <= 60
                      ? "Longitud óptima"
                      : seoData.title.length < 30
                        ? "Muy corto"
                        : "Muy largo"}
                  </span>
                  <span className="text-gray-500">{seoData.title.length}/60</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Descripción</Label>
                <Textarea
                  id="meta-description"
                  value={seoData.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  placeholder="Descripción que aparecerá en los resultados de búsqueda..."
                  rows={3}
                  className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                />
                <div className="flex justify-between text-xs">
                  <span
                    className={
                      seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160
                        ? "text-green-600"
                        : "text-orange-600"
                    }
                  >
                    {seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160
                      ? "Longitud óptima"
                      : seoData.metaDescription.length < 120
                        ? "Muy corta"
                        : "Muy larga"}
                  </span>
                  <span className="text-gray-500">{seoData.metaDescription.length}/160</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url-slug">URL del Curso</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">cursos.com/</span>
                  <Input
                    id="url-slug"
                    value={seoData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Palabras Clave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="focus-keyword">Palabra Clave Principal</Label>
                <Input
                  id="focus-keyword"
                  value={seoData.focusKeyword}
                  onChange={(e) => handleInputChange("focusKeyword", e.target.value)}
                  placeholder="Palabra clave principal del curso..."
                  className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Palabras Clave Secundarias</Label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    placeholder="Agregar palabra clave..."
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                  <Button onClick={addKeyword} className="bg-purple-600 hover:bg-purple-700">
                    Agregar
                  </Button>
                </div>
                {seoData.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {seoData.keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                      >
                        {keyword}
                        <button onClick={() => removeKeyword(keyword)} className="ml-1 hover:text-purple-600">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Recommendations */}
        <div className="space-y-6">
          {/* Search Preview */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Vista Previa en Google
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                <div className="text-xs text-green-600 mb-1">cursos.com › {seoData.slug}</div>
                <h3 className="text-lg text-blue-600 hover:underline cursor-pointer mb-1">
                  {seoData.title || "Título del curso"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {seoData.metaDescription || "Meta descripción del curso aparecerá aquí..."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SEO Recommendations */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Recomendaciones SEO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    status: seoData.title.length >= 30 && seoData.title.length <= 60 ? "good" : "warning",
                    text: "Mantén el título entre 30-60 caracteres para mejor visibilidad",
                  },
                  {
                    status:
                      seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160
                        ? "good"
                        : "warning",
                    text: "La meta descripción debe tener 120-160 caracteres",
                  },
                  {
                    status: seoData.keywords.length >= 5 ? "good" : "warning",
                    text: "Incluye al menos 5 palabras clave relevantes",
                  },
                  {
                    status:
                      seoData.focusKeyword && seoData.title.toLowerCase().includes(seoData.focusKeyword.toLowerCase())
                        ? "good"
                        : "warning",
                    text: "Incluye la palabra clave principal en el título",
                  },
                ].map((recommendation, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {recommendation.status === "good" ? (
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">{recommendation.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Keyword Research */}
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Sugerencias de Palabras Clave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { keyword: "curso electricidad", volume: "1.2K", difficulty: "Media" },
                  { keyword: "instalaciones eléctricas", volume: "890", difficulty: "Alta" },
                  { keyword: "electricista residencial", volume: "650", difficulty: "Baja" },
                  { keyword: "circuitos eléctricos", volume: "540", difficulty: "Media" },
                  { keyword: "normativa eléctrica", volume: "320", difficulty: "Baja" },
                ].map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{suggestion.keyword}</span>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="secondary">{suggestion.volume}/mes</Badge>
                      <Badge
                        className={
                          suggestion.difficulty === "Baja"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : suggestion.difficulty === "Media"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }
                      >
                        {suggestion.difficulty}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (!seoData.keywords.includes(suggestion.keyword)) {
                            setSeoData((prev) => ({
                              ...prev,
                              keywords: [...prev.keywords, suggestion.keyword],
                            }))
                            updateSEOScore()
                          }
                        }}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
