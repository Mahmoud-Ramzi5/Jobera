
import defaultUser from '../../assets/default.png';
import styles from './notifications.module.css';


const NotificationCard = ({ notification, onClick }) => {

  return (
    <li className={styles.card} onClick={onClick}>
      <div className={styles.card_title}>
        <div className={styles.card_user}>
          {notification.data.sender_name}
        </div>
        <div className={styles.card_date}>
          {notification.created_at.split('T')[0]}{' '}
          {notification.created_at.split('T')[1].split('.')[0]}
        </div>
      </div>
      <h6 className={styles.card_message}>
        {notification.data.message}
      </h6>
    </li>
  );
};

export default NotificationCard;
