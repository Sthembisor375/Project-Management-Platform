import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

export default function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    return <Navigate to="/" replace />;
  }
  return children;
}