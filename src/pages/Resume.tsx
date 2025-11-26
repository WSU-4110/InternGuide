<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react'
=======
import React, { useEffect, useRef, useState } from 'react'
>>>>>>> 251e6e3 (Add Overview Page UI and content)
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!user) {
      alert('Please sign in to upload a resume. Use the Login button in the header.')
      return
    }

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      setUploadStatus('error')
      alert('Please upload a PDF or DOCX file')
      return
    }

    if (file.size > maxSize) {
      setUploadStatus('error')
      alert('File size must be less than 10MB')
      return
    }

    setUploadedFile(file)
    setUploadStatus('success')
  }

  // Upload the selected file to Supabase Storage and link to user's profile
  useEffect(() => {
    if (!uploadedFile || uploadStatus !== 'success' || !user) return

    const uploadResume = async () => {
      try {
        setUploadStatus('idle')
        const path = `resumes/${user.id}/${Date.now()}_${uploadedFile.name}`

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(path, uploadedFile, { upsert: true })

        if (uploadError) {
          console.error('Upload error', uploadError)
          setUploadStatus('error')
          return
        }

        // Get a signed URL valid for 1 hour
        const { error: urlError } = await supabase.storage
          .from('resumes')
          .createSignedUrl(path, 60 * 60)

        if (urlError) {
          console.error('Signed url error', urlError)
        }

        // Save resume path (or URL) to profiles table
<<<<<<< HEAD
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert({ id: user.id, resume_path: path } satisfies {
            id: string
            resume_path: string
          })
=======
        const { error: upsertError } = await (supabase
          .from('profiles') as any)
          .upsert({ id: user.id, resume_path: path })
>>>>>>> 251e6e3 (Add Overview Page UI and content)

        if (upsertError) {
          console.error('Failed to save profile resume path', upsertError)
        }

        setUploadStatus('success')
      } catch (err) {
        console.error(err)
        setUploadStatus('error')
      }
    }

    uploadResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFile, uploadStatus, user])

  const handleUploadClick = () => {
    if (!user) {
      // redirect to login page and return to resume after auth
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setUploadStatus('idle')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

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
            <button className="button button--primary" onClick={handleUploadClick}>
              Upload new resume
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <a className="button button--secondary" href="#resume-contact">
              View Feedback on your resume
            </a>
          </div>
          {uploadedFile && (
            <div className="upload-status" style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: uploadStatus === 'success' ? '#d4edda' : '#f8d7da',
              border: `1px solid ${uploadStatus === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '0.375rem',
              color: uploadStatus === 'success' ? '#155724' : '#721c24'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>✓ File uploaded:</strong> {uploadedFile.name}
                  <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Size: {(uploadedFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    border: '1px solid currentColor',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
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
