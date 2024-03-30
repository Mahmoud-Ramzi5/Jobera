import React from "react";
import styles from '../styles/Input.module.css';

const NormalInput = ({ placeholder, icon, value, setChange }) => {

  return (
    <div className={styles.field}>
      <i className={styles.icon}>{icon}</i>
      
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setChange(event.target.value)}
        required
      />
    </div>
  );
}

export default NormalInput;