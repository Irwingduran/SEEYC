import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Course, CourseStatus } from "@/types/course"
import { updateCourse, deleteCourse as deleteCourseService, createCourse } from "@/lib/course-service"

interface UseCourseActionsProps {
  onSuccess?: () => void
}

export function useCourseActions({ onSuccess }: UseCourseActionsProps = {}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Publica un curso
   */
  const publishCourse = async (courseId: number | string) => {
    setIsLoading(true)
    try {
      await updateCourse(Number(courseId), { status: 'published' })

      toast.success("Curso publicado exitosamente", {
        description: "El curso ahora es visible para todos los estudiantes",
      })

      onSuccess?.()
      return true
    } catch (error) {
      console.error("Error al publicar curso:", error)
      toast.error("Error al publicar el curso", {
        description: "Por favor, intenta nuevamente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Archiva un curso
   */
  const archiveCourse = async (courseId: number | string) => {
    setIsLoading(true)
    try {
      await updateCourse(Number(courseId), { status: 'archived' })

      toast.success("Curso archivado exitosamente", {
        description: "El curso ya no es visible para nuevos estudiantes",
      })

      onSuccess?.()
      return true
    } catch (error) {
      console.error("Error al archivar curso:", error)
      toast.error("Error al archivar el curso", {
        description: "Por favor, intenta nuevamente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Restaura un curso archivado
   */
  const restoreCourse = async (courseId: number | string) => {
    setIsLoading(true)
    try {
      await updateCourse(Number(courseId), { status: 'draft' })

      toast.success("Curso restaurado exitosamente", {
        description: "El curso ha sido movido a borradores",
      })

      onSuccess?.()
      return true
    } catch (error) {
      console.error("Error al restaurar curso:", error)
      toast.error("Error al restaurar el curso", {
        description: "Por favor, intenta nuevamente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Duplica un curso
   */
  const duplicateCourse = async (courseId: number | string, course: Course) => {
    setIsLoading(true)
    try {
      const { id, ...courseData } = course
      const newCourse = await createCourse({
        ...courseData,
        title: `${course.title} (Copia)`,
        status: 'draft'
      })

      toast.success("Curso duplicado exitosamente", {
        description: `Se ha creado una copia de "${course.title}"`,
        action: {
          label: "Ver curso",
          onClick: () => router.push(`/admin/courses/${newCourse.id}/edit`),
        },
      })

      onSuccess?.()
      return true
    } catch (error) {
      console.error("Error al duplicar curso:", error)
      toast.error("Error al duplicar el curso", {
        description: "Por favor, intenta nuevamente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Elimina un curso
   */
  const deleteCourse = async (courseId: number | string, courseName: string) => {
    // Confirmación
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar "${courseName}"?\n\nEsta acción no se puede deshacer y se eliminarán:\n- Todo el contenido del curso\n- Inscripciones de estudiantes\n- Progreso y calificaciones\n- Analíticas e historial`
    )

    if (!confirmed) {
      return false
    }

    setIsLoading(true)
    try {
      await deleteCourseService(Number(courseId))

      toast.success("Curso eliminado exitosamente", {
        description: "El curso y todos sus datos han sido eliminados",
      })

      onSuccess?.()
      return true
    } catch (error) {
      console.error("Error al eliminar curso:", error)
      toast.error("Error al eliminar el curso", {
        description: "Por favor, intenta nuevamente",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Cambia el estado de un curso
   */
  const changeStatus = async (
    courseId: number | string,
    currentStatus: CourseStatus,
    newStatus: CourseStatus
  ) => {
    switch (newStatus) {
      case "published":
        return await publishCourse(courseId)
      case "archived":
        return await archiveCourse(courseId)
      case "draft":
        if (currentStatus === "archived") {
          return await restoreCourse(courseId)
        }
        break
    }
    return false
  }

  return {
    isLoading,
    publishCourse,
    archiveCourse,
    restoreCourse,
    duplicateCourse,
    deleteCourse,
    changeStatus,
  }
}
