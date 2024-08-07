import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IndividualForm from '../components/Register/IndividualForm';
import CompanyForm from '../components/Register/CompanyForm';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/register.module.css';


const Register = () => {
  // Translations
  const { t } = useTranslation('global');
  // Define states
  const [RegisterType, setRegisterType] = useState('individual');

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <img src={Logo} className={styles.logo} alt="logo" />
          <div className={styles.title}>{t('pages.Register.title')}</div>
          <div className={styles.btn}>
            <div className={styles.slider} style={RegisterType === 'individual' ? { insetInlineStart: 0 } : { insetInlineStart: '100px' }} />
            <button onClick={() => setRegisterType('individual')}>{t('pages.Register.slider.individual')}</button>
            <button onClick={() => setRegisterType('company')}>{t('pages.Register.slider.company')}</button>
          </div>
          {RegisterType === 'individual' ? <IndividualForm /> : <CompanyForm />}
          <div className={styles.register__login}>
            {t('pages.Register.register_login_div')} <a href='/login'>{t('pages.Register.register_login_a')}</a>
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
