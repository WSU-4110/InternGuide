import { Test, TestingModule } from '@nestjs/testing'
import { MindmapService } from './mindmap.service'
import OpenAI from 'openai'

// Mock the OpenAI module
jest.mock('openai')

describe('MindmapService', () => {
  let service: MindmapService
  let mockCreate: jest.Mock

  beforeEach(async () => {
    // Clear all mocks before each test
    jest.clearAllMocks()

    // Setup OpenAI mock
    mockCreate = jest.fn()
    const mockOpenAI = {
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    } as any

    // Mock the OpenAI constructor
    ;(OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(() => mockOpenAI)

    const module: TestingModule = await Test.createTestingModule({
      providers: [MindmapService],
    }).compile()

    service = module.get<MindmapService>(MindmapService)
  })

  afterEach(() => {
    delete process.env.OPENAI_API_KEY
  })

  describe('generatePlan', () => {
    const validMermaidSyntax = `mindmap
  root((Software Engineering Intern))
    Technical Skills
      Learn Data Structures
      Practice Algorithms
      Build Projects
    Projects Portfolio
      Personal Website
      GitHub Contributions
    Networking
      LinkedIn Profile
      Coffee Chats
      Career Fairs
    Applications
      Target Companies
      Resume Tailoring
      Cover Letters`

    it('should generate a valid mindmap plan for a given goal', async () => {
      process.env.OPENAI_API_KEY = 'test-api-key'
      const userGoal = 'Become a Software Engineering Intern at Google'
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: validMermaidSyntax,
            },
          },
        ],
      } as any)

      // Act
      const result = await service.generatePlan(userGoal)

      // Assert
      expect(result).toBeDefined()
      expect(result.mermaidSyntax).toBe(validMermaidSyntax)
      expect(result.mermaidSyntax).toContain('mindmap')
      expect(result.mermaidSyntax).toContain('root((')
      expect(mockCreate).toHaveBeenCalledTimes(1)
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4o-mini',
          temperature: 0.5,
          max_tokens: 1500,
          messages: expect.arrayContaining([
            expect.objectContaining({ role: 'system' }),
            expect.objectContaining({ 
              role: 'user',
              content: expect.stringContaining(userGoal)
            }),
          ]),
        })
      )
    })

    it('should throw error when OPENAI_API_KEY is not configured', async () => {
      delete process.env.OPENAI_API_KEY
      const userGoal = 'Become a Data Scientist'

      // Act & Assert
      await expect(service.generatePlan(userGoal)).rejects.toThrow(
        'OPENAI_API_KEY is not configured. Please add it to your .env file.'
      )
      expect(mockCreate).not.toHaveBeenCalled()
    })

    it('should clean up markdown code blocks from OpenAI response', async () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'
      const userGoal = 'Product Manager Intern'
      const responseWithMarkdown = '```mermaid\n' + validMermaidSyntax + '\n```'
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: responseWithMarkdown,
            },
          },
        ],
      } as any)

      // Act
      const result = await service.generatePlan(userGoal)

      // Assert
      expect(result.mermaidSyntax).toBe(validMermaidSyntax)
      expect(result.mermaidSyntax).not.toContain('```')
      expect(result.mermaidSyntax).toMatch(/^mindmap/)
    })

    it('should throw error when generated syntax does not start with "mindmap"', async () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'
      const userGoal = 'Invalid Goal'
      const invalidSyntax = 'graph TD\n  A --> B'
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: invalidSyntax,
            },
          },
        ],
      } as any)

      // Act & Assert
      await expect(service.generatePlan(userGoal)).rejects.toThrow(
        'Generated invalid mindmap syntax'
      )
    })

    it('should handle OpenAI API errors gracefully', async () => {
      process.env.OPENAI_API_KEY = 'test-api-key'
      const userGoal = 'Marketing Intern'
      const apiError = new Error('API rate limit exceeded')
      
      mockCreate.mockRejectedValue(apiError)

      await expect(service.generatePlan(userGoal)).rejects.toThrow(
        'Failed to generate plan: API rate limit exceeded'
      )
    })

    it('should throw specific error for invalid API key', async () => {
      process.env.OPENAI_API_KEY = 'invalid-key'
      const userGoal = 'Finance Intern'
      const apiKeyError = new Error('Invalid API key provided')
      
      mockCreate.mockRejectedValue(apiKeyError)

      await expect(service.generatePlan(userGoal)).rejects.toThrow(
        'Invalid OpenAI API key. Please check your configuration.'
      )
    })
  })

  describe('chat', () => {
    const mockChatDto = {
      goal: 'Software Engineering Intern',
      mermaidSyntax: 'mindmap\n  root((Software Engineering Intern))',
      message: 'How do I prepare for technical interviews?',
      conversationHistory: [],
    }

    it('should return a chat response for a valid message', async () => {
      process.env.OPENAI_API_KEY = 'test-api-key'
      const expectedResponse = 'To prepare for technical interviews, start by practicing data structures and algorithms on platforms like LeetCode. Focus on understanding the fundamentals and solving problems daily.'
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: expectedResponse,
            },
          },
        ],
      } as any)

      // Act
      const result = await service.chat(mockChatDto)

      // Assert
      expect(result).toBeDefined()
      expect(result.message).toBe(expectedResponse)
      expect(mockCreate).toHaveBeenCalledTimes(1)
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4o-mini',
          temperature: 0.7,
          max_tokens: 800,
          messages: expect.arrayContaining([
            expect.objectContaining({ 
              role: 'system',
              content: expect.stringContaining(mockChatDto.goal)
            }),
            expect.objectContaining({ 
              role: 'user',
              content: mockChatDto.message
            }),
          ]),
        })
      )
    })

    it('should include conversation history in the chat request', async () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'
      const chatDtoWithHistory = {
        ...mockChatDto,
        conversationHistory: [
          { role: 'user' as const, content: 'What is a software engineer?' },
          { role: 'assistant' as const, content: 'A software engineer designs and builds software applications.' },
        ],
      }
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: 'Great follow-up question!',
            },
          },
        ],
      } as any)

      // Act
      await service.chat(chatDtoWithHistory)

      // Assert
      const callArgs = mockCreate.mock.calls[0][0]
      expect(callArgs.messages).toHaveLength(4) // system + 2 history + current message
      expect(callArgs.messages[1]).toEqual({
        role: 'user',
        content: 'What is a software engineer?',
      })
      expect(callArgs.messages[2]).toEqual({
        role: 'assistant',
        content: 'A software engineer designs and builds software applications.',
      })
    })

    it('should throw error when OPENAI_API_KEY is not configured', async () => {
      // Arrange
      delete process.env.OPENAI_API_KEY

      // Act & Assert
      await expect(service.chat(mockChatDto)).rejects.toThrow(
        'OPENAI_API_KEY is not configured.'
      )
      expect(mockCreate).not.toHaveBeenCalled()
    })

    it('should return default message when OpenAI returns empty response', async () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: '',
            },
          },
        ],
      } as any)

      // Act
      const result = await service.chat(mockChatDto)

      // Assert
      expect(result.message).toBe(
        'I apologize, but I was unable to generate a response. Please try again.'
      )
    })

    it('should handle OpenAI API errors in chat', async () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'
      const apiError = new Error('Service temporarily unavailable')
      
      mockCreate.mockRejectedValue(apiError)

      // Act & Assert
      await expect(service.chat(mockChatDto)).rejects.toThrow(
        'Chat error: Service temporarily unavailable'
      )
    })

    it('should include mermaid syntax in system prompt', async () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: 'Response',
            },
          },
        ],
      } as any)

      // Act
      await service.chat(mockChatDto)

      // Assert
      const callArgs = mockCreate.mock.calls[0][0]
      const systemMessage = callArgs.messages[0].content
      expect(systemMessage).toContain(mockChatDto.goal)
      expect(systemMessage).toContain(mockChatDto.mermaidSyntax)
      expect(systemMessage).toContain('career advisor')
    })

    it('should work without conversation history', async () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'
      const chatDtoNoHistory = {
        ...mockChatDto,
        conversationHistory: undefined,
      }
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: 'Response without history',
            },
          },
        ],
      } as any)

      // Act
      const result = await service.chat(chatDtoNoHistory)

      // Assert
      expect(result.message).toBe('Response without history')
      const callArgs = mockCreate.mock.calls[0][0]
      expect(callArgs.messages).toHaveLength(2) // system + current message only
    })
  })

  describe('Service Initialization', () => {
    it('should initialize with OpenAI API key', () => {
      // Arrange
      process.env.OPENAI_API_KEY = 'test-api-key'

      // Act
      const newService = new MindmapService()

      // Assert
      expect(newService).toBeDefined()
      expect(OpenAI).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
      })
    })

    it('should initialize even without API key (will fail on method calls)', () => {
      // Arrange
      delete process.env.OPENAI_API_KEY

      // Act
      const newService = new MindmapService()

      // Assert
      expect(newService).toBeDefined()
    })
  })
})

