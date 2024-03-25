import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/JoberaLogo.png'
import './login.css'

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

        // Redirect to dashboard
        navigate('/');
      })
      .catch(error => {
        // Handle errors
        console.log(error);
      });

    // Reset the form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className='container'>
      <div className='screen'>
        <div className='screen__content'>
          <img src={Logo} className="Logo" alt="logo" />
          <form className='login' onSubmit={handleSubmit}>
            <div className='login__field'>
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className='login__input'
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='login__field'>
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className='login__input'
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <a href='#' className='button login__password'>Forgot password?</a>
            </div>

            <button type="submit" className='button login__submit'>
              <span className='button__text'>Log In Now</span>
              <i className='button__icon fas fa-chevron-right'></i>
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href={GoogleUrl} className='social-login__icon fab fa-google'></a>
              <a href={FacebookUrl} className='social-login__icon fab fa-facebook'></a>
              <a href={LinkedinUrl} className='social-login__icon fab fa-linkedin'></a>
            </div>
          </div>
        </div>
        <div className='screen__background'>
          <span className='screen__background__shape screen__background__shape4'></span>
          <span className='screen__background__shape screen__background__shape3'></span>
          <span className='screen__background__shape screen__background__shape2'></span>
          <span className='screen__background__shape screen__background__shape1'></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
