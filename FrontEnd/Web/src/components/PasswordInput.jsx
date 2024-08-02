import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill, BsKeyFill } from 'react-icons/bs';
import styles from '../styles/Input.module.css';

const PasswordInput = ({ placeholder, value, setChange }) => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<BsEyeFill />);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(<BsEyeSlashFill />);
      setType('text');
    }
    else {
      setIcon(<BsEyeFill />);
      setType('password');
    }
  }

  return (
    <div className={styles.field}>
      <i className={styles.icon}><BsKeyFill /></i>

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