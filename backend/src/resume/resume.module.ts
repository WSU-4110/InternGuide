import { Module } from '@nestjs/common'
import { ResumeController } from './resume.controller'
import { ResumeService } from './resume.service'
import { SupabaseModule } from '../supabase/supabase.module'

@Module({
  imports: [SupabaseModule],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
