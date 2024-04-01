import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonFill, ChevronRight } from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import { LoginContext } from '../App.jsx';
import { FetchProviders, LoginAPI } from '../apis/AuthApis.jsx';
import NormalInput from '../components/NormalInput.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/login.module.css';


const Login = () => {
  // Context
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [GoogleUrl, setGoogleUrl] = useState('');
  const [FacebookUrl, setFacebookUrl] = useState('');
  const [LinkedinUrl, setLinkedinUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
          console.log(expires);

          setLoggedIn(true);
          setAccessToken(token);
          if (rememberMe) {
            Cookies.set('access_token', token, { secure: true });
          }
          else {
            sessionStorage.setItem('access_token', token);
          }

          // Reset the form fields
          setEmail('');
          setPassword('');
          setRememberMe(false);

          // Redirect to dashboard
          navigate('/dashboard');
        }
        else {
          console.log(response.statusText);
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <img src={Logo} className={styles.logo} alt="logo" />
          <div className={styles.title}>Login</div>
          <form className={styles.login} onSubmit={handleSubmit}>
            <NormalInput
              type='text'
              placeholder='Email'
              icon={<PersonFill />}
              value={email}
              setChange={setEmail}
            />
            <PasswordInput
              placeholder='Password'
              value={password}
              setChange={setPassword}
            />
            <div>
              <div className={styles.checkBox}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label htmlFor="rememberMe"> Remember me</label>
              </div>
              <a href='/ForgetPassword' className={styles.forgot__password}>Forgot password?</a>
            </div>

            <button type="submit" className={styles.login__submit}>
              <span>Log In Now</span>
              <i className={styles.button__icon}><ChevronRight /></i>
            </button>
          </form>

          <div className={styles.social__login}>
            <h5>log in via</h5>
            <div className={styles.social__icons}>
              <a href={GoogleUrl} className={`${styles.social__login__icon} fab fa-google`}></a>
              <a href={FacebookUrl} className={`${styles.social__login__icon} fab fa-facebook`}></a>
              <a href={LinkedinUrl} className={`${styles.social__login__icon} fab fa-linkedin`}></a>
            </div>
          </div>

          <div className={styles.login__register}>
            Don't have an account? <a href='/register'>Register</a>
          </div>

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
