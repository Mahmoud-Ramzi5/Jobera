import { useContext, useState, useEffect } from 'react';
import ReactSwitch from 'react-switch';
import { useTranslation } from 'react-i18next';
import { KanbanFill, EnvelopeAtFill, BellFill, List, X } from 'react-bootstrap-icons';
import { ThemeContext, LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import { FetchImage } from '../apis/FileApi.jsx';
import Logo from '../assets/JoberaLogo.png';
import defaultUser from '../assets/default.png';
import styles from '../styles/navbar.module.css';
import ChatNavWindow from "./Chats/Chats.jsx";

const NavBar = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loggedIn } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const [showChatScreen, setShowChatScreen] = useState(false);

  return (
    <nav>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
          <a href="/">
            {t('components.nav_bar.nav_logo')}
          </a>
        </div>
        <input
          type="radio"
          name="slider"
          id="menu_btn"
          className={styles.menu_btn}
        />
        <input
          type="radio"
          name="slider"
          id="close_btn"
          className={styles.close_btn}
        />

        <ul className={styles.nav_links}>
          <div className={styles.nav_links_left}>
            {loggedIn &&
              <li>
                <a href="/dashboard">{t('components.nav_bar.li_home')}</a>
              </li>
            }
            <li>
              <a href="/jobs/all" className={styles.desktop_item}>
                {t('components.nav_bar.li_jobs')}
              </a>
              <input type="checkbox" id="Jobs" className={styles.showDrop} />
              <label htmlFor="Jobs" className={styles.mobile_item}>
                {t('components.nav_bar.li_jobs')}
              </label>
              <ul className={styles.drop_menu}>
                <a className={styles.mobile_item} href="/jobs/all">
                  {t('components.nav_bar.all')}
                </a>
                <li>
                  <a href="/jobs/FullTime">{t('components.nav_bar.full_time')}</a>
                </li>
                <li>
                  <a href="/jobs/PartTime">{t('components.nav_bar.part_time')}</a>
                </li>
                <li>
                  <a href="/jobs/Freelancing">{t('components.nav_bar.freelancing')}</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/jobs/post">{t('components.nav_bar.post_job')}</a>
            </li>
          </div>
          <div className={styles.nav_links_right}>
            <label
              htmlFor="close_btn"
              className={`${styles.btn} ${styles.close_btn}`}
            >
              <X size={31} />
            </label>
            {loggedIn ? (
              <>
                <li>
                  <a href="/manage">
                    <KanbanFill /> {t('components.nav_bar.li_manage')}
                  </a>
                </li>
                <li>
                  <span className={styles.chat_list} onClick={() => setShowChatScreen(!showChatScreen)}>
                    <EnvelopeAtFill /> <span className={styles.mobile_item2}>{t('components.nav_bar.li_chats')}</span>
                  </span>
                </li>
                <li>
                  <a href="#">
                    <BellFill />
                  </a>
                </li>
                <span>
                  <li>
                    <div className={styles.desktop_item}>
                      <NavUser ProfileData={profile} />
                    </div>
                    <input
                      type="checkbox"
                      id="Profile"
                      className={styles.showDrop}
                    />
                    <label htmlFor="Profile" className={styles.mobile_item}>
                      <NavUser ProfileData={profile} />
                    </label>

                    <ul className={styles.drop_menu}>
                      <li>
                        <a href={
                          profile.type === "individual" ?
                            `/profile/${profile.user_id}/${profile.full_name}` :
                            profile.type === "company" ?
                              `/profile/${profile.user_id}/${profile.name}` :
                              '#'}>{t('components.nav_bar.li_profile')}</a>
                      </li>
                      <li>
                        <a href="/logout">{t('components.nav_bar.li_logout')}</a>
                      </li>
                    </ul>
                  </li>
                  {showChatScreen && <ChatNavWindow />}
                </span>
              </>
            ) : (
              <>
                <li>
                  <a href="/login">{t('components.nav_bar.li_login')}</a>
                </li>
                <li>
                  <a href="/register">{t('components.nav_bar.li_register')}</a>
                </li>
              </>
            )}
            <li className={styles.theme_switch}>
              <ReactSwitch
                checked={theme === "theme-dark"}
                checkedIcon={<>🌙</>}
                uncheckedIcon={<>🔆</>}
                onChange={toggleTheme}
                onColor="#4F6E95"
              />
            </li>
          </div>
        </ul>
        <label
          htmlFor="menu_btn"
          className={`${styles.btn} ${styles.menu_btn}`}
        >
          <List size={29} />
        </label>
      </div>
    </nav>
  );
};

const NavUser = ({ ProfileData }) => {
  const [avatarPhotoPath, setAvatarPhotoPath] = useState(
    ProfileData.avatar_photo
  );
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const { accessToken } = useContext(LoginContext);

  useEffect(() => {
    if (avatarPhotoPath) {
      FetchImage(accessToken, avatarPhotoPath).then((response) => {
        setAvatarPhoto(response);
      });
      setAvatarPhotoPath(null);
    }
  }, []);

  return (
    <div className={styles.profile}>
      {avatarPhoto ? (
        <img
          src={URL.createObjectURL(avatarPhoto)}
          className={styles.profile_image}
        ></img>
      ) : (
        <img
          src={defaultUser}
          className={styles.profile_image}
        ></img>
      )}
      <div className={styles.profile_details}>
        <div>
          {ProfileData.type === "individual" ? (
            ProfileData.full_name
          ) : ProfileData.type === "company" ? (
            ProfileData.name
          ) : (
            <></>
          )}
        </div>
        <div>${ProfileData.wallet.current_balance}</div>
      </div>
    </div>
  );
};

export default NavBar;
