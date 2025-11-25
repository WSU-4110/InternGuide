import { createClient, type SupabaseClient } from '@supabase/supabase-js'

type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; resume_path: string | null }
        Insert: { id: string; resume_path?: string | null }
        Update: { id?: string; resume_path?: string | null }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

// Only create client if both URL and key are provided
let supabaseInstance: SupabaseClient<Database> | null = null

if (url && anonKey) {
  supabaseInstance = createClient<Database>(url, anonKey)
} else {
  // eslint-disable-next-line no-console
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Supabase features will be disabled.')
  // Create a dummy client with placeholder values to prevent errors
  supabaseInstance = createClient<Database>('https://placeholder.supabase.co', 'placeholder-key')
}

export const supabase = supabaseInstance!

export default supabase
