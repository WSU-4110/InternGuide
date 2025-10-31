import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SupabaseModule } from './supabase/supabase.module'
import { ResumeModule } from './resume/resume.module'

@Module({
  imports: [SupabaseModule, ResumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
