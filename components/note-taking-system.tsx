"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  StickyNote,
  Plus,
  Search,
  Clock,
  Tag,
  Bookmark,
  Share,
  Trash2,
  Pin,
  FileText,
  Highlighter,
  Camera,
  Mic,
  Play,
  Square,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Note {
  id: string
  title: string
  content: string
  type: "text" | "highlight" | "bookmark" | "audio" | "image"
  timestamp: number // Video timestamp in seconds
  lessonId: string
  courseId: string
  tags: string[]
  color: "yellow" | "blue" | "green" | "pink" | "purple"
  createdAt: Date
  updatedAt: Date
  isPinned: boolean
}

interface NoteTakingSystemProps {
  courseId: string
  lessonId: string
  currentTime?: number
  onSeekTo?: (time: number) => void
}

export function NoteTakingSystem({ courseId, lessonId, currentTime = 0, onSeekTo }: NoteTakingSystemProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"recent" | "timestamp" | "title">("timestamp")
  const [showNewNoteForm, setShowNewNoteForm] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    type: "text" as Note["type"],
    color: "yellow" as Note["color"],
    tags: "",
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${courseId}-${lessonId}`)
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [courseId, lessonId])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(`notes-${courseId}-${lessonId}`, JSON.stringify(notes))
  }, [notes, courseId, lessonId])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Ahora"
    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `Hace ${diffInHours}h`

    const diffInDays = Math.floor(diffInHours / 24)
    return `Hace ${diffInDays}d`
  }

  const handleCreateNote = () => {
    if (!newNote.title && !newNote.content) return

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title || `Nota ${formatTime(currentTime)}`,
      content: newNote.content,
      type: newNote.type,
      timestamp: currentTime,
      lessonId,
      courseId,
      tags: newNote.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      color: newNote.color,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
    }

    setNotes((prev) => [note, ...prev])
    setNewNote({ title: "", content: "", type: "text", color: "yellow", tags: "" })
    setShowNewNoteForm(false)
  }

  const handleQuickNote = (type: Note["type"]) => {
    const note: Note = {
      id: Date.now().toString(),
      title: `${type === "bookmark" ? "Marcador" : type === "highlight" ? "Destacado" : "Nota"} ${formatTime(currentTime)}`,
      content: type === "bookmark" ? "Momento importante del video" : "",
      type,
      timestamp: currentTime,
      lessonId,
      courseId,
      tags: [],
      color: type === "bookmark" ? "blue" : type === "highlight" ? "yellow" : "green",
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
    }

    setNotes((prev) => [note, ...prev])
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
    if (selectedNote?.id === noteId) {
      setSelectedNote(null)
    }
  }

  const handleTogglePin = (noteId: string) => {
    setNotes((prev) => prev.map((note) => (note.id === noteId ? { ...note, isPinned: !note.isPinned } : note)))
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const audioChunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)

        const note: Note = {
          id: Date.now().toString(),
          title: `Audio ${formatTime(currentTime)}`,
          content: audioUrl,
          type: "audio",
          timestamp: currentTime,
          lessonId,
          courseId,
          tags: [],
          color: "purple",
          createdAt: new Date(),
          updatedAt: new Date(),
          isPinned: false,
        }

        setNotes((prev) => [note, ...prev])
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = filterType === "all" || note.type === filterType

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      // Pinned notes always come first
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1

      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "timestamp":
          return a.timestamp - b.timestamp
        default:
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

  const noteTypeIcons = {
    text: FileText,
    highlight: Highlighter,
    bookmark: Bookmark,
    audio: Mic,
    image: Camera,
  }

  const colorClasses = {
    yellow: "bg-yellow-100 border-yellow-300 text-yellow-900",
    blue: "bg-blue-100 border-blue-300 text-blue-900",
    green: "bg-green-100 border-green-300 text-green-900",
    pink: "bg-pink-100 border-pink-300 text-pink-900",
    purple: "bg-purple-100 border-purple-300 text-purple-900",
  }

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center space-x-2">
            <StickyNote className="h-5 w-5 text-primary" />
            <span>Mis Notas</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleQuickNote("bookmark")} title="Marcar momento">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleQuickNote("highlight")} title="Destacar">
              <Highlighter className="h-4 w-4" />
            </Button>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={isRecording ? stopRecording : startRecording}
              title={isRecording ? "Detener grabación" : "Grabar audio"}
            >
              {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isRecording && <span className="ml-1 text-xs">{formatTime(recordingTime)}</span>}
            </Button>
            <Button size="sm" onClick={() => setShowNewNoteForm(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar notas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="highlight">Destacadas</SelectItem>
              <SelectItem value="bookmark">Marcadores</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recientes</SelectItem>
              <SelectItem value="timestamp">Tiempo</SelectItem>
              <SelectItem value="title">Título</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notes List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <StickyNote className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No hay notas aún</p>
              <p className="text-sm">Crea tu primera nota para este video</p>
            </div>
          ) : (
            filteredNotes.map((note) => {
              const Icon = noteTypeIcons[note.type]
              return (
                <div
                  key={note.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all",
                    colorClasses[note.color],
                  )}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        {note.isPinned && <Pin className="h-3 w-3" />}
                        <span className="font-medium text-sm">{note.title}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSeekTo?.(note.timestamp)
                          }}
                          title="Ir al momento del video"
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                      {note.content && note.type !== "audio" && (
                        <p className="text-xs line-clamp-2 opacity-80">{note.content}</p>
                      )}
                      {note.type === "audio" && (
                        <audio controls className="w-full h-8">
                          <source src={note.content} type="audio/wav" />
                        </audio>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs opacity-70">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(note.timestamp)}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(note.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTogglePin(note.id)
                            }}
                          >
                            <Pin className={cn("h-3 w-3", note.isPinned && "fill-current")} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-60 hover:opacity-100 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteNote(note.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* New Note Form */}
        {showNewNoteForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-lg mx-4 border-0 bg-card/95 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Nueva Nota</CardTitle>
                <p className="text-sm text-muted-foreground">Tiempo: {formatTime(currentTime)}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Título de la nota (opcional)"
                  value={newNote.title}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, title: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={newNote.type}
                    onValueChange={(value: Note["type"]) => setNewNote((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="highlight">Destacado</SelectItem>
                      <SelectItem value="bookmark">Marcador</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={newNote.color}
                    onValueChange={(value: Note["color"]) => setNewNote((prev) => ({ ...prev, color: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yellow">Amarillo</SelectItem>
                      <SelectItem value="blue">Azul</SelectItem>
                      <SelectItem value="green">Verde</SelectItem>
                      <SelectItem value="pink">Rosa</SelectItem>
                      <SelectItem value="purple">Morado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Contenido de la nota..."
                  value={newNote.content}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
                  className="min-h-[100px]"
                />
                <Input
                  placeholder="Etiquetas (separadas por comas)"
                  value={newNote.tags}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, tags: e.target.value }))}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewNoteForm(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateNote}>Crear nota</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Note Detail Modal */}
        {selectedNote && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 border-0 bg-card/95 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {React.createElement(noteTypeIcons[selectedNote.type], { className: "h-5 w-5" })}
                      <CardTitle className="text-lg">{selectedNote.title}</CardTitle>
                      {selectedNote.isPinned && <Pin className="h-4 w-4 fill-current" />}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(selectedNote.timestamp)}</span>
                      </div>
                      <span>{formatTimeAgo(selectedNote.createdAt)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSeekTo?.(selectedNote.timestamp)}
                        className="h-6 px-2"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Ir al momento
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedNote(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedNote.type === "audio" ? (
                  <audio controls className="w-full">
                    <source src={selectedNote.content} type="audio/wav" />
                  </audio>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{selectedNote.content}</p>
                  </div>
                )}
                {selectedNote.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedNote.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleTogglePin(selectedNote.id)}>
                      <Pin className="h-4 w-4 mr-1" />
                      {selectedNote.isPinned ? "Desfijar" : "Fijar"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Compartir
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      handleDeleteNote(selectedNote.id)
                      setSelectedNote(null)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
