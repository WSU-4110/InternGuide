import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const VirtualInternship = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">💻</div>
          <h1 className="resource-detail-title">Virtual Internship Success</h1>
          <p className="resource-detail-description">
            Best practices for excelling in remote internship positions
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Setting Up Your Workspace</h2>
            <ul className="section-list">
              <li><strong>Dedicated Space:</strong> Create a specific area for work to maintain work-life boundaries</li>
              <li><strong>Reliable Technology:</strong> Ensure stable internet, functioning webcam, and microphone</li>
              <li><strong>Professional Background:</strong> Keep your video background clean and distraction-free</li>
              <li><strong>Good Lighting:</strong> Position yourself facing a window or use a desk lamp for video calls</li>
              <li><strong>Minimal Distractions:</strong> Communicate your work hours to family or roommates</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Communication Best Practices</h2>
            <ul className="section-list">
              <li>Respond to messages within a reasonable timeframe (within a few hours during work hours)</li>
              <li>Use video for important meetings to build stronger connections</li>
              <li>Over-communicate your progress and any blockers you encounter</li>
              <li>Ask questions proactively rather than waiting for check-ins</li>
              <li>Use appropriate channels (email for formal, Slack for quick questions)</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Schedule regular virtual coffee chats with teammates. Building relationships remotely requires extra effort, but these informal connections are crucial for a successful internship experience.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Staying Productive</h2>
            <ul className="section-list">
              <li>Maintain consistent work hours and stick to a routine</li>
              <li>Take regular breaks using the Pomodoro technique (25 min work, 5 min break)</li>
              <li>Use project management tools to track tasks and deadlines</li>
              <li>Set daily and weekly goals to stay motivated</li>
              <li>Minimize distractions by turning off social media notifications</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Building Relationships Remotely</h2>
            <ul className="section-list">
              <li>Participate actively in team meetings and virtual events</li>
              <li>Turn your camera on during meetings to show engagement</li>
              <li>Reach out to colleagues for informational interviews</li>
              <li>Join company social channels and interest groups</li>
              <li>Document your work and share wins with your team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualInternship;
