import { useContext } from 'react';
import ReactSwitch from 'react-switch';
import { BriefcaseFill, EnvelopeAtFill, BellFill } from 'react-bootstrap-icons';
import { ThemeContext } from '../App.jsx';
import { LoginContext } from '../App.jsx';
import Logo from '../assets/JoberaLogo.png';
import styles from '../styles/navbar.module.css';

const NavBar = () => {
    // Context    
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);

    return (
        <nav>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={Logo} alt="logo" />
                    <a href="/">Jobera</a>
                </div>
                <input type="radio" name="slider" id="menu_btn" className={styles.menu_btn} />
                <input type="radio" name="slider" id="close_btn" className={styles.close_btn} />

                <ul className={styles.nav_links}>
                    <div className={styles.nav_links_left}>
                        <li><a href='#'> Home </a></li>
                        <li>
                            <a href="#" className={styles.desktop_item}> Jobs </a>
                            <input type="checkbox" id="showDrop" className={styles.showDrop} />
                            <label htmlFor="showDrop" className={styles.mobile_item}> Jobs </label>
                            <ul className={styles.drop_menu}>
                                <li><a href="#">FullTime</a></li>
                                <li><a href="#">PartTime</a></li>
                                <li><a href="#">FreeLance</a></li>
                            </ul>
                        </li>
                    </div>

                    <div className={styles.nav_links_right}>
                        <label htmlFor="close_btn" className={`${styles.btn} ${styles.close_btn}`}><i className="fas fa-times"></i></label>
                        {(loggedIn) ? <><li><a href='/manage'><BriefcaseFill /> Manage</a></li>
                            <li><a href='/register'><EnvelopeAtFill /></a></li>
                            <li><a href='/register'><BellFill /></a></li>
                            <li>
                                <div href="#" className={`${styles.desktop_item} ${styles.profile}`}>
                                    <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg"
                                    className={styles.profile_image}></img>
                                    <div className={styles.profile_details}>
                                        <div>Profile</div>
                                        <div>GG</div>
                                    </div>
                                </div>
                                <input type="checkbox" id="showDrop" className={styles.showDrop} />
                                <label htmlFor="showDrop" className={styles.mobile_item}> Profile </label>
                                <ul className={styles.drop_menu}>
                                    <li><a href="#">GG</a></li>
                                    <li><a href="#">GG</a></li>
                                    <li><a href="#">GG</a></li>
                                </ul>
                            </li></>
                            : <><li><a href='/login'> Login </a></li>
                                <li><a href='/register'> Register </a></li></>}
                        <li className={styles.theme_switch}>
                            <ReactSwitch
                                checked={theme === 'theme-dark'}
                                checkedIcon={<>🌙</>}
                                uncheckedIcon={<>🔆</>}
                                onChange={toggleTheme}
                                onColor="#4F6E95"
                            />
                        </li>
                    </div>
                </ul>
                <label htmlFor="menu_btn" className={`${styles.btn} ${styles.menu_btn}`}><i className="fas fa-bars"></i></label>
            </div>
        </nav>
    );
};

export default NavBar;