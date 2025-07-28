import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isClient, isAdmin, loading } = useAuth();

  // Show loading while determining user role
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user has access based on role
  const hasAccess = allowedRoles.some(role => {
    if (role === 'client') return isClient;
    if (role === 'user') return isAdmin;
    return false;
  });

  // Redirect to dashboard if user doesn't have access
  if (!hasAccess) {
    return <Navigate to="/home/dashboard" replace />;
  }

  return children;
} 