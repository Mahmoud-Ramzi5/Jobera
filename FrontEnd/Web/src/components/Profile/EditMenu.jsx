import { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { PersonFill, BuildingFill, Globe, GeoAltFill } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { FetchCountries, FetchStates } from '../../apis/AuthApis.jsx';
import { EditProfile } from '../../apis/ProfileApis/ProfileApis.jsx';
import NormalInput from '../NormalInput';
import CustomPhoneInput from '../CustomPhoneInput';
import styles from './userinfo.module.css';
import Inputstyles from '../../styles/Input.module.css';


const EditMenu = ({ data, onClose }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const { setProfile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const [name, setName] = useState(data.name);
  const [FullName, setFullName] = useState(data.full_name);
  const [PhoneNumber, setPhoneNumber] = useState(data.phone_number);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(data.country);
  const [states, setStates] = useState([]);
  const [state, setState] = useState(data.state);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call to fetch countries
      FetchCountries().then((response) => {
        if (response.status === 200) {
          setCountries(response.data.countries);
        } else {
          console.log(response.statusText);
        }
      });

      // Api Call to fetch states for user's country
      FetchStates(country).then((response) => {
        if (response.status === 200) {
          setStates(response.data.states);
        } else {
          console.log(response.statusText);
        }
      });
    }
  }, [data]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    var state_id;
    states.forEach((stat) => {
      if (stat.state_name == state) {
        state_id = stat.state_id;
      }
    });
    if (data.type === "individual") {
      EditProfile(
        accessToken,
        FullName,
        PhoneNumber,
        state_id,
      ).then((response) => {
        if (response.status === 200) {
          setProfile(response.data.user);
          setSuccessMessage(response.data.message);
        }
        else {
          console.log(response.statusText);
          setFailMessage("Error in user info update");
        }
      });
    } else if (data.type === "company") {
      EditProfile(
        accessToken,
        name,
        PhoneNumber,
        state_id,
      ).then((response) => {
        if (response.status === 200) {
          setProfile(response.data.user);
          setSuccessMessage(response.data.message);
        }
        else {
          console.log(response.statusText);
          setFailMessage("Error in user info update");
        }
      });
    } else {
      setFailMessage("Error in user info update");
    }
  }


  return (
    <div className={styles.edit_menu}>
      <form onSubmit={handleSubmit}>
        <div className={styles.edit__row}>
          {data.type === "individual" ? (
            <NormalInput
              type="text"
              placeholder="Full Name"
              icon={<PersonFill />}
              value={FullName}
              setChange={setFullName}
            />
          ) : data.type === "company" ? (
            <NormalInput
              type="text"
              placeholder="Name"
              icon={<BuildingFill />}
              value={name}
              setChange={setName}
            />
          ) : (
            <></>
          )}
          <CustomPhoneInput
            defaultCountry='us'
            value={PhoneNumber}
            setChange={setPhoneNumber}
          />
        </div>
        <div className={styles.edit__row}>
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
                return <option key={state.state_id} value={state.state_name} className={Inputstyles.option}>{state.state_name}</option>
              })}
            </select>
          </div>
        </div>
        {successMessage && <p className={styles.success_message}>{successMessage}</p>}
        {failMessage && <p className={styles.fail_message}>{failMessage}</p>}
        <Button className={styles.submit_button} variant="primary" type="submit">Save</Button>
        <Button className={styles.save_button} variant="secondary" onClick={onClose}>Close</Button>
      </form>
    </div>
  );
};

export default EditMenu;