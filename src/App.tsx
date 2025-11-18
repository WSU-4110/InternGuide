import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MindMapPage from './pages/MindMapPage'
import Resume from './pages/Resume'
import FAQPage from './pages/FAQPage'
import JobTrackerPage from './pages/JobTrackerPage'
import LoginPage from './pages/LoginPage'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginModal from './components/LoginModal'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="layout">
          <header className="site-header">
          <NavLink to="/" className="site-logo" end>
            InternGuide
          </NavLink>
          <nav className="site-nav">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/mind-map" className={navLinkClasses}>
              Mind Map
            </NavLink>
            <NavLink to="/resume" className={navLinkClasses}>
              Resume
            </NavLink>
            <NavLink to="/job-tracker" className={navLinkClasses}>
              Job Tracker
            </NavLink>
            <NavLink to="/faq" className={navLinkClasses}>
              FAQ
            </NavLink>
          </nav>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <AuthButton onOpen={() => setModalOpen(true)} />
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </header>

        <main className="page-shell">
          <div className="page-shell__inner">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mind-map" element={<MindMapPage />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/job-tracker" element={<JobTrackerPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </div>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} InternGuide. Made for students chasing their next internship.</p>
        </footer>
        <LoginModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </BrowserRouter>
  </AuthProvider>
  )
}

export default App

function AuthButton({ onOpen }: { onOpen: () => void }) {
  try {
    const { user, signOut } = useAuth()
    if (user) {
      return (
        <>
          <span style={{ marginRight: '0.5rem' }}>{user.email}</span>
          <button className="button" onClick={() => signOut()}>
            Logout
          </button>
        </>
      )
    }
  } catch (e) {
    // Hook might throw if used outside provider during static analysis — fall back
  }

  return (
    <button className="button button--primary" onClick={onOpen}>
      Login
    </button>
  )
}
