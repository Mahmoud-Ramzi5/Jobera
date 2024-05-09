import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext } from './Contexts';


const PrivateRoutes = () => {
  const { loggedIn } = useContext(LoginContext);

  // Routes that Appear when user is LoggedIn
  return (
    loggedIn ? <Outlet/> : <Navigate to="/login" replace />
  );
}

export default PrivateRoutes;