import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/JoberaLogo.png'
import styles from './VerifyCard.module.css'
const VerifyCard = () => {
    const navigate = useNavigate();




    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <header className={styles.Header1}>
                    Setup Profile
                </header>
                <br/>
                <h2 className={styles.words}>
                    Click the button then enter the required information to complete your registeration
                </h2>
                <button onClick={() => navigate('/login')} className={styles.complete_register} name="complete_register">complete register</button>
            </div>
        </div>
    );
};

export default VerifyCard;

