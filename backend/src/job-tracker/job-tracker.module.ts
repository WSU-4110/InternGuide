import { Module } from '@nestjs/common'
import { JobTrackerController } from './job-tracker.controller'
import { JobTrackerService } from './job-tracker.service'
import { SupabaseModule } from '../supabase/supabase.module'

@Module({
  imports: [SupabaseModule],
  controllers: [JobTrackerController],
  providers: [JobTrackerService],
})
export class JobTrackerModule {}

