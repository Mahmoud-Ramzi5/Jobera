import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationMessage = () => {
    const navigate = useNavigate();
    const [isVerified, setVerified] = useState('');
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        console.log(token);
          fetch('http://127.0.0.1:8000/api/verifyEmail', {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': "application/json",
              'Accept-Encoding': 'gzip, deflate, br',
              "Authorization": "Bearer " + token
            }
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
                isVerified=true;
            }
              throw new Error('Something went wrong!');
              isVerified=false;
            })
            .catch(error => {
              // Handle errors
              console.log(error);
            });
        
      }, []);
    return (
    <div>
      {isVerified ? (
        <p>Email has been verified successfully!</p>
      ) : (
        <p>Email verification pending. Please check your inbox.</p>
      )}
    </div>
  );
};

export default EmailVerificationMessage;