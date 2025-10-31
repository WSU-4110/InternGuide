import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ResumeService } from './resume.service'

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any, @Body('userId') userId?: string) {
    if (!file) {
      return { error: 'No file uploaded' }
    }

    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'resumes'
    const filename = `${userId ?? 'anon'}/${Date.now()}_${file.originalname}`

    const result = await this.resumeService.uploadResume(bucket, filename, file.buffer, file.mimetype)

    if (result.error) {
      return { error: result.error }
    }
    const supabase = this.resumeService['supabaseService'].getClient()
    const { data } = supabase.storage.from(bucket).getPublicUrl(filename)

    return { url: data.publicUrl }
  }
}
