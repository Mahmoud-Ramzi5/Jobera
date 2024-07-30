import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsBriefcase,
  BsBriefcaseFill,
  BsWalletFill,
} from "react-icons/bs";
import styles from '../../styles/AdminPage.module.css';
import Logo from '../../assets/JoberaLogo.png';
import ReactSwitch from "react-switch";
import { useContext } from 'react';
import { ThemeContext } from "../../utils/Contexts";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={styles.sidebar}>
    <aside
      id="sidebar"
      className={openSidebarToggle ? styles.sidebar_responsive : ""}
    >
      <div className={styles.sidebar_title}>
        <div className={styles.sidebar_brand}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
          <a href="/">Jobera</a>
        </div>
        
        </div>
        <span className={styles.close_icon} onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className={styles.sidebar_list}>
        <li className={styles.sidebar_list_item}>
          <a href="">
            <BsGrid1X2Fill className={styles.icon} /> Dashboard
          </a>
        </li>
        <li className={styles.sidebar_list_item}>
          <a href="">
            <BsBriefcaseFill className={styles.icon} /> Jobs
          </a>
        </li>
        <li className={styles.sidebar_list_item}>
          <a href="">
            <BsFillGrid3X3GapFill className={styles.icon} /> Skills
          </a>
        </li>
        <li className={styles.sidebar_list_item}>
          <a href="">
            <BsPeopleFill className={styles.icon} /> Users
          </a>
        </li>
        <li className={styles.sidebar_list_item}>
          <a href="">
            <BsWalletFill className={styles.icon} /> Wallet
          </a>
        </li>
        <li className={styles.sidebar_list_item}>
          <a href="">
            <BsMenuButtonWideFill className={styles.icon} /> Reports
          </a>
        </li>
        <li className={styles.sidebar_list_item}>
          <a href="">
            <BsFillGearFill className={styles.icon} /> Setting
          </a>
        </li>
        <li className={styles.theme_switch}>
              <ReactSwitch
                checked={theme === "theme-dark"}
                checkedIcon={<>🌙</>}
                uncheckedIcon={<>🔆</>}
                onChange={toggleTheme}
                onColor="#4F6E95"
              />
        </li>
      </ul>
    </aside>
    </div>
  );
};

export default Sidebar;
