import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mermaid from 'mermaid'


interface GoalWithPlan {
  goal: string
  mermaidSyntax: string | null
  isLoading: boolean
  error: string | null
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const STORAGE_KEY = 'internguide_mindmaps'

function MindMapPage() {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState('')
  const [savedGoals, setSavedGoals] = useState<GoalWithPlan[]>([])
  const mermaidContainerRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  // Load saved goals from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as GoalWithPlan[]
        // Filter out any loading states from previous session
        const cleaned = parsed.map(goal => ({
          ...goal,
          isLoading: false,
          error: goal.error || null
        }))
        setSavedGoals(cleaned)
      }
    } catch (error) {
      console.error('Failed to load saved goals from localStorage:', error)
    }
  }, [])

  // Save goals to localStorage whenever they change
  useEffect(() => {
    try {
      if (savedGoals.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGoals))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Failed to save goals to localStorage:', error)
    }
  }, [savedGoals])

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

  // Render Mermaid diagrams when goals update
  useEffect(() => {
    savedGoals.forEach((goal, index) => {
      if (goal.mermaidSyntax && !goal.isLoading) {
        const container = mermaidContainerRefs.current.get(index)
        if (container) {
          renderMermaid(goal.mermaidSyntax, container, index)
        }
      }
    })
  }, [savedGoals])

  const renderMermaid = async (syntax: string, container: HTMLDivElement, index: number) => {
    try {
      // Clear previous content
      container.innerHTML = ''
      
      // Generate unique ID for this diagram
      const id = `mermaid-${index}-${Date.now()}`
      
      // Render the diagram
      const { svg } = await mermaid.render(id, syntax)
      container.innerHTML = svg
    } catch (error) {
      console.error('Error rendering Mermaid diagram:', error)
      container.innerHTML = '<p class="mermaid-error">Failed to render mindmap. Please try regenerating.</p>'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userInput.trim()) {
      const newGoal: GoalWithPlan = {
        goal: userInput.trim(),
        mermaidSyntax: null,
        isLoading: true,
        error: null,
      }
      
      setSavedGoals([...savedGoals, newGoal])
      setUserInput('')
      
      // Call API to generate plan
      try {
        const response = await fetch(`${API_BASE_URL}/mindmap/generate-plan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal: newGoal.goal }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to generate plan')
        }
        
        const data = await response.json()
        
        // Update the goal with the generated mindmap
        setSavedGoals((prev) =>
          prev.map((g) =>
            g.goal === newGoal.goal && g.isLoading
              ? { ...g, mermaidSyntax: data.mermaidSyntax, isLoading: false }
              : g
          )
        )
      } catch {
        // Update with error
        setSavedGoals((prev) =>
          prev.map((g) =>
            g.goal === newGoal.goal && g.isLoading
              ? { ...g, isLoading: false, error: 'Failed to generate plan. Please try again.' }
              : g
          )
        )
      }
    }
  }

  const handleRemoveGoal = (index: number) => {
    setSavedGoals(savedGoals.filter((_, i) => i !== index))
  }

  const handleClearAll = () => {
    if (savedGoals.length === 0) return
    
    const confirmed = window.confirm(
      `Are you sure you want to delete all ${savedGoals.length} mindmap${savedGoals.length > 1 ? 's' : ''}? This cannot be undone.`
    )
    
    if (confirmed) {
      setSavedGoals([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handleRetryPlan = async (index: number) => {
    const goal = savedGoals[index]
    
    setSavedGoals((prev) =>
      prev.map((g, i) => (i === index ? { ...g, isLoading: true, error: null } : g))
    )
    
    try {
      const response = await fetch(`${API_BASE_URL}/mindmap/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: goal.goal }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate plan')
      }
      
      const data = await response.json()
      
      setSavedGoals((prev) =>
        prev.map((g, i) => (i === index ? { ...g, mermaidSyntax: data.mermaidSyntax, isLoading: false } : g))
      )
    } catch {
      setSavedGoals((prev) =>
        prev.map((g, i) =>
          i === index ? { ...g, isLoading: false, error: 'Failed to generate plan. Please try again.' } : g
        )
      )
    }
  }

  return (
    <div className="mindmap-page">
      <section className="hero mindmap-hero">
        <div className="hero__body">
          <span className="hero__tag">Mind Map workspace</span>
          <h1>Sketch the plan before the internship search begins.</h1>
          <p>
            This view lets students visualize every branch of their recruiting journey&mdash;from self-assessment
            prompts to weekly action items. We&apos;ll plug in the real data once the builder is ready.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#mindmap-preview">
              Preview the canvas
            </a>
            <a className="button button--secondary" href="/#contact">
              Say hello
            </a>
          </div>
        </div>
      </section>

      <div className="main-content mindmap-content">
        <section className="section goal-input-section">
          <h2>What do you want to achieve?</h2>
          <p className="section__intro">
            Tell us about a skill you want to learn, a project you want to build, or a career direction you&apos;re
            exploring. We&apos;ll help you map it out.
          </p>
          <form onSubmit={handleSubmit} className="goal-input-form">
            <div className="goal-input-wrapper">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="E.g., Learn React and build a portfolio website, or explore data science internships in healthcare..."
                className="goal-input"
                rows={4}
              />
              <button type="submit" className="button button--primary" disabled={!userInput.trim()}>
                Add to my map
              </button>
            </div>
          </form>
          {savedGoals.length > 0 && (
            <div className="saved-goals">
              <div className="saved-goals-header">
                <h3>Your goals & plans:</h3>
                <button 
                  onClick={handleClearAll}
                  className="button button--danger clear-all-button"
                  aria-label="Clear all goals"
                >
                  Clear all
                </button>
              </div>
              <div className="goals-list">
                {savedGoals.map((goalData, index) => (
                  <div key={index} className="goal-item-wrapper">
                    <div className="goal-item-header">
                      <h4 className="goal-title">{goalData.goal}</h4>
                      <button
                        onClick={() => handleRemoveGoal(index)}
                        className="goal-remove"
                        aria-label="Remove goal"
                      >
                        ×
                      </button>
                    </div>
                    
                    {goalData.isLoading && (
                      <div className="plan-loading">
                        <div className="spinner"></div>
                        <p>Generating your personalized plan...</p>
                      </div>
                    )}
                    
                    {goalData.error && (
                      <div className="plan-error">
                        <p>{goalData.error}</p>
                        <button
                          onClick={() => handleRetryPlan(index)}
                          className="button button--secondary retry-button"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                    
                    {goalData.mermaidSyntax && !goalData.isLoading && (
                      <div className="mindmap-visualization">
                        <p className="plan-intro">Here&apos;s your interactive mindmap:</p>
                        <div 
                          className="mermaid-container"
                          ref={(el) => {
                            if (el) {
                              mermaidContainerRefs.current.set(index, el)
                            }
                          }}
                        />
                        <button 
                          onClick={() => navigate(`/mind-map/${index}`)}
                          className="button button--primary view-detail-button"
                        >
                          View Details & Chat
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default MindMapPage
