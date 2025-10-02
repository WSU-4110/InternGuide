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

function App() {
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
