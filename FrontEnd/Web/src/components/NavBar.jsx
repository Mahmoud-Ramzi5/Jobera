import { useContext, useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import {
  BriefcaseFill, EnvelopeAtFill, BellFill, List, X,
} from "react-bootstrap-icons";
import {
  ThemeContext, LoginContext, ProfileContext,
} from "../utils/Contexts.jsx";
import { FetchImage } from "../apis/FileApi.jsx";
import Logo from "../assets/JoberaLogo.png";
import styles from "../styles/navbar.module.css";
import ChatNavWindow from "./Chats/Chats.jsx";

const NavBar = () => {
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
          <a href="/">Jobera</a>
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
            <li>
              <a href="/dashboard"> Home </a>
            </li>
            <li>
              <a href="/jobs" className={styles.desktop_item}>
                {" "}
                Jobs{" "}
              </a>
              <input type="checkbox" id="Jobs" className={styles.showDrop} />
              <label htmlFor="Jobs" className={styles.mobile_item}>
                {" "}
                Jobs{" "}
              </label>
              <ul className={styles.drop_menu}>
                <a className={styles.mobile_item} href="/jobs">
                  All Jobs
                </a>
                <li>
                  <a href="/fulltime-jobs">FullTime</a>
                </li>
                <li>
                  <a href="/parttime-jobs">PartTime</a>
                </li>
                <li>
                  <a href="/freelancing-jobs">FreeLance</a>
                </li>
              </ul>
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
                    <BriefcaseFill /> Manage{" "}
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setShowChatScreen(!showChatScreen)}>
                    <EnvelopeAtFill /> <span className={styles.mobile_item2}>Chats</span>
                  </a>
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
                        <a href="/profile">My Profile</a>
                      </li>
                      <li>
                        <a href="/logout">LogOut</a>
                      </li>
                    </ul>
                  </li>
                  {showChatScreen && <ChatNavWindow />}
                </span>
              </>
            ) : (
              <>
                <li>
                  <a href="/login"> Login </a>
                </li>
                <li>
                  <a href="/register"> Register </a>
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
  });

  return (
    <div className={styles.profile}>
      {avatarPhoto ? (
        <img
          src={URL.createObjectURL(avatarPhoto)}
          className={styles.profile_image}
        ></img>
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s"
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
        <div>${ProfileData.wallet.available_balance}</div>
      </div>
    </div>
  );
};

export default NavBar;
