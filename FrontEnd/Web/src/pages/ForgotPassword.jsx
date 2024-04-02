import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonFill, ChevronRight, CheckLg, X } from 'react-bootstrap-icons';
import { ForgotPasswordAPI } from '../apis/AuthApis.jsx';
import NormalInput from '../components/NormalInput.jsx';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/forgotpassword.module.css';


const ForgotPassword = () => {
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [failedMessage, setfailedMessage] = useState('');

  // Handle form submit
  const handleSubmit = (event) => {
    /*The preventDefault() method cancels the event if it is cancelable, 
    meaning that the default action that belongs to the event will not occur.
    -> For example, this can be useful when:
        Clicking on a "Submit" button, prevent it from submitting a form*/
    event.preventDefault();

    // Perform ForgotPassword logic (Call api)
    ForgotPasswordAPI(email).then((response) => {
      if (response.status === 200) {
        setSuccessMessage('Reset password email has been sent.');
      }
      else {
        setfailedMessage('Sorry something went wrong');
        console.log(response.statusText);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <img src={Logo} className={styles.logo} alt="logo" />
          <div className={styles.title}>Forgot Password</div>
          {failedMessage ? (<>
            <div className={styles.failed}>
              <i className={styles.xmark}><X size={60} /></i>
              <span>{failedMessage}</span>
            </div>
          </>) : (<>
            {successMessage ? (<>
              <div className={styles.success}>
                <i className={styles.check}><CheckLg size={60} /></i>
                <span>{successMessage}</span>
              </div>
            </>) : (
              <form className={styles.ForgotPassword} onSubmit={handleSubmit}>
                <label className={styles.label1}>Enter your email address and we'll send you an email with instructions to reset your password. </label>
                <NormalInput
                  type='email'
                  placeholder='Email'
                  icon={<PersonFill />}
                  value={email}
                  setChange={setEmail}
                />
                <button type="submit" className={styles.ForgotPassword__submit}>
                  <span>Send reset-link</span>
                  <i className={styles.button__icon}><ChevronRight /></i>
                </button>
              </form>
            )}
          </>)}
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

export default ForgotPassword;
