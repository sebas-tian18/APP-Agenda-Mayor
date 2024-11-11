import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RedirectRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Si esta autenticado redirecciona a home
  return isAuthenticated ? <Navigate to="/home" replace /> : children; 
};

export default RedirectRoute;