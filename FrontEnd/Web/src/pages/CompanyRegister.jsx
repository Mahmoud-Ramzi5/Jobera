import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PersonFill, EnvelopeFill, TelephoneFill, Calendar3, ChevronRight,
  MapFill, GeoAltFill, SuitcaseFill, PersonStanding, PersonStandingDress
} from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import { LoginContext } from '../App.jsx';
import { FetchCountries, FetchStates, CompanyRegisterAPI } from '../apis/AuthApis.jsx';
import NormalInput from '../components/NormalInput.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import CustomPhoneInput from '../components/CustomPhoneInput.jsx';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/register.module.css';
import Inputstyles from '../styles/Input.module.css';


const CompanyRegister = () => {
  // Context
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [field, setField] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call
      FetchCountries().then((response) => {
        if (response.status === 200) {
          setCountries(response.data.countries);
        }
        else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

  const handleCountrySelect = (event) => {
    console.log(event.target.options.selectedIndex);
    setCountry(event.target.value);

    // Api Call
    FetchStates(event.target.options.selectedIndex).then((response) => {
      if (response.status === 200) {
        setStates(response.data.states);
      }
      else {
        console.log(response.statusText);
      }
    });
  }

  // Handle form submit
  const handleSubmit = (event) => {
    /*The preventDefault() method cancels the event if it is cancelable, 
    meaning that the default action that belongs to the event will not occur.
    -> For example, this can be useful when:
      Clicking on a "Submit" button, prevent it from submitting a form*/
    event.preventDefault();

    // Perform Register logic (Call api)
    CompanyRegisterAPI(
      name,
      field,
      email,
      PhoneNumber,
      password,
      ConfirmPassword,
      country,
      state)
      .then((response) => {
        if (response.status === 201) {
          // Store token and Log in user 
          const token = response.data.access_token;
          setLoggedIn(true);
          setAccessToken(token);
          Cookies.set('access_token', token, { secure: true, expires: 1 / 24 });
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        // Reset the form fields
        setName('');
        setField('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setCountry('');
        setState('');

        // Redirect to profile
        navigate('/profile')
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
                placeholder="Company Name"
                icon={<PersonFill />}
                value={name}
                setChange={setName}
              />
              <NormalInput
                type="text"
                placeholder="Field of work"
                icon={<SuitcaseFill />}
                value={field}
                setChange={setField}
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
                  <option key={0} value='' disabled>Country</option>
                  {(countries.length === 0) ? <></> : countries.map((country) => {
                    return <option key={country.country_id} value={country.countryName} className={Inputstyles.option}>{country.countryName}</option>
                  })}
                </select>
              </div>
              <div className={Inputstyles.field}>
                <select onChange={(event) => setState(event.target.value)} value={state} className={Inputstyles.input} required>
                  <option key={0} value='' disabled>City</option>
                  {(states.length === 0) ? <></> : states.map((state) => {
                    return <option key={state.state_id} value={state.stateName} className={Inputstyles.option}>{state.stateName}</option>
                  })}
                </select>
              </div>
            </div>
            <button type="submit" className={styles.register__submit}>
              <span>Register now</span>
              <i className={styles.button__icon}><ChevronRight /></i>
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

export default CompanyRegister;
