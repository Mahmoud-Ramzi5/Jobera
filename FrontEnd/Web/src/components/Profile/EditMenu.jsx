import React from 'react';
import { useState } from 'react';
import styles from "./EditMenu.module.css";
import { Card, Button } from "react-bootstrap";
import NormalInput from '../NormalInput';
import CustomPhoneInput from '../CustomPhoneInput';
import {
    PersonFill, EnvelopeFill, TelephoneFill, Globe, GeoAltFill,
    Calendar3, ChevronRight, PersonStanding, PersonStandingDress
  } from 'react-bootstrap-icons';
const EditMenu = ({ data, onChange, onSave, onCancel }) => {
    const [gender, setGender] = useState('');
    const genders = [
      { value: 'male', label: 'Male', icon: <PersonStanding /> },
      { value: 'female', label: 'Female', icon: <PersonStandingDress /> },
    ];
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className={styles.edit_menu}>
      <div className={styles.edit__row}>
      <NormalInput
        type="text"
        name="full_name"
        value={data.full_name}
        onChange={handleInputChange}
        placeholder="Full Name"
      />
      <CustomPhoneInput
        defaultCountry='us'
        value={data.phone_number}
        setChange={handleInputChange}
      />
      </div>
      <div className={styles.edit__row}>
      <NormalInput
        type="text"
        name="country"
        value={data.country}
        onChange={handleInputChange}
        placeholder="Country"
      />
      <NormalInput
        type="text"
        name="city"
        value={data.state}
        onChange={handleInputChange}
        placeholder="City"
      />
      </div>
      <NormalInput
          type='date'
          placeholder='Birthdate'
          icon={<Calendar3 />}
          value={data.birth_date}
          setChange={handleInputChange}
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
      <Button className={styles.saveButton} variant="primary"  onClick={onSave}>Save</Button>
      <Button className={styles.cansleButton} variant="secondary"  onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default EditMenu;