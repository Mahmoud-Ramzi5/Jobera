import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  PersonFill, EnvelopeFill, TelephoneFill, Globe, GeoAltFill,
  Calendar3, ChevronRight, PersonStanding, PersonStandingDress
} from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { FetchCountries, FetchStates, RegisterAPI } from '../../apis/AuthApis.jsx';
import NormalInput from '../NormalInput.jsx';
import PasswordInput from '../PasswordInput.jsx';
import CustomPhoneInput from '../CustomPhoneInput.jsx';
import Clock from '../../utils/Clock.jsx';
import styles from '../../styles/register.module.css';
import Inputstyles from '../../styles/Input.module.css';


const IndividualForm = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { setLoggedIn, setAccessToken } = useContext(LoginContext);
  const { profile, setProfile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [gender, setGender] = useState('');
  const genders = [
    { value: 'MALE', label: t('pages.Register.individual_form.gender.Male'), icon: <PersonStanding /> },
    { value: 'FEMALE', label: t('pages.Register.individual_form.gender.Female'), icon: <PersonStandingDress /> },
  ];

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
    setCountry(event.target.value);

    // Api Call
    FetchStates(event.target.value).then((response) => {
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
    setIsLoading(true);

    // Perform Register logic (Call api)
    RegisterAPI(
      FirstName,
      LastName,
      email,
      PhoneNumber,
      password,
      ConfirmPassword,
      state,
      date,
      gender)
      .then((response) => {
        if (response.status === 201) {
          // Store token and Log in user 
          const token = response.data.access_token;
          setLoggedIn(true);
          setAccessToken(token);
          setProfile(response.data.individual);
          Cookies.set('access_token', token, { secure: true, expires: 1 / 24 });
          return response.data.individual;
        }
        else {
          console.log(response);
        }
      }).then((individual) => {
        setIsLoading(false);
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
        navigate(`/profile/${individual.user_id}/${individual.full_name}`);
      });
  };

  if (isLoading) {
    return <Clock />
  }
  return (
    <form className={styles.register} onSubmit={handleSubmit}>
      <div className={styles.register__row}>
        <NormalInput
          type="text"
          placeholder={t('pages.Register.individual_form.first_name_input')}
          icon={<PersonFill />}
          value={FirstName}
          setChange={setFirstName}
        />
        <NormalInput
          type="text"
          placeholder={t('pages.Register.individual_form.last_name_input')}
          icon={<PersonFill />}
          value={LastName}
          setChange={setLastName}
        />
      </div>
      <div className={styles.register__row}>
        <NormalInput
          type="text"
          placeholder={t('pages.Register.email_input')}
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
          placeholder={t('pages.Register.password_input')}
          value={password}
          setChange={setPassword}
        />
        <PasswordInput
          placeholder={t('pages.Register.confirm_password_input')}
          value={ConfirmPassword}
          setChange={setConfirmPassword}
        />
      </div>
      <div className={styles.register__row}>
        <div className={Inputstyles.field}>
          <i className={Inputstyles.icon}><Globe /></i>
          <select onChange={handleCountrySelect} value={country} className={Inputstyles.input} required>
            <option key={0} value='' disabled>{t('pages.Register.country_input')}</option>
            {(countries.length === 0) ? <></> : countries.map((country) => {
              return <option key={country.country_id} value={country.country_name} className={Inputstyles.option}>{country.country_name}</option>
            })}
          </select>
        </div>
        <div className={Inputstyles.field}>
          <i className={Inputstyles.icon}><GeoAltFill /></i>
          <select onChange={(event) => setState(event.target.value)} value={state} className={Inputstyles.input} required>
            <option key={0} value='' disabled>{t('pages.Register.city_input')}</option>
            {(states.length === 0) ? <></> : states.map((state) => {
              return <option key={state.state_id} value={state.state_id} className={Inputstyles.option}>{state.state_name}</option>
            })}
          </select>
        </div>
      </div>
      <div className={styles.register__row}>
        <div className={Inputstyles.field}>
          <DatePicker
            icon={<Calendar3 />}
            dateFormat='dd/MM/yyyy'
            className={Inputstyles.input}
            wrapperClassName={styles.date_picker}
            calendarIconClassName={styles.date_picker_icon}
            selected={date}
            onChange={(date) => {
              const selectedDate = new Date(date).toISOString().split('T')[0];
              setDate(selectedDate);
            }}
            showMonthDropdown
            showYearDropdown
            showIcon
            required
          />
        </div>
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
      </div>
      <button type="submit" className={styles.register__submit}>
        <span>{t('pages.Register.button')}</span>
        <i className={styles.button__icon}><ChevronRight /></i>
      </button>
    </form>
  );
}

export default IndividualForm;
