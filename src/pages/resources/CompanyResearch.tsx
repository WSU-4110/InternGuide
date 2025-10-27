import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const CompanyResearch = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">🔍</div>
          <h1 className="resource-detail-title">Company Research Strategies</h1>
          <p className="resource-detail-description">
            How to research companies and tailor your applications for impact
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Key Research Areas</h2>
            <ul className="section-list">
              <li><strong>Company Mission & Values:</strong> Understand what the company stands for</li>
              <li><strong>Products & Services:</strong> Know what they build and who they serve</li>
              <li><strong>Company Culture:</strong> Learn about work environment and employee experiences</li>
              <li><strong>Recent News:</strong> Stay updated on launches, acquisitions, or major announcements</li>
              <li><strong>Industry Position:</strong> Understand competitors and market standing</li>
              <li><strong>Growth & Future:</strong> Research expansion plans and strategic direction</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Research Resources</h2>
            <ul className="section-list">
              <li><strong>Company Website:</strong> About page, blog, press releases, and careers section</li>
              <li><strong>Glassdoor:</strong> Employee reviews, interview experiences, and salary information</li>
              <li><strong>LinkedIn:</strong> Company page, employee profiles, and company updates</li>
              <li><strong>News Sources:</strong> Google News, TechCrunch, industry publications</li>
              <li><strong>Social Media:</strong> Twitter, Instagram, YouTube for company culture insights</li>
              <li><strong>Annual Reports:</strong> Financial health and strategic priorities (for public companies)</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Set up Google Alerts for companies you're interested in. You'll receive email updates about news and developments, giving you conversation points for interviews and networking.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Tailoring Your Application</h2>
            <p className="section-text">
              Use your research to customize your application materials:
            </p>
            <ul className="section-list">
              <li>Mention specific products, projects, or initiatives that excite you</li>
              <li>Align your skills and experiences with the company's needs</li>
              <li>Use similar language and keywords from the job description</li>
              <li>Reference the company's values and explain how you embody them</li>
              <li>Show knowledge of recent company news or achievements</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Questions to Guide Your Research</h2>
            <ul className="section-list">
              <li>What problem does this company solve?</li>
              <li>Who are their main competitors?</li>
              <li>What is their company culture like?</li>
              <li>What recent achievements or launches have they had?</li>
              <li>What technologies or methodologies do they use?</li>
              <li>What growth opportunities exist for interns?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyResearch;
