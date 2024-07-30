import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import styles from '../../styles/AdminPage.module.css';

const Header = ({ OpenSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePersonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
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