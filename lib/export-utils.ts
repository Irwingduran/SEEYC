import type { Course } from "@/types/course"

/**
 * Exporta datos de cursos a formato CSV
 */
export function exportCoursesToCSV(courses: Course[], filename: string = "cursos") {
  // Definir las columnas del CSV
  const headers = [
    "ID",
    "Título",
    "Categoría",
    "Nivel",
    "Estado",
    "Estudiantes",
    "Rating",
    "Reseñas",
    "Precio",
    "Ingresos",
    "Módulos",
    "Lecciones",
    "Duración",
    "Instructor",
    "Fecha Creación",
    "Última Actualización",
  ]

  // Convertir cursos a filas de CSV
  const rows = courses.map((course) => [
    course.id,
    `"${course.title}"`, // Comillas para manejar comas en el título
    `"${course.category}"`,
    course.level,
    course.status,
    course.students,
    course.rating,
    course.reviews,
    course.price,
    course.revenue,
    course.modules.length,
    course.modules.reduce((sum, module) => sum + module.lessons.length, 0),
    `"${course.duration}"`,
    `"${course.instructor.name}"`,
    course.createdAt || course.created,
    course.lastUpdated,
  ])

  // Crear contenido CSV
  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  // Crear y descargar archivo
  downloadFile(csvContent, `${filename}.csv`, "text/csv")
}

/**
 * Exporta datos de cursos a formato JSON
 */
export function exportCoursesToJSON(courses: Course[], filename: string = "cursos") {
  const jsonContent = JSON.stringify(courses, null, 2)
  downloadFile(jsonContent, `${filename}.json`, "application/json")
}

/**
 * Exporta estadísticas resumidas de cursos
 */
export function exportCourseStats(courses: Course[], filename: string = "estadisticas-cursos") {
  const stats = {
    resumen: {
      totalCursos: courses.length,
      cursosPublicados: courses.filter((c) => c.status === "published").length,
      cursosBorrador: courses.filter((c) => c.status === "draft").length,
      cursosArchivados: courses.filter((c) => c.status === "archived").length,
      totalEstudiantes: courses.reduce((sum, c) => sum + c.students, 0),
      totalIngresos: courses.reduce((sum, c) => sum + c.revenue, 0),
      ratingPromedio:
        courses.filter((c) => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) /
        courses.filter((c) => c.rating > 0).length,
    },
    porCategoria: getCourseStatsByCategory(courses),
    porNivel: getCourseStatsByLevel(courses),
    topCursos: getTopCourses(courses),
    fecha: new Date().toISOString(),
  }

  const jsonContent = JSON.stringify(stats, null, 2)
  downloadFile(jsonContent, `${filename}.json`, "application/json")
}

/**
 * Estadísticas por categoría
 */
function getCourseStatsByCategory(courses: Course[]) {
  const categories = new Map<string, any>()

  courses.forEach((course) => {
    if (!categories.has(course.category)) {
      categories.set(course.category, {
        nombre: course.category,
        totalCursos: 0,
        estudiantes: 0,
        ingresos: 0,
        ratingPromedio: 0,
        ratings: [],
      })
    }

    const cat = categories.get(course.category)!
    cat.totalCursos++
    cat.estudiantes += course.students
    cat.ingresos += course.revenue
    if (course.rating > 0) {
      cat.ratings.push(course.rating)
    }
  })

  // Calcular promedios
  const result: any[] = []
  categories.forEach((cat) => {
    cat.ratingPromedio = cat.ratings.length > 0 ? cat.ratings.reduce((a: number, b: number) => a + b, 0) / cat.ratings.length : 0
    delete cat.ratings
    result.push(cat)
  })

  return result.sort((a, b) => b.ingresos - a.ingresos)
}

/**
 * Estadísticas por nivel
 */
function getCourseStatsByLevel(courses: Course[]) {
  const levels = new Map<string, any>()

  courses.forEach((course) => {
    if (!levels.has(course.level)) {
      levels.set(course.level, {
        nivel: course.level,
        totalCursos: 0,
        estudiantes: 0,
        ingresos: 0,
      })
    }

    const level = levels.get(course.level)!
    level.totalCursos++
    level.estudiantes += course.students
    level.ingresos += course.revenue
  })

  return Array.from(levels.values()).sort((a, b) => b.totalCursos - a.totalCursos)
}

/**
 * Top 10 cursos por diferentes métricas
 */
function getTopCourses(courses: Course[]) {
  return {
    porEstudiantes: courses
      .slice()
      .sort((a, b) => b.students - a.students)
      .slice(0, 10)
      .map((c) => ({ id: c.id, titulo: c.title, estudiantes: c.students })),
    porIngresos: courses
      .slice()
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)
      .map((c) => ({ id: c.id, titulo: c.title, ingresos: c.revenue })),
    porRating: courses
      .filter((c) => c.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((c) => ({ id: c.id, titulo: c.title, rating: c.rating, resenas: c.reviews })),
  }
}

/**
 * Función auxiliar para descargar archivos
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Exporta un curso individual con todos sus detalles
 */
export function exportCourseDetails(course: Course, filename?: string) {
  const details = {
    informacionBasica: {
      id: course.id,
      titulo: course.title,
      subtitulo: course.subtitle,
      descripcion: course.description,
      categoria: course.category,
      nivel: course.level,
      estado: course.status,
      idioma: course.language,
      duracion: course.duration,
    },
    contenido: {
      totalModulos: course.modules.length,
      totalLecciones: course.modules.reduce((sum, m) => sum + m.lessons.length, 0),
      modulos: course.modules.map((module) => ({
        titulo: module.title,
        descripcion: module.description,
        lecciones: module.lessons.length,
        duracion: module.duration,
      })),
    },
    estadisticas: {
      estudiantes: course.students,
      rating: course.rating,
      resenas: course.reviews,
      ingresos: course.revenue,
      tasaCompletacion: course.completionRate,
    },
    precio: {
      monto: course.price,
      esGratuito: course.isFree,
    },
    configuracion: {
      permitirDescargas: course.allowDownloads,
      tieneCertificado: course.hasCertificate,
      tieneForo: course.hasForum,
      accesoVitalicio: course.lifetimeAccess,
    },
    instructor: {
      nombre: course.instructor.name,
      email: course.instructor.email,
    },
    fechas: {
      creacion: course.createdAt || course.created,
      actualizacion: course.lastUpdated,
      publicacion: course.publishedAt,
    },
  }

  const jsonContent = JSON.stringify(details, null, 2)
  const fname = filename || `curso-${course.id}-${course.title.toLowerCase().replace(/\s+/g, "-")}`
  downloadFile(jsonContent, `${fname}.json`, "application/json")
}
