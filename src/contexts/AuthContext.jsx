import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isTokenExpired } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = () => {
    const token = localStorage.getItem("token");
    
    if (!token || isTokenExpired(token)) {
      setUser(null);
      setLoading(false);
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  };

  useEffect(() => {
    updateUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    updateUser();
  };

  const isClient = user && user.role === 'client';
  const isAdmin = user && user.role === 'user';
  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    isAuthenticated,
    isClient,
    isAdmin,
    username: user?.username,
    userId: user?.id,
    userRole: user?.role,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 