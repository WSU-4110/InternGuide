import { Injectable } from '@nestjs/common'
import { SupabaseService } from '../supabase/supabase.service'
import { SupabaseStorageStrategy } from '../storage/supabase.strategy'
import { IStorageStrategy } from '../storage/storage.interface'

@Injectable()
export class ResumeService {
  private storage: IStorageStrategy

  constructor(private readonly supabaseService: SupabaseService) {
    this.storage = new SupabaseStorageStrategy(this.supabaseService.getClient())
  }

  async uploadResume(bucket: string, path: string, buffer: Buffer, contentType?: string) {
    return this.storage.uploadFile(bucket, path, buffer, contentType)
  }
}
