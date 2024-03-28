import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/JoberaLogo.png'
import styles from './login.module.css'


const Login = () => {
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [GoogleUrl, setGoogleUrl] = useState('');
  const [FacebookUrl, setFacebookUrl] = useState('');
  const [LinkedinUrl, setLinkedinUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call
      fetch('http://127.0.0.1:8000/api/auth/providers', {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': "application/json",
          'Accept-Encoding': 'gzip, deflate, br'
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong!');
        })
        .then((data) => {
          setGoogleUrl(data.googleURL);
          setFacebookUrl(data.facebookURL);
          setLinkedinUrl(data.linkedinURL);
        })
        .catch(error => {
          // Handle errors
          console.log(error);
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
    fetch("http://127.0.0.1:8000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify(
        {
          "email": email,
          "password": password
        })
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
        // Do somthing with the token return from Server data['token'] 
        console.log(data)
        // Reset the form fields
        setEmail('');
        setPassword('');
        // Redirect to dashboard
        navigate('/');
      })
      .catch(error => {
        // Handle errors
        console.log(error);
      });


  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <img src={Logo} className={styles.logo} alt="logo" />
          <div className={styles.title}>Login</div>
          <form className={styles.login} onSubmit={handleSubmit}>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user`}></i>
              <input
                type="text"
                className={styles.login__input}
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-lock`}></i>
              <input
                type="password"
                className={styles.login__input}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <i className={`${styles.login__icon} fas fa-lock`}></i>
              <a href='/ForgetPassword' className={styles.login__password}>Forgot password?</a>
            </div>

            <button type="submit" className={styles.login__submit}>
              <span className={styles.button__text}>Log In Now</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          <div className={styles.social__login}>
            <h3>log in via</h3>
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
