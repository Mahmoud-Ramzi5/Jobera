import { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginContext } from '../App.jsx';


const CallBack = () => {
  // Context
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const location = useLocation();
  const { provider } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  // On page load, we take "search" parameters 
  // and proxy them to /api/auth/callback on our Laravel API
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call
      fetch(`http://127.0.0.1:8000/api/auth/${provider}/call-back${location.search}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': "application/json",
          'connection': 'keep-alive',
          'Accept-Encoding': 'gzip, deflate, br'
        }
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
          // Store token and Log in user 
          const token = data.access_token;
          setLoggedIn(true);
          setAccessToken(token);
          Cookies.set('access_token', token, { secure: true, expires: 1/24 });

          // Redirect to dashboard
          navigate('/dashboard');
        });
    }
  }, []);

  return (
    // TODO
    <h1>Loading...</h1>
  );

};

export default CallBack;
