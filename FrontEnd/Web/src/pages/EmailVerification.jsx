import { useEffect, useState } from 'react';
import { CheckLg } from 'react-bootstrap-icons';
import { VerifyEmailAPI } from '../apis/AuthApis.jsx';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/emailverfication.module.css';


const EmailVerificationMessage = () => {
  const [isVerified, setVerified] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Api Call
    VerifyEmailAPI(params.get('token')).then((response) => {
      if (response.status === 200) {
        setVerified(true);
      }
      else {
        setVerified(false);
        console.log(response.statusText);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <img src={Logo} className={styles.logo} alt="logo" />
          {isVerified ? (<>
            <div className={styles.success}>
              <i className={styles.check}><CheckLg size={60} /></i>
              <span>Email has been verified successfully!</span>
            </div>
          </>) : (
            <p className={styles.pending}>Email verification pending. Please check your inbox.</p>
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