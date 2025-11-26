import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OverviewPage from './pages/OverviewPage'
import MindMapPage from './pages/MindMapPage'
import MindMapDetailPage from './pages/MindMapDetailPage'
import Resume from './pages/Resume'
import ResumeFeedback from './pages/ResumeFeedback'
import FAQPage from './pages/FAQPage'
import JobTrackerPage from './pages/JobTrackerPage'
import LoginPage from './pages/LoginPage'
import Resources from './pages/Resources'

import FindingInternship from './pages/resources/FindingInternship'
import ResumeGuide from './pages/resources/ResumeGuide'
import VirtualInternship from './pages/resources/VirtualInternship'
import InterviewPrep from './pages/resources/InterviewPrep'
import PortfolioBuilding from './pages/resources/PortfolioBuilding'
import Networking from './pages/resources/Networking'
import CompanyResearch from './pages/resources/CompanyResearch'
import InternshipSuccess from './pages/resources/InternshipSuccess'
import CoverLetters from './pages/resources/CoverLetters'
import TechnicalInterview from './pages/resources/TechnicalInterview'
import OfferEvaluation from './pages/resources/OfferEvaluation'
import InformationalInterviews from './pages/resources/InformationalInterviews'

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
              <NavLink to="/" end className={navLinkClasses}>Home</NavLink>
              <NavLink to="/overview" className={navLinkClasses}>Overview</NavLink>
              <NavLink to="/mind-map" className={navLinkClasses}>Mind Map</NavLink>
              <NavLink to="/resume-feedback" className={navLinkClasses}>Resume</NavLink>
              <NavLink to="/job-tracker" className={navLinkClasses}>Job Tracker</NavLink>
              <NavLink to="/faq" className={navLinkClasses}>FAQ</NavLink>
              <NavLink to="/resources" className={navLinkClasses}>Resources</NavLink>
            </nav>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <AuthButton onOpen={() => setModalOpen(true)} />
              <button
                className="theme-toggle"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </header>

          <main className="page-shell">
            <div className="page-shell__inner">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/mind-map" element={<MindMapPage />} />
                <Route path="/mind-map/:id" element={<MindMapDetailPage />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/resume-feedback" element={<ResumeFeedback />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/job-tracker" element={<JobTrackerPage />} />
                <Route path="/faq" element={<FAQPage />} />

                {/* MAIN RESOURCES PAGE */}
                <Route path="/resources" element={<Resources />} />

                {/* RESOURCE DETAIL PAGES */}
                <Route path="/resources/finding-internship" element={<FindingInternship />} />
                <Route path="/resources/resume-guide" element={<ResumeGuide />} />
                <Route path="/resources/virtual-internship" element={<VirtualInternship />} />
                <Route path="/resources/interview-prep" element={<InterviewPrep />} />
                <Route path="/resources/portfolio-building" element={<PortfolioBuilding />} />
                <Route path="/resources/networking" element={<Networking />} />
                <Route path="/resources/company-research" element={<CompanyResearch />} />
                <Route path="/resources/internship-success" element={<InternshipSuccess />} />
                <Route path="/resources/cover-letters" element={<CoverLetters />} />
                <Route path="/resources/technical-interview" element={<TechnicalInterview />} />
                <Route path="/resources/offer-evaluation" element={<OfferEvaluation />} />
                <Route path="/resources/informational-interviews" element={<InformationalInterviews />} />
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
  const { user, signOut } = useAuth()
  if (user) {
    return (
      <>
        <span style={{ marginRight: '0.5rem' }}>{user.email}</span>
        <button className="button" onClick={() => signOut()}>Logout</button>
      </>
    )
  }
  return (
    <button className="button button--primary" onClick={onOpen}>
      Login
    </button>
  )
}
