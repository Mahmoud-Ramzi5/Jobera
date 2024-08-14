import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillBellFill, BsJustify,
  BsEnvelopeAtFill
} from 'react-icons/bs';
import { FaDoorOpen } from 'react-icons/fa6';
import ChatNav from '../Chats/ChatNav';
import styles from '../../styles/AdminPage.module.css';


const Header = ({ OpenSidebar }) => {
  const navigate = useNavigate();
  const [showChatsScreen, setShowChatsScreen] = useState(false);
  const [showNotificationScreen, setShowNotificationScreen] = useState(false);

  const handleClickChat = (event) => {
    event.preventDefault();
    setShowChatsScreen(!showChatsScreen);
    setShowNotificationScreen(false);
  }

  const handleClickNotifications = (event) => {
    event.preventDefault();
    setShowNotificationScreen(!showNotificationScreen);
    setShowChatsScreen(false);
  }

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <header className={styles.header}>
      <div className={styles.menu_icon}>
        <BsJustify className={styles.icon} onClick={OpenSidebar} />
      </div>
      <div className={styles.header_right}>
        <div className={styles.span_list}>
          <FaDoorOpen className={styles.icon} onClick={handleLogout} />
        </div>
        <span title="Chats" className={styles.span_list} onClick={handleClickChat}>
          <BsEnvelopeAtFill className={styles.icon} /> <span className={styles.mobile_item2}></span>
        </span>
        <span title="notifications" className={styles.span_list} onClick={handleClickNotifications}>
          <BsFillBellFill className={styles.icon} />
        </span>
      </div>
      {showChatsScreen && <span className={styles.chat_admin}><ChatNav setShowChatsScreen={handleClickChat} /></span>}
      {showNotificationScreen && <span className={styles.chat_admin}>Hello for test</span>}
    </header>
  );
};

export default Header;
