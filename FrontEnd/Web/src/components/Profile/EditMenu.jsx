import { useState,useEffect,useRef, useContext } from 'react';
import styles from "./EditMenu.module.css";
import {  Button } from "react-bootstrap";
import { FetchCountries, FetchStates } from '../../apis/AuthApis.jsx';
import { EditProfile } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput';
import Inputstyles from '../../styles/Input.module.css';
import CustomPhoneInput from '../CustomPhoneInput';
import {
  Globe, GeoAltFill,
  Calendar3,  PersonStanding, PersonStandingDress
} from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts.jsx';
const EditMenu = ({ data, onSave, onCancel }) => {
  const { accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [formData, setFormData] = useState(data);
  const [Full_name, setFullName] = useState(formData.full_name);
  const [PhoneNumber, setPhoneNumber] = useState(formData.phone_number);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(formData.country);
  const [states, setStates] = useState([]);
  const [state, setState] = useState(formData.state);
  const [date, setDate] = useState(formData.birth_date);
  const [gender, setGender] = useState(formData.gender);
  const genders = [
    { value: 'male', label: 'Male', icon: <PersonStanding /> },
    { value: 'female', label: 'Female', icon: <PersonStandingDress /> },
  ];
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
            FetchStates(selectedCountry.country_id).then((response) => {
              if (response.status === 200) {
                setStates(response.data.states);

                // Set the selected state from the data
                const selectedState = response.data.states.find(
                  (s) => s.state_name === formData.state
                );
                if (selectedState) {
                  setState(selectedState.state_name);
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
    FetchStates(event.target.options.selectedIndex).then((response) => {
      if (response.status === 200) {
        setStates(response.data.states);
      }
      else {
        console.log(response.statusText);
      }
    });
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    var state_id;
    states.forEach((stat,index)=>{
      if(stat.state_name==state){
        state_id=stat.state_id;
      }
    });
    EditProfile(
      accessToken,
      Full_name,
      PhoneNumber,
      state_id,
      date,
      gender
    ).then((response) => {
      if (response.status === 201) {   
        console.log(response);
      }
      else {
        console.log(response.statusText);
      }
    })
  }

  return (
    <div className={styles.edit_menu}>
      <form onSubmit={handleSubmit}>
      <div className={styles.edit__row}>
      <NormalInput
        type="text"
        value={Full_name}
        setChange={setFullName}
        placeholder="Full Name"
      />
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
              return <option key={state.state_id} value={state.state_id} className={Inputstyles.option}>{state.state_name}</option>
            })}
          </select>
        </div>
      </div>
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
        <Button className={styles.submitButton} variant="primary" type="submit">Submit</Button>
        </form>
      <Button className={styles.saveButton} variant="primary"  onClick={onSave}>Save</Button>
      <Button className={styles.cansleButton} variant="secondary"  onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default EditMenu;