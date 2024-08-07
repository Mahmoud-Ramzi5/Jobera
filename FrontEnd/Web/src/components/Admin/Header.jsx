import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import styles from '../../styles/AdminPage.module.css';
import { LogoutAPI } from '../../apis/AuthApis';
import { ProfileContext , LoginContext } from '../../utils/Contexts';
import { useContext } from 'react';

const Header = ({ OpenSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  const { setProfile } = useContext(ProfileContext);

  const handlePersonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // Perform Logout logic (Call api)
    LogoutAPI(accessToken).then((response) => {
      if (response.status === 200) {
        // Logout user and delete Token
        setLoggedIn(false);
        setAccessToken(null);
        Cookies.remove('access_token');
        setProfile({});
      }
      else {
        console.log(response.statusText);
      }
    }).then(() => {
      // Redirect to index
      navigate('/');
    });
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
        <BsFillBellFill className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;