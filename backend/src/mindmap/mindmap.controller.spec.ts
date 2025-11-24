import { Test, TestingModule } from '@nestjs/testing'
import { MindmapController } from './mindmap.controller'
import { MindmapService } from './mindmap.service'
import { GeneratePlanDto } from './dto/generate-plan.dto'
import { ChatDto } from './dto/chat.dto'

describe('MindmapController', () => {
  let controller: MindmapController
  let service: MindmapService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MindmapController],
      providers: [
        {
          provide: MindmapService,
          useValue: {
            generatePlan: jest.fn(),
            chat: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<MindmapController>(MindmapController)
    service = module.get<MindmapService>(MindmapService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('generatePlan', () => {
    it('should call service.generatePlan with the goal from DTO', async () => {
      const generatePlanDto: GeneratePlanDto = {
        goal: 'Become a Software Engineer',
      }

      const expectedResult = {
        mermaidSyntax: 'mindmap\n  root((Software Engineer))',
      }

      jest.spyOn(service, 'generatePlan').mockResolvedValue(expectedResult)

      const result = await controller.generatePlan(generatePlanDto)

      expect(service.generatePlan).toHaveBeenCalledWith(generatePlanDto.goal)
      expect(service.generatePlan).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expectedResult)
    })

    it('should handle errors from service', async () => {
      const generatePlanDto: GeneratePlanDto = {
        goal: 'Invalid Goal',
      }

      const error = new Error('Failed to generate plan')
      jest.spyOn(service, 'generatePlan').mockRejectedValue(error)

      await expect(controller.generatePlan(generatePlanDto)).rejects.toThrow(
        'Failed to generate plan'
      )
      expect(service.generatePlan).toHaveBeenCalledWith(generatePlanDto.goal)
    })

    it('should pass through empty goal to service', async () => {
      const generatePlanDto: GeneratePlanDto = {
        goal: '',
      }

      const expectedResult = {
        mermaidSyntax: 'mindmap\n  root((Goal))',
      }

      jest.spyOn(service, 'generatePlan').mockResolvedValue(expectedResult)

      await controller.generatePlan(generatePlanDto)

      expect(service.generatePlan).toHaveBeenCalledWith('')
    })
  })

  describe('chat', () => {
    it('should call service.chat with the chat DTO', async () => {
      const chatDto: ChatDto = {
        goal: 'Software Engineer',
        mermaidSyntax: 'mindmap\n  root((Software Engineer))',
        message: 'How do I start?',
      }

      const expectedResult = {
        message: 'Start by learning the fundamentals of programming.',
      }

      jest.spyOn(service, 'chat').mockResolvedValue(expectedResult)

      const result = await controller.chat(chatDto)

      expect(service.chat).toHaveBeenCalledWith(chatDto)
      expect(service.chat).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expectedResult)
    })

    it('should handle chat with conversation history', async () => {
      const chatDto: ChatDto = {
        goal: 'Data Scientist',
        mermaidSyntax: 'mindmap\n  root((Data Scientist))',
        message: 'What about Python?',
        conversationHistory: [
          { role: 'user', content: 'How do I start?' },
          { role: 'assistant', content: 'Learn Python first.' },
        ],
      }

      const expectedResult = {
        message: 'Python is essential for data science.',
      }

      jest.spyOn(service, 'chat').mockResolvedValue(expectedResult)

      const result = await controller.chat(chatDto)

      expect(service.chat).toHaveBeenCalledWith(chatDto)
      expect(result).toEqual(expectedResult)
    })

    it('should handle errors from chat service', async () => {
      const chatDto: ChatDto = {
        goal: 'Product Manager',
        mermaidSyntax: 'mindmap\n  root((PM))',
        message: 'Help me',
      }

      const error = new Error('Chat service unavailable')
      jest.spyOn(service, 'chat').mockRejectedValue(error)

      await expect(controller.chat(chatDto)).rejects.toThrow(
        'Chat service unavailable'
      )
      expect(service.chat).toHaveBeenCalledWith(chatDto)
    })

    it('should pass through chat DTO without conversation history', async () => {
      const chatDto: ChatDto = {
        goal: 'UX Designer',
        mermaidSyntax: 'mindmap\n  root((UX Designer))',
        message: 'Where should I start?',
      }

      const expectedResult = {
        message: 'Start with user research fundamentals.',
      }

      jest.spyOn(service, 'chat').mockResolvedValue(expectedResult)

      const result = await controller.chat(chatDto)

      expect(service.chat).toHaveBeenCalledWith(chatDto)
      expect(chatDto.conversationHistory).toBeUndefined()
      expect(result).toEqual(expectedResult)
    })
  })
})

