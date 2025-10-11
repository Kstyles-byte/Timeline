import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_admin?: boolean
          updated_at?: string
        }
      }
      levels: {
        Row: {
          id: number
          name: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: number
          name: string
          description: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          updated_at?: string
        }
      }
      non_negotiables: {
        Row: {
          id: string
          level_id: number
          text: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          level_id: number
          text: string
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          level_id?: number
          text?: string
          order_index?: number
          updated_at?: string
        }
      }
      timeline_data: {
        Row: {
          id: string
          user_id: string
          current_level: number
          days_completed: number
          current_streak: number
          levels_completed: number
          total_restarts: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_level?: number
          days_completed?: number
          current_streak?: number
          levels_completed?: number
          total_restarts?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_level?: number
          days_completed?: number
          current_streak?: number
          levels_completed?: number
          total_restarts?: number
          updated_at?: string
        }
      }
      failure_logs: {
        Row: {
          id: string
          user_id: string
          level: number
          reason: string
          days_completed: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          level: number
          reason: string
          days_completed: number
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          level?: number
          reason?: string
          days_completed?: number
          date?: string
        }
      }
    }
  }
}