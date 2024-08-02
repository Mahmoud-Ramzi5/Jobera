import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsPersonFill, BsChevronRight } from 'react-icons/bs';
import { FetchEmail, ResetPasswordAPI } from '../apis/AuthApis.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/resetpassword.module.css';
import Inputstyles from '../styles/Input.module.css';


const ResetPassword = () => {
  // Translations
  const { t } = useTranslation('global');
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call
      FetchEmail(searchParams.get("token")).then((response) => {
        if (response.status === 200) {
          setEmail(response.data.email);
        }
        else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

  // Handle form submit
  const handleSubmit = (event) => {
    /*The preventDefault() method cancels the event if it is cancelable, 
    meaning that the default action that belongs to the event will not occur.
    -> For example, this can be useful when:
        Clicking on a "Submit" button, prevent it from submitting a form*/
    event.preventDefault();

    if (password != confirmPassword) {
      alert(t('pages.reset_password.alert'));
    }
    else {
      // Perform PasswordReset logic (Call api)
      ResetPasswordAPI(
        searchParams.get("token"),
        email,
        password,
        confirmPassword)
        .then((response) => {
          if (response.status === 200) {
            setSuccessMessage(t('pages.reset_password.success'));
          }
          else {
            console.log(response.statusText);
          }
        });
    };

    // Reset the form fields
    setPassword('');
    setConfirmPassword('');
  };


  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <img src={Logo} className={styles.logo} alt="logo" />
          <div className={styles.title}>
            {t('pages.reset_password.title')}
          </div>
          {successMessage ? (<>
            <div className={styles.success}>
              {successMessage}
              <button onClick={() => navigate('/login')} className={styles.navigateButton}>
                {t('pages.reset_password.button')}
              </button>
            </div>
          </>) : (
            <form className={styles.reset} onSubmit={handleSubmit}>
              <div className={Inputstyles.field}>
                <i className={Inputstyles.icon}><BsPersonFill /></i>
                <input type="email" className={Inputstyles.input} value={email} readOnly={true} />
              </div>
              <PasswordInput
                placeholder={t('pages.reset_password.password')}
                value={password}
                setChange={setPassword}
              />
              <PasswordInput
                placeholder={t('pages.reset_password.confirm_password')}
                value={confirmPassword}
                setChange={setConfirmPassword}
              />
              <button type="submit" className={styles.reset__submit}>
                <span>{t('pages.reset_password.span')}</span>
                <i className={styles.button__icon}><BsChevronRight /></i>
              </button>
            </form>
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

export default ResetPassword;
