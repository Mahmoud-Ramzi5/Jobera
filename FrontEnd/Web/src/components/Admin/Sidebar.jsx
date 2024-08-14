import { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsX,
  BsMenuButtonWideFill, BsBriefcaseFill, BsWalletFill,
} from "react-icons/bs";
import { ThemeContext } from "../../utils/Contexts";
import ReactSwitch from "react-switch";
import Logo from '../../assets/JoberaLogo.png';
import styles from '../../styles/AdminPage.module.css';


const Sidebar = ({ openSidebarToggle, OpenSidebar, setActiveComponent }) => {
  // Translations
  const { t, i18n } = useTranslation('global');
  // Context
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleItemClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    localStorage.setItem('Lang', i18n.language);
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (event) => {
    if (event.target.value === 'en' || event.target.value === 'ar') {
      i18n.changeLanguage(event.target.value);
    }
  };


  return (
    <div className={openSidebarToggle ? styles.sidebar : styles.sidebar_no}>
      <aside
        id="sidebar"
        className={styles.sidebar_responsive}
      >
        <div className={styles.sidebar_title}>
          <div className={styles.sidebar_brand}>
            <div className={styles.logo}>
              <img src={Logo} alt="logo" />
              <a href="/">Jobera</a>
            </div>
          </div>
          <span className={styles.close_icon} onClick={OpenSidebar}>
            <BsX size={31} />
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
          <li className={styles.sidebar_list_item}>
            <select onChange={changeLanguage} value={i18n.language}
              style={{ width: '95%', borderRadius: '15px' }}>
              <option key='en' value='en'>
                {t('components.footer.en')}
              </option>
              <option key='ar' value='ar'>
                {t('components.footer.ar')}
              </option>
            </select>
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
