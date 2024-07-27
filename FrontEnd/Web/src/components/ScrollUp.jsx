import { useState } from 'react';
import { ArrowUp } from 'react-bootstrap-icons';
import styles from './ScrollUp.module.css';


const ScrollUp = () => {
    // Define states
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        }
        else if (scrolled <= 300) {
            setVisible(false);
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

    // Event Listener
    window.addEventListener('scroll', toggleVisible);

    return (
        <i className={styles.Arrow} onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }}>
            <ArrowUp className={styles.Icon} />
        </i>
    );
};

export default ScrollUp