import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../components/LoginModal.css'

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()
  // where to go after login
  const from = (location.state as any)?.from ?? '/resume'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = mode === 'signin' ? await signIn(email, password) : await signUp(email, password)
      if ((res as any).error) {
        setError((res as any).error.message ?? 'Authentication error')
      } else {
        navigate(from, { replace: true })
      }
    } catch (err: any) {
      setError(err?.message ?? 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <div style={{ maxWidth: 720, margin: '3rem auto' }}>
        <div className="modal" style={{ position: 'relative' }}>
          <h2>{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>
          <form onSubmit={submit} className="login-form">
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            {error && <div className="form-error">{error}</div>}
            <button type="submit" className="button button--primary" disabled={loading}>
              {loading ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
          <div className="modal-footer">
            <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="button button--secondary">
              {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
