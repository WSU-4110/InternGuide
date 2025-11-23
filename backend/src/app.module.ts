import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SupabaseModule } from './supabase/supabase.module'
import { MindmapModule } from './mindmap/mindmap.module'
import { JobTrackerModule } from './job-tracker/job-tracker.module'
import { ResumeModule } from './resume/resume.module'

@Module({
  imports: [
    SupabaseModule,
    MindmapModule,
    JobTrackerModule,
    ResumeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
