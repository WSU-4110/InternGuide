import { Controller, Post, Body } from '@nestjs/common'
import { MindmapService } from './mindmap.service'
import { GeneratePlanDto } from './dto/generate-plan.dto'
import { ChatDto } from './dto/chat.dto'

@Controller('mindmap')
export class MindmapController {
  constructor(private readonly mindmapService: MindmapService) {}

  @Post('generate-plan')
  async generatePlan(@Body() generatePlanDto: GeneratePlanDto) {
    return this.mindmapService.generatePlan(generatePlanDto.goal)
  }

  @Post('chat')
  async chat(@Body() chatDto: ChatDto) {
    return this.mindmapService.chat(chatDto)
  }
}








