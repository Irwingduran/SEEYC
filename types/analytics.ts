// Tipos para analytics

export interface AnalyticsMetrics {
  totalUsers: number
  totalCourses: number
  totalRevenue: number
  totalCertificates: number
  activeUsers: number
  completionRate: number
  averageProgress: number
}

export interface TrendData {
  label: string
  value: number
  change: number
}

export interface TopCourse {
  id: number
  title: string
  enrollments: number
  completionRate: number
  revenue: number
}
