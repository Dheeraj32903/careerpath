import React from 'react';
import { Link } from 'react-router-dom';
import { assessments } from '../data/assessments';
import './Assessments.css';

function Assessments() {
  return (
    <div className="assessments-page">
      <div className="page-header">
        <h1>Career Assessments</h1>
        <p>Discover your strengths, interests, and ideal career paths through our comprehensive assessments</p>
      </div>

      <div className="container">
        <div className="assessments-grid">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="assessment-card">
              <div className="assessment-icon" style={{ background: assessment.color }}>
                {assessment.icon}
              </div>
              <h2>{assessment.title}</h2>
              <p className="assessment-description">{assessment.description}</p>
              
              <div className="assessment-info">
                <div className="info-item">
                  <span className="info-icon">📝</span>
                  <span>{assessment.questions} Questions</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">⏱️</span>
                  <span>{assessment.duration}</span>
                </div>
              </div>

              {/* ✅ Correct routes here */}
              {assessment.id === "personality" && (
                <Link to="/personality-test" className="btn btn-primary btn-full">
                  Start Assessment
                </Link>
              )}
              {assessment.id === "skills" && (
                <Link to="/skills-evaluation" className="btn btn-primary btn-full">
                  Start Assessment
                </Link>
              )}
              {assessment.id === "interest" && (
                <Link to="/interest-profiler" className="btn btn-primary btn-full">
                  Start Assessment
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="assessment-note">
          <h3>💡 Assessment Tips</h3>
          <ul>
            <li>Find a quiet place where you won't be interrupted</li>
            <li>Answer honestly - there are no right or wrong answers</li>
            <li>Complete all assessments for the most accurate recommendations</li>
            <li>Take your time to think about each question</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Assessments;