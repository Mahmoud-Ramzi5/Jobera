import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/footer.module.css';

const Footer = () => {
  // Translations
  const { t, i18n } = useTranslation('global');

  useEffect(() => {
    localStorage.setItem('Lang', i18n.language);
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
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
            <a href="/" className={styles.footerLogo}>
              {t('components.footer.footer_logo')}
            </a>
            <span className={styles.AppLang}>
              {t('components.footer.app_lang')}
              <select onChange={changeLanguage} value={i18n.language}>
                <option key='en' value='en'>
                  {t('components.footer.en')}
                </option>
                <option key='ar' value='ar'>
                  {t('components.footer.ar')}
                </option>
              </select>
            </span>
            <p>{t('components.footer.copyright')}</p>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>{t('components.footer.h3_jobs')}</h3>
            <ul className={styles.footerList_links}>
              <li><a href="/jobs/post">{t('components.footer.post_job')}</a></li>
              <li><a href="/jobs/all">{t('components.footer.all')}</a></li>
              <li><a href="/jobs/FullTime">{t('components.footer.full_time')}</a></li>
              <li><a href="/jobs/PartTime">{t('components.footer.part_time')}</a></li>
              <li><a href="/jobs/Freelancing">{t('components.footer.freelancing')}</a></li>
            </ul>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>{t('components.footer.h3_apps')}</h3>
            <ul className={styles.footerList_links}>
              <li><a href="#">{t('components.footer.android')}</a></li>
              <li><a href="#">{t('components.footer.ios')}</a></li>
            </ul>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>{t('components.footer.h3_about')}</h3>
            <ul className={styles.footerList_links}>
              <li><a href="#">{t('components.footer.about_us')}</a></li>
              <li><a href="#">{t('components.footer.contact_us')}</a></li>
              <li><a href="#">{t('components.footer.services')}</a></li>
              <li><a href="#">{t('components.footer.careers')}</a></li>
              <li><a href="#">{t('components.footer.team')}</a></li>
            </ul>
          </div>
          <div className={`${styles.column} ${styles.col_2}`}>
            <h3>{t('components.footer.h3_info')}</h3>
            <ul className={styles.footerList_links}>
              <li><a href="#">{t('components.footer.privacy&policy')}</a></li>
              <li><a href="#">{t('components.footer.terms&conditions')}</a></li>
              <li><a href="#">{t('components.footer.code_of_conduct')}</a></li>
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