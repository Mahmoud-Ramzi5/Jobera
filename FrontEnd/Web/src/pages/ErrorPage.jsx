import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileContext } from '../utils/Contexts';
import ErrorPicture from '../assets/errorIcon.png'
import styles from '../styles/errorpage.module.css'


const ErrorPage = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { profile } = useContext(ProfileContext);


  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <div className={styles.img_holder}>
            <img src={ErrorPicture} alt='Error' className={styles.image} />
          </div>
          <div className={styles.title}>
            <h4>
              {t('pages.error_page.An')}{' '}
              <span className={styles.error}>
                {t('pages.error_page.error')}
              </span>{' '}
              {t('pages.error_page.title')}
            </h4>
          </div>
          <div className={styles.no_reason}>
            {profile.type === 'individual' ?
              <a href={`/profile/${profile.user_id}/${profile.full_name}`} className={styles.anchor}>
                {t('pages.error_page.anchor')}
              </a>
              :
              profile.type === 'company' ?
                <a href={`/profile/${profile.user_id}/${profile.name}`} className={styles.anchor}>
                  {t('pages.error_page.anchor')}
                </a>
                :
                <a href={`/admin`} className={styles.anchor}>
                  {t('pages.error_page.anchor')}
                </a>
            }
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
}

export default ErrorPage;
