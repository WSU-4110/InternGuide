import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MindMapPage from './pages/MindMapPage'
import Resume from './pages/Resume'
import './App.css'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
// yooo
let name = "yoooo"
console.log(name); 
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
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
          </nav>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>

        <main className="page-shell">
          <div className="page-shell__inner">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mind-map" element={<MindMapPage />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/resume2" element={<Resume />} />
            </Routes>

          </div>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} InternGuide. Made for students chasing their next internship.</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
