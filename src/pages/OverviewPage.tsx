import { Link } from 'react-router-dom'

const overviewSections = [
  {
    title: 'Start with your resume',
    description:
      'Upload your resume, get AI-powered feedback, and turn your experience into a clear, actionable story.',
    items: [
      'Upload once, reuse insights across the platform',
      'Highlight key projects, impact, and skills',
      'Spot gaps before recruiters do',
    ],
    ctaLabel: 'Go to Resume feedback',
    ctaLink: '/resume-feedback',
  },
  {
    title: 'Turn goals into a plan',
    description:
      'Use the mind map to visualize your path and break the recruiting process into manageable steps.',
    items: [
      'Capture your target roles and timelines',
      'See tasks grouped by stage of the journey',
      'Refine the map as your plans evolve',
    ],
    ctaLabel: 'Open Mind Map',
    ctaLink: '/mind-map',
  },
  {
    title: 'Track every application',
    description:
      'Keep offers, interviews, and follow-ups all in one place so nothing slips through the cracks.',
    items: [
      'See a snapshot of where you stand',
      'Filter by status and company',
      'Review notes before each interview',
    ],
    ctaLabel: 'View Job Tracker',
    ctaLink: '/job-tracker',
  },
]

const quickLinks = [
  { label: 'Interview prep guide', to: '/resources/interview-prep' },
  { label: 'Resume guide', to: '/resources/resume-guide' },
  { label: 'Technical interview prep', to: '/resources/technical-interview' },
  { label: 'Networking and outreach', to: '/resources/networking' },
  { label: 'FAQ', to: '/faq' },
]

function OverviewPage() {
  return (
    <div className="overview-page">
      <header className="hero">
        <div className="hero__body">
          <span className="hero__tag">Overview</span>
          <h1>Your internship journey all in one place.</h1>
          <p>
            Use this overview as your single starting point. From resume feedback to planning and tracking
            applications, InternGuide keeps your next steps clear.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/resume-feedback">
              Start with resume feedback
            </Link>
            <Link className="button button--secondary" to="/job-tracker">
              Review your applications
            </Link>
          </div>
        </div>
      </header>

      <div className="main-content">
        <section className="section">
          <h2>Your core tools</h2>
          <p className="section__intro">
            Think of these as your three main points: tell your story, map your plan, and stay on top of every
            application.
          </p>
          <div className="feature-grid">
            {overviewSections.map((section) => (
              <article key={section.title} className="feature-card">
                <h3>{section.title}</h3>
                <p style={{ margin: 0, color: 'var(--muted-text)', lineHeight: 1.6 }}>
                  {section.description}
                </p>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link to={section.ctaLink} className="button button--primary" style={{ marginTop: '0.5rem' }}>
                  {section.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--muted">
          <h2>Today’s snapshot</h2>
          <p className="section__intro">
            Use this space to quickly understand where you are. As features roll out, this section can plug into
            live stats from your job tracker and mind map.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">—</div>
              <p className="stat-label">Active applications</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">—</div>
              <p className="stat-label">Upcoming interviews</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">—</div>
              <p className="stat-label">Offers to review</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Quick links</h2>
          <p className="section__intro">
            When you have just a few minutes, start here. These resources are designed to give you momentum fast.
          </p>

          <div className="contact-card">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
            <p style={{ margin: 0, color: 'var(--muted-text)', fontSize: '0.9rem' }}>
              Not sure where to go? Visit the full <Link to="/resources">Resources hub</Link> for a complete list of
              guides.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OverviewPage


