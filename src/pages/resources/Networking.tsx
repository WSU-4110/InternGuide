import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const Networking = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">🤝</div>
          <h1 className="resource-detail-title">Networking for Internships</h1>
          <p className="resource-detail-description">
            Leverage LinkedIn, career fairs, and connections to find opportunities
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Building Your LinkedIn Profile</h2>
            <ul className="section-list">
              <li><strong>Professional Photo:</strong> Use a clear headshot with good lighting</li>
              <li><strong>Compelling Headline:</strong> More than just "Student" - include your major and interests</li>
              <li><strong>Detailed Summary:</strong> Tell your story and career aspirations</li>
              <li><strong>Complete Experience:</strong> Include all relevant work, projects, and activities</li>
              <li><strong>Skills & Endorsements:</strong> List relevant skills and ask connections to endorse you</li>
              <li><strong>Recommendations:</strong> Request recommendations from professors or supervisors</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Effective Networking Strategies</h2>
            <ul className="section-list">
              <li>Connect with alumni from your university working at target companies</li>
              <li>Attend virtual and in-person career fairs</li>
              <li>Join industry-specific LinkedIn groups and participate in discussions</li>
              <li>Follow companies you're interested in and engage with their content</li>
              <li>Reach out to professionals for informational interviews</li>
              <li>Attend industry conferences, workshops, and networking events</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              When reaching out on LinkedIn, personalize your connection request. Mention something specific about their background or work that interested you, and be clear about why you want to connect.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Sample LinkedIn Message Template</h2>
            <p className="section-text">
              "Hi [Name], I'm a [year] at [University] studying [Major]. I came across your profile and was impressed by your work at [Company] on [specific project/role]. I'm currently exploring internship opportunities in [field] and would love to learn more about your experience. Would you be open to a brief call or coffee chat? Thank you for considering!"
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Career Fair Best Practices</h2>
            <ul className="section-list">
              <li>Research companies attending beforehand</li>
              <li>Prepare a 30-second elevator pitch</li>
              <li>Bring multiple copies of your resume</li>
              <li>Dress professionally (business casual minimum)</li>
              <li>Ask thoughtful questions about internship opportunities</li>
              <li>Collect business cards and follow up within 24 hours</li>
              <li>Take notes after each conversation to personalize follow-ups</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Networking;
