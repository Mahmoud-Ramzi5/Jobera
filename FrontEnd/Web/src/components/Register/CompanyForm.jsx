import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PersonFill, EnvelopeFill, TelephoneFill, Globe,
  GeoAltFill, SuitcaseFill, ChevronRight,
} from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import { LoginContext } from '../../App.jsx';
import { FetchCountries, FetchStates, CompanyRegisterAPI } from '../../apis/AuthApis.jsx';
import NormalInput from '../NormalInput.jsx';
import PasswordInput from '../PasswordInput.jsx';
import CustomPhoneInput from '../CustomPhoneInput.jsx';
import styles from '../../styles/register.module.css';
import Inputstyles from '../../styles/Input.module.css';


const CompanyForm = () => {
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
          <i className={Inputstyles.icon}><Globe /></i>
          <select onChange={handleCountrySelect} value={country} className={Inputstyles.input} required>
            <option key={0} value='' disabled>Country</option>
            {(countries.length === 0) ? <></> : countries.map((country) => {
              return <option key={country.country_id} value={country.country_name} className={Inputstyles.option}>{country.country_name}</option>
            })}
          </select>
        </div>
        <div className={Inputstyles.field}>
          <i className={Inputstyles.icon}><GeoAltFill /></i>
          <select onChange={(event) => setState(event.target.value)} value={state} className={Inputstyles.input} required>
            <option key={0} value='' disabled>City</option>
            {(states.length === 0) ? <></> : states.map((state) => {
              return <option key={state.state_id} value={state.state_id} className={Inputstyles.option}>{state.state_name}</option>
            })}
          </select>
        </div>
      </div>
      <div className={styles.register__row}>
        <div className={Inputstyles.field}></div>
        <div className={Inputstyles.field}></div>
      </div>
      <button type="submit" className={styles.register__submit}>
        <span>Register now</span>
        <i className={styles.button__icon}><ChevronRight /></i>
      </button>
    </form>
  );
};

export default CompanyForm;
