import { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const CallBack = () => {
  // Define states
  const initialized = useRef(false);
  const location = useLocation();
  const {provider} = useParams();
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
          'Content-Type': 'application/json',
          'Accept': 'application/json'
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
          console.log(data);
          setToken(data.Access-Token);
          navigate('/');
        });
    }
  }, []);

  return (
    <h1>loading</h1>
  );

};

export default CallBack;
