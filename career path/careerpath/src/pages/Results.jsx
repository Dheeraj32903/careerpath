import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { careers } from '../data/careers';
import './Results.css';

function Results() {
  const [results, setResults] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('personality');

  useEffect(() => {
    const savedResults = localStorage.getItem('assessmentResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
      generateRecommendations(parsedResults);
    }
  }, []);

  const generateRecommendations = (assessmentResults) => {
    // Simple recommendation algorithm based on results
    const recommended = careers.slice(0, 6);
    setRecommendations(recommended);
  };

  const calculateCategoryScores = (answers) => {
    const categoryScores = {};
    Object.values(answers).forEach(answer => {
      if (!categoryScores[answer.category]) {
        categoryScores[answer.category] = [];
      }
      categoryScores[answer.category].push(answer.value);
    });

    const averages = {};
    Object.keys(categoryScores).forEach(category => {
      const scores = categoryScores[category];
      averages[category] = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    });

    return averages;
  };

  if (!results) {
    return (
      <div className="results-page">
        <div className="container">
          <div className="no-results-message">
            <h2>No Assessment Results Found</h2>
            <p>Please complete at least one assessment to see your results</p>
            <Link to="/assessments" className="btn btn-primary">
              Take Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="page-header">
        <h1>Your Assessment Results</h1>
        <p>Detailed analysis of your personality, skills, and interests</p>
      </div>

      <div className="container">
        <div className="results-summary">
          <div className="summary-card">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <h3>Assessments Completed</h3>
              <p className="summary-value">
                {Object.keys(results).length} / 3
              </p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">🎯</div>
            <div className="summary-content">
              <h3>Career Matches</h3>
              <p className="summary-value">{recommendations.length}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <h3>Completion Date</h3>
              <p className="summary-value">
                {new Date(results[Object.keys(results)[0]].completedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {Object.keys(results).length < 3 && (
          <div className="incomplete-notice">
            <h3>⚠️ Complete All Assessments</h3>
            <p>Take all three assessments for the most accurate career recommendations</p>
            <Link to="/assessments" className="btn btn-secondary">
              Continue Assessments
            </Link>
          </div>
        )}

        <div className="results-tabs">
          {results.personality && (
            <button
              className={`tab-button ${activeTab === 'personality' ? 'active' : ''}`}
              onClick={() => setActiveTab('personality')}
            >
              🧠 Personality
            </button>
          )}
          {results.skills && (
            <button
              className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              ⚡ Skills
            </button>
          )}
          {results.interest && (
            <button
              className={`tab-button ${activeTab === 'interest' ? 'active' : ''}`}
              onClick={() => setActiveTab('interest')}
            >
              ❤️ Interests
            </button>
          )}
        </div>

        <div className="results-content">
          {activeTab === 'personality' && results.personality && (
            <div className="result-section">
              <h2>Personality Assessment Results</h2>
              <div className="scores-grid">
                {Object.entries(calculateCategoryScores(results.personality.answers)).map(([category, score]) => (
                  <div key={category} className="score-card">
                    <h4>{category}</h4>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar"
                        style={{ width: `${(score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="score-value">{score} / 5.0</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && results.skills && (
            <div className="result-section">
              <h2>Skills Evaluation Results</h2>
              <div className="scores-grid">
                {Object.entries(calculateCategoryScores(results.skills.answers)).map(([category, score]) => (
                  <div key={category} className="score-card">
                    <h4>{category}</h4>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar skills"
                        style={{ width: `${(score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="score-value">{score} / 5.0</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interest' && results.interest && (
            <div className="result-section">
              <h2>Interest Profiler Results</h2>
              <div className="scores-grid">
                {Object.entries(calculateCategoryScores(results.interest.answers)).map(([category, score]) => (
                  <div key={category} className="score-card">
                    <h4>{category}</h4>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar interest"
                        style={{ width: `${(score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="score-value">{score} / 5.0</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="recommendations-section">
          <h2>Recommended Careers for You</h2>
          <p className="recommendations-subtitle">
            Based on your assessment results, here are careers that match your profile
          </p>
          
          <div className="careers-grid">
            {recommendations.map((career) => (
              <div key={career.id} className="career-recommendation-card">
                <div className="career-icon">{career.icon}</div>
                <h3>{career.title}</h3>
                <p className="career-category">{career.category}</p>
                <p className="career-description">{career.description}</p>
                
                <div className="career-info">
                  <div className="info-badge">
                    <span>💰 {career.salary}</span>
                  </div>
                  <div className="info-badge">
                    <span>🎓 {career.education}</span>
                  </div>
                </div>

                <div className="career-skills">
                  {career.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="explore-more">
            <Link to="/career-explorer" className="btn btn-primary">
              Explore All Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;