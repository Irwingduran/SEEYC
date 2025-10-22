"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Gift } from "lucide-react"

interface CoursePricingSettingsProps {
  data: any
  onUpdate: (data: any) => void
}

export function CoursePricingSettings({ data, onUpdate }: CoursePricingSettingsProps) {
  const [formData, setFormData] = useState({
    pricingType: "paid",
    price: "",
    currency: "USD",
    discountEnabled: false,
    discountPrice: "",
    discountEndDate: "",
    enrollmentLimit: "",
    hasEnrollmentLimit: false,
    accessType: "lifetime",
    accessDuration: "",
    certificateIncluded: true,
    refundPolicy: "30-day",
    ...data,
  })

  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Pricing Type */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
            Tipo de Precio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={formData.pricingType} onValueChange={(value) => handleInputChange("pricingType", value)}>
            <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
              <SelectValue placeholder="Selecciona el tipo de precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-green-600" />
                  Gratuito
                </div>
              </SelectItem>
              <SelectItem value="paid">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  De Pago
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Pricing Details */}
      {formData.pricingType === "paid" && (
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-lg">Detalles de Precio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Precio Regular *
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="99.00"
                  className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Moneda</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="MXN">MXN ($)</SelectItem>
                    <SelectItem value="COP">COP ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Discount Settings */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Habilitar Descuento</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ofrecer precio promocional por tiempo limitado
                </p>
              </div>
              <Switch
                checked={formData.discountEnabled}
                onCheckedChange={(checked) => handleInputChange("discountEnabled", checked)}
              />
            </div>

            {formData.discountEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="discountPrice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Precio con Descuento
                  </Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                    placeholder="79.00"
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountEndDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fecha de Finalización
                  </Label>
                  <Input
                    id="discountEndDate"
                    type="date"
                    value={formData.discountEndDate}
                    onChange={(e) => handleInputChange("discountEndDate", e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Access Settings */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-purple-600" />
            Configuración de Acceso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enrollment Limit */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Limitar Inscripciones</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Establecer un número máximo de estudiantes</p>
            </div>
            <Switch
              checked={formData.hasEnrollmentLimit}
              onCheckedChange={(checked) => handleInputChange("hasEnrollmentLimit", checked)}
            />
          </div>

          {formData.hasEnrollmentLimit && (
            <div className="space-y-2">
              <Label htmlFor="enrollmentLimit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Número Máximo de Estudiantes
              </Label>
              <Input
                id="enrollmentLimit"
                type="number"
                value={formData.enrollmentLimit}
                onChange={(e) => handleInputChange("enrollmentLimit", e.target.value)}
                placeholder="100"
                className="bg-white/50 dark:bg-gray-800/50 border-white/20"
              />
            </div>
          )}

          {/* Access Duration */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duración del Acceso</Label>
            <Select value={formData.accessType} onValueChange={(value) => handleInputChange("accessType", value)}>
              <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lifetime">Acceso de por vida</SelectItem>
                <SelectItem value="limited">Acceso limitado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.accessType === "limited" && (
            <div className="space-y-2">
              <Label htmlFor="accessDuration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Duración (días)
              </Label>
              <Input
                id="accessDuration"
                type="number"
                value={formData.accessDuration}
                onChange={(e) => handleInputChange("accessDuration", e.target.value)}
                placeholder="365"
                className="bg-white/50 dark:bg-gray-800/50 border-white/20"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-lg">Configuraciones Adicionales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Incluir Certificado</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Los estudiantes recibirán un certificado al completar el curso
              </p>
            </div>
            <Switch
              checked={formData.certificateIncluded}
              onCheckedChange={(checked) => handleInputChange("certificateIncluded", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Política de Reembolso</Label>
            <Select value={formData.refundPolicy} onValueChange={(value) => handleInputChange("refundPolicy", value)}>
              <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-refund">Sin reembolso</SelectItem>
                <SelectItem value="7-day">7 días</SelectItem>
                <SelectItem value="14-day">14 días</SelectItem>
                <SelectItem value="30-day">30 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-lg">Resumen de Precios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Precio del curso:</span>
            <div className="flex items-center gap-2">
              {formData.discountEnabled && formData.discountPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formData.currency} {formData.price}
                </span>
              )}
              <Badge
                variant="secondary"
                className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
              >
                {formData.pricingType === "free"
                  ? "GRATUITO"
                  : `${formData.currency} ${formData.discountEnabled && formData.discountPrice ? formData.discountPrice : formData.price || "0"}`}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
