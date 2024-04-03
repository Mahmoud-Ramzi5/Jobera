import React from 'react';
import UserInfo from '../components/Profile/UserInfo';
import ZCard from "../components/Profile/ZCard";
import Wallet from '../components/Profile/Wallet.jsx';
import styles from '../styles/profile.module.css';

const Profile = () => {
    return (
        <div className={styles.Profile}>
            <div className={styles.leftSideContainer}>
                <div className={styles.leftSide1}><UserInfo /></div>
                <div><Wallet /></div>
            </div>
            <div className={styles.rightSideContainer}>
                <div className={styles.rightSide}><ZCard /></div>
            </div>
        </div>
    );
}
export default Profile;