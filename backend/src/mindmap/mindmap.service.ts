import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { ChatDto } from './dto/chat.dto'

@Injectable()
export class MindmapService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generatePlan(userGoal: string): Promise<{ mermaidSyntax: string }> {
    try {
      console.log('Generating plan for goal:', userGoal)
      console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)
      
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured. Please add it to your .env file.')
      }
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a Mermaid.js mindmap syntax generator for internship planning. 
            Generate ONLY valid Mermaid.js mindmap syntax based on the user's career goal.
            
            CRITICAL RULES:
            - Return ONLY the mindmap syntax, no explanations, no markdown code blocks
            - Start with "mindmap" on the first line
            - Use "root((text))" for the central node (keep text under 40 characters)
            - Use proper indentation (2 spaces per level)
            - Maximum 4 levels deep
            - Include 4-6 main categories
            - Each category should have 2-4 actionable sub-items
            - Keep all text concise (under 50 characters per node)
            - Focus on actionable, specific steps for students/early-career professionals
            
            Example format:
            mindmap
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
                  Cover Letters
                
            Categories to consider: Technical Skills, Projects, Networking, Applications, Interview Prep, Timeline, Resources, Mentorship`,
          },
          {
            role: 'user',
            content: `Create a Mermaid.js mindmap for this goal: "${userGoal}"`,
          },
        ],
        temperature: 0.5,
        max_tokens: 1500,
      })

      console.log('OpenAI response received successfully')
      let content = completion.choices[0]?.message?.content || ''
      console.log('Raw content:', content)
      
      // Clean up the response - remove markdown code blocks if present
      content = content.trim()
      content = content.replace(/^```mermaid\s*/i, '')
      content = content.replace(/^```\s*/i, '')
      content = content.replace(/```\s*$/i, '')
      content = content.trim()
      
      // Validate that it starts with "mindmap"
      if (!content.toLowerCase().startsWith('mindmap')) {
        console.error('Invalid Mermaid syntax - does not start with "mindmap"')
        throw new Error('Generated invalid mindmap syntax')
      }
      
      console.log('Cleaned Mermaid syntax:', content)
      return { mermaidSyntax: content }
    } catch (error) {
      console.error('Error generating plan with OpenAI:', error)
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Invalid OpenAI API key. Please check your configuration.')
        }
        if (error.message.includes('OPENAI_API_KEY')) {
          throw error // Re-throw our custom error about missing API key
        }
        throw new Error(`Failed to generate plan: ${error.message}`)
      }
      
      throw new Error('Failed to generate plan. Please try again.')
    }
  }

  async chat(chatDto: ChatDto): Promise<{ message: string }> {
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured.')
      }

      // Build conversation history
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `You are a helpful career advisor assistant helping students achieve their internship and career goals.
          
The user has created a career roadmap for the following goal: "${chatDto.goal}"

Here is their roadmap structure (in Mermaid mindmap syntax):
${chatDto.mermaidSyntax}

Your role is to:
- Answer questions about their roadmap and the steps involved
- Provide actionable advice and resources
- Help them understand how to accomplish specific steps
- Offer encouragement and practical tips
- Suggest additional resources or strategies when relevant

IMPORTANT: Write in a natural, conversational style as if you're texting a friend. DO NOT use any markdown formatting, bullet points, numbered lists, headers, bold text, or special formatting. Write everything in plain paragraphs with natural flow. Keep it friendly, casual, and easy to read.`,
        },
      ]

      // Add conversation history if provided
      if (chatDto.conversationHistory && chatDto.conversationHistory.length > 0) {
        chatDto.conversationHistory.forEach(msg => {
          messages.push({
            role: msg.role,
            content: msg.content,
          })
        })
      }

      // Add the current user message
      messages.push({
        role: 'user',
        content: chatDto.message,
      })

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 800,
      })

      const responseMessage = completion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.'

      return { message: responseMessage }
    } catch (error) {
      console.error('Error in chat:', error)
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Invalid OpenAI API key configuration.')
        }
        throw new Error(`Chat error: ${error.message}`)
      }
      
      throw new Error('Failed to process chat message. Please try again.')
    }
  }
}

