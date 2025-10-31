import { useState } from 'react'

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0]
    setFile(f ?? null)
    setStatus(null)
  }

  const handleUpload = async () => {
    if (!file) return setStatus('Please choose a file first')

    const apiBase = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000/api'
    const form = new FormData()
    form.append('file', file)
    form.append('userId', 'student123')

    setStatus('Uploading...')

    try {
      const res = await fetch(`${apiBase}/resume/upload`, {
        method: 'POST',
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Upload failed')
      setStatus(`Uploaded — ${data.url}`)
    } catch (err: unknown) {
      setStatus(err instanceof Error ? err.message : 'Upload error')
    }
  }

  return (
    <div className="resume-upload">
      <h4>Upload your resume</h4>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleChange} />
      <div style={{ marginTop: 8 }}>
        <button className="button" onClick={handleUpload} disabled={!file}>
          Upload
        </button>
      </div>
      {status ? <p className="upload-status">{status}</p> : null}
    </div>
  )
}
