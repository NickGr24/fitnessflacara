// Site configuration
export const SITE_CONFIG = {
  name: 'Fitness Flacăra',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fitnessflacara.md',
  defaultLocale: 'ro',
  supportedLocales: ['ro', 'ru'],
} as const

// Contact information
export const CONTACT_INFO = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@fitnessflacara.md',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+373 22 123 456',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+37322123456',
  address: {
    ro: 'Str. Fitness 123, Chișinău, Moldova',
    ru: 'ул. Фитнес 123, Кишинев, Молдова'
  },
  hours: {
    ro: 'L-V: 06:00-23:00, S-D: 08:00-22:00',
    ru: 'Пн-Пт: 06:00-23:00, Сб-Вс: 08:00-22:00'
  }
} as const

// Navigation items
export const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/despre' },
  { key: 'trainers', href: '/antrenori' },
  { key: 'schedule', href: '/orar' },
  { key: 'contact', href: '/contact' },
] as const

// Facility types
export const FACILITY_TYPES = {
  POOL: 'pool',
  SPA: 'spa', 
  STRENGTH: 'strength',
  CARDIO: 'cardio',
  GROUP: 'group'
} as const

// Class intensities
export const CLASS_INTENSITIES = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  EXTREME: 4
} as const

// Days of week (0 = Sunday)
export const DAYS_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
} as const

// Social media platforms
export const SOCIAL_PLATFORMS = {
  INSTAGRAM: 'ig',
  FACEBOOK: 'fb',
  YOUTUBE: 'yt',
  TELEGRAM: 'telegram',
  WHATSAPP: 'whatsapp'
} as const

// Form validation
export const FORM_VALIDATION = {
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_MESSAGE_LENGTH: 500
} as const

// Performance targets
export const PERFORMANCE_TARGETS = {
  LCP: 2000, // ms
  CLS: 0.05,
  INP: 200, // ms
  FCP: 1500, // ms
} as const