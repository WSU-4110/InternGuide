import { IStorageStrategy } from './storage.interface'
import { SupabaseClient } from '@supabase/supabase-js'

export class SupabaseStorageStrategy implements IStorageStrategy {
  private client: SupabaseClient

  constructor(client: SupabaseClient) {
    this.client = client
  }

  async uploadFile(bucket: string, path: string, buffer: Buffer, contentType = 'application/octet-stream') {
    const { data, error } = await this.client.storage.
      from(bucket)
      .upload(path, buffer, {
        contentType,
        upsert: true,
      })

    return { data, error }
  }
}
