import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

if (!url || !anonKey) {
  // Don't throw — let runtime code detect missing envs. But warn during dev.
  // eslint-disable-next-line no-console
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing')
}

export const supabase = createClient(url, anonKey)

export default supabase
