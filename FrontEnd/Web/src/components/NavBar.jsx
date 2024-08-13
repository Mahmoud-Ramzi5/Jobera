import { useContext, useState, useEffect } from 'react';
import ReactSwitch from 'react-switch';
import { useTranslation } from 'react-i18next';
import { BsKanbanFill, BsEnvelopeAtFill, BsBellFill, BsList, BsX } from 'react-icons/bs';
import Pusher from 'pusher-js';
import { ThemeContext, LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import { FetchUnreadNotifications } from '../apis/NotificationsApis.jsx';
import { FetchImage } from '../apis/FileApi.jsx';
import ChatNav from "./Chats/ChatNav.jsx";
import NotificationsNav from './Notifications/NotificationsNav.jsx';
import Logo from '../assets/JoberaLogo.png';
import defaultUser from '../assets/default.png';
import styles from '../styles/navbar.module.css';


const NavBar = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loggedIn, accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const [showChatsScreen, setShowChatsScreen] = useState(false);

  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsScreen, setShowNotificationsScreen] = useState(false);

  // Get Notifications
  useEffect(() => {
    if (loggedIn && accessToken) {
      FetchUnreadNotifications(accessToken).then((response) => {
        if (response.status === 200) {
          setNotifications(response.data.notifications);
          setCount(response.data.notifications.length);
        }
        else {
          console.log(response.statusText);
        }
      });
    }
  }, [loggedIn])

  // Open Notifications Channel
  useEffect(() => {
    if (profile) {
      Pusher.logToConsole = true;

      const pusher = new Pusher('181e3fe8a6a1e1e21e6e', {
        cluster: 'ap2',
        encrypted: true,
        authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
        auth: {
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      });

      const channel = pusher.subscribe(`private-user.${profile.user_id}`);
      channel.bind('NewNotification', (data) => {
        setNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
        setCount(prevCount => prevCount + 1);
        if (data) {
          NotifyUser(data);
        }
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [profile]);

  const NotifyUser = async (data) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const notification = new Notification(data.notification.data.sender_name, {
          body: data.notification.data.message
        });
      } else if (Notification.permission !== 'denied') {
        await Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            const notification = new Notification(data.notification.data.sender_name, {
              body: data.notification.data.message
            });
          }
        });
      } else {
        alert('Browser does not support desktop notification');
      }
    }
  }

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
            {profile && profile.user_id !== 1 &&
              <li>
                <a href="/jobs/post">{t('components.nav_bar.post_job')}</a>
              </li>}
          </div>
          <div className={styles.nav_links_right}>
            <label
              htmlFor="close_btn"
              className={`${styles.btn} ${styles.close_btn}`}
            >
              <BsX size={31} />
            </label>
            {loggedIn ? (
              <>
                {profile && profile.user_id !== 1 && <>
                  <li>
                    <a href="/manage" title={t('components.nav_bar.li_manage')}>
                      <BsKanbanFill /> <span className={styles.mobile_item2}>{t('components.nav_bar.li_manage')}</span>
                    </a>
                  </li>
                  <li>
                    <span title={t('components.nav_bar.li_chats')} className={styles.span_list}
                      onClick={() => setShowChatsScreen(!showChatsScreen)}>
                      <BsEnvelopeAtFill /> <span className={styles.mobile_item2}>{t('components.nav_bar.li_chats')}</span>
                    </span>
                    {showChatsScreen && <ChatNav setShowChatsScreen={setShowChatsScreen} />}
                  </li>
                  <li>
                    <span title={t('components.nav_bar.li_notifications')} className={styles.span_list}
                      onClick={() => {
                        setShowNotificationsScreen(!showNotificationsScreen)
                      }}>
                      <BsBellFill />{count !== 0 && <small>{count}</small>}{' '}
                      <span className={styles.mobile_item2}>{t('components.nav_bar.li_notifications')}</span>
                    </span>
                    {showNotificationsScreen && <NotificationsNav notifications={notifications}
                      setShowScreen={setShowNotificationsScreen} setCount={setCount} />}
                  </li>
                </>}
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
                          profile ? profile.type === "individual" ?
                            `/profile/${profile.user_id}/${profile.full_name}` :
                            profile.type === "company" ?
                              `/profile/${profile.user_id}/${profile.name}` :
                              '/admin' : '#'}>{t('components.nav_bar.li_profile')}</a>
                      </li>
                      <li>
                        <a href="/logout">{t('components.nav_bar.li_logout')}</a>
                      </li>
                    </ul>
                  </li>
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
          <BsList size={29} />
        </label>
      </div>
    </nav>
  );
};


const NavUser = ({ ProfileData }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const [avatarPhotoPath, setAvatarPhotoPath] = useState(ProfileData.avatar_photo);

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
        />
      ) : (
        <img
          src={defaultUser}
          className={styles.profile_image}
        />
      )}
      <div className={styles.profile_details}>
        <div>
          {ProfileData.type === "individual" ? (
            ProfileData.full_name
          ) : ProfileData.type === "company" ? (
            ProfileData.name
          ) : (
            <>Admin</>
          )}
        </div>
        <div>${ProfileData.wallet.available_balance}</div>
      </div>
    </div>
  );
};

export default NavBar;
