import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Assessments from './pages/Assessments';
import CareerExplorer from './pages/CareerExplorer';
import Resources from './pages/Resources';
import AdminPanel from './pages/AdminPanel';
import PersonalityTest from './pages/PersonalityTest';
import SkillsEvaluation from './pages/SkillsEvaluation';
import InterestProfiler from './pages/InterestProfiler';
import Results from './pages/Results';
import './App.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user && user.role === 'admin' ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/assessments" 
                element={
                  <PrivateRoute>
                    <Assessments />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/personality-test" 
                element={
                  <PrivateRoute>
                    <PersonalityTest />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/skills-evaluation" 
                element={
                  <PrivateRoute>
                    <SkillsEvaluation />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/interest-profiler" 
                element={
                  <PrivateRoute>
                    <InterestProfiler />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <PrivateRoute>
                    <Results />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/career-explorer" 
                element={
                  <PrivateRoute>
                    <CareerExplorer />
                  </PrivateRoute>
                } 
              />
              <Route path="/resources" element={<Resources />} />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;