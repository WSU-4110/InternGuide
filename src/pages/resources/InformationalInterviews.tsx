import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const InformationalInterviews = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">☕</div>
          <h1 className="resource-detail-title">Informational Interviews</h1>
          <p className="resource-detail-description">
            Master informational interviews to learn about companies and opportunities
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">What is an Informational Interview?</h2>
            <p className="section-text">
              An informational interview is a casual conversation where you learn about someone's career path, role, or company. It's not a job interview - it's an opportunity to gather insights, build relationships, and expand your professional network.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">How to Request an Informational Interview</h2>
            <ul className="section-list">
              <li><strong>Identify Contacts:</strong> Alumni, LinkedIn connections, or referrals from professors</li>
              <li><strong>Craft Your Outreach:</strong> Be specific about why you want to talk to them</li>
              <li><strong>Keep it Brief:</strong> Respect their time - request 20-30 minutes</li>
              <li><strong>Be Flexible:</strong> Offer multiple time options or let them choose</li>
              <li><strong>Follow Up:</strong> If no response in a week, send a polite follow-up</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Sample Outreach Template</h2>
            <p className="section-text">
              "Hi [Name], I'm a [year] at [University] studying [major]. I came across your profile and was impressed by your work in [field/company]. I'm currently exploring career paths in [industry] and would love to learn about your experience. Would you have 20 minutes for a brief call or coffee chat? I'm happy to work around your schedule. Thank you for considering!"
            </p>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Always emphasize that you're seeking advice, not asking for a job. This removes pressure and makes people more willing to help.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Questions to Ask</h2>
            <ul className="section-list">
              <li>"Can you tell me about your career path and how you got to where you are?"</li>
              <li>"What does a typical day look like in your role?"</li>
              <li>"What skills are most important for success in your field?"</li>
              <li>"What do you enjoy most about your work? What's challenging?"</li>
              <li>"How did you prepare for this career during college?"</li>
              <li>"What advice would you give someone interested in this field?"</li>
              <li>"Are there any resources, courses, or experiences you'd recommend?"</li>
              <li>"Would you be open to staying connected as I explore this field?"</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Best Practices</h2>
            <ul className="section-list">
              <li>Do your homework - research the person and company beforehand</li>
              <li>Prepare 5-7 thoughtful questions in advance</li>
              <li>Take notes during the conversation</li>
              <li>Listen actively and ask follow-up questions</li>
              <li>Be respectful of time - stick to the agreed duration</li>
              <li>End by asking if they can recommend others to speak with</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">After the Interview</h2>
            <ul className="section-list">
              <li>Send a thank-you email within 24 hours</li>
              <li>Mention specific insights that were valuable to you</li>
              <li>Keep them updated on your progress periodically</li>
              <li>Connect on LinkedIn to maintain the relationship</li>
              <li>Offer to help them in return when possible</li>
              <li>Follow their advice and let them know the outcome</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationalInterviews;
