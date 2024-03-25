import React, { useEffect, useState } from 'react';
import styles from './EmailVerfication.module.css'; // Import CSS styles
import Logo from '../../assets/JoberaLogo.png'

const EmailVerificationMessage = () => {
  const [isVerified, setVerified] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    fetch('http://127.0.0.1:8000/api/verifyEmail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          setVerified(true);
          return response.json();
        }
        setVerified(false);
        throw new Error('Something went wrong!');
      })
      .catch(error => {
        // Handle errors
        console.log(error.body);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
        <img src={Logo} className={styles.logo} alt="logo" />
          {isVerified ? (
            <>
              <div className={`${styles.check} fa-solid fa-check`}></div>
              <div className={styles.success}>
                Email has been verified successfully!
              </div>
            </>
          ) : (
            <p className={styles.pending}>
              Email verification pending. Please check your inbox.
            </p>
          )}
        </div>
        <div className={styles.screen__background}>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationMessage;