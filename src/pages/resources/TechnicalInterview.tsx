import { useNavigate } from 'react-router-dom';
import '../../styles/ResourceDetail.css';

const TechnicalInterview = () => {
  const navigate = useNavigate();

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <button className="back-button" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </button>

        <div className="resource-detail-header">
          <div className="resource-detail-icon">💡</div>
          <h1 className="resource-detail-title">Technical Interview Prep</h1>
          <p className="resource-detail-description">
            Practice coding challenges and technical questions for tech internships
          </p>
        </div>

        <div className="resource-detail-content">
          <div className="content-section">
            <h2 className="section-title">Types of Technical Interviews</h2>
            <ul className="section-list">
              <li><strong>Coding Challenges:</strong> Solve algorithmic problems on a whiteboard or online platform</li>
              <li><strong>System Design:</strong> Discuss how you'd architect a system or application</li>
              <li><strong>Take-Home Projects:</strong> Complete a realistic coding assignment on your own time</li>
              <li><strong>Pair Programming:</strong> Work with an engineer to solve a problem collaboratively</li>
              <li><strong>Technical Q&A:</strong> Answer questions about specific technologies or concepts</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Preparation Resources</h2>
            <ul className="section-list">
              <li><strong>LeetCode:</strong> Practice coding problems by difficulty and topic</li>
              <li><strong>HackerRank:</strong> Coding challenges and interview prep kits</li>
              <li><strong>Cracking the Coding Interview:</strong> Essential book for interview preparation</li>
              <li><strong>YouTube:</strong> Watch mock interviews and solution explanations</li>
              <li><strong>AlgoExpert:</strong> Curated problems with video explanations</li>
              <li><strong>Pramp:</strong> Practice mock interviews with peers</li>
            </ul>
          </div>

          <div className="tip-box">
            <h3 className="tip-box-title">💡 Pro Tip</h3>
            <p className="tip-box-text">
              Start preparing at least 2-3 months before interview season. Aim to solve 1-2 problems daily, focusing on understanding patterns rather than memorizing solutions.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Problem-Solving Approach</h2>
            <ul className="section-list">
              <li><strong>1. Clarify:</strong> Ask questions to understand requirements and constraints</li>
              <li><strong>2. Example:</strong> Work through a simple example to verify understanding</li>
              <li><strong>3. Brainstorm:</strong> Discuss potential approaches before coding</li>
              <li><strong>4. Explain:</strong> Walk through your approach and get buy-in</li>
              <li><strong>5. Code:</strong> Write clean, working code while explaining your thought process</li>
              <li><strong>6. Test:</strong> Verify your solution with test cases, including edge cases</li>
              <li><strong>7. Optimize:</strong> Discuss time/space complexity and potential improvements</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Key Topics to Master</h2>
            <ul className="section-list">
              <li>Data Structures: Arrays, Linked Lists, Stacks, Queues, Hash Tables, Trees, Graphs</li>
              <li>Algorithms: Sorting, Searching, Recursion, Dynamic Programming</li>
              <li>Big O Notation: Time and space complexity analysis</li>
              <li>Common Patterns: Two pointers, sliding window, BFS/DFS</li>
              <li>Object-Oriented Design: Classes, inheritance, polymorphism</li>
            </ul>
          </div>

          <div className="content-section">
            <h2 className="section-title">Interview Day Tips</h2>
            <ul className="section-list">
              <li>Think out loud - communication is just as important as the solution</li>
              <li>Ask clarifying questions before diving into code</li>
              <li>Start with a brute force solution, then optimize</li>
              <li>Write clean, readable code with meaningful variable names</li>
              <li>Test your code thoroughly, including edge cases</li>
              <li>Stay calm if you get stuck - it's okay to ask for hints</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalInterview;
