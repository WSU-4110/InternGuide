import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const CoverLetters = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">📄</div>
          <h1 className="resource-detail-title">Cover Letter Templates</h1>
          <p className="resource-detail-description">
            Professional cover letter templates for internship applications
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Cover Letter Structure</h2>
            <ul className="section-list">
              <li><strong>Header:</strong> Your contact information and date</li>
              <li><strong>Greeting:</strong> Address to specific person when possible (avoid "To Whom It May Concern")</li>
              <li><strong>Opening Paragraph:</strong> State the position and why you're excited about it</li>
              <li><strong>Body Paragraphs:</strong> Highlight relevant skills, experiences, and accomplishments</li>
              <li><strong>Closing Paragraph:</strong> Express enthusiasm and indicate next steps</li>
              <li><strong>Sign-off:</strong> Professional closing (Sincerely, Best regards)</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Opening Paragraph Tips</h2>
            <p className="section-text">
              Your opening should grab attention and show genuine interest:
            </p>
            <ul className="section-list">
              <li>Mention how you discovered the opportunity</li>
              <li>Express specific enthusiasm for the company or role</li>
              <li>Include a compelling hook about your background</li>
              <li>Keep it concise - 3-4 sentences maximum</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Research the hiring manager's name on LinkedIn and address them directly. This small detail shows initiative and attention to detail.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Body Paragraph Formula</h2>
            <p className="section-text">
              Each body paragraph should follow this pattern:
            </p>
            <ul className="section-list">
              <li><strong>Skill/Requirement:</strong> Reference a key qualification from the job description</li>
              <li><strong>Your Experience:</strong> Provide a specific example demonstrating this skill</li>
              <li><strong>Impact:</strong> Quantify the results or outcome when possible</li>
              <li><strong>Connection:</strong> Explain how this experience prepares you for the internship</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Common Mistakes to Avoid</h2>
            <ul className="section-list">
              <li>Writing a generic letter and sending it to multiple companies</li>
              <li>Simply repeating information from your resume</li>
              <li>Making it too long (keep it to one page)</li>
              <li>Focusing too much on what you'll gain instead of what you offer</li>
              <li>Forgetting to proofread for typos and grammar errors</li>
              <li>Using overly casual language or clichés</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Closing Strong</h2>
            <p className="section-text">
              Your closing paragraph should:
            </p>
            <ul className="section-list">
              <li>Reiterate your enthusiasm for the position</li>
              <li>Thank them for their consideration</li>
              <li>Include a call to action (e.g., "I look forward to discussing...")</li>
              <li>Mention that you're happy to provide additional information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetters;
