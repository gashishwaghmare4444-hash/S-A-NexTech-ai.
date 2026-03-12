export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          plan: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro' | 'enterprise'
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          title: string
          model: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string
          model?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          model?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          tokens_used: number | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          tokens_used?: number | null
          created_at?: string
        }
        Update: {
          content?: string
          tokens_used?: number | null
        }
      }
      usage_stats: {
        Row: {
          id: string
          user_id: string
          tokens_used: number
          requests_count: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tokens_used?: number
          requests_count?: number
          date?: string
          created_at?: string
        }
        Update: {
          tokens_used?: number
          requests_count?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Session = Database['public']['Tables']['sessions']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type UsageStat = Database['public']['Tables']['usage_stats']['Row']
