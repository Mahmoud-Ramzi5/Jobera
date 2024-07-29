import { useEffect, useRef } from 'react';
import { FetchImage } from '../../apis/FileApi';
import defaultUser from '../../assets/default.png';
import styles from './notifications.module.css';


const NotificationCard = ({ notification, onClick }) => {
  // Define states
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (notification.other_user.avatar_photo) {
        FetchImage("", notification.other_user.avatar_photo).then((response) => {
          notification.other_user.avatar_photo = response;
        });
      }
    }
  }, []);

  return (
    <li className={styles.card} onClick={onClick}>
      {notification.other_user.avatar_photo ? (
        <img
          className={styles.Card_Img}
          variant="top"
          src={URL.createObjectURL(notification.other_user.avatar_photo)}
          alt={"Profile Picture"}
          style={{ pointerEvents: "none" }}
        />
      ) : (
        <img
          className={styles.Card_Img}
          variant="top"
          src={defaultUser}
          alt={"Default Picture"}
          style={{ pointerEvents: "none" }}
        />
      )}
      <div className={styles.card_user}>
        {notification.other_user.name}
      </div>
      <div className={styles.card_message}>
        {notification.message}
      </div>
    </li>
  );
};

export default NotificationCard;
