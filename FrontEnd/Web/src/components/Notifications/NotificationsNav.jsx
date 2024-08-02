import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../utils/Contexts';
import NotificationCard from './NotificationCard';
import styles from './notifications.module.css';


const NotificationsNav = ({ notifications }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.notifications_head}>
        <h4>{t('components.nav_bar.h4_notifications')}</h4>
        <button
          type="button"
          className={
            theme === "theme-light"
              ? "btn btn-outline-dark"
              : "btn btn-outline-light"
          }
          onClick={() => console.log('Show Notifications')}
        >
          {t('components.nav_bar.button_notifications')}
        </button>
      </div>
      <ul className={styles.notifications_list}>
        {notifications.length === 0 ?
          <h4 className={styles.no_notifications}>{t('components.nav_bar.no_notifications')}</h4>
          : notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} onClick={() => console.log(notification)} />
          ))}
      </ul>
    </div>
  );
};

export default NotificationsNav;
