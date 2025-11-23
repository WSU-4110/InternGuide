import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import mermaid from 'mermaid'
import '../styles/MindMapDetail.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface GoalWithPlan {
  goal: string
  mermaidSyntax: string | null
  isLoading: boolean
  error: string | null
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const STORAGE_KEY = 'internguide_mindmaps'

function MindMapDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [mindmap, setMindmap] = useState<GoalWithPlan | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [isLoadingResponse, setIsLoadingResponse] = useState(false)
  const mermaidContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load mindmap from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as GoalWithPlan[]
        const index = parseInt(id || '0', 10)
        if (index >= 0 && index < parsed.length) {
          setMindmap(parsed[index])
          // Add welcome message
          setMessages([{
            role: 'assistant',
            content: `Hi! I'm here to help you with your goal: "${parsed[index].goal}". Feel free to ask me questions about the roadmap, specific steps, resources, or anything else related to achieving this goal.`,
            timestamp: new Date()
          }])
        } else {
          navigate('/mind-map')
        }
      } else {
        navigate('/mind-map')
      }
    } catch (error) {
      console.error('Failed to load mindmap:', error)
      navigate('/mind-map')
    }
  }, [id, navigate])

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#e1f5ff',
        primaryTextColor: '#1a1a1a',
        primaryBorderColor: '#0066cc',
        lineColor: '#666666',
        secondaryColor: '#f0f0f0',
        tertiaryColor: '#fff4e6',
      },
      securityLevel: 'loose',
      mindmap: {
        padding: 20,
        maxNodeWidth: 200,
      },
    })
  }, [])

  // Render Mermaid diagram
  useEffect(() => {
    if (mindmap?.mermaidSyntax && mermaidContainerRef.current) {
      renderMermaid(mindmap.mermaidSyntax, mermaidContainerRef.current)
    }
  }, [mindmap])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const renderMermaid = async (syntax: string, container: HTMLDivElement) => {
    try {
      container.innerHTML = ''
      const id = `mermaid-detail-${Date.now()}`
      const { svg } = await mermaid.render(id, syntax)
      container.innerHTML = svg
    } catch (error) {
      console.error('Error rendering Mermaid diagram:', error)
      container.innerHTML = '<p class="mermaid-error">Failed to render mindmap.</p>'
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim() || isLoadingResponse) return

    const userMessage: Message = {
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setUserInput('')
    setIsLoadingResponse(true)

    try {
      const response = await fetch(`${API_BASE_URL}/mindmap/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: mindmap?.goal,
          mermaidSyntax: mindmap?.mermaidSyntax,
          message: userMessage.content,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoadingResponse(false)
    }
  }

  if (!mindmap) {
    return (
      <div className="mindmap-detail-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading mindmap...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mindmap-detail-page">
      <div className="detail-header">
        <button onClick={() => navigate('/mind-map')} className="back-button">
          ← Back to all mindmaps
        </button>
        <h1 className="detail-title">{mindmap.goal}</h1>
      </div>

      <div className="detail-content">
        {/* Mindmap Section */}
        <div className="detail-mindmap-section">
          <h2>Your Roadmap</h2>
          {mindmap.mermaidSyntax ? (
            <div className="mindmap-container" ref={mermaidContainerRef} />
          ) : (
            <p className="no-mindmap">No mindmap available for this goal.</p>
          )}
        </div>

        {/* Chat Section */}
        <div className="detail-chat-section">
          <h2>Ask Questions</h2>
          <div className="chat-container">
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`message message--${msg.role}`}>
                  <div className="message-header">
                    <span className="message-author">
                      {msg.role === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))}
              {isLoadingResponse && (
                <div className="message message--assistant">
                  <div className="message-header">
                    <span className="message-author">AI Assistant</span>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-form">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask anything about your roadmap..."
                className="chat-input"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(e)
                  }
                }}
              />
              <button 
                type="submit" 
                className="button button--primary send-button"
                disabled={!userInput.trim() || isLoadingResponse}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MindMapDetailPage

