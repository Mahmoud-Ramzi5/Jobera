import { useState } from 'react';
import IndividualForm from '../components/Register/IndividualForm';
import CompanyForm from '../components/Register/CompanyForm';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/register.module.css';


const Register = () => {
  // Define states
  const [RegisterType, setRegisterType] = useState('individual');

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
        <img src={Logo} className={styles.logo} alt="logo" />
          <div className={styles.title}>Register</div>
          <div className={styles.btn}>
          <div className={styles.slider} style={RegisterType === 'individual'? {left: 0} : {left:'100px'}} />
            <button onClick={() => setRegisterType('individual')}>Individual</button>
            <button onClick={() => setRegisterType('company')}>Company</button>
          </div>
          {RegisterType === 'individual' ? <IndividualForm /> : <CompanyForm />}
          <div className={styles.register__login}>
            Already have an account? <a href='/login'>Log in</a>
          </div>
        </div>
        <div className={styles.screen__background}>
          <span className={styles.screen__shape}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
