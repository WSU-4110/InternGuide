import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const ResumeGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">📝</div>
          <h1 className="resource-detail-title">Internship Resume Guide</h1>
          <p className="resource-detail-description">
            Craft a compelling internship resume that highlights your skills and projects
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Essential Resume Components</h2>
            <p className="section-text">
              A strong internship resume should be concise (one page), well-organized, and tailored to the position you're applying for.
            </p>
            <ul className="section-list">
              <li><strong>Contact Information:</strong> Name, phone number, email, LinkedIn profile, and portfolio link (if applicable)</li>
              <li><strong>Education:</strong> Your university, major, expected graduation date, GPA (if above 3.0), and relevant coursework</li>
              <li><strong>Experience:</strong> Previous internships, part-time jobs, volunteer work, or leadership positions</li>
              <li><strong>Projects:</strong> Academic or personal projects that demonstrate relevant skills</li>
              <li><strong>Skills:</strong> Technical skills, programming languages, tools, and soft skills</li>
              <li><strong>Achievements:</strong> Awards, certifications, publications, or notable accomplishments</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Formatting Best Practices</h2>
            <ul className="section-list">
              <li>Use a clean, professional font (Arial, Calibri, or Times New Roman, 10-12pt)</li>
              <li>Keep consistent spacing and alignment throughout</li>
              <li>Use bullet points to make information scannable</li>
              <li>Save and submit as a PDF to preserve formatting</li>
              <li>Name your file professionally: "FirstName_LastName_Resume.pdf"</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Writing Strong Bullet Points</h2>
            <p className="section-text">
              Use the STAR method (Situation, Task, Action, Result) to describe your experiences:
            </p>
            <ul className="section-list">
              <li>Start with action verbs (Developed, Managed, Analyzed, Created)</li>
              <li>Include quantifiable results when possible (increased by 20%, managed team of 5)</li>
              <li>Focus on impact and outcomes, not just responsibilities</li>
              <li>Tailor each bullet point to highlight skills relevant to the internship</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Customize your resume for each application by incorporating keywords from the job description. Many companies use Applicant Tracking Systems (ATS) that scan for specific terms.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Common Mistakes to Avoid</h2>
            <ul className="section-list">
              <li>Spelling or grammatical errors (always proofread multiple times)</li>
              <li>Using an unprofessional email address</li>
              <li>Including irrelevant information or hobbies</li>
              <li>Making your resume longer than one page as a student</li>
              <li>Using generic descriptions that could apply to anyone</li>
              <li>Listing duties instead of accomplishments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGuide;
