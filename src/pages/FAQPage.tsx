import { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 'what-is-internguide',
    question: 'What is InternGuide?',
    answer:
      'InternGuide is a comprehensive platform designed to help students navigate their internship search journey. We provide tools for resume optimization, personalized career planning through our Mind Map feature, and actionable guidance to help you land your dream internship.',
  },
  {
    id: 'how-does-mindmap-work',
    question: 'How does the Mind Map feature work?',
    answer:
      'The Mind Map feature uses AI to create personalized, step-by-step plans for your career goals. Simply describe what you want to learn, build, or achieve, and our system generates a tailored roadmap with 5-8 actionable steps. Each plan is designed to be practical and realistic for students and early-career professionals.',
  },
  {
    id: 'resume-feedback',
    question: 'Can I get feedback on my resume?',
    answer:
      'Yes! Our Resume page allows you to upload your resume (PDF or text format, up to 5MB) and receive AI-powered feedback. The system analyzes your resume and provides specific, actionable suggestions grouped by sections like Summary, Experience, Projects, and Skills.',
  },
  {
    id: 'data-privacy',
    question: 'Is my data secure and private?',
    answer:
      'We take your privacy seriously. All uploaded resumes and personal information are stored securely using industry-standard encryption. Your data is only used to provide you with personalized feedback and recommendations, and we never share your information with third parties without your explicit consent.',
  },
  {
    id: 'cost',
    question: 'Is InternGuide free to use?',
    answer:
      'InternGuide is currently in development and offering free access to students. We believe every student should have access to quality career guidance tools. Future pricing models, if any, will be student-friendly and transparent.',
  },
  {
    id: 'who-is-it-for',
    question: 'Who is InternGuide designed for?',
    answer:
      'InternGuide is designed for students and early-career professionals actively seeking internships or entry-level positions. Whether you\'re a college freshman exploring career paths or a senior preparing for your final internship, our tools adapt to your needs and experience level.',
  },
  {
    id: 'technical-issues',
    question: 'I\'m experiencing technical issues. What should I do?',
    answer:
      'If you encounter any technical problems, please reach out to us through the contact section on our homepage. Include details about the issue you\'re experiencing, and we\'ll work to resolve it as quickly as possible. Common issues can often be resolved by refreshing the page or clearing your browser cache.',
  },
  {
    id: 'roadmap',
    question: 'What features are coming next?',
    answer:
      'We\'re constantly improving InternGuide! Upcoming features include interview preparation tools, company research databases, networking tips, and a community forum where students can share experiences and advice. Check back regularly for updates, or follow us to stay informed about new releases.',
  },
]

function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="faq-page">
      <section className="hero faq-hero">
        <div className="hero__body">
          <span className="hero__tag">Frequently Asked Questions</span>
          <h1>Got questions? We&apos;ve got answers.</h1>
          <p>
            Find answers to common questions about InternGuide, our features, and how we can help you succeed in your
            internship search.
          </p>
        </div>
      </section>

      <div className="main-content faq-content">
        <section className="section">
          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.id} className={`faq-item ${openId === faq.id ? 'faq-item--open' : ''}`}>
                <button onClick={() => toggleFAQ(faq.id)} className="faq-question" aria-expanded={openId === faq.id}>
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle" aria-hidden="true">
                    {openId === faq.id ? '−' : '+'}
                  </span>
                </button>
                {openId === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section section--muted">
          <h2>Still have questions?</h2>
          <p className="section__intro">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help! Reach out through our contact form
            on the homepage, and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="/#contact">
              Contact us
            </a>
            <a className="button button--secondary" href="/">
              Back to home
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FAQPage








