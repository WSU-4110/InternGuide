import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

// Only create client if both URL and key are provided
let supabaseInstance: ReturnType<typeof createClient> | null = null

if (url && anonKey) {
  supabaseInstance = createClient(url, anonKey)
} else {
  // eslint-disable-next-line no-console
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Supabase features will be disabled.')
  // Create a dummy client with placeholder values to prevent errors
  supabaseInstance = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

export const supabase = supabaseInstance!

export default supabase
