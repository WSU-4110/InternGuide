import { Injectable, OnModuleInit } from '@nestjs/common'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env (if present)
dotenv.config()

@Injectable()
export class SupabaseService implements OnModuleInit {
  private client: SupabaseClient

  onModuleInit() {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_KEY
    if (!url || !key) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in environment')
    }
    this.client = createClient(url, key)
  }

  getClient(): SupabaseClient {
    return this.client
  }
}
