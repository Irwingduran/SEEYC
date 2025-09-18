"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, CreditCard } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Juan Carlos",
    lastName: "Mendoza",
    email: "juan.mendoza@email.com",
    phone: "+52 55 1234 5678",
    location: "Ciudad de México, México",
    bio: "Electricista con 8 años de experiencia en instalaciones residenciales y comerciales. Apasionado por las nuevas tecnologías en automatización.",
    joinDate: "Enero 2023",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data
  }

  const achievements = [
    { title: "Primera Certificación", date: "Marzo 2023", icon: "🏆" },
    { title: "Estudiante Dedicado", date: "Abril 2023", icon: "🔥" },
    { title: "Experto en Seguridad", date: "Junio 2023", icon: "🛡️" },
  ]

  const certificates = [
    { name: "Instalaciones Eléctricas Residenciales", date: "Marzo 2023", id: "CERT-001" },
    { name: "Seguridad Eléctrica", date: "Junio 2023", id: "CERT-002" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold">
              <span className="text-primary">Mi</span> Perfil
            </h1>
            <p className="text-muted-foreground">Gestiona tu información personal y configuración de cuenta</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="billing">Facturación</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="lg:col-span-2 border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Información Personal</CardTitle>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        className={!isEditing ? "bg-transparent" : ""}
                      >
                        {isEditing ? "Guardar Cambios" : "Editar Perfil"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/user-avatar.jpg" alt="Profile" />
                          <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                            JM
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">
                          {profileData.firstName} {profileData.lastName}
                        </h3>
                        <p className="text-muted-foreground">Estudiante Activo</p>
                        <Badge variant="secondary">Miembro desde {profileData.joinDate}</Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements & Certificates */}
                <div className="space-y-6">
                  {/* Achievements */}
                  <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Logros Recientes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Certificates */}
                  <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Certificados</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {certificates.map((cert, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/30 space-y-2">
                          <h4 className="font-medium text-sm">{cert.name}</h4>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{cert.date}</span>
                            <span>{cert.id}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Seguridad de la Cuenta</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">Cambiar Contraseña</h4>
                        <p className="text-sm text-muted-foreground">
                          Actualiza tu contraseña regularmente para mantener tu cuenta segura
                        </p>
                      </div>
                      <Button variant="outline" className="bg-transparent">
                        Cambiar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">Autenticación de Dos Factores</h4>
                        <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
                      </div>
                      <Button variant="outline" className="bg-transparent">
                        Configurar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Preferencias de Notificación</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Configuración de notificaciones próximamente...</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Información de Facturación</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Información de facturación próximamente...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
