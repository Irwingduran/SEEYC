'use server'

import { Course, CourseModule, CourseVersion, CourseEnrollment } from "@/types/course"

/**
 * Servicio para manejar el versionado de cursos
 *
 * IMPORTANTE: Cuando un usuario compra un curso, se le asigna la versión actual
 * del curso. Si el instructor actualiza el contenido, se crea una nueva versión
 * pero los estudiantes que ya compraron mantienen acceso a su versión original.
 */

// Use globalThis to persist data across hot reloads in development
const globalForVersioning = globalThis as unknown as {
  courseVersionsStore: Record<number, CourseVersion[]>
}

if (!globalForVersioning.courseVersionsStore) {
  globalForVersioning.courseVersionsStore = {}
}

/**
 * Crea una nueva versión de un curso
 * Se debe llamar cada vez que el instructor actualiza significativamente el contenido
 */
export async function createCourseVersion(
  courseId: number,
  modules: CourseModule[],
  changeLog?: string
): Promise<CourseVersion> {
  // Obtener versiones existentes del store
  const existingVersions = globalForVersioning.courseVersionsStore[courseId] || []
  
  // Simular obtención de la versión actual
  const latestVersion = existingVersions.length > 0 
    ? Math.max(...existingVersions.map(v => v.version)) 
    : 0
    
  const newVersionNumber = latestVersion + 1

  const newVersion: CourseVersion = {
    id: Date.now(),
    courseId,
    version: newVersionNumber,
    modules: JSON.parse(JSON.stringify(modules)), // Deep clone
    createdAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    isCurrentVersion: true,
    changeLog,
  }

  // Guardar en store
  if (!globalForVersioning.courseVersionsStore[courseId]) {
    globalForVersioning.courseVersionsStore[courseId] = []
  }
  
  // Marcar anteriores como no actuales
  globalForVersioning.courseVersionsStore[courseId].forEach(v => v.isCurrentVersion = false)
  
  // Agregar nueva versión
  globalForVersioning.courseVersionsStore[courseId].push(newVersion)

  console.log(
    `[Versionado] Nueva versión ${newVersionNumber} creada para curso ${courseId}`
  )

  return newVersion
}

/**
 * Obtiene la versión actual de un curso
 * Esta es la versión que verán los nuevos estudiantes al comprar
 */
export async function getCurrentCourseVersion(
  courseId: number
): Promise<CourseVersion | null> {
  const versions = globalForVersioning.courseVersionsStore[courseId] || []
  return versions.find(v => v.isCurrentVersion) || null
}

/**
 * Obtiene una versión específica de un curso
 * Usado cuando un estudiante accede al curso que compró
 */
export async function getCourseVersion(
  versionId: number
): Promise<CourseVersion | null> {
  const allVersions = Object.values(globalForVersioning.courseVersionsStore).flat()
  return allVersions.find(v => v.id === versionId) || null
}

/**
 * Obtiene el contenido del curso según la versión del estudiante
 * IMPORTANTE: Este método debe usarse en lugar de obtener el curso directamente
 */
export async function getCourseContentForStudent(
  courseId: number,
  courseVersionId: number
): Promise<{
  modules: CourseModule[]
  version: number
  isLatestVersion: boolean
} | null> {
  // Obtener la versión del curso que el estudiante compró
  const studentVersion = await getCourseVersion(courseVersionId)

  if (!studentVersion) {
    return null
  }

  // Verificar si es la versión más reciente
  const currentVersion = await getCurrentCourseVersion(courseId)
  const isLatestVersion = currentVersion?.id === studentVersion.id

  return {
    modules: studentVersion.modules,
    version: studentVersion.version,
    isLatestVersion,
  }
}

// Removed enrollStudentInCourse as it is handled in user-service.ts


/**
 * Verifica si hay actualizaciones disponibles para un estudiante
 */
export async function checkCourseUpdates(
  courseId: number,
  studentVersionId: number
): Promise<{
  hasUpdate: boolean
  currentVersion: number
  latestVersion: number
  changesSummary?: string
} | null> {
  const studentContent = await getCourseContentForStudent(courseId, studentVersionId)

  if (!studentContent) {
    return null
  }

  const currentVersion = await getCurrentCourseVersion(courseId)

  if (!currentVersion) {
    return null
  }

  return {
    hasUpdate: !studentContent.isLatestVersion,
    currentVersion: studentContent.version,
    latestVersion: currentVersion.version,
    changesSummary: currentVersion.changeLog,
  }
}

/**
 * Obtiene el historial de versiones de un curso (para instructores/admin)
 */
export async function getCourseVersionHistory(courseId: number) {
  // TODO: Implementar con base de datos real
  // const versions = await db.courseVersions.findMany({
  //   where: { courseId },
  //   orderBy: { version: 'desc' }
  // })

  // const enrollmentsByVersion = await db.courseEnrollments.groupBy({
  //   by: ['courseVersionId'],
  //   where: { courseId },
  //   _count: true
  // })

  return {
    courseId,
    currentVersion: 1,
    versions: [],
    totalStudentsOnOldVersions: 0,
  }
}

/**
 * Migración opcional: Permitir a un estudiante actualizar a la versión más reciente
 * NOTA: Esto es opcional y debe ser una decisión del negocio.
 * Por defecto, los estudiantes mantienen su versión comprada.
 */
export async function upgradeStudentToLatestVersion(
  courseId: number,
  studentId: string
): Promise<boolean> {
  const currentVersion = await getCurrentCourseVersion(courseId)

  if (!currentVersion) {
    return false
  }

  // TODO: Actualizar en base de datos
  // await db.courseEnrollments.updateMany({
  //   where: { courseId, studentId },
  //   data: { courseVersionId: currentVersion.id }
  // })

  console.log(
    `[Migración] Estudiante ${studentId} actualizado a versión ${currentVersion.version}`
  )

  return true
}

/**
 * Hook para detectar cambios en el curso y crear automáticamente una nueva versión
 * Se debe llamar cuando el instructor guarda cambios significativos
 */
export async function handleCourseUpdate(
  courseId: number,
  updatedModules: CourseModule[],
  changeDescription: string
): Promise<{ versionCreated: boolean; version?: CourseVersion }> {
  // Obtener la versión actual
  const currentVersion = await getCurrentCourseVersion(courseId)

  if (!currentVersion) {
    // Primera versión del curso
    const newVersion = await createCourseVersion(
      courseId,
      updatedModules,
      "Versión inicial"
    )
    return { versionCreated: true, version: newVersion }
  }

  // Comparar si hay cambios significativos
  // (esto puede ser más sofisticado según tus necesidades)
  const hasSignificantChanges = JSON.stringify(currentVersion.modules) !==
    JSON.stringify(updatedModules)

  if (hasSignificantChanges) {
    const newVersion = await createCourseVersion(
      courseId,
      updatedModules,
      changeDescription
    )
    return { versionCreated: true, version: newVersion }
  }

  return { versionCreated: false }
}
