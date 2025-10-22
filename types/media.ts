// Tipos para el sistema de biblioteca de medios

export type MediaType = "video" | "document" | "image" | "audio" | "other"
export type MediaStatus = "processing" | "ready" | "error"

export interface MediaFile {
  id: string
  name: string
  type: MediaType
  format: string // mp4, pdf, jpg, etc.
  size: number // en bytes
  url: string
  thumbnailUrl?: string
  duration?: number // para videos/audio en segundos
  uploadedBy: {
    id: string
    name: string
    avatar?: string
  }
  uploadedAt: string
  usedInCourses: number
  tags: string[]
  category?: string
  description?: string
  status: MediaStatus
  downloadUrl?: string
}

export interface MediaStats {
  totalFiles: number
  totalSize: number
  byType: {
    videos: number
    documents: number
    images: number
    audio: number
    other: number
  }
  recentUploads: number
}

export interface MediaFilters {
  search?: string
  type?: MediaType | "all"
  category?: string
  uploadedBy?: string
  dateFrom?: string
  dateTo?: string
  sortBy?: "recent" | "oldest" | "name" | "size" | "usage"
}
