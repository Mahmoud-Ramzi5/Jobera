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

  const handleClickChat = () => {
    setShowChatsScreen(!showChatsScreen);
    setShowNotificationScreen(false);
  }

  const handleClickNotifications = () => {
    setShowNotificationScreen(!showNotificationScreen);
    setShowChatsScreen(false);
  }


  return (
    <header className={styles.header}>
      <div className={styles.menu_icon}>
        <BsJustify size={27} className={styles.icon} onClick={OpenSidebar} />
      </div>
      <div className={styles.header_right}>
        <div title="Logout" className={styles.span_list} onClick={() => navigate('/logout')}>
          <FaDoorOpen className={styles.icon} />
        </div>
        <span title="Chats" className={styles.span_list} onClick={handleClickChat}>
          <BsEnvelopeAtFill className={styles.icon} />
        </span>
        <span title="notifications" className={styles.span_list} onClick={handleClickNotifications}>
          <BsFillBellFill className={styles.icon} />
        </span>
      </div>
      {showChatsScreen && <span className={styles.chat_admin}><ChatNav setShowChatsScreen={handleClickChat} /></span>}
      {showNotificationScreen && <span className={styles.chat_admin}></span>}
    </header>
  );
};

export default Header;
