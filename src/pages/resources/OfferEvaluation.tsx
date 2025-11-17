import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const OfferEvaluation = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">⚖️</div>
          <h1 className="resource-detail-title">Evaluating Internship Offers</h1>
          <p className="resource-detail-description">
            How to compare multiple internship offers and make the best decision
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Key Factors to Consider</h2>
            <ul className="section-list">
              <li><strong>Compensation:</strong> Salary, housing stipend, relocation assistance, and benefits</li>
              <li><strong>Learning Opportunities:</strong> Projects, mentorship, training programs</li>
              <li><strong>Company Reputation:</strong> Brand recognition and industry standing</li>
              <li><strong>Career Alignment:</strong> Relevance to your long-term career goals</li>
              <li><strong>Culture & Environment:</strong> Team dynamics, work-life balance, company values</li>
              <li><strong>Location:</strong> Cost of living, proximity to network, lifestyle fit</li>
              <li><strong>Conversion Potential:</strong> Likelihood of receiving a full-time offer</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Questions to Ask</h2>
            <p className="section-text">
              Before making your decision, clarify these important details:
            </p>
            <ul className="section-list">
              <li>What specific projects will I work on?</li>
              <li>Who will be my direct manager and mentor?</li>
              <li>What percentage of interns receive return offers?</li>
              <li>What does the onboarding and training process look like?</li>
              <li>Are there opportunities to explore different teams or roles?</li>
              <li>What is the team size and intern cohort size?</li>
              <li>What social events or networking opportunities are offered?</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Create a decision matrix: list all offers as columns and important factors as rows. Rate each offer (1-10) for each factor, then multiply by importance weight. This systematic approach helps clarify your priorities.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Negotiation Tips</h2>
            <ul className="section-list">
              <li>Research typical compensation for similar internships in that location</li>
              <li>If you have competing offers, you can leverage them (professionally)</li>
              <li>Focus on total compensation package, not just base salary</li>
              <li>Be polite and express enthusiasm while negotiating</li>
              <li>Get everything in writing before accepting</li>
              <li>Know that some companies have fixed intern compensation</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Timeline Management</h2>
            <ul className="section-list">
              <li>Understand each offer's deadline and respect them</li>
              <li>Request extensions politely if you need more time</li>
              <li>Communicate promptly with all companies</li>
              <li>Once you accept an offer, withdraw from other processes immediately</li>
              <li>Never renege on an accepted offer - it damages your professional reputation</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Making the Final Decision</h2>
            <p className="section-text">
              Trust your instincts, but also:
            </p>
            <ul className="section-list">
              <li>Discuss with mentors, professors, or career counselors</li>
              <li>Connect with current or former interns for honest insights</li>
              <li>Prioritize learning and growth over prestige alone</li>
              <li>Consider which experience aligns with your long-term goals</li>
              <li>Remember there's no perfect choice - focus on what matters most to you</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferEvaluation;
