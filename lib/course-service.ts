'use server'

import { Course, CourseStatus, CourseLevel } from "@/types/course"
import { coursesData as initialCourses } from "@/lib/course-data"
import { Evaluation } from "@/types/evaluation"
import { createCourseVersion } from "@/lib/course-versioning"

// Use globalThis to persist data across hot reloads in development
const globalForCourses = globalThis as unknown as {
  coursesStore_v2: Course[]
  evaluationsStore_v2: Evaluation[]
}

if (!globalForCourses.coursesStore_v2) {
  globalForCourses.coursesStore_v2 = initialCourses.map((c, index) => ({
    id: Number(c.id),
    title: c.title,
    description: c.description,
    category: c.category,
    level: c.level as CourseLevel,
    status: "published" as CourseStatus,
    thumbnail: c.image,
    modules: [],
    language: "Español",
    duration: c.duration,
    price: c.price,
    students: c.students,
    revenue: 0,
    rating: c.rating,
    reviews: 0,
    instructor: {
      id: "inst-1",
      name: typeof c.instructor === 'string' ? c.instructor : "Instructor",
      email: "instructor@test.com"
    },
    instructorId: "inst-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  }))
}

if (!globalForCourses.evaluationsStore_v2) {
  globalForCourses.evaluationsStore_v2 = [
    {
      id: "eval-1",
      title: "Quiz: Fundamentos de Automatización",
      description: "Evaluación de conocimientos básicos sobre PLCs y automatización.",
      courseId: 1,
      courseVersionId: 1,
      moduleId: 1,
      lessonId: 1, // Assuming lesson ID 1 is a quiz
      timeLimit: 30,
      passingScore: 80,
      attemptsAllowed: 2,
      lockoutPeriod: 48 * 60 * 60 * 1000,
      randomizeQuestions: true,
      randomizeAnswers: true,
      showResultsImmediately: true,
      showCorrectAnswers: false,
      allowReview: true,
      preventScreenshot: true,
      preventCopy: true,
      preventPrint: true,
      trackTabSwitches: true,
      requireFullscreen: false,
      createdBy: "instructor-1",
      isActive: true,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "¿Cuál es la función principal de un PLC?",
          options: [
            "Controlar procesos industriales",
            "Generar electricidad",
            "Diseñar planos mecánicos",
            "Administrar recursos humanos"
          ],
          correctAnswers: ["Controlar procesos industriales"],
          points: 50,
          difficulty: "easy",
          order: 1
        },
        {
          id: "q2",
          type: "true-false",
          question: "Los PLCs reemplazaron a los sistemas de control basados en relés.",
          options: ["Verdadero", "Falso"],
          correctAnswers: ["Verdadero"],
          points: 50,
          difficulty: "easy",
          order: 2
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export async function getAllCourses(): Promise<Course[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...globalForCourses.coursesStore_v2]
}

export async function getCourseById(id: number): Promise<Course | undefined> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return globalForCourses.coursesStore_v2.find(c => c.id === id)
}

export async function createCourse(courseData: Partial<Course>): Promise<Course> {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const newCourse: Course = {
    id: Date.now(),
    title: courseData.title || "Nuevo Curso",
    description: courseData.description || "",
    category: courseData.category || "General",
    level: courseData.level || "Básico",
    status: "draft",
    thumbnail: courseData.thumbnail || "/images/placeholder-course.jpg",
    modules: [],
    language: "Español",
    duration: courseData.duration || "0 min",
    price: courseData.price || 0,
    students: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    instructor: courseData.instructor || {
      id: "admin-1",
      name: "Administrador",
      email: "admin@seeyc.com"
    },
    instructorId: "admin-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    ...courseData
  }

  // Extract and save evaluations from quiz lessons
  if (newCourse.modules) {
    newCourse.modules.forEach(m => {
      m.lessons.forEach(l => {
        if (l.type === 'quiz' && l.content) {
          const quizContent = l.content as any;
          
          const evaluation: Evaluation = {
            id: `eval-${l.id}`,
            title: quizContent.title || l.title,
            description: quizContent.description || "",
            courseId: newCourse.id,
            courseVersionId: 1,
            moduleId: m.id,
            lessonId: l.id,
            timeLimit: 30, // Default
            passingScore: quizContent.passingScore || 80,
            attemptsAllowed: 2,
            lockoutPeriod: 48 * 60 * 60 * 1000,
            randomizeQuestions: true,
            randomizeAnswers: true,
            showResultsImmediately: true,
            showCorrectAnswers: false,
            allowReview: true,
            preventScreenshot: true,
            preventCopy: true,
            preventPrint: true,
            trackTabSwitches: true,
            requireFullscreen: false,
            createdBy: "admin",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            questions: (quizContent.questions || []).map((q: any, idx: number) => ({
              id: `q-${l.id}-${idx}`,
              type: "multiple-choice",
              question: q.question,
              options: q.options,
              correctAnswers: [q.options[q.correctAnswer]], // Map index to value
              explanation: q.explanation,
              points: q.points || 10,
              difficulty: "medium",
              order: idx + 1
            }))
          }
          
          const existingIndex = globalForCourses.evaluationsStore_v2.findIndex(e => e.lessonId === l.id)
          if (existingIndex !== -1) {
            globalForCourses.evaluationsStore_v2[existingIndex] = evaluation
          } else {
            globalForCourses.evaluationsStore_v2.push(evaluation)
          }
        }
      })
    })
  }

  globalForCourses.coursesStore_v2.push(newCourse)
  
  // Create initial version
  await createCourseVersion(newCourse.id, newCourse.modules || [], "Initial version")
  
  return newCourse
}

export async function updateCourse(id: number, updates: Partial<Course>): Promise<Course> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const index = globalForCourses.coursesStore_v2.findIndex(c => c.id === id)
  if (index === -1) throw new Error("Curso no encontrado")

  const updatedCourse = {
    ...globalForCourses.coursesStore_v2[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }

  // Extract and save evaluations from quiz lessons
  if (updatedCourse.modules) {
    updatedCourse.modules.forEach(m => {
      m.lessons.forEach(l => {
        if (l.type === 'quiz' && l.content) {
          const quizContent = l.content as any;
          
          const evaluation: Evaluation = {
            id: `eval-${l.id}`,
            title: quizContent.title || l.title,
            description: quizContent.description || "",
            courseId: updatedCourse.id,
            courseVersionId: 1,
            moduleId: m.id,
            lessonId: l.id,
            timeLimit: 30, // Default
            passingScore: quizContent.passingScore || 80,
            attemptsAllowed: 2,
            lockoutPeriod: 48 * 60 * 60 * 1000,
            randomizeQuestions: true,
            randomizeAnswers: true,
            showResultsImmediately: true,
            showCorrectAnswers: false,
            allowReview: true,
            preventScreenshot: true,
            preventCopy: true,
            preventPrint: true,
            trackTabSwitches: true,
            requireFullscreen: false,
            createdBy: "admin",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            questions: (quizContent.questions || []).map((q: any, idx: number) => ({
              id: `q-${l.id}-${idx}`,
              type: "multiple-choice",
              question: q.question,
              options: q.options,
              correctAnswers: [q.options[q.correctAnswer]], // Map index to value
              explanation: q.explanation,
              points: q.points || 10,
              difficulty: "medium",
              order: idx + 1
            }))
          }
          
          const existingIndex = globalForCourses.evaluationsStore_v2.findIndex(e => e.lessonId === l.id)
          if (existingIndex !== -1) {
            globalForCourses.evaluationsStore_v2[existingIndex] = evaluation
          } else {
            globalForCourses.evaluationsStore_v2.push(evaluation)
          }
        }
      })
    })
  }

  globalForCourses.coursesStore_v2[index] = updatedCourse
  
  // Create new version if modules changed (simplified check)
  if (updates.modules) {
    await createCourseVersion(updatedCourse.id, updatedCourse.modules || [], "Course update")
  }
  
  return updatedCourse
}

export async function deleteCourse(id: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500))
  globalForCourses.coursesStore_v2 = globalForCourses.coursesStore_v2.filter(c => c.id !== id)
}

export async function getEvaluationByLessonId(lessonId: number): Promise<Evaluation | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300))
  // For demo purposes, if we don't find a specific one, return the mock one if the lesson exists
  // In a real app, we would return undefined
  const evalFound = globalForCourses.evaluationsStore_v2.find(e => e.lessonId === lessonId)
  if (evalFound) return evalFound
  
  // Fallback for demo: return the mock evaluation for ANY quiz lesson
  // This is just to make the demo work without creating specific evaluations for every lesson
  return { ...globalForCourses.evaluationsStore_v2[0], lessonId }
}

import { createEvaluationToken } from "@/lib/evaluation-tokens"

export async function getEvaluationTokenForStudent(evaluationId: string, studentId: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const tokenObj = createEvaluationToken(evaluationId, studentId)
  // In a real app, we would save this token to the DB
  return tokenObj.token
}

export async function saveEvaluation(evaluation: Evaluation): Promise<Evaluation> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = globalForCourses.evaluationsStore_v2.findIndex(e => e.id === evaluation.id)
  if (index !== -1) {
    globalForCourses.evaluationsStore_v2[index] = evaluation
  } else {
    globalForCourses.evaluationsStore_v2.push(evaluation)
  }
  return evaluation
}


