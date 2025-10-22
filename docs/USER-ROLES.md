# Sistema de Roles de Usuario

## Descripción General

La plataforma "Eléctricos Especializados y Capacitación" utiliza un sistema de roles simplificado con dos tipos principales de usuarios:

## Roles Disponibles

### 1. Administrador/Instructor (Admin-Instructor)

**Descripción:** Rol unificado que combina capacidades administrativas y de enseñanza.

**Permisos:**

#### Administración de Plataforma
- ✅ Ver y gestionar todos los usuarios
- ✅ Aprobar y moderar contenido
- ✅ Acceder a analíticas completas de la plataforma
- ✅ Gestionar configuración del sistema
- ✅ Procesar pagos y reembolsos
- ✅ Configurar integraciones
- ✅ Generar reportes financieros
- ✅ Monitorear salud del sistema

#### Gestión de Enseñanza
- ✅ Crear y publicar cursos
- ✅ Gestionar contenido educativo
- ✅ Comunicarse con estudiantes
- ✅ Calificar y evaluar trabajos
- ✅ Generar certificados
- ✅ Programar sesiones en vivo
- ✅ Acceder a analíticas de cursos
- ✅ Usar herramientas de instructor

**Acceso a:**
- Panel Unificado (`/admin-instructor`)
- Todas las funcionalidades de la plataforma
- Configuración avanzada del sistema

**Casos de Uso:**
- Propietario de la plataforma
- Director académico
- Instructor principal con responsabilidades administrativas
- Gerente de operaciones educativas

### 2. Estudiante (Student)

**Descripción:** Usuario que consume contenido educativo y participa en cursos.

**Permisos:**
- ✅ Inscribirse en cursos
- ✅ Ver contenido de cursos inscritos
- ✅ Completar lecciones y evaluaciones
- ✅ Participar en discusiones
- ✅ Enviar mensajes a instructores
- ✅ Ver su progreso y calificaciones
- ✅ Descargar certificados completados
- ✅ Gestionar su perfil personal
- ✅ Realizar pagos de cursos

**Acceso a:**
- Dashboard de Aprendizaje (`/learning`)
- Catálogo de Cursos (`/courses`)
- Reproductor de Cursos (`/courses/[id]/learn`)
- Perfil Personal (`/profile`)

**Casos de Uso:**
- Profesionales buscando capacitación
- Estudiantes de electricidad
- Técnicos en actualización
- Personas interesadas en aprender

## Comparación de Roles

| Funcionalidad | Admin-Instructor | Estudiante |
|---------------|------------------|------------|
| Ver cursos públicos | ✅ | ✅ |
| Inscribirse en cursos | ✅ | ✅ |
| Crear cursos | ✅ | ❌ |
| Aprobar contenido | ✅ | ❌ |
| Gestionar usuarios | ✅ | ❌ |
| Ver analíticas de plataforma | ✅ | ❌ |
| Calificar estudiantes | ✅ | ❌ |
| Configurar sistema | ✅ | ❌ |
| Ver finanzas | ✅ | ❌ |
| Participar en discusiones | ✅ | ✅ |
| Descargar certificados | ✅ | ✅ |
| Editar perfil propio | ✅ | ✅ |

## Asignación de Roles

### Proceso de Asignación

1. **Registro Inicial**
   - Todos los nuevos usuarios se registran como Estudiantes por defecto
   - Completan formulario de registro básico
   - Verifican email

2. **Promoción a Admin-Instructor**
   - Solo un Admin-Instructor existente puede promover usuarios
   - Proceso:
     1. Ir a Panel Unificado → Usuarios
     2. Buscar usuario a promover
     3. Seleccionar "Cambiar Rol"
     4. Elegir "Administrador/Instructor"
     5. Confirmar cambio

3. **Degradación de Rol**
   - Admin-Instructor puede cambiar rol de vuelta a Estudiante
   - Se mantiene historial de cambios de rol
   - Usuario recibe notificación del cambio

## Permisos Especiales

### Permisos Granulares (Futuro)

En versiones futuras se implementarán permisos más específicos:

- **Solo Instructor:** Puede crear cursos pero no gestionar plataforma
- **Moderador:** Puede aprobar contenido pero no acceder a finanzas
- **Analista:** Solo acceso a reportes y analíticas
- **Soporte:** Puede gestionar tickets pero no modificar cursos

## Seguridad y Acceso

### Protección de Rutas

\`\`\`typescript
// Rutas protegidas por rol
const roleProtectedRoutes = {
  '/admin-instructor': ['admin-instructor'],
  '/learning': ['student', 'admin-instructor'],
  '/courses/[id]/learn': ['student', 'admin-instructor'],
  '/profile': ['student', 'admin-instructor'],
}
\`\`\`

### Middleware de Autenticación

- Verifica token JWT en cada request
- Valida rol del usuario contra ruta solicitada
- Redirige a login si no autenticado
- Muestra error 403 si rol insuficiente

## Mejores Prácticas

### Para Administradores

1. **Asignación Cuidadosa**
   - Solo promover usuarios de confianza
   - Documentar razón del cambio de rol
   - Revisar actividad regularmente

2. **Auditoría**
   - Revisar logs de acciones administrativas
   - Monitorear cambios en configuración
   - Verificar integridad de datos

3. **Comunicación**
   - Notificar a usuarios sobre cambios de rol
   - Proporcionar capacitación para nuevos admin-instructors
   - Mantener documentación actualizada

### Para Estudiantes

1. **Seguridad de Cuenta**
   - Usar contraseña fuerte
   - Habilitar 2FA si está disponible
   - No compartir credenciales

2. **Uso Apropiado**
   - Respetar términos de servicio
   - No intentar acceder a áreas restringidas
   - Reportar problemas de seguridad

## Migración de Roles Antiguos

Si la plataforma tenía roles separados anteriormente:

### Mapeo de Roles Antiguos

- `admin` → `admin-instructor`
- `instructor` → `admin-instructor`
- `student` → `student`
- `moderator` → `admin-instructor` (con permisos limitados)

### Script de Migración

\`\`\`sql
-- Unificar roles admin e instructor
UPDATE users 
SET role = 'admin-instructor' 
WHERE role IN ('admin', 'instructor');

-- Mantener estudiantes
UPDATE users 
SET role = 'student' 
WHERE role = 'student';
\`\`\`

## Preguntas Frecuentes

**P: ¿Puede un Admin-Instructor también ser estudiante?**
R: Sí, los Admin-Instructors tienen todos los permisos de estudiante además de sus capacidades administrativas.

**P: ¿Cuántos Admin-Instructors puede haber?**
R: No hay límite técnico, pero se recomienda mantener el número bajo por seguridad.

**P: ¿Puede un estudiante ver el panel de administración?**
R: No, los estudiantes solo tienen acceso a su dashboard de aprendizaje y cursos.

**P: ¿Cómo solicito ser Admin-Instructor?**
R: Contacta al administrador actual de la plataforma. No hay proceso de auto-promoción.

**P: ¿Se pierden datos al cambiar de rol?**
R: No, todos los datos del usuario se mantienen independientemente del rol.
