import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext, ProfileContext } from './Contexts';


const AdminRoutes = () => {
    const { loggedIn } = useContext(LoginContext);
    const { profile } = useContext(ProfileContext);

    // Routes that Appear when user is (The Admin)
    return (
        loggedIn && profile.type == "admin" ? <Outlet /> : <Navigate to="/login" replace />
    );
}

export default AdminRoutes;
