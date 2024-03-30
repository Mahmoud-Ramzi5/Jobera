import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext } from '../App.jsx';

const AnonymousRoutes = () => {
  const { loggedIn } = useContext(LoginContext);
  
  // Routes that Appear when user is not LoggedIn
  return (
    loggedIn ? <Navigate to="/" replace /> : <Outlet />
  );
}

export default AnonymousRoutes;