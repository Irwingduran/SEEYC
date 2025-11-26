'use server'

import { Course } from "@/types/course"
import { coursesData } from "@/lib/course-data"
import { getCourseById } from "@/lib/course-service"
import { getCurrentCourseVersion } from "@/lib/course-versioning"

export interface UserProfile {
  id: string
  name: string
  email: string
  role: "usuario" | "admin"
  avatar: string
  initials: string
  currentStreak: number
  totalHours: number
  coursesCompleted: number
  certificates: number
  points: number
}

export interface EnrolledCourse {
  courseId: number
  courseVersionId: number
  title: string
  instructor: string
  progress: number // 0-100
  status: "active" | "completed" | "archived"
  lastAccessed: string
  nextLessonId?: number
  nextLessonTitle?: string
  enrolledAt: string
  image?: string
  level?: string
}

// Use globalThis to persist data
const globalForUser = globalThis as unknown as {
  currentUser: UserProfile
  enrolledCourses: EnrolledCourse[]
}

if (!globalForUser.currentUser) {
  globalForUser.currentUser = {
    id: "user-1",
    name: "Carlos Rodríguez",
    email: "carlos@test.com",
    role: "usuario",
    avatar: "/user-avatar.jpg",
    initials: "CR",
    currentStreak: 7,
    totalHours: 45,
    coursesCompleted: 3,
    certificates: 3,
    points: 1250,
  }
}

if (!globalForUser.enrolledCourses) {
  globalForUser.enrolledCourses = [
    {
      courseId: 1,
      courseVersionId: 1,
      title: "Automatización Industrial con PLC",
      instructor: "Ing. María González",
      progress: 22,
      status: "active",
      lastAccessed: new Date().toISOString(),
      nextLessonId: 9,
      nextLessonTitle: "Introducción al lenguaje Ladder",
      enrolledAt: "2023-10-15T10:00:00Z",
      image: "/images/course-plc.jpg",
      level: "Intermedio"
    },
    {
      courseId: 2,
      courseVersionId: 1,
      title: "Instalaciones Solares Residenciales",
      instructor: "Ing. Roberto Silva",
      progress: 60,
      status: "active",
      lastAccessed: new Date(Date.now() - 86400000).toISOString(), // Ayer
      nextLessonId: 5,
      nextLessonTitle: "Cálculo de Dimensionamiento",
      enrolledAt: "2023-09-20T14:30:00Z",
      image: "/images/course-solar.jpg",
      level: "Avanzado"
    },
    {
      courseId: 3,
      courseVersionId: 1,
      title: "Seguridad Eléctrica Industrial",
      instructor: "Ing. Ana Martínez",
      progress: 15,
      status: "active",
      lastAccessed: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
      nextLessonId: 3,
      nextLessonTitle: "Normativas NFPA 70E",
      enrolledAt: "2023-11-01T09:00:00Z",
      image: "/images/course-safety.jpg",
      level: "Básico"
    }
  ]
}

export async function getUserProfile(): Promise<UserProfile> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  return { ...globalForUser.currentUser }
}

export async function getEnrolledCourses(): Promise<EnrolledCourse[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...globalForUser.enrolledCourses].sort((a, b) => 
    new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
  )
}

export async function getEnrolledCourse(courseId: number): Promise<EnrolledCourse | undefined> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return globalForUser.enrolledCourses.find(c => c.courseId === courseId)
}

export async function updateProgress(courseId: number, progress: number, nextLessonId?: number, nextLessonTitle?: string) {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = globalForUser.enrolledCourses.findIndex(c => c.courseId === courseId)
  if (index !== -1) {
    globalForUser.enrolledCourses[index] = {
      ...globalForUser.enrolledCourses[index],
      progress,
      lastAccessed: new Date().toISOString(),
      ...(nextLessonId && { nextLessonId }),
      ...(nextLessonTitle && { nextLessonTitle })
    }
    
    // Actualizar stats de usuario si completa
    if (progress === 100 && globalForUser.enrolledCourses[index].status !== "completed") {
      globalForUser.enrolledCourses[index].status = "completed"
      globalForUser.currentUser.coursesCompleted++
      globalForUser.currentUser.certificates++
      globalForUser.currentUser.points += 500
    }
  }
  return globalForUser.enrolledCourses[index]
}

// Simular inscripción
export async function enrollCourse(courseId: number) {
  const existing = globalForUser.enrolledCourses.find(c => c.courseId === courseId)
  if (existing) return existing

  // Buscar info del curso (mock)
  // Try to find in static data first, then in dynamic service
  let courseInfo: any = coursesData.find(c => Number(c.id) === courseId)
  
  if (!courseInfo) {
     const dynamicCourse = await getCourseById(courseId)
     if (dynamicCourse) {
       courseInfo = {
          id: dynamicCourse.id.toString(),
          title: dynamicCourse.title,
          instructor: dynamicCourse.instructor.name,
          image: dynamicCourse.thumbnail,
          level: dynamicCourse.level
       }
     }
  }

  if (!courseInfo) throw new Error("Curso no encontrado")

  // Get current version
  const currentVersion = await getCurrentCourseVersion(courseId)
  const versionId = currentVersion ? currentVersion.id : 1

  const newEnrollment: EnrolledCourse = {
    courseId,
    courseVersionId: versionId,
    title: courseInfo.title,
    instructor: typeof courseInfo.instructor === 'string' ? courseInfo.instructor : "Instructor",
    progress: 0,
    status: "active",
    lastAccessed: new Date().toISOString(),
    enrolledAt: new Date().toISOString(),
    image: courseInfo.image,
    level: courseInfo.level
  }

  globalForUser.enrolledCourses.push(newEnrollment)
  return newEnrollment
}


