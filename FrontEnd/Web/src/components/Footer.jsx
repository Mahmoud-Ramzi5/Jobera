import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/footer.module.css';

const Footer = () => {
  // Translations
  const { i18n } = useTranslation('global');

  useEffect(() => {
    localStorage.setItem('Lang', i18n.language);
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (event) => {
    if (event.target.value === 'en' || event.target.value === 'ar') {
      i18n.changeLanguage(event.target.value);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles.column} ${styles.col_1}`}>
            <a href="/" className={styles.footerLogo}>Jobera</a>
            <span className={styles.AppLang}> Language:
              <select onChange={changeLanguage} value={i18n.language}>
                <option key='en' value='en'>English</option>
                <option key='ar' value='ar'>Arabic</option>
              </select>
            </span>
            <p>Copyright ©2024 All rights reserved</p>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>Jobs</h3>
            <ul className={styles.footerList_links}>
              <li><a href="/jobs/post">Post a job</a></li>
              <li><a href="/jobs/all">Browse All Jobs</a></li>
              <li><a href="/jobs/FullTime">Browse FullTime Jobs</a></li>
              <li><a href="/jobs/PartTime">Browse PartTime Jobs</a></li>
              <li><a href="/jobs/Freelancing">Browse Freelancing Jobs</a></li>
            </ul>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>Apps</h3>
            <ul className={styles.footerList_links}>
              <li><a href="#">Android App</a></li>
              <li><a href="#">IOS App</a></li>
            </ul>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>About</h3>
            <ul className={styles.footerList_links}>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Team</a></li>
            </ul>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>Further Information</h3>
            <ul className={styles.footerList_links}>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Code of Conduct</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.line}></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;