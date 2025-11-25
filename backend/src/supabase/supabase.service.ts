import { Injectable, OnModuleInit } from '@nestjs/common'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env (if present)
dotenv.config()

@Injectable()
export class SupabaseService implements OnModuleInit {
private client!: SupabaseClient
  onModuleInit() {
    const url = process.env.SUPABASE_URL
    // Support both SUPABASE_KEY and SUPABASE_SERVICE_ROLE_KEY for flexibility
    const key = process.env.SUPABASE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_KEY / SUPABASE_SERVICE_ROLE_KEY in environment')
    }
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_KEY) {
      // eslint-disable-next-line no-console
      console.warn('Using SUPABASE_SERVICE_ROLE_KEY as SUPABASE key — ensure this secret is kept server-side only')
    }
    this.client = createClient(url, key)
  }

  getClient(): SupabaseClient {
    return this.client
  }
}
