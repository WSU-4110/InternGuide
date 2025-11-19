import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const FindingInternship = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">🎯</div>
          <h1 className="resource-detail-title">Finding Your First Internship</h1>
          <p className="resource-detail-description">
            Step-by-step guide to discover and apply for internships that match your career goals
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Where to Search for Internships</h2>
            <ul className="section-list">
              <li><strong>Company Career Pages:</strong> Visit the careers section of companies you admire</li>
              <li><strong>LinkedIn:</strong> Use the jobs tab and set filters for internships and entry-level positions</li>
              <li><strong>Handshake:</strong> Your university's career platform with exclusive opportunities</li>
              <li><strong>Indeed & Glassdoor:</strong> General job boards with internship filters</li>
              <li><strong>Industry-Specific Boards:</strong> GitHub Jobs for tech, Idealist for nonprofits, etc.</li>
              <li><strong>Career Fairs:</strong> Attend virtual and in-person recruiting events at your school</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Timeline for Applications</h2>
            <p className="section-text">
              Understanding application timelines is crucial for internship success:
            </p>
            <ul className="section-list">
              <li><strong>Summer Internships:</strong> Applications open August-October of the previous year</li>
              <li><strong>Fall Internships:</strong> Applications typically open in March-May</li>
              <li><strong>Spring Internships:</strong> Applications open September-November</li>
              <li><strong>Rolling Basis:</strong> Some companies accept applications year-round</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Start your search early! Large tech companies and competitive programs often fill positions 6-9 months in advance. Set up job alerts and check positions weekly.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Application Strategy</h2>
            <ul className="section-list">
              <li>Apply to 10-15 positions per week during peak season</li>
              <li>Keep a spreadsheet tracking applications, deadlines, and follow-ups</li>
              <li>Tailor your resume and cover letter for each position</li>
              <li>Follow up 1-2 weeks after applying if you haven't heard back</li>
              <li>Network with employees at target companies before applying</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Red Flags to Watch For</h2>
            <ul className="section-list">
              <li>Unpaid internships without academic credit (may not be legal)</li>
              <li>Vague job descriptions or unrealistic requirements</li>
              <li>Requests for payment or personal financial information</li>
              <li>No clear supervisor or structured learning plan</li>
              <li>Internships that are primarily administrative work with no skill development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindingInternship;
