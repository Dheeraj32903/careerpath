import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { user } = useAuth();

  const categories = [
    { name: 'Business', icon: '💼', color: '#ec4899' },
    { name: 'Technology', icon: '💻', color: '#6366f1' },
    { name: 'Research', icon: '🔬', color: '#8b5cf6' },
    { name: 'Creative', icon: '🎨', color: '#f59e0b' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Discover Your Perfect <br />
                <span className="gradient-text">Career Path</span>
              </h1>
              <p className="hero-description">
                Comprehensive career assessments designed for B.Tech, M.Tech, MBA, BBA 
                students and professionals
              </p>
              <div className="hero-actions">
                {user ? (
                  <>
                    <Link to="/assessments" className="btn btn-primary btn-large">
                      Start Assessment
                    </Link>
                    <Link to="/career-explorer" className="btn btn-secondary btn-large">
                      Explore Careers
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="btn btn-primary btn-large">
                      Get Started
                    </Link>
                    <Link to="/signin" className="btn btn-secondary btn-large">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-categories">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="category-card"
                  style={{ borderColor: category.color }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose CareerPath Pro?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Assessment</h3>
              <p>Take comprehensive tests tailored to your educational background and career goals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Detailed Analysis</h3>
              <p>Get in-depth insights into your personality, skills, and interests with visual reports</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Career Recommendations</h3>
              <p>Discover careers that match your profile with salary ranges and growth prospects</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Learning Resources</h3>
              <p>Access curated resources to develop skills for your dream career</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your account in less than a minute</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Take Assessments</h3>
              <p>Complete personality, skills, and interest evaluations</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Get Results</h3>
              <p>Receive detailed analysis and career recommendations</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Explore Careers</h3>
              <p>Browse careers and plan your professional journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Career?</h2>
            <p>Join thousands of students and professionals who have discovered their ideal career path</p>
            {!user && (
              <Link to="/signup" className="btn btn-primary btn-large">
                Start Your Journey Today
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;