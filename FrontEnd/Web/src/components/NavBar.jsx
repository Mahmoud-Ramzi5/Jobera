import { useContext } from 'react';
import ReactSwitch from 'react-switch';
import { ThemeContext } from '../App.jsx'
import styles from './navbar.module.css'

const NavBar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav>
            <div className={styles.wrapper}>
                <div className={styles.logo}><a href="/">Jobera</a></div>
                <input type="radio" name="slider" id="menu_btn" className={styles.menu_btn} />
                <input type="radio" name="slider" id="close_btn" className={styles.close_btn} />
                
                <ul className={styles.nav_links}>
                    <label htmlFor="close_btn" className={`${styles.btn} ${styles.close_btn}`}><i className="fas fa-times"></i></label>
                    <li><a href="#">Home</a></li>

                    <li><a href="#">About</a></li>
                    <li>
                        <a href="#" className={styles.desktop_item}>Dropdown Menu</a>
                        <input type="checkbox" id="showDrop" className={styles.showDrop} />
                        <label htmlFor="showDrop" className={styles.mobile_item}>Dropdown Menu</label>
                        <ul className={styles.drop_menu}>
                            <li><a href="#">Drop menu 1</a></li>
                            <li><a href="#">Drop menu 2</a></li>
                            <li><a href="#">Drop menu 3</a></li>
                            <li><a href="#">Drop menu 4</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className={styles.desktop_item}>Mega Menu</a>
                        <input type="checkbox" id="showMega" className={styles.showMega} />
                        <label htmlFor="showMega" className={styles.mobile_item}>Mega Menu</label>
                        <div className={styles.mega_box}>
                            <div className={styles.content}>
                                <div className={styles.row}>
                                    <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt="" />
                                </div>
                                <div className={styles.row}>
                                    <header>Design Services</header>
                                    <ul className={styles.mega_links}>
                                        <li><a href="#">Graphics</a></li>
                                        <li><a href="#">Vectors</a></li>
                                        <li><a href="#">Business cards</a></li>
                                        <li><a href="#">Custom logo</a></li>
                                    </ul>
                                </div>
                                <div className={styles.row}>
                                    <header>Email Services</header>
                                    <ul className={styles.mega_links}>
                                        <li><a href="#">Personal Email</a></li>
                                        <li><a href="#">Business Email</a></li>
                                        <li><a href="#">Mobile Email</a></li>
                                        <li><a href="#">Web Marketing</a></li>
                                    </ul>
                                </div>
                                <div className={styles.row}>
                                    <header>Security services</header>
                                    <ul className={styles.mega_links}>
                                        <li><a href="#">Site Seal</a></li>
                                        <li><a href="#">VPS Hosting</a></li>
                                        <li><a href="#">Privacy Seal</a></li>
                                        <li><a href="#">Website design</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li><a href="#">Feedback</a></li>
                    <li className={styles.theme_switch}>
                    <ReactSwitch
                        checked={theme === 'theme-dark'}
                        checkedIcon={<>🌙</>}
                        uncheckedIcon={<>🔆</>}
                        onChange={toggleTheme}
                        onColor="#4F6E95"
                    />
                </li>
                </ul>
                <label htmlFor="menu_btn" className={`${styles.btn} ${styles.menu_btn}`}><i className="fas fa-bars"></i></label>
            </div>
        </nav>
    );
};

export default NavBar;