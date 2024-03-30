import React from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import styles from '../styles/CustomPhoneInput.module.css';

const CustomPhoneInput = ({ defaultCountry, value, setChange }) => {

  return (
    <div className={styles.field}>
      <PhoneInput
        className={styles.PhoneInput}
        inputClassName={styles.Input}
        defaultCountry={defaultCountry}
        value={value}
        onChange={setChange}
      />
    </div>
  );
}

export default CustomPhoneInput;