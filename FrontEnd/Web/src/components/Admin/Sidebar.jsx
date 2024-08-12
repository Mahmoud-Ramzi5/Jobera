import React from "react";
import { useTranslation } from "react-i18next";
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
import { Link } from "react-router-dom";

const Sidebar = ({ openSidebarToggle, OpenSidebar, setActiveComponent }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
    // Translations
    const { t } = useTranslation('global');
  const handleItemClick = (component) => {
    setActiveComponent(component);
  };
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
          <li className={styles.sidebar_list_item} onClick={() => handleItemClick('Dashboard')}>
            <BsGrid1X2Fill className={styles.icon} /> {t('components.admin.sidebar.dashboard')}
          </li>
          <li className={styles.sidebar_list_item} onClick={() => handleItemClick('Jobs')}>
            <BsBriefcaseFill className={styles.icon} /> {t('components.admin.sidebar.jobs')}
          </li>
          <li className={styles.sidebar_list_item} onClick={() => handleItemClick('Skills')}>
            <BsFillGrid3X3GapFill className={styles.icon} /> {t('components.admin.sidebar.skills')}
          </li>
          <li className={styles.sidebar_list_item} onClick={() => handleItemClick('Users')}>
            <BsPeopleFill className={styles.icon} /> {t('components.admin.sidebar.users')}
          </li>
          <li className={styles.sidebar_list_item} onClick={() => handleItemClick('Wallet')}>
            <BsWalletFill className={styles.icon} /> {t('components.admin.sidebar.transactions')}
          </li>
          <li className={styles.sidebar_list_item} onClick={() => handleItemClick('Reports')}>
            <BsMenuButtonWideFill className={styles.icon} /> {t('components.admin.sidebar.reports')}
          </li>
          <li className={styles.sidebar_list_item} onClick={() => handleItemClick('Settings')}>
            <BsFillGearFill className={styles.icon} /> {t('components.admin.sidebar.settings')}
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
