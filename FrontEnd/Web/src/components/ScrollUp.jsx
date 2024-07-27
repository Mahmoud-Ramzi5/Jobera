import React, {useState} from 'react'; 
import styles from './scroll_up.module.css'
import { ArrowUp } from 'react-bootstrap-icons'

const ScrollUp = () => {


    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button className={styles.button1}>
            <i className={styles.holder} style={{ display: visible ? 'inline' : 'none' }}>
            <ArrowUp onClick={scrollToTop}/>
            </i>
        </button>
    );
}
export default ScrollUp