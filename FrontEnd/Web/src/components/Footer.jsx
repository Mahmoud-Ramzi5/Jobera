import React from 'react';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles.column} ${styles.col_1}`}>
            <a href="#" className={styles.footerLogo}>Jobera</a>
            <p>Copyright ©2024 All rights reserved</p>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>Jobs</h3>
            <ul className={styles.footerList_links}>
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">Post a job</a></li>
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