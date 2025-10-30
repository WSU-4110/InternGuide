import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const PortfolioBuilding = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">🎨</div>
          <h1 className="resource-detail-title">Building Your Portfolio</h1>
          <p className="resource-detail-description">
            Create an impressive portfolio showcasing your projects and work
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Essential Portfolio Elements</h2>
            <ul className="section-list">
              <li><strong>About Section:</strong> Brief bio, skills, and what you're passionate about</li>
              <li><strong>Projects:</strong> 3-5 high-quality projects with descriptions and links</li>
              <li><strong>Technical Skills:</strong> List of technologies and tools you're proficient in</li>
              <li><strong>Contact Information:</strong> Email, LinkedIn, GitHub, and other relevant links</li>
              <li><strong>Resume:</strong> Downloadable PDF version of your resume</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Showcasing Projects Effectively</h2>
            <p className="section-text">
              For each project, include:
            </p>
            <ul className="section-list">
              <li><strong>Clear Title:</strong> Descriptive name that explains what it does</li>
              <li><strong>Visual Preview:</strong> Screenshots, demo video, or live link</li>
              <li><strong>Problem Statement:</strong> What challenge does this project solve?</li>
              <li><strong>Your Role:</strong> What you specifically contributed</li>
              <li><strong>Technologies Used:</strong> Tech stack and tools</li>
              <li><strong>Outcomes:</strong> Results, metrics, or lessons learned</li>
              <li><strong>Code Link:</strong> GitHub repository (with clean README)</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Quality over quantity! It's better to have 3 well-documented, polished projects than 10 incomplete ones. Focus on projects that demonstrate skills relevant to your target internships.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Portfolio Platforms</h2>
            <ul className="section-list">
              <li><strong>Personal Website:</strong> Full control and customization (GitHub Pages, Netlify, Vercel)</li>
              <li><strong>Behance/Dribbble:</strong> Great for design portfolios</li>
              <li><strong>GitHub:</strong> Essential for developers to showcase code</li>
              <li><strong>Medium/Dev.to:</strong> Share technical writing and project breakdowns</li>
              <li><strong>LinkedIn:</strong> Professional network with project showcase feature</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Design Best Practices</h2>
            <ul className="section-list">
              <li>Keep the design clean and professional</li>
              <li>Ensure mobile responsiveness</li>
              <li>Use consistent branding (colors, fonts)</li>
              <li>Make navigation intuitive and simple</li>
              <li>Optimize images for fast loading</li>
              <li>Include clear calls-to-action (contact, view project)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilding;
