import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext, LoginContext } from '../../utils/Contexts';
import { MarkNotification } from '../../apis/NotificationsApis';
import NotificationCard from './NotificationCard';
import styles from './notifications.module.css';


const NotificationsNav = ({ notifications, setShowScreen, setCount }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { theme } = useContext(ThemeContext);
  const { accessToken } = useContext(LoginContext);
  // Define states
  const navigate = useNavigate();

  const handleNotification = (notification_id) => {
    MarkNotification(accessToken, notification_id).then((response) => {
      if (response.status == 200) {
        setCount((prevCount) => (prevCount - 1));
        setShowScreen(false);
        navigate('/chats');
      } else {
        console.log(response);
      }
    });
  }


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
          onClick={() => {
            navigate("/notifications");
            setShowScreen(false);
          }}
        >
          {t('components.nav_bar.button_notifications')}
        </button>
      </div>
      <ul className={styles.notifications_list}>
        {notifications.length === 0 ?
          <h4 className={styles.no_notifications}>{t('components.nav_bar.no_notifications')}</h4>
          : notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification}
              onClick={() => {
                handleNotification(notification.id);
              }}
            />
          ))}
      </ul>
    </div>
  );
};

export default NotificationsNav;
