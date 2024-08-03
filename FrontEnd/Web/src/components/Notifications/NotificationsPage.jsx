import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsEye, BsTrash } from 'react-icons/bs';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { FetchNotifications, MarkNotification, DeleteNotification } from '../../apis/NotificationsApis';
import Clock from '../../utils/Clock';
import styles from './notifications.module.css';


const NotificationsPage = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notRead, setNotRead] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      FetchNotifications(accessToken).then((response) => {
        if (response.status === 200) {
          setNotifications(response.data.notifications);
          response.data.notifications.map((notification) => {
            if (notification.read_at !== null) {
              setNotRead(true);
            }
          })
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleMarkAllNotifications = (event) => {
    event.preventDefault();
    MarkNotification(accessToken, 'all').then((response) => {
      if (response.status == 200) {
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  const RenderNotification = (notification) => {
    const handleMarkAsRead = (event) => {
      event.preventDefault();
      MarkNotification(accessToken, notification.id).then((response) => {
        if (response.status == 200) {
          window.location.reload();
        } else {
          console.log(response);
        }
      });
    };

    const handleDelete = (event) => {
      event.preventDefault();
      DeleteNotification(accessToken, notification.id).then((response) => {
        if (response.status == 204) {
          window.location.reload(); // Refresh the page after deletion
        } else {
          console.log(response);
        }
      });
    };


    return (
      <tr key={notification.id}>
        <td>{notification.data.sender_name}</td>
        <td>{notification.data.message}</td>
        <td>
          {notification.created_at.split('T')[0]}{' '}
          {notification.created_at.split('T')[1].split('.')[0]}
        </td>
        <td>
          {notification.read_at === null ?
            <button onClick={handleMarkAsRead} className={styles.view_button}>
              <BsEye />
            </button>
            : <h6 className={styles.read_message}>Read</h6>
          }
          {profile.user_id == notification.notifiable_id &&
            <button onClick={handleDelete} className={styles.delete_button}>
              <BsTrash />
            </button>
          }
        </td>
      </tr>
    );
  };


  if (isLoading) {
    return <Clock />
  }
  return (
    <div className={styles.page_screen}>
      <div className={styles.page_content}>
        <table className={styles.notifications_table}>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>From:</th>
              <th style={{ width: '40%' }}>Message</th>
              <th style={{ width: '20%' }}>Date</th>
              <th style={{ width: '20%' }}>Read and delete {notRead && <><br />
                <div onClick={handleMarkAllNotifications} className={styles.mark_all}>
                  Mark all as read
                </div>
              </>}
              </th>
            </tr>
          </thead>
          <tbody>{notifications.map(RenderNotification)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default NotificationsPage;
