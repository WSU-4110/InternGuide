import { Injectable, NotFoundException } from '@nestjs/common'
import { SupabaseService } from '../supabase/supabase.service'
import { CreateJobApplicationDto, UpdateJobApplicationDto } from './dto/job-application.dto'

@Injectable()
export class JobTrackerService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createApplication(userId: string, createDto: CreateJobApplicationDto) {
    const supabase = this.supabaseService.getClient()
    
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        user_id: userId,
        job_title: createDto.jobTitle,
        company: createDto.company,
        date_applied: createDto.dateApplied,
        status: createDto.status,
        compensation: createDto.compensation,
        job_description: createDto.jobDescription,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create job application: ${error.message}`)
    }

    return data
  }

  async getAllApplications(userId: string) {
    const supabase = this.supabaseService.getClient()
    
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', userId)
      .order('date_applied', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch job applications: ${error.message}`)
    }

    return data
  }

  async getApplicationById(userId: string, applicationId: string) {
    const supabase = this.supabaseService.getClient()
    
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('id', applicationId)
      .eq('user_id', userId)
      .single()

    if (error || !data) {
      throw new NotFoundException('Job application not found')
    }

    return data
  }

  async updateApplication(
    userId: string,
    applicationId: string,
    updateDto: UpdateJobApplicationDto,
  ) {
    const supabase = this.supabaseService.getClient()
    
    const updateData: any = {}
    if (updateDto.jobTitle !== undefined) updateData.job_title = updateDto.jobTitle
    if (updateDto.company !== undefined) updateData.company = updateDto.company
    if (updateDto.dateApplied !== undefined) updateData.date_applied = updateDto.dateApplied
    if (updateDto.status !== undefined) updateData.status = updateDto.status
    if (updateDto.compensation !== undefined) updateData.compensation = updateDto.compensation
    if (updateDto.jobDescription !== undefined) updateData.job_description = updateDto.jobDescription

    const { data, error } = await supabase
      .from('job_applications')
      .update(updateData)
      .eq('id', applicationId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error || !data) {
      throw new NotFoundException('Job application not found or update failed')
    }

    return data
  }

  async deleteApplication(userId: string, applicationId: string) {
    const supabase = this.supabaseService.getClient()
    
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', applicationId)
      .eq('user_id', userId)

    if (error) {
      throw new NotFoundException('Job application not found or delete failed')
    }

    return { message: 'Job application deleted successfully' }
  }
}

