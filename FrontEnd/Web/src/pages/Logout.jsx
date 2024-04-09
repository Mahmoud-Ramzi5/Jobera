import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginContext } from '../App.jsx';
import { LogoutAPI } from '../apis/AuthApis.jsx';


const Logout = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Perform Logout logic (Call api)
      LogoutAPI(accessToken).then((response) => {
        if (response.status === 200) {
          // Logout user and delete Token
          setLoggedIn(false);
          setAccessToken(null);
          Cookies.remove('access_token');
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        // Redirect to index
        navigate('/');
      });
    }
  }, []);

  return (
    // TODO
    <h1>Loading...</h1>
  );

};

export default Logout;
