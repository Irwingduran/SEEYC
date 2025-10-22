"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X, Target, BookOpen } from "lucide-react"

interface CourseLearningObjectivesProps {
  data: any
  onUpdate: (data: any) => void
}

export function CourseLearningObjectives({ data, onUpdate }: CourseLearningObjectivesProps) {
  const [formData, setFormData] = useState({
    objectives: [],
    prerequisites: [],
    targetAudience: "",
    whatYouWillLearn: [],
    ...data,
  })

  const [objectiveInput, setObjectiveInput] = useState("")
  const [prerequisiteInput, setPrerequisiteInput] = useState("")
  const [learningInput, setLearningInput] = useState("")

  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addObjective = () => {
    if (objectiveInput.trim()) {
      handleInputChange("objectives", [...formData.objectives, objectiveInput.trim()])
      setObjectiveInput("")
    }
  }

  const removeObjective = (index: number) => {
    handleInputChange(
      "objectives",
      formData.objectives.filter((_, i) => i !== index),
    )
  }

  const addPrerequisite = () => {
    if (prerequisiteInput.trim()) {
      handleInputChange("prerequisites", [...formData.prerequisites, prerequisiteInput.trim()])
      setPrerequisiteInput("")
    }
  }

  const removePrerequisite = (index: number) => {
    handleInputChange(
      "prerequisites",
      formData.prerequisites.filter((_, i) => i !== index),
    )
  }

  const addLearning = () => {
    if (learningInput.trim()) {
      handleInputChange("whatYouWillLearn", [...formData.whatYouWillLearn, learningInput.trim()])
      setLearningInput("")
    }
  }

  const removeLearning = (index: number) => {
    handleInputChange(
      "whatYouWillLearn",
      formData.whatYouWillLearn.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-6">
      {/* Target Audience */}
      <div className="space-y-2">
        <Label htmlFor="targetAudience" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Audiencia Objetivo
        </Label>
        <Textarea
          id="targetAudience"
          value={formData.targetAudience}
          onChange={(e) => handleInputChange("targetAudience", e.target.value)}
          placeholder="Describe a quién está dirigido este curso..."
          rows={3}
          className="bg-white/50 dark:bg-gray-800/50 border-white/20"
        />
      </div>

      {/* Learning Objectives */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Objetivos de Aprendizaje</Label>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={objectiveInput}
              onChange={(e) => setObjectiveInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addObjective())}
              placeholder="Agregar objetivo de aprendizaje..."
              className="bg-white/50 dark:bg-gray-800/50 border-white/20"
            />
            <Button onClick={addObjective} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {formData.objectives.length > 0 && (
            <div className="space-y-2">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                  <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{objective}</span>
                  <Button
                    onClick={() => removeObjective(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* What You Will Learn */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Lo que Aprenderás</Label>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={learningInput}
              onChange={(e) => setLearningInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLearning())}
              placeholder="Agregar habilidad o conocimiento..."
              className="bg-white/50 dark:bg-gray-800/50 border-white/20"
            />
            <Button onClick={addLearning} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {formData.whatYouWillLearn.length > 0 && (
            <div className="space-y-2">
              {formData.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  <Button
                    onClick={() => removeLearning(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-orange-600" />
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prerrequisitos</Label>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={prerequisiteInput}
              onChange={(e) => setPrerequisiteInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPrerequisite())}
              placeholder="Agregar prerrequisito..."
              className="bg-white/50 dark:bg-gray-800/50 border-white/20"
            />
            <Button onClick={addPrerequisite} size="sm" className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {formData.prerequisites.length > 0 && (
            <div className="space-y-2">
              {formData.prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-md">
                  <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{prerequisite}</span>
                  <Button
                    onClick={() => removePrerequisite(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
