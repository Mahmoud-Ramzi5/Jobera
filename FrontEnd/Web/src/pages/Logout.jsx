import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginContext } from '../App.jsx';

const Logout = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Perform Logout logic (Call api)
      fetch("http://127.0.0.1:8000/api/logout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': "application/json",
          'connection': 'keep-alive',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${accessToken}`
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          else {
            return response.json();
          }
        })
        .then((data) => {
          // Logout user and delete Token
          setLoggedIn(false);
          setAccessToken(null);
          sessionStorage.removeItem('access_token');
          Cookies.remove('access_token');

          // Redirect to index
          navigate('/');
        })
        .catch(error => {
          // Handle errors
          console.log(error);
        });
    }
  }, []);

  return (
    // TODO
    <h1>Loading...</h1>
  );

};

export default Logout;
