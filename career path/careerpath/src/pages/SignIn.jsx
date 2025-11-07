import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = signIn(formData.email, formData.password);
    
    if (result.success) {
      navigate('/assessments');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your career journey</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
            </div>

            <div className="demo-credentials">
              <p className="demo-title">Demo Credentials:</p>
              <p>Admin: admin@careerpath.com / admin123</p>
              <p>Or create a new student account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;