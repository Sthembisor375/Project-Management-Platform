import { useState, useEffect } from 'react';
import { getCurrentUser, isTokenExpired } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token || isTokenExpired(token)) {
      setUser(null);
      setLoading(false);
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const isClient = user && user.role === 'client';
  const isAdmin = user && user.role === 'user';
  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
    isClient,
    isAdmin,
    username: user?.username,
    userId: user?.id,
    userRole: user?.role
  };
} 