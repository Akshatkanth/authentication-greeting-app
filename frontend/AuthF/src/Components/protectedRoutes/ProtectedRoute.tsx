// src/Components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import AuthService from '../../api/auth.services';

function ProtectedRoute({ children, requiredUserType = null }) {
  const isAuthenticated = AuthService.isAuthenticated();
  const userType = AuthService.getUserType();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to="/home" />;
  }
  
  return children;
}

export default ProtectedRoute;
