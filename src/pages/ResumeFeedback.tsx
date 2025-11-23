import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../App.css'

interface Resume {
  id: string
  userId: string
  fileName: string
  filePath: string
  uploadedAt: string
}

interface ResumeFeedback {
  resumeId: string
  feedback: {
    overallScore: number
    strengths: string[]
    improvements: string[]
    atsCompatibility: {
      score: number
      issues: string[]
    }
    sections: {
      name: string
      feedback: string
      suggestions: string[]
    }[]
    detailedAnalysis: string
  }
  generatedAt: string
}

function ResumeFeedback() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000/api'

  // Load user's resumes
  useEffect(() => {
    if (user) {
      loadResumes()
    }
  }, [user])

  const loadResumes = async () => {
    try {
      const response = await fetch(`${apiBase}/resume`)
      if (!response.ok) {
        throw new Error(`Failed to load resumes: ${response.status}`)
      }
      const data = await response.json()
      setResumes(data)
      if (data.length > 0 && !selectedResume) {
        setSelectedResume(data[0])
      }
    } catch (error) {
      console.error('Error loading resumes:', error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!user) {
      alert('Please sign in to upload a resume. Use the Login button in the header.')
      return
    }

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a PDF, DOCX, DOC, or TXT file')
      setUploadStatus('error')
      return
    }

    if (file.size > maxSize) {
      setUploadError('File size must be less than 5MB. For best results, keep resumes concise (1-2 pages).')
      setUploadStatus('error')
      return
    }

    setUploadedFile(file)
    setUploadError(null)
    setUploadStatus('uploading')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${apiBase}/resume/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Upload failed')
      }

      const newResume = await response.json()
      setUploadStatus('success')
      setResumes([newResume, ...resumes])
      setSelectedResume(newResume)
      
      // Auto-load feedback for new upload
      setTimeout(() => {
        handleGetFeedback(newResume.id)
      }, 500)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
      setUploadStatus('error')
    }
  }

  const handleUploadClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    fileInputRef.current?.click()
  }

  const handleGetFeedback = async (resumeId?: string) => {
    const targetResumeId = resumeId || selectedResume?.id
    if (!targetResumeId) {
      alert('Please select or upload a resume first')
      return
    }

    setFeedbackLoading(true)
    setFeedbackError(null)
    setFeedback(null)

    try {
      const response = await fetch(`${apiBase}/resume/${targetResumeId}/feedback`, {
        method: 'POST',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to generate feedback')
      }

      const feedbackData = await response.json()
      setFeedback(feedbackData)
    } catch (error) {
      console.error('Feedback error:', error)
      setFeedbackError(error instanceof Error ? error.message : 'Failed to generate feedback')
    } finally {
      setFeedbackLoading(false)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setUploadStatus('idle')
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745'
    if (score >= 60) return '#ffc107'
    return '#dc3545'
  }

  return (
    <div className="resume-page home-page">
      <header className="hero">
        <div className="hero__body">
          <span className="hero__tag">Resume intelligence</span>
          <h1>Get AI-powered feedback on your resume</h1>
          <p>
            Upload your resume and receive detailed, actionable feedback powered by AI. Get insights on ATS compatibility,
            formatting, content quality, and specific improvements to make your resume stand out.
          </p>
          <div className="hero__actions">
            <button className="button button--primary" onClick={handleUploadClick}>
              Upload new resume
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            {selectedResume && (
              <button 
                className="button button--secondary" 
                onClick={() => handleGetFeedback()}
                disabled={feedbackLoading}
              >
                {feedbackLoading ? 'Analyzing...' : 'Get Feedback'}
              </button>
            )}
          </div>
          
          {/* Upload status */}
          {uploadStatus !== 'idle' && (
            <div
              className="upload-status"
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: uploadStatus === 'success' ? '#d4edda' : uploadStatus === 'error' ? '#f8d7da' : '#d1ecf1',
                border: `1px solid ${uploadStatus === 'success' ? '#c3e6cb' : uploadStatus === 'error' ? '#f5c6cb' : '#bee5eb'}`,
                borderRadius: '0.375rem',
                color: uploadStatus === 'success' ? '#155724' : uploadStatus === 'error' ? '#721c24' : '#0c5460',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  {uploadStatus === 'uploading' && (
                    <>
                      <strong>⏳ Uploading:</strong> {uploadedFile?.name}
                    </>
                  )}
                  {uploadStatus === 'success' && (
                    <>
                      <strong>✓ File uploaded:</strong> {uploadedFile?.name}
                      <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        Size: {uploadedFile && (uploadedFile.size / 1024).toFixed(2)} KB
                      </div>
                    </>
                  )}
                  {uploadStatus === 'error' && (
                    <>
                      <strong>✗ Upload failed:</strong> {uploadError}
                    </>
                  )}
                </div>
                {uploadStatus !== 'uploading' && (
                  <button
                    onClick={handleRemoveFile}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid currentColor',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Resume selection */}
          {resumes.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Your resumes:
              </label>
              <select
                value={selectedResume?.id || ''}
                onChange={(e) => {
                  const resume = resumes.find((r) => r.id === e.target.value)
                  setSelectedResume(resume || null)
                  setFeedback(null) // Clear previous feedback
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #ccc',
                }}
              >
                {resumes.map((resume) => (
                  <option key={resume.id} value={resume.id}>
                    {resume.fileName} - {new Date(resume.uploadedAt).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </header>

      <div className="main-content">
        {/* Feedback display */}
        {feedbackLoading && (
          <section className="section">
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h2>Analyzing your resume...</h2>
              <p>This may take 10-30 seconds. Please wait.</p>
              <div style={{ marginTop: '1rem' }}>
                <div className="spinner" style={{
                  width: '40px',
                  height: '40px',
                  margin: '0 auto',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #3498db',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
              </div>
            </div>
          </section>
        )}

        {feedbackError && (
          <section className="section">
            <div
              style={{
                padding: '2rem',
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '0.375rem',
                color: '#721c24',
              }}
            >
              <h3>Error generating feedback</h3>
              <p>{feedbackError}</p>
              <button className="button button--primary" onClick={() => handleGetFeedback()} style={{ marginTop: '1rem' }}>
                Try again
              </button>
            </div>
          </section>
        )}

        {feedback && (
          <>
            {/* Overall scores */}
            <section className="section">
              <h2>Overall Assessment</h2>
              <div className="feature-grid">
                <article className="feature-card" style={{ textAlign: 'center' }}>
                  <h3>Resume Score</h3>
                  <div
                    style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: getScoreColor(feedback.feedback.overallScore),
                      marginTop: '1rem',
                    }}
                  >
                    {feedback.feedback.overallScore}/100
                  </div>
                </article>
                <article className="feature-card" style={{ textAlign: 'center' }}>
                  <h3>ATS Compatibility</h3>
                  <div
                    style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: getScoreColor(feedback.feedback.atsCompatibility.score),
                      marginTop: '1rem',
                    }}
                  >
                    {feedback.feedback.atsCompatibility.score}/100
                  </div>
                </article>
              </div>
            </section>

            {/* Strengths and Improvements */}
            <section className="section section--muted">
              <div className="feature-grid">
                <article className="feature-card">
                  <h3>✓ Strengths</h3>
                  <ul>
                    {feedback.feedback.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </article>
                <article className="feature-card">
                  <h3>⚠ Priority Improvements</h3>
                  <ul>
                    {feedback.feedback.improvements.map((improvement, idx) => (
                      <li key={idx}>{improvement}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            {/* ATS Issues */}
            {feedback.feedback.atsCompatibility.issues.length > 0 && (
              <section className="section">
                <h2>ATS Compatibility Issues</h2>
                <div className="roadmap-callout">
                  <ul>
                    {feedback.feedback.atsCompatibility.issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Section-by-section feedback */}
            <section className="section section--muted">
              <h2>Section-by-Section Analysis</h2>
              <div className="feature-grid">
                {feedback.feedback.sections.map((section, idx) => (
                  <article key={idx} className="feature-card">
                    <h3>{section.name}</h3>
                    <p>{section.feedback}</p>
                    {section.suggestions.length > 0 && (
                      <>
                        <h4 style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Suggestions:</h4>
                        <ul>
                          {section.suggestions.map((suggestion, sIdx) => (
                            <li key={sIdx}>{suggestion}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* Detailed analysis */}
            <section className="section">
              <h2>Detailed Analysis</h2>
              <div className="roadmap-callout">
                <p style={{ whiteSpace: 'pre-line' }}>{feedback.feedback.detailedAnalysis}</p>
              </div>
            </section>
          </>
        )}

        {/* Empty state */}
        {!feedback && !feedbackLoading && !feedbackError && (
          <section className="section">
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h2>Ready to improve your resume?</h2>
              <p>Upload a resume above and click "Get Feedback" to receive detailed AI-powered analysis.</p>
            </div>
          </section>
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ResumeFeedback

