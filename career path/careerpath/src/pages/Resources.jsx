import React from 'react';
import './Resources.css';

function Resources() {
  const resources = [
    {
      category: 'Programming',
      icon: '💻',
      items: [
        { title: 'freeCodeCamp', description: 'Learn to code for free', url: '#' },
        { title: 'Codecademy', description: 'Interactive coding lessons', url: '#' },
        { title: 'LeetCode', description: 'Practice coding problems', url: '#' },
        { title: 'GitHub', description: 'Version control and collaboration', url: '#' }
      ]
    },
    {
      category: 'Data Science',
      icon: '📊',
      items: [
        { title: 'Kaggle', description: 'Data science competitions', url: '#' },
        { title: 'DataCamp', description: 'Learn data science online', url: '#' },
        { title: 'Coursera ML', description: 'Machine learning courses', url: '#' },
        { title: 'Python for Data Science', description: 'Essential tutorials', url: '#' }
      ]
    },
    {
      category: 'Business & Management',
      icon: '💼',
      items: [
        { title: 'Harvard Business Review', description: 'Business insights', url: '#' },
        { title: 'MBA Crystal Ball', description: 'MBA preparation', url: '#' },
        { title: 'LinkedIn Learning', description: 'Professional skills', url: '#' },
        { title: 'Coursera Business', description: 'Business courses', url: '#' }
      ]
    },
    {
      category: 'Design',
      icon: '🎨',
      items: [
        { title: 'Figma', description: 'UI/UX design tool', url: '#' },
        { title: 'Dribbble', description: 'Design inspiration', url: '#' },
        { title: 'Behance', description: 'Creative portfolios', url: '#' },
        { title: 'Canva', description: 'Graphic design made easy', url: '#' }
      ]
    },
    {
      category: 'Career Development',
      icon: '🚀',
      items: [
        { title: 'LinkedIn', description: 'Professional networking', url: '#' },
        { title: 'Glassdoor', description: 'Company reviews & salaries', url: '#' },
        { title: 'Indeed', description: 'Job search platform', url: '#' },
        { title: 'AngelList', description: 'Startup jobs', url: '#' }
      ]
    },
    {
      category: 'Certifications',
      icon: '🎓',
      items: [
        { title: 'Google Certifications', description: 'Industry-recognized certs', url: '#' },
        { title: 'AWS Training', description: 'Cloud computing certifications', url: '#' },
        { title: 'Microsoft Learn', description: 'Microsoft certifications', url: '#' },
        { title: 'CompTIA', description: 'IT certifications', url: '#' }
      ]
    }
  ];

  const books = [
    { title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell', category: 'Technical' },
    { title: 'The Lean Startup', author: 'Eric Ries', category: 'Business' },
    { title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'Personal Development' },
    { title: 'Deep Work', author: 'Cal Newport', category: 'Productivity' },
    { title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Design' },
    { title: 'Zero to One', author: 'Peter Thiel', category: 'Entrepreneurship' }
  ];

  return (
    <div className="resources-page">
      <div className="page-header">
        <h1>Learning Resources</h1>
        <p>Curated resources to help you develop skills for your dream career</p>
      </div>

      <div className="container">
        <section className="resources-section">
          <h2>Online Learning Platforms</h2>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index} className="resource-category-card">
                <div className="resource-category-header">
                  <span className="resource-icon">{resource.icon}</span>
                  <h3>{resource.category}</h3>
                </div>
                <div className="resource-items">
                  {resource.items.map((item, idx) => (
                    <a key={idx} href={item.url} className="resource-item">
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                      <span className="resource-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="books-section">
          <h2>📚 Recommended Books</h2>
          <div className="books-grid">
            {books.map((book, index) => (
              <div key={index} className="book-card">
                <div className="book-icon">📖</div>
                <h3>{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <span className="book-category">{book.category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="tips-section">
          <h2>💡 Learning Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">⏰</div>
              <h3>Consistent Practice</h3>
              <p>Dedicate at least 30 minutes daily to learning and skill development</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h3>Set Clear Goals</h3>
              <p>Define specific, measurable goals for what you want to achieve</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">👥</div>
              <h3>Join Communities</h3>
              <p>Connect with others learning the same skills for motivation and support</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔄</div>
              <h3>Build Projects</h3>
              <p>Apply what you learn by building real-world projects and portfolios</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resources;