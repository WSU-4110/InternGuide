import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const InterviewPrep = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">🎤</div>
          <h1 className="resource-detail-title">Internship Interview Prep</h1>
          <p className="resource-detail-description">
            Common internship interview questions and how to showcase your potential
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Common Behavioral Questions</h2>
            <ul className="section-list">
              <li><strong>"Tell me about yourself"</strong> - Prepare a 60-second pitch covering education, experience, and career interests</li>
              <li><strong>"Why this company/role?"</strong> - Research the company and connect their mission to your goals</li>
              <li><strong>"Describe a challenge you overcame"</strong> - Use STAR method to structure your response</li>
              <li><strong>"Tell me about a time you worked in a team"</strong> - Highlight collaboration and communication skills</li>
              <li><strong>"What are your strengths/weaknesses?"</strong> - Be honest and show self-awareness</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">The STAR Method</h2>
            <p className="section-text">
              Structure your answers using this framework for clear, compelling responses:
            </p>
            <ul className="section-list">
              <li><strong>Situation:</strong> Set the context for your story</li>
              <li><strong>Task:</strong> Describe what needed to be accomplished</li>
              <li><strong>Action:</strong> Explain the specific steps you took</li>
              <li><strong>Result:</strong> Share the outcome and what you learned</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Prepare 5-7 stories from your experiences that demonstrate different skills. You can adapt these stories to answer various questions during the interview.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Questions to Ask Interviewers</h2>
            <ul className="section-list">
              <li>"What does a typical day look like for an intern in this role?"</li>
              <li>"What projects would I be working on during the internship?"</li>
              <li>"How do you measure success for this position?"</li>
              <li>"What opportunities are there for mentorship and learning?"</li>
              <li>"What do you enjoy most about working at this company?"</li>
              <li>"What's the team culture like?"</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Interview Day Checklist</h2>
            <ul className="section-list">
              <li>Test your technology 30 minutes before (for virtual interviews)</li>
              <li>Dress professionally (business casual or business formal)</li>
              <li>Have your resume, notepad, and pen ready</li>
              <li>Prepare questions to ask the interviewer</li>
              <li>Log in 5-10 minutes early</li>
              <li>Send a thank-you email within 24 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
