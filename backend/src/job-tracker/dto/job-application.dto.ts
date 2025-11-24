import { IsString, IsEnum, IsOptional, IsDateString, IsNotEmpty } from 'class-validator'

export enum ApplicationStatus {
  APPLIED = 'Applied',
  INTERVIEWING = 'Interviewing',
  OFFER = 'Offer',
}

export class CreateJobApplicationDto {
  @IsString()
  @IsNotEmpty()
  jobTitle: string

  @IsString()
  @IsNotEmpty()
  company: string

  @IsDateString()
  dateApplied: string

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus

  @IsString()
  @IsOptional()
  compensation?: string

  @IsString()
  @IsNotEmpty()
  jobDescription: string
}

export class UpdateJobApplicationDto {
  @IsString()
  @IsOptional()
  jobTitle?: string

  @IsString()
  @IsOptional()
  company?: string

  @IsDateString()
  @IsOptional()
  dateApplied?: string

  @IsEnum(ApplicationStatus)
  @IsOptional()
  status?: ApplicationStatus

  @IsString()
  @IsOptional()
  compensation?: string

  @IsString()
  @IsOptional()
  jobDescription?: string
}

