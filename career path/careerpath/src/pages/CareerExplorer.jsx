import React, { useState } from 'react';
import { careers, categories } from '../data/careers';
import './CareerExplorer.css';

function CareerExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(null);

  const filteredCareers = careers.filter(career => {
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="career-explorer-page">
      <div className="page-header">
        <h1>Career Explorer</h1>
        <p>Discover exciting career opportunities across different domains</p>
      </div>

      <div className="container">
        <div className="explorer-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-filter ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="filter-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="results-info">
          <p>Showing {filteredCareers.length} careers</p>
        </div>

        <div className="careers-grid">
          {filteredCareers.map((career) => (
            <div key={career.id} className="career-card" onClick={() => setSelectedCareer(career)}>
              <div className="career-icon">{career.icon}</div>
              <div className="career-content">
                <h3>{career.title}</h3>
                <p className="career-category">{career.category}</p>
                <p className="career-description">{career.description}</p>
                
                <div className="career-info">
                  <div className="info-badge">
                    <span className="badge-icon">💰</span>
                    <span>{career.salary}</span>
                  </div>
                  <div className="info-badge">
                    <span className="badge-icon">🎓</span>
                    <span>{career.education}</span>
                  </div>
                </div>

                <div className="career-skills">
                  {career.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  {career.skills.length > 3 && (
                    <span className="skill-tag more">+{career.skills.length - 3}</span>
                  )}
                </div>

                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No careers found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {selectedCareer && (
        <div className="modal-overlay" onClick={() => setSelectedCareer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCareer(null)}>×</button>
            
            <div className="modal-header">
              <div className="modal-icon">{selectedCareer.icon}</div>
              <div>
                <h2>{selectedCareer.title}</h2>
                <p className="modal-category">{selectedCareer.category}</p>
              </div>
            </div>

            <div className="modal-body">
              <section className="modal-section">
                <h3>Description</h3>
                <p>{selectedCareer.description}</p>
              </section>

              <section className="modal-section">
                <h3>Required Skills</h3>
                <div className="modal-skills">
                  {selectedCareer.skills.map((skill, index) => (
                    <span key={index} className="skill-tag large">{skill}</span>
                  ))}
                </div>
              </section>

              <section className="modal-section">
                <h3>Salary Range</h3>
                <p className="salary-info">{selectedCareer.salary}</p>
              </section>

              <section className="modal-section">
                <h3>Educational Requirements</h3>
                <p className="education-info">{selectedCareer.education}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerExplorer;