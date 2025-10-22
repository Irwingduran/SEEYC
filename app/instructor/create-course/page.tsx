"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CourseBasicInfo } from "@/components/course-wizard/basic-info"
import { CourseLearningObjectives } from "@/components/course-wizard/learning-objectives"
import { CoursePricingSettings } from "@/components/course-wizard/pricing-settings"
import { CourseMediaUpload } from "@/components/course-wizard/media-upload"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

const steps = [
  { id: 1, title: "Información Básica", description: "Título, descripción y categoría del curso" },
  { id: 2, title: "Objetivos de Aprendizaje", description: "Objetivos y prerrequisitos del curso" },
  { id: 3, title: "Configuración de Precios", description: "Precios y configuración de acceso" },
  { id: 4, title: "Medios y Vista Previa", description: "Miniatura y video de vista previa" },
]

export default function CreateCoursePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [courseData, setCourseData] = useState({
    basicInfo: {},
    objectives: {},
    pricing: {},
    media: {},
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepData = (stepKey: string, data: any) => {
    setCourseData((prev) => ({
      ...prev,
      [stepKey]: data,
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CourseBasicInfo data={courseData.basicInfo} onUpdate={(data) => handleStepData("basicInfo", data)} />
      case 2:
        return (
          <CourseLearningObjectives
            data={courseData.objectives}
            onUpdate={(data) => handleStepData("objectives", data)}
          />
        )
      case 3:
        return <CoursePricingSettings data={courseData.pricing} onUpdate={(data) => handleStepData("pricing", data)} />
      case 4:
        return <CourseMediaUpload data={courseData.media} onUpdate={(data) => handleStepData("media", data)} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Crear Nuevo Curso</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sigue estos pasos para crear tu curso de capacitación eléctrica
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Paso {currentStep} de {steps.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    step.id <= currentStep ? "text-purple-600 dark:text-purple-400" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2 ${
                      step.id < currentStep
                        ? "bg-purple-600 text-white"
                        : step.id === currentStep
                          ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 border-2 border-purple-600"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                    }`}
                  >
                    {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {currentStep === steps.length ? "Finalizar" : "Siguiente"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
