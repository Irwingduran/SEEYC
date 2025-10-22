"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Plus, Search, ThumbsUp, Reply, Pin, Flag, Eye, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    role: "student" | "instructor" | "admin"
    reputation: number
  }
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  views: number
  likes: number
  dislikes: number
  replies: ForumReply[]
  isPinned: boolean
  isSolved: boolean
  isLocked: boolean
}

interface ForumReply {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    role: "student" | "instructor" | "admin"
    reputation: number
  }
  createdAt: Date
  likes: number
  dislikes: number
  isAcceptedAnswer: boolean
  parentReplyId?: string
}

interface DiscussionForumProps {
  courseId?: string
  lessonId?: string
}

export function DiscussionForum({ courseId, lessonId }: DiscussionForumProps) {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "solved" | "unanswered">("recent")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "", tags: "" })
  const [newReply, setNewReply] = useState("")

  // Mock data - in real app would come from API
  useEffect(() => {
    const mockPosts: ForumPost[] = [
      {
        id: "1",
        title: "¿Cómo calcular la sección de cable para una instalación residencial?",
        content:
          "Estoy trabajando en un proyecto de instalación eléctrica residencial y necesito ayuda para calcular la sección correcta del cable. La carga total es de 8000W y la distancia es de 25 metros. ¿Qué factores debo considerar?",
        author: {
          id: "user1",
          name: "Carlos Mendoza",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "student",
          reputation: 150,
        },
        category: "Instalaciones Residenciales",
        tags: ["cables", "cálculos", "residencial"],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        views: 45,
        likes: 8,
        dislikes: 0,
        replies: [
          {
            id: "r1",
            content:
              "Para calcular la sección del cable debes considerar: 1) La corriente nominal (I = P/V), 2) La caída de tensión permitida (máximo 3%), 3) La temperatura ambiente, 4) El tipo de instalación. Con 8000W a 220V tienes aproximadamente 36A. Para 25m de distancia, recomendaría cable de 6mm² como mínimo.",
            author: {
              id: "instructor1",
              name: "Ing. María González",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "instructor",
              reputation: 850,
            },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            likes: 12,
            dislikes: 0,
            isAcceptedAnswer: true,
          },
        ],
        isPinned: false,
        isSolved: true,
        isLocked: false,
      },
      {
        id: "2",
        title: "Problema con PLC Siemens S7-1200 - No se conecta",
        content:
          "Tengo un PLC Siemens S7-1200 que no logro conectar con TIA Portal. Ya verifiqué la configuración de red y el cable Ethernet. ¿Alguien ha tenido este problema?",
        author: {
          id: "user2",
          name: "Ana Rodríguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "student",
          reputation: 75,
        },
        category: "Automatización",
        tags: ["PLC", "Siemens", "TIA Portal", "conexión"],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        views: 23,
        likes: 3,
        dislikes: 0,
        replies: [
          {
            id: "r2",
            content:
              "Revisa si el firewall de Windows está bloqueando la conexión. También verifica que la dirección IP del PLC esté en el mismo rango que tu PC.",
            author: {
              id: "user3",
              name: "Roberto Silva",
              avatar: "/placeholder.svg?height=40&width=40",
              role: "student",
              reputation: 200,
            },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes: 5,
            dislikes: 0,
            isAcceptedAnswer: false,
          },
        ],
        isPinned: true,
        isSolved: false,
        isLocked: false,
      },
    ]
    setPosts(mockPosts)
  }, [])

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likes + b.views - (a.likes + a.views)
        case "solved":
          return Number(b.isSolved) - Number(a.isSolved)
        case "unanswered":
          return a.replies.length - b.replies.length
        default:
          return b.updatedAt.getTime() - a.updatedAt.getTime()
      }
    })

  const categories = ["all", ...Array.from(new Set(posts.map((post) => post.category)))]

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        id: "current-user",
        name: "Usuario Actual",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "student",
        reputation: 50,
      },
      category: newPost.category || "General",
      tags: newPost.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0,
      dislikes: 0,
      replies: [],
      isPinned: false,
      isSolved: false,
      isLocked: false,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost({ title: "", content: "", category: "", tags: "" })
    setShowNewPostForm(false)
  }

  const handleReply = (postId: string) => {
    if (!newReply.trim()) return

    const reply: ForumReply = {
      id: Date.now().toString(),
      content: newReply,
      author: {
        id: "current-user",
        name: "Usuario Actual",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "student",
        reputation: 50,
      },
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      isAcceptedAnswer: false,
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, replies: [...post.replies, reply], updatedAt: new Date() } : post,
      ),
    )
    setNewReply("")
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace menos de 1 hora"
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`

    const diffInDays = Math.floor(diffInHours / 24)
    return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "instructor":
        return "text-blue-600 bg-blue-100"
      case "admin":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  if (selectedPost) {
    return (
      <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)} className="mb-2">
                ← Volver al foro
              </Button>
              <div className="flex items-center space-x-2">
                {selectedPost.isPinned && <Pin className="h-4 w-4 text-primary" />}
                {selectedPost.isSolved && <CheckCircle className="h-4 w-4 text-green-600" />}
                <CardTitle className="text-xl">{selectedPost.title}</CardTitle>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={selectedPost.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedPost.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{selectedPost.author.name}</span>
                  <Badge className={cn("text-xs", getRoleColor(selectedPost.author.role))}>
                    {selectedPost.author.role === "instructor"
                      ? "Instructor"
                      : selectedPost.author.role === "admin"
                        ? "Admin"
                        : "Estudiante"}
                  </Badge>
                </div>
                <span>{formatTimeAgo(selectedPost.createdAt)}</span>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{selectedPost.views}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Original Post */}
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p>{selectedPost.content}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {selectedPost.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Respuestas ({selectedPost.replies.length})</h3>

            {selectedPost.replies.map((reply) => (
              <div
                key={reply.id}
                className={cn(
                  "p-4 rounded-lg border",
                  reply.isAcceptedAnswer ? "bg-green-50 border-green-200" : "bg-muted/30",
                )}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{reply.author.name}</span>
                      <Badge className={cn("text-xs", getRoleColor(reply.author.role))}>
                        {reply.author.role === "instructor"
                          ? "Instructor"
                          : reply.author.role === "admin"
                            ? "Admin"
                            : "Estudiante"}
                      </Badge>
                      {reply.isAcceptedAnswer && (
                        <Badge className="text-xs bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Respuesta aceptada
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">{formatTimeAgo(reply.createdAt)}</span>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {reply.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="h-3 w-3 mr-1" />
                        Responder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply Form */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium">Agregar respuesta</h4>
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setNewReply("")}>
                  Cancelar
                </Button>
                <Button onClick={() => handleReply(selectedPost.id)}>Publicar respuesta</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span>Foro de Discusión</span>
          </CardTitle>
          <Button onClick={() => setShowNewPostForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva pregunta
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en el foro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="popular">Más populares</SelectItem>
              <SelectItem value="solved">Resueltas</SelectItem>
              <SelectItem value="unanswered">Sin responder</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Forum Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary">{posts.length}</div>
            <div className="text-sm text-muted-foreground">Preguntas</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-green-600">{posts.filter((p) => p.isSolved).length}</div>
            <div className="text-sm text-muted-foreground">Resueltas</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-blue-600">
              {posts.reduce((acc, post) => acc + post.replies.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Respuestas</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-purple-600">{posts.reduce((acc, post) => acc + post.views, 0)}</div>
            <div className="text-sm text-muted-foreground">Visualizaciones</div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
                        {post.isSolved && <CheckCircle className="h-4 w-4 text-green-600" />}
                        <h3 className="font-medium hover:text-primary transition-colors">{post.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{post.author.name}</span>
                        <Badge className={cn("text-xs", getRoleColor(post.author.role))}>
                          {post.author.role === "instructor"
                            ? "Instructor"
                            : post.author.role === "admin"
                              ? "Admin"
                              : "Estudiante"}
                        </Badge>
                        <span>{formatTimeAgo(post.createdAt)}</span>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.replies.length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 border-0 bg-card/95 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle>Nueva pregunta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Título de tu pregunta"
                  value={newPost.title}
                  onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                />
                <Select
                  value={newPost.category}
                  onValueChange={(value) => setNewPost((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Describe tu pregunta en detalle..."
                  value={newPost.content}
                  onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                  className="min-h-[120px]"
                />
                <Input
                  placeholder="Etiquetas (separadas por comas)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost((prev) => ({ ...prev, tags: e.target.value }))}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreatePost}>Publicar pregunta</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
