export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  students: number
  rating: number
  price: number
  level: "Principiante" | "Intermedio" | "Avanzado"
  category: string
  image: string
  progress?: number
  isEnrolled?: boolean
}

export const coursesData: Course[] = [
  {
    id: "1",
    title: "Fundamentos de Instalaciones Eléctricas Residenciales",
    description:
      "Aprende los conceptos básicos de instalaciones eléctricas en viviendas, desde el cableado hasta los sistemas de protección.",
    instructor: "Ing. Carlos Mendoza",
    duration: "8 semanas",
    students: 1250,
    rating: 4.8,
    price: 89,
    level: "Principiante",
    category: "Instalaciones Residenciales",
    image: "/electrical-residential-installation.jpg",
  },
  {
    id: "2",
    title: "Sistemas de Automatización Industrial",
    description:
      "Domina los PLC, sensores y actuadores para crear sistemas de automatización eficientes en la industria.",
    instructor: "Ing. María González",
    duration: "12 semanas",
    students: 890,
    rating: 4.9,
    price: 149,
    level: "Avanzado",
    category: "Automatización",
    image: "/industrial-automation-plc.jpg",
  },
  {
    id: "3",
    title: "Energía Solar Fotovoltaica: Diseño e Instalación",
    description:
      "Diseña e instala sistemas solares fotovoltaicos desde cero, incluyendo cálculos de dimensionamiento y conexión a red.",
    instructor: "Ing. Roberto Silva",
    duration: "10 semanas",
    students: 2100,
    rating: 4.7,
    price: 129,
    level: "Intermedio",
    category: "Energías Renovables",
    image: "/solar-panels-installation.jpg",
  },
  {
    id: "4",
    title: "Seguridad Eléctrica y Prevención de Riesgos",
    description: "Protocolos de seguridad, uso de EPP y procedimientos para trabajar de forma segura con electricidad.",
    instructor: "Ing. Ana Rodríguez",
    duration: "6 semanas",
    students: 1800,
    rating: 4.9,
    price: 69,
    level: "Principiante",
    category: "Seguridad Eléctrica",
    image: "/electrical-safety-equipment.jpg",
  },
  {
    id: "5",
    title: "Motores Eléctricos: Mantenimiento y Reparación",
    description:
      "Técnicas avanzadas de diagnóstico, mantenimiento preventivo y reparación de motores eléctricos industriales.",
    instructor: "Ing. Luis Herrera",
    duration: "14 semanas",
    students: 650,
    rating: 4.8,
    price: 179,
    level: "Avanzado",
    category: "Mantenimiento",
    image: "/electric-motor-maintenance.jpg",
  },
  {
    id: "6",
    title: "Tableros Eléctricos y Sistemas de Protección",
    description: "Diseño, armado y configuración de tableros eléctricos con sistemas de protección modernos.",
    instructor: "Ing. Patricia López",
    duration: "9 semanas",
    students: 1100,
    rating: 4.6,
    price: 99,
    level: "Intermedio",
    category: "Sistemas Industriales",
    image: "/electrical-panel-protection-systems.jpg",
  },
]

export const courses = coursesData
