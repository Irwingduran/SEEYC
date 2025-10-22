// Tipos para el sistema de configuración

export interface PlatformSettings {
  general: GeneralSettings
  notifications: NotificationSettings
  security: SecuritySettings
  payments: PaymentSettings
  integrations: IntegrationSettings
  appearance: AppearanceSettings
  email: EmailSettings
}

export interface GeneralSettings {
  platformName: string
  platformDescription: string
  platformUrl: string
  supportEmail: string
  language: string
  timezone: string
  currency: string
  logo?: string
  favicon?: string
  termsOfServiceUrl?: string
  privacyPolicyUrl?: string
  contactPhone?: string
  contactAddress?: string
}

export interface NotificationSettings {
  enableEmailNotifications: boolean
  enablePushNotifications: boolean
  enableSMSNotifications: boolean

  // Notificaciones a estudiantes
  studentEnrollmentConfirmation: boolean
  studentCourseUpdates: boolean
  studentCompletionCertificates: boolean
  studentPaymentReceipts: boolean
  studentReminders: boolean

  // Notificaciones a instructores
  instructorNewEnrollment: boolean
  instructorCourseReviews: boolean
  instructorPaymentUpdates: boolean
  instructorStudentQuestions: boolean

  // Notificaciones a administradores
  adminNewUser: boolean
  adminNewCourse: boolean
  adminPaymentReceived: boolean
  adminSystemAlerts: boolean
}

export interface SecuritySettings {
  // Autenticación
  enableTwoFactorAuth: boolean
  requireEmailVerification: boolean
  allowSocialLogin: boolean
  socialProviders: {
    google: boolean
    facebook: boolean
    github: boolean
  }

  // Contraseñas
  minimumPasswordLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  passwordExpirationDays: number
  preventPasswordReuse: number

  // Sesiones
  sessionTimeout: number // en minutos
  maxConcurrentSessions: number

  // Seguridad adicional
  enableCaptcha: boolean
  maxLoginAttempts: number
  lockoutDuration: number // en minutos
  enableAuditLog: boolean
}

export interface PaymentSettings {
  enablePayments: boolean
  currency: string

  // Métodos de pago
  paymentMethods: {
    creditCard: boolean
    debitCard: boolean
    paypal: boolean
    stripe: boolean
    bankTransfer: boolean
  }

  // Comisiones
  platformCommission: number // porcentaje
  instructorPayout: number // porcentaje

  // Configuración
  minimumPurchaseAmount: number
  enableRefunds: boolean
  refundPeriodDays: number
  autoPayoutEnabled: boolean
  payoutFrequency: 'daily' | 'weekly' | 'monthly'

  // Impuestos
  enableTax: boolean
  taxRate: number
  taxName: string
}

export interface IntegrationSettings {
  // Analytics
  googleAnalyticsId?: string
  facebookPixelId?: string

  // Communication
  zoomApiKey?: string
  slackWebhookUrl?: string
  discordWebhookUrl?: string

  // Storage
  awsS3Enabled: boolean
  awsS3Bucket?: string
  awsS3Region?: string
  cloudinaryEnabled: boolean
  cloudinaryCloudName?: string

  // Email services
  sendgridApiKey?: string
  mailchimpApiKey?: string

  // Payment gateways
  stripePublicKey?: string
  stripeSecretKey?: string
  paypalClientId?: string

  // Other
  recaptchaSiteKey?: string
  recaptchaSecretKey?: string

  // Webhooks
  webhooks: WebhookConfig[]
}

export interface WebhookConfig {
  id: string
  name: string
  url: string
  events: string[]
  enabled: boolean
  secret?: string
}

export interface AppearanceSettings {
  // Tema
  defaultTheme: 'light' | 'dark' | 'system'
  allowThemeSwitch: boolean

  // Colores
  primaryColor: string
  secondaryColor: string
  accentColor: string

  // Tipografía
  fontFamily: string
  fontSize: 'small' | 'medium' | 'large'

  // Logo y branding
  logo?: string
  logoLight?: string
  logoDark?: string
  favicon?: string

  // Personalización
  customCSS?: string
  customHTML?: string

  // Layout
  sidebarPosition: 'left' | 'right'
  navbarStyle: 'fixed' | 'static'
}

export interface EmailSettings {
  // SMTP Configuration
  smtpEnabled: boolean
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPassword: string
  smtpSecure: boolean
  smtpFromEmail: string
  smtpFromName: string

  // Email templates
  emailTemplates: {
    welcomeEmail: EmailTemplate
    enrollmentConfirmation: EmailTemplate
    courseCompletion: EmailTemplate
    passwordReset: EmailTemplate
    paymentReceipt: EmailTemplate
  }
}

export interface EmailTemplate {
  enabled: boolean
  subject: string
  body: string
  variables: string[]
}

export interface SettingsFormData {
  [key: string]: any
}
