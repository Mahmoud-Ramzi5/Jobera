import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from "react-icons/fc";
import {
  BsPersonFill, BsChevronRight, BsX, BsCheckLg,
  BsGoogle, BsFacebook, BsLinkedin
} from 'react-icons/bs';
import Cookies from 'js-cookie';
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import { FetchProviders, LoginAPI } from '../apis/AuthApis.jsx';
import NormalInput from '../components/NormalInput.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/login.module.css';


const Login = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { setLoggedIn, setAccessToken } = useContext(LoginContext);
  const { setProfile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [GoogleUrl, setGoogleUrl] = useState('');
  const [FacebookUrl, setFacebookUrl] = useState('');
  const [LinkedinUrl, setLinkedinUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call
      FetchProviders().then((response) => {
        if (response.status === 200) {
          setGoogleUrl(response.data.googleURL);
          setFacebookUrl(response.data.facebookURL);
          setLinkedinUrl(response.data.linkedinURL);
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

    // Perform Login logic (Call api)
    LoginAPI(
      email,
      password,
      rememberMe)
      .then((response) => {
        if (response.status === 200) {
          // Store token and Log in user 
          const token = response.data.access_token;
          const expires = response.data.expires_at;
          setMessage('login successfully');
          setLoggedIn(true);
          setAccessToken(token);
          setProfile(response.data.user);
          if (rememberMe) {
            // 1 Year
            Cookies.set('access_token', token, { secure: true, expires: 365 });
          }
          else {
            // 1 Hour
            Cookies.set('access_token', token, { secure: true, expires: 1 / 24 });
          }
          if(response.data.user.type==="admin"){
            navigate('/admin');
          }else{         
          // Redirect to dashboard
          navigate('/dashboard');
          }
        }
        else {
          console.log(response.statusText);
          setMessage('please make sure that the email and password are correct')
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      }).then(() => {
        // Reset the form fields
        setEmail('');
        setPassword('');
        setRememberMe(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <img src={Logo} className={styles.logo} alt="logo" />
          {message ? message === 'login successfully' ?
            <div className={styles.message}>
              <i className={styles.check}><BsCheckLg size={60} /></i>
              <br />
              <span>Login successfully</span>
            </div> :
            <div className={styles.message}>
              <i className={styles.xmark}><BsX size={60} /></i>
              <br />
              <span>Make sure that the email and password are correct</span>
            </div>
            : <>
              <div className={styles.title}>{t('pages.Login.title')}</div>
              <form className={styles.login} onSubmit={handleSubmit}>
                <NormalInput
                  type='text'
                  placeholder={t('pages.Login.email_input')}
                  icon={<BsPersonFill />}
                  value={email}
                  setChange={setEmail}
                />
                <PasswordInput
                  placeholder={t('pages.Login.password_input')}
                  value={password}
                  setChange={setPassword}
                />
                <div>
                  <div className={styles.checkBox}>
                    <input
                      id="rememberMe"
                      type="checkbox"
                      onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <label htmlFor="rememberMe">{t('pages.Login.remember_me')}</label>
                  </div>
                  <a href='/ForgetPassword' className={styles.forgot__password}>
                    {t('pages.Login.forgot_password')}
                  </a>
                </div>

                <button type="submit" className={styles.login__submit}>
                  <span>{t('pages.Login.button')}</span>
                  <i className={styles.button__icon}><BsChevronRight /></i>
                </button>
              </form>

              <div className={styles.login__register}>
                {t('pages.Login.login_register_div')} <a href='/register'>{t('pages.Login.login_register_a')}</a>
              </div>

              <div className={styles.social__login}>
                <h5>{t('pages.Login.social')}</h5>
                <div className={styles.social__icons}>
                  <a href={GoogleUrl} className={styles.social__login__icon}>
                    <i className={styles.google__icon}>
                      <BsGoogle className={styles.google_icon_white} />
                      <FcGoogle className={styles.google_icon_colored} />
                    </i>
                  </a>
                  <a href={FacebookUrl} className={styles.social__login__icon}>
                    <BsFacebook className={styles.facebook__icon} />
                  </a>
                  <a href={LinkedinUrl} className={styles.social__login__icon}>
                    <BsLinkedin className={styles.linkedin__icon} />
                  </a>
                </div>
              </div>
            </>}
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

export default Login;
