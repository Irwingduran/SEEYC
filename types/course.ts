// Tipos para el sistema de cursos

export type CourseStatus = "published" | "draft" | "archived"
export type CourseLevel = "Básico" | "Intermedio" | "Avanzado" | "Experto"
export type LessonType = "video" | "text" | "quiz" | "assignment" | "resource"

export interface Instructor {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  title?: string
}

export interface CourseModule {
  id: number
  title: string
  description: string
  lessons: Lesson[]
  order: number
  duration?: string
  isPublished?: boolean
}

export interface Lesson {
  id: number
  moduleId: number
  title: string
  description?: string
  type: LessonType
  content: string
  duration?: string
  order: number
  resources?: Resource[]
  videoUrl?: string
  isPreview?: boolean
  isCompleted?: boolean
}

export interface Resource {
  id: number
  title: string
  type: "pdf" | "doc" | "video" | "link" | "image" | "other"
  url: string
  size?: string
  downloadable?: boolean
}

export interface CourseObjective {
  id: number
  text: string
  order: number
}

export interface CourseRequirement {
  id: number
  text: string
  order: number
}

export interface Course {
  id: number
  title: string
  subtitle?: string
  description: string
  category: string
  level: CourseLevel
  status: CourseStatus
  thumbnail?: string
  thumbnailUrl?: string

  // Contenido
  modules: CourseModule[]
  objectives?: CourseObjective[]
  requirements?: CourseRequirement[]

  // Metadata
  language: string
  duration: string
  price: number
  isFree?: boolean

  // Estadísticas
  students: number
  enrolledCount?: number
  completionRate?: number
  revenue: number
  rating: number
  reviews: number

  // Instructor
  instructor: Instructor
  instructorId: string

  // Configuración
  allowDownloads?: boolean
  hasCertificate?: boolean
  hasForum?: boolean
  lifetimeAccess?: boolean

  // Fechas
  createdAt: string
  updatedAt: string
  publishedAt?: string
  lastUpdated: string

  // Tags y SEO
  tags?: string[]
  slug?: string
  metaDescription?: string
  metaKeywords?: string[]
}

export interface CourseStats {
  totalCourses: number
  publishedCourses: number
  draftCourses: number
  archivedCourses: number
  totalStudents: number
  totalRevenue: number
  avgRating: number
  totalReviews: number
}

export interface CourseFilters {
  search?: string
  category?: string
  status?: CourseStatus | "all"
  level?: CourseLevel | "all"
  sortBy?: "recent" | "oldest" | "students" | "revenue" | "rating" | "title"
  instructorId?: string
}

export interface CourseFormData {
  title: string
  subtitle: string
  description: string
  category: string
  level: string
  language: string
  price: string
  thumbnail: string
  duration: string
  prerequisites: string
  objectives: string[]
  tags: string[]
  isFree: boolean
  isPublished: boolean

  // Configuración
  allowDownloads: boolean
  hasCertificate: boolean
  hasForum: boolean
  lifetimeAccess: boolean
}

export interface CourseAnalytics {
  courseId: number
  views: number
  enrollments: number
  completions: number
  averageProgress: number
  averageRating: number
  totalRevenue: number

  // Tendencias
  enrollmentTrend: TrendData[]
  revenueTrend: TrendData[]
  completionTrend: TrendData[]

  // Por periodo
  dailyStats: DailyStats[]
  weeklyStats: WeeklyStats[]
  monthlyStats: MonthlyStats[]

  // Demográficos
  studentsByCountry: CountryStats[]
  studentsByAge: AgeStats[]

  // Engagement
  averageWatchTime: number
  lessonsCompleted: number
  totalLessons: number
  dropOffPoints: DropOffPoint[]
}

export interface TrendData {
  date: string
  value: number
}

export interface DailyStats {
  date: string
  enrollments: number
  completions: number
  revenue: number
  activeUsers: number
}

export interface WeeklyStats {
  week: string
  enrollments: number
  completions: number
  revenue: number
  activeUsers: number
}

export interface MonthlyStats {
  month: string
  enrollments: number
  completions: number
  revenue: number
  activeUsers: number
}

export interface CountryStats {
  country: string
  students: number
  percentage: number
}

export interface AgeStats {
  ageRange: string
  students: number
  percentage: number
}

export interface DropOffPoint {
  lessonId: number
  lessonTitle: string
  moduleTitle: string
  dropOffRate: number
  studentsDropped: number
}

export interface CourseReview {
  id: number
  courseId: number
  studentId: string
  studentName: string
  studentAvatar?: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
  response?: {
    text: string
    respondedAt: string
    respondedBy: string
  }
}

export interface CourseEnrollment {
  id: number
  courseId: number
  studentId: string
  studentName: string
  studentEmail: string
  studentAvatar?: string
  enrolledAt: string
  lastAccessedAt?: string
  progress: number
  completedLessons: number
  totalLessons: number
  status: "active" | "completed" | "dropped"
  certificateIssued?: boolean
  certificateIssuedAt?: string
}
