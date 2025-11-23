import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { JobTrackerService } from './job-tracker.service'
import { CreateJobApplicationDto, UpdateJobApplicationDto } from './dto/job-application.dto'

@Controller('api/job-tracker')
export class JobTrackerController {
  constructor(private readonly jobTrackerService: JobTrackerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createApplication(@Body() createDto: CreateJobApplicationDto) {
    // TODO: Get userId from authentication when auth is implemented
    const userId = 'default-user'
    return this.jobTrackerService.createApplication(userId, createDto)
  }

  @Get()
  async getAllApplications() {
    // TODO: Get userId from authentication when auth is implemented
    const userId = 'default-user'
    return this.jobTrackerService.getAllApplications(userId)
  }

  @Get(':id')
  async getApplicationById(@Param('id') id: string) {
    // TODO: Get userId from authentication when auth is implemented
    const userId = 'default-user'
    return this.jobTrackerService.getApplicationById(userId, id)
  }

  @Put(':id')
  async updateApplication(
    @Param('id') id: string,
    @Body() updateDto: UpdateJobApplicationDto,
  ) {
    // TODO: Get userId from authentication when auth is implemented
    const userId = 'default-user'
    return this.jobTrackerService.updateApplication(userId, id, updateDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteApplication(@Param('id') id: string) {
    // TODO: Get userId from authentication when auth is implemented
    const userId = 'default-user'
    return this.jobTrackerService.deleteApplication(userId, id)
  }
}

