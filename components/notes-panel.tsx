"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Edit3, Trash2, Clock, Search, Tag } from "lucide-react"

interface NotesPanelProps {
  lessonId: number
  currentTime: number
  onClose: () => void
}

interface Note {
  id: number
  timestamp: number
  content: string
  tags: string[]
  createdAt: Date
}

export function NotesPanel({ lessonId, currentTime, onClose }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      timestamp: 120,
      content: "Importante: Los cables de tierra siempre deben ser verdes o amarillo-verde según normativa.",
      tags: ["normativa", "seguridad"],
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      timestamp: 245,
      content: "Recordar: Calcular la sección del cable según la corriente máxima del circuito.",
      tags: ["cálculo", "cables"],
      createdAt: new Date("2024-01-15"),
    },
  ])

  const [newNote, setNewNote] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingNote, setEditingNote] = useState<number | null>(null)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const addNote = () => {
    if (!newNote.trim()) return

    const note: Note = {
      id: Date.now(),
      timestamp: currentTime,
      content: newNote,
      tags: [],
      createdAt: new Date(),
    }

    setNotes([note, ...notes])
    setNewNote("")
  }

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-white/20 z-40">
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mis Notas</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Add Note */}
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">{formatTime(currentTime)}</span>
          </div>
          <Textarea
            placeholder="Agregar nota en este momento..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mb-2 bg-white/50 dark:bg-slate-800/50 border-white/20"
            rows={3}
          />
          <Button
            onClick={addNote}
            size="sm"
            className="w-full bg-purple-500 hover:bg-purple-600"
            disabled={!newNote.trim()}
          >
            <Plus className="w-4 h-4 mr-1" />
            Agregar Nota
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar en notas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20"
          />
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Edit3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No hay notas aún</p>
              <p className="text-sm">Agrega tu primera nota arriba</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-white/20 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {formatTime(note.timestamp)}
                    </Badge>
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditingNote(note.id)} className="p-1 h-auto">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                      className="p-1 h-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{note.content}</p>

                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {note.createdAt.toLocaleDateString("es-ES")}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{notes.length}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total Notas</div>
            </div>
            <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {new Set(notes.flatMap((n) => n.tags)).size}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Etiquetas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
