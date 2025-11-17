import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const InternshipSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">⭐</div>
          <h1 className="resource-detail-title">Making the Most of Your Internship</h1>
          <p className="resource-detail-description">
            Tips to maximize learning and build relationships during your internship
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">First Week Success</h2>
            <ul className="section-list">
              <li><strong>Set Up 1-on-1s:</strong> Schedule meetings with your manager and key team members</li>
              <li><strong>Clarify Expectations:</strong> Understand your goals, deliverables, and success metrics</li>
              <li><strong>Learn the Tools:</strong> Get familiar with company systems, software, and workflows</li>
              <li><strong>Ask Questions:</strong> Don't be afraid to ask for clarification - it shows engagement</li>
              <li><strong>Take Notes:</strong> Document processes, contacts, and important information</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Building Relationships</h2>
            <ul className="section-list">
              <li>Schedule coffee chats with colleagues across different teams</li>
              <li>Participate in company social events and activities</li>
              <li>Find a mentor who can guide you throughout the internship</li>
              <li>Build relationships with other interns - they're your peer network</li>
              <li>Show genuine interest in others' work and experiences</li>
              <li>Stay connected on LinkedIn and maintain relationships after the internship</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Keep an "internship journal" where you document your projects, accomplishments, and lessons learned each week. This will be invaluable when updating your resume and preparing for future interviews.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Maximizing Learning</h2>
            <ul className="section-list">
              <li>Volunteer for challenging projects outside your comfort zone</li>
              <li>Attend team meetings and company all-hands to understand the bigger picture</li>
              <li>Seek feedback regularly and implement suggestions</li>
              <li>Shadow different roles to learn about various career paths</li>
              <li>Take advantage of training resources and learning platforms</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Securing a Return Offer</h2>
            <ul className="section-list">
              <li>Deliver high-quality work and meet all deadlines</li>
              <li>Take initiative and go beyond assigned tasks</li>
              <li>Demonstrate cultural fit and team collaboration</li>
              <li>Express interest in returning and ask about the process</li>
              <li>Request feedback midway through to course-correct if needed</li>
              <li>End strong - your last impression matters as much as your first</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipSuccess;
