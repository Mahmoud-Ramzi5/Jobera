import { useState } from "react";
import { EyeFill, EyeSlashFill, KeyFill } from 'react-bootstrap-icons';
import styles from '../styles/Input.module.css';

const PasswordInput = ({ placeholder, value, setChange }) => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<EyeFill />);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(<EyeSlashFill />);
      setType('text');
    } 
    else {
      setIcon(<EyeFill />);
      setType('password');
    }
  }

  return (
    <div className={styles.field}>
      <i className={styles.icon}><KeyFill /></i>
      
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setChange(event.target.value)}
        required
      />
      <i className={styles.icon} onClick={handleToggle}>{icon}</i>
    </div>
  );
}

export default PasswordInput;