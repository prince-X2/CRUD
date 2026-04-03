import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

export default function ProtectedRoute({ children, requiredRole = null }) {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRole) {
    const userRole = getUserRole();
    if (userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
