import { useEffect, useState } from 'react'
import './App.css'

const featureHighlights = [
  {
    title: 'Kickoff basics',
    items: [
      'Quick login and registration flow tailored to students.',
      'Friendly dashboard greeting with AI guidance.',
      'Secure resume upload ready for AI analysis.',
    ],
  },
  {
    title: 'AI-powered planning',
    items: [
      'Automated resume scanning with actionable feedback.',
      'Follow-up questions to capture goals beyond the resume.',
      'Personalized mindmap you can view and refine.',
    ],
  },
  {
    title: 'Stay on track',
    items: [
      'Progress tracker for applications, interviews, and offers.',
      'Resource hub, FAQ, and dedicated contact support.',
      'Job application tracker and AI chatbot workspace.',
    ],
  },
]

const trustSignals = [
  'Performance-first experience, optimized for quick responses.',
  'Privacy and security by design for every document you share.',
  'Reliable availability so support is ready when you are.',
]

type PreviewPayload = {
  headline: string
  blurb: string
  timestamp: string
}

function App() {
  const [preview, setPreview] = useState<PreviewPayload | null>(null)
  const [previewError, setPreviewError] = useState<string | null>(null)

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000/api'

    fetch(`${apiBase}/preview`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return (await response.json()) as PreviewPayload
      })
      .then(setPreview)
      .catch((error: unknown) => {
        setPreviewError(error instanceof Error ? error.message : 'Unable to reach backend')
      })
  }, [])

  return (
    <div className="layout">
      <header className="hero">
        <div className="hero__body">
          <span className="hero__tag">Welcome to InternGuide</span>
          <h1>Prep smarter for internships with one guided hub.</h1>
          <p>
            InternGuide brings together resume intelligence, planning tools, and supportive resources so
            students can navigate recruiting with clarity.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#features">
              See what&apos;s coming
            </a>
            <a className="button button--secondary" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section id="features" className="section">
          <h2>Focused features for students</h2>
          <p className="section__intro">
            We&apos;re building InternGuide step by step. Here&apos;s the core experience taking shape for launch.
          </p>
          <div className="feature-grid">
            {featureHighlights.map((group) => (
              <article key={group.title} className="feature-card">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="roadmap" className="section section--muted">
          <h2>What to expect next</h2>
          <p className="section__intro">
            Upcoming milestones include the overview hub, light/dark mode, and tighter integration across the
            AI chatbot, resources, and FAQ experience.
          </p>
          <div className="roadmap-callout">
            <h3>Guided experience</h3>
            <p>
              The home experience keeps things simple: start by uploading a resume, let InternGuide learn more
              about you, and receive a personalized mindmap plus progress tracking overview.
            </p>
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Built with trust at the center</h2>
          <ul className="trust-list">
            {trustSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="contact-card">
            <h3>Need to reach us?</h3>
            <p>
              Drop a note at <a href="mailto:team@internguide.com">team@internguide.com</a> and we&apos;ll respond
              within one business day.
            </p>
            {/* Display the backend preview status, prioritizing live data, then errors, then loading */}
            <div className="preview-status" aria-live="polite">
              {preview ? (
                // Render the payload received from the backend
                <>
                  <p className="preview-status__headline">{preview.headline}</p>
                  <p className="preview-status__blurb">{preview.blurb}</p>
                  <p className="preview-status__timestamp">
                    Synced at {new Date(preview.timestamp).toLocaleTimeString()}
                  </p>
                </>
              ) : previewError ? (
                // Surface any fetch or network error so the user knows the connection failed
                <p className="preview-status__error">Backend preview unavailable: {previewError}</p>
              ) : (
                // Initial state while waiting for the preview fetch to resolve
                <p className="preview-status__loading">Checking backend connection…</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} InternGuide. Made for students chasing their next internship.</p>
      </footer>
    </div>
  )
}

export default App
