import React, { useState } from 'react';
import { BsFillBellFill, BsPersonCircle, BsJustify, BsEnvelopeAtFill } from 'react-icons/bs';
import styles from '../../styles/AdminPage.module.css';
import { LogoutAPI } from '../../apis/AuthApis';
import { LoginContext } from '../../utils/Contexts';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatNav from '../Chats/ChatNav';

const Header = ({ OpenSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  const navigate = useNavigate();
  const [showChatsScreen, setShowChatsScreen] = useState(false);

  const handlePersonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <header className={styles.header}>
      <div className={styles.menu_icon}>
        <BsJustify className={styles.icon} onClick={OpenSidebar} />
      </div>
      <div className={styles.header_right}>
        <div className={styles.personContainer}>
          <BsPersonCircle className={styles.icon} onClick={handlePersonClick} />
          {showDropdown && (
            <div className={styles.dropdown}>
              <ul>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
        <span title="Chats" className={styles.span_list} onClick={() => setShowChatsScreen(!showChatsScreen)}>
          <BsEnvelopeAtFill /> <span className={styles.mobile_item2}></span>
        </span>
        {showChatsScreen && <ChatNav setShowChatsScreen={setShowChatsScreen} />}
        <BsFillBellFill className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;