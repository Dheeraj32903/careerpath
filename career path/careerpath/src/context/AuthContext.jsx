import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = (email, password) => {
    // Simulate sign in
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    
    // Check for default admin
    if (email === 'admin@careerpath.com' && password === 'admin123') {
      const adminUser = { email, name: 'Admin', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signUp = (userData) => {
    // Simulate sign up
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'User already exists' };
    }
    
    // Add new user
    const newUser = {
      ...userData,
      role: 'student',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};