import { useState, useEffect, useRef, useContext } from 'react';
import styles from "./EditMenu.module.css";
import { Button } from "react-bootstrap";
import { FetchCountries, FetchStates } from '../../apis/AuthApis.jsx';
import { EditProfile } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput';
import Inputstyles from '../../styles/Input.module.css';
import CustomPhoneInput from '../CustomPhoneInput';
import {
  Globe, GeoAltFill,
  Calendar3, PersonStanding, PersonStandingDress
} from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts.jsx';
const EditMenu = ({ data, onSave, onCancel }) => {
  const { accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [formData, setFormData] = useState(data);
  const [Full_name, setFullName] = useState(formData.full_name);
  const [name, setName] = useState(formData.name);
  const [PhoneNumber, setPhoneNumber] = useState(formData.phone_number);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(formData.country);
  const [states, setStates] = useState([]);
  const [state, setState] = useState(formData.state);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call
      FetchCountries().then((response) => {
        if (response.status === 200) {
          setCountries(response.data.countries);

          // Set the selected country from the data
          const selectedCountry = response.data.countries.find(
            (c) => c.country_name === formData.country
          );
          if (selectedCountry) {
            setCountry(selectedCountry.country_name);

            // Api Call to fetch states for the selected country
            FetchStates(selectedCountry.country_name).then((response) => {
              if (response.status === 200) {
                setStates(response.data.states);
                console.log(formData.state)
                // Set the selected state from the data
                const selectedState = response.data.states.find(
                  (s) => s.state_name === formData.state
                );
                console.log(selectedState)
                if (selectedState) {
                  setState(selectedState.state_name);
                  console.log(state)
                }
              } else {
                console.log(response.statusText);
              }
            });
          }
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
    states.forEach((stat, index) => {
      if (stat.state_name == state) {
        state_id = stat.state_id;
      }
    });
    {data.type === "individual" ? (
      EditProfile(
        accessToken,
        Full_name,
        PhoneNumber,
        state_id,
      ).then((response) => {
        if (response.status === 200) {
          console.log(response);
          setSuccessMessage("user info updated successfully");
        }
        else {
          console.log(response.statusText);
          setFailMessage("Error in user info update");
        }
      })

    ) : data.type === "company" ? (
      EditProfile(
        accessToken,
        name,
        PhoneNumber,
        state_id,
      ).then((response) => {
        if (response.status === 200) {
          console.log(response);
          setSuccessMessage("user info updated successfully");
        }
        else {
          console.log(response.statusText);
          setFailMessage("Error in user info update");
        }
      })

    ) : (
      <></>
    )}
    
  }

  return (
    <div className={styles.edit_menu}>
      <form onSubmit={handleSubmit}>
        <div className={styles.edit__row}>
          {data.type === "individual" ? (
            <NormalInput
              type="text"
              value={Full_name}
              setChange={setFullName}
              placeholder="Full Name"
            />
          ) : data.type === "company" ? (
            <NormalInput
              type="text"
              value={name}
              setChange={setName}
              placeholder="Name"
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
        <Button className={styles.submit_button} variant="primary" type="submit">Submit</Button>
      </form>
      <Button className={styles.save_button} variant="primary" onClick={onSave}>Save</Button>
      <Button className={styles.cancel_button} variant="secondary" onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default EditMenu;