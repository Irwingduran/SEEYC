"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Send, ThumbsUp, MessageCircle, Search } from "lucide-react"

interface DiscussionPanelProps {
  lessonId: number
  onClose: () => void
}

interface Discussion {
  id: number
  user: {
    name: string
    avatar: string
    role: "student" | "instructor"
  }
  content: string
  timestamp: Date
  likes: number
  replies: Discussion[]
  isLiked: boolean
}

export function DiscussionPanel({ lessonId, onClose }: DiscussionPanelProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      user: {
        name: "Carlos Rodríguez",
        avatar: "/professional-electrical-engineer.jpg",
        role: "instructor",
      },
      content: "¿Alguien puede explicar la diferencia entre un magnetotérmico y un diferencial?",
      timestamp: new Date("2024-01-15T10:30:00"),
      likes: 5,
      replies: [
        {
          id: 2,
          user: {
            name: "Ana García",
            avatar: "/professional-female-electrical-engineer.jpg",
            role: "student",
          },
          content:
            "El magnetotérmico protege contra sobrecargas y cortocircuitos, mientras que el diferencial protege contra fugas de corriente a tierra.",
          timestamp: new Date("2024-01-15T10:35:00"),
          likes: 8,
          replies: [],
          isLiked: true,
        },
      ],
      isLiked: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace unos minutos"
    if (diffInHours < 24) return `Hace ${diffInHours}h`
    return date.toLocaleDateString("es-ES")
  }

  const addMessage = () => {
    if (!newMessage.trim()) return

    const message: Discussion = {
      id: Date.now(),
      user: {
        name: "Tú",
        avatar: "",
        role: "student",
      },
      content: newMessage,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false,
    }

    setDiscussions([message, ...discussions])
    setNewMessage("")
  }

  const toggleLike = (discussionId: number) => {
    setDiscussions(
      discussions.map((discussion) => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            isLiked: !discussion.isLiked,
            likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
          }
        }
        return discussion
      }),
    )
  }

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-white/20 z-40">
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Discusión</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{discussions.length} mensajes</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar en discusión..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20"
          />
        </div>

        {/* Add Message */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Textarea
            placeholder="Hacer una pregunta o comentario..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="mb-2 bg-white/50 dark:bg-slate-800/50 border-white/20"
            rows={3}
          />
          <Button
            onClick={addMessage}
            size="sm"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4 mr-1" />
            Enviar Mensaje
          </Button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No hay mensajes aún</p>
              <p className="text-sm">Sé el primero en participar</p>
            </div>
          ) : (
            filteredDiscussions.map((discussion) => (
              <div key={discussion.id} className="space-y-3">
                {/* Main Message */}
                <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-white/20">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={discussion.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {discussion.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {discussion.user.name}
                        </span>
                        {discussion.user.role === "instructor" && (
                          <Badge variant="secondary" className="text-xs">
                            Instructor
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimeAgo(discussion.timestamp)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                        {discussion.content}
                      </p>

                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(discussion.id)}
                          className={`p-1 h-auto ${discussion.isLiked ? "text-blue-500" : "text-gray-500"}`}
                        >
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {discussion.likes}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(discussion.id)}
                          className="p-1 h-auto text-gray-500"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Responder
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {discussion.replies.map((reply) => (
                  <div key={reply.id} className="ml-6 p-3 bg-gray-50 dark:bg-slate-800/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {reply.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{reply.user.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimeAgo(reply.timestamp)}
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{reply.content}</p>

                        <Button
                          variant="ghost"
                          size="sm"
                          className={`p-1 h-auto ${reply.isLiked ? "text-blue-500" : "text-gray-500"}`}
                        >
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {reply.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded">
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{discussions.length}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Mensajes</div>
            </div>
            <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded">
              <div className="text-sm font-bold text-green-600 dark:text-green-400">
                {discussions.reduce((acc, d) => acc + d.likes, 0)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Likes</div>
            </div>
            <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded">
              <div className="text-sm font-bold text-purple-600 dark:text-purple-400">24</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Activos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
