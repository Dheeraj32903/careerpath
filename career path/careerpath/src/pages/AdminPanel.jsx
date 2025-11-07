import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    completedAssessments: 0,
    activeToday: 0
  });
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const resultsData = JSON.parse(localStorage.getItem('assessmentResults') || '{}');
    
    setUsers(usersData);
    setStats({
      totalUsers: usersData.length,
      completedAssessments: Object.keys(resultsData).length,
      activeToday: Math.floor(usersData.length * 0.3) // Mock data
    });
  };

  const handleDeleteUser = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.email !== email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      loadData();
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all user data? This cannot be undone!')) {
      localStorage.removeItem('users');
      localStorage.removeItem('assessmentResults');
      setUsers([]);
      loadData();
      alert('All data has been cleared!');
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header admin-header">
        <h1>Admin Panel</h1>
        <p>Manage assessments, users, and career recommendations</p>
      </div>

      <div className="container">
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Completed Assessments</h3>
              <p className="stat-number">{stats.completedAssessments}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>Active Today</h3>
              <p className="stat-number">{stats.activeToday}</p>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="info-card">
                <h2>📊 System Overview</h2>
                <p>Welcome to the CareerPath Pro Admin Panel. Here you can manage users, assessments, and system settings.</p>
                
                <div className="quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="actions-grid">
                    <button className="action-btn" onClick={() => setActiveTab('users')}>
                      <span className="action-icon">👥</span>
                      <span>View Users</span>
                    </button>
                    <button className="action-btn" onClick={loadData}>
                      <span className="action-icon">🔄</span>
                      <span>Refresh Data</span>
                    </button>
                    <button className="action-btn" onClick={() => setActiveTab('settings')}>
                      <span className="action-icon">⚙️</span>
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h2>Registered Users</h2>
                <button className="btn btn-secondary" onClick={loadData}>
                  Refresh
                </button>
              </div>
              
              {users.length === 0 ? (
                <div className="empty-state">
                  <p>No users registered yet</p>
                </div>
              ) : (
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Education</th>
                        <th>Phone</th>
                        <th>Registered</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.education}</td>
                          <td>{user.phone || 'N/A'}</td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button 
                              className="delete-btn"
                              onClick={() => handleDeleteUser(user.email)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>System Settings</h2>
              
              <div className="settings-card">
                <h3>⚠️ Danger Zone</h3>
                <p>These actions are irreversible. Please be careful.</p>
                <button className="btn btn-danger" onClick={clearAllData}>
                  Clear All User Data
                </button>
              </div>

              <div className="settings-card">
                <h3>📝 Assessment Management</h3>
                <p>Manage assessment questions and categories</p>
                <button className="btn btn-secondary">
                  Edit Questions (Coming Soon)
                </button>
              </div>

              <div className="settings-card">
                <h3>💼 Career Database</h3>
                <p>Add or modify career information</p>
                <button className="btn btn-secondary">
                  Manage Careers (Coming Soon)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;