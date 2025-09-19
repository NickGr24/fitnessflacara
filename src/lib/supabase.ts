import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type Database = {
  public: {
    Tables: {
      trainers: {
        Row: {
          id: string
          name: string
          role: string
          bio_ro: string | null
          bio_ru: string | null
          specialties: string[]
          socials: {
            ig?: string
            fb?: string
            yt?: string
          } | null
          photo: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio_ro?: string | null
          bio_ru?: string | null
          specialties?: string[]
          socials?: {
            ig?: string
            fb?: string
            yt?: string
          } | null
          photo?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio_ro?: string | null
          bio_ru?: string | null
          specialties?: string[]
          socials?: {
            ig?: string
            fb?: string
            yt?: string
          } | null
          photo?: string | null
          created_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          title_ro: string
          title_ru: string
          type: string
          intensity: number
          duration_min: number
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title_ro: string
          title_ru: string
          type: string
          intensity: number
          duration_min: number
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title_ro?: string
          title_ru?: string
          type?: string
          intensity?: number
          duration_min?: number
          icon?: string | null
          created_at?: string
        }
      }
      schedule: {
        Row: {
          id: string
          class_id: string
          trainer_id: string
          day_of_week: number
          start_time: string
          room: string
          capacity: number
          spots_left: number
          created_at: string
        }
        Insert: {
          id?: string
          class_id: string
          trainer_id: string
          day_of_week: number
          start_time: string
          room: string
          capacity: number
          spots_left?: number
          created_at?: string
        }
        Update: {
          id?: string
          class_id?: string
          trainer_id?: string
          day_of_week?: number
          start_time?: string
          room?: string
          capacity?: number
          spots_left?: number
          created_at?: string
        }
      }
      memberships: {
        Row: {
          id: string
          name_ro: string
          name_ru: string
          perks_ro: string[]
          perks_ru: string[]
          price_month: number
          price_quarter: number
          price_year: number
          includes_pool: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name_ro: string
          name_ru: string
          perks_ro: string[]
          perks_ru: string[]
          price_month: number
          price_quarter: number
          price_year: number
          includes_pool?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name_ro?: string
          name_ru?: string
          perks_ro?: string[]
          perks_ru?: string[]
          price_month?: number
          price_quarter?: number
          price_year?: number
          includes_pool?: boolean
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          source: string | null
          utm: string | null
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          source?: string | null
          utm?: string | null
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          source?: string | null
          utm?: string | null
          note?: string | null
          created_at?: string
        }
      }
      facilities: {
        Row: {
          id: string
          title_ro: string
          title_ru: string
          description_ro: string
          description_ru: string
          gallery: string[]
          created_at: string
        }
        Insert: {
          id?: string
          title_ro: string
          title_ru: string
          description_ro: string
          description_ru: string
          gallery?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          title_ro?: string
          title_ru?: string
          description_ro?: string
          description_ru?: string
          gallery?: string[]
          created_at?: string
        }
      }
    }
  }
}