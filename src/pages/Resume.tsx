import { useEffect, useState } from 'react'

const featureHighlights = [
  {
    title: 'Smart resume intake',
    items: [
      'Upload PDF or DOCX and let InternGuide auto-detect sections and keywords.',
      'Spot incomplete bullets with AI prompts that suggest specific metrics to add.',
      'Keep versions side by side so you can roll back or compare edits instantly.',
    ],
  },
  {
    title: 'Tailored feedback loops',
    items: [
      'Receive instant ATS readiness checks and readability scores.',
      'Get recruiter-style comments on impact, clarity, and skill coverage.',
      'Highlight the experience most relevant to each target internship.',
    ],
  },
  {
    title: 'Launch-ready exports',
    items: [
      'Generate clean PDF exports that preserve formatting on every device.',
      'Use templates tuned for tech, product, and research internships.',
      'Send documents straight to the application tracker with one click.',
    ],
  },
]

const trustSignals = [
  'Secure storage keeps every upload private until you choose to share.',
  'AI suggestions are grounded in recruiter interview rubrics, not guesswork.',
  'Weekly updates add fresh prompts from alumni reviewers and mentors.',
]

type PreviewPayload = {
  headline: string
  blurb: string
  timestamp: string
}

function Resume() {
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
    <div className="resume-page home-page">
      <header className="hero">
        <div className="hero__body">
          <span className="hero__tag">Resume intelligence</span>
          <h1>Polish your resume with AI powered guidance.</h1>
          <p>
            Upload your draft, let InternGuide uncover gaps, and walk away with a concise, metrics-driven resume
            that speaks to internship hiring managers.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#resume-features">
              Upload new resume
            </a>
            <a className="button button--secondary" href="#resume-contact">
              View Feedback on your resume
            </a>
          </div>
        </div>
      </header>

      <div className="main-content">
        <section id="resume-features" className="section">
          <h2>Resume upgrades in minutes</h2>
          <p className="section__intro">
            These modules combine AI feedback with structured prompts so every bullet, project, and leadership
            story lands with clarity.
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

        <section id="resume-insights" className="section section--muted">
          <h2>How the insights flow</h2>
          <p className="section__intro">
            Your resume passes through light parsing, targeted analysis, and human-in-the-loop review options. Here&apos;s
            what launches first.
          </p>
          <div className="roadmap-callout">
            <h3>Guided feedback loop</h3>
            <p>
              Upload a draft, answer quick prompts about your impact, and receive a prioritized checklist that shows
              where to strengthen quantified results, skills, and formatting. Save each pass so mentors can comment
              without losing context.
            </p>
          </div>
        </section>

        <section id="resume-contact" className="section">
          <h2>Made for confident submissions</h2>
          <ul className="trust-list">
            {trustSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="contact-card">
            <h3>Want early access to the resume workflow?</h3>
            <p>
              Share your interest at <a href="mailto:team@internguide.com">team@internguide.com</a> and we&apos;ll invite
              you to the next resume sprint cohort.
            </p>
            <div className="preview-status" aria-live="polite">
              {preview ? (
                <>
                  <p className="preview-status__headline">{preview.headline}</p>
                  <p className="preview-status__blurb">{preview.blurb}</p>
                  <p className="preview-status__timestamp">
                    Synced at {new Date(preview.timestamp).toLocaleTimeString()}
                  </p>
                </>
              ) : previewError ? (
                <p className="preview-status__error">Backend preview unavailable: {previewError}</p>
              ) : (
                <p className="preview-status__loading">Pulling the latest resume updates…</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Resume
