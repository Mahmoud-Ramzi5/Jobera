import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PersonFill, EnvelopeFill, TelephoneFill, Calendar3,
  MapFill, GeoAltFill, PersonStanding, PersonStandingDress
} from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import { LoginContext } from '../App.jsx';
import NormalInput from '../components/NormalInput.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import CustomPhoneInput from '../components/CustomPhoneInput.jsx';
import Logo from '../assets/JoberaLogo.png'
import styles from '../styles/register.module.css';
import Inputstyles from '../styles/Input.module.css';

const Register = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const genders = [
    { value: 'male', label: 'Male', icon: <PersonStanding /> },
    { value: 'female', label: 'Female', icon: <PersonStandingDress /> },
  ];

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetch("http://127.0.0.1:8000/api/countries", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': "application/json",
          'connection': 'keep-alive',
          'Accept-Encoding': 'gzip, deflate, br'
        },
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
          setCountries(data.countries);
        })
        .catch(error => {
          // Handle errors
          console.log(error);
        });
    }
  }, []);

  const handleCountrySelect = (event) => {
    console.log(event.target.options.selectedIndex);
    setCountry(event.target.value);
    fetch("http://127.0.0.1:8000/api/states", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        'country_id': event.target.options.selectedIndex
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
        setStates(data.states);
      })
      .catch(error => {
        // Handle errors
        console.log(error);
      });
  }

  // Handle form submit
  const handleSubmit = (event) => {
    /*The preventDefault() method cancels the event if it is cancelable, 
    meaning that the default action that belongs to the event will not occur.
    -> For example, this can be useful when:
      Clicking on a "Submit" button, prevent it from submitting a form*/
    event.preventDefault();


    // Perform Login logic (Call api)
    fetch("http://127.0.0.1:8000/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        "fullName": FirstName + " " + LastName,
        "email": email,
        "phoneNumber": PhoneNumber,
        "password": password,
        "confirmPassword": ConfirmPassword,
        "country": country,
        "state": state,
        "birthDate": date,
        "gender": gender,
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
        // Store token and Log in user 
        const token = data.access_token;
        const expires = data.expires_at;
        setLoggedIn(true);
        setAccessToken(token);
        sessionStorage.setItem('access_token', token);

        // Reset the form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setCountry('');
        setState('');
        setDate('');
        setGender('');

        // Redirect to profile
        navigate('/profile')
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
          <div className={styles.title}>Register</div>
          <form className={styles.register} onSubmit={handleSubmit}>
            <div className={styles.register__row}>
              <NormalInput
                type="text"
                placeholder="First Name"
                icon={<PersonFill />}
                value={FirstName}
                setChange={setFirstName}
              />
              <NormalInput
                type="text"
                placeholder="Last Name"
                icon={<PersonFill />}
                value={LastName}
                setChange={setLastName}
              />
            </div>
            <div className={styles.register__row}>
              <NormalInput
                type="text"
                placeholder="Email"
                icon={<EnvelopeFill />}
                value={email}
                setChange={setEmail}
              />
              <CustomPhoneInput
                defaultCountry='us'
                value={PhoneNumber}
                setChange={setPhoneNumber}
              />
            </div>
            <div className={styles.register__row}>
              <PasswordInput
                placeholder='Password'
                value={password}
                setChange={setPassword}
              />
              <PasswordInput
                placeholder='Confirm Password'
                value={ConfirmPassword}
                setChange={setConfirmPassword}
              />
            </div>
            <div className={styles.register__row}>
              <div className={Inputstyles.field}>
                <select onChange={handleCountrySelect} value={country} className={Inputstyles.input} required>
                  <option value='' disabled>Country</option>
                  {(countries.length === 0) ? <></> : countries.map((country) => {
                    return <option key={country.country_id} value={country.countryName} className={Inputstyles.option}>{country.countryName}</option>
                  })}
                </select>
              </div>
              <div className={Inputstyles.field}>
                <select onChange={(event) => setState(event.target.value)} value={state} className={Inputstyles.input} required>
                  <option value='' disabled>City</option>
                  {(states.length === 0) ? <></> : states.map((state) => {
                    return <option key={state.state_id} value={state.stateName} className={Inputstyles.option}>{state.stateName}</option>
                  })}
                </select>
              </div>
            </div>
            <div className={styles.register__row}>
              <NormalInput
                type='date'
                placeholder='Birthdate'
                icon={<Calendar3 />}
                value={date}
                setChange={setDate}
              />
              <div className={styles.register__field__radio}>
                {genders.map((G) => (
                  <div className={styles.register__input__radio} key={G.value}>
                    <input
                      type="radio"
                      value={G.value}
                      checked={gender === G.value}
                      onChange={(event) => setGender(event.target.value)}
                    />
                    <i>{G.icon}</i>
                    <label>{G.label}</label>
                  </div>
                ))}
              </div>
            </div >
            <button type="submit" className={styles.register__submit}>
              <span className={styles.button__text}>Register now</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          <div className={styles.register__login}>
            Already have an account? <a href='/login'>Log in</a>
          </div>
        </div>
        <div className={styles.screen__background}>
          <span className={styles.screen__shape}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
        </div>
      </div>
    </div>
  );
};

export default Register;