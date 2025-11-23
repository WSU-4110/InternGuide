export class ChatDto {
  goal: string
  mermaidSyntax: string
  message: string
  conversationHistory?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

