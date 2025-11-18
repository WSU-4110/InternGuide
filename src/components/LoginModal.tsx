import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../contexts/AuthContext'
import './LoginModal.css'

type Props = {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: Props) {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement
    // focus the first input in the modal when opened
    const firstInput = modalRef.current?.querySelector('input') as HTMLElement | null
    firstInput?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // simple focus trap: keep focus inside modal on Tab
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      // restore previous focus
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = mode === 'signin' ? await signIn(email, password) : await signUp(email, password)
      // Supabase returns error property if something failed
      if ((res as any).error) {
        setError((res as any).error.message ?? 'Authentication error')
      } else {
        onClose()
      }
    } catch (err: any) {
      setError(err?.message ?? 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const node = (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Login dialog"
      ref={overlayRef}
      onMouseDown={(e) => {
        // close when clicking the overlay (but not when clicking inside the modal)
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="modal" ref={modalRef} onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2 id="login-heading">{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>
        <form onSubmit={onSubmit} className="login-form" aria-labelledby="login-heading">
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
  )

  return createPortal(node, document.body)
}
