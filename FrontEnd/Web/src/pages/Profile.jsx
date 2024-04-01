import React from 'react';
import UserInfo from "../components/Profile/UserInfo";
import ZCard from "../components/Profile/ZCard";
import Wallet from '../components/Profile/Wallet.jsx';
import styles from "../components/Profile/css/main.module.css";
import NavBar from '../components/NavBar.jsx';

const Profile = () => {
    return (
        <div className={styles.Profile}>
            <div className={styles.leftSidecontainer}>
                <div className={styles.leftSide1}><UserInfo /></div>
                <div className={styles.leftside2}><Wallet /></div>
            </div>
            <div className={styles.rightSideContainer}>
                <div className={styles.rightSide}><ZCard /></div>
            </div>
        </div>
    );
}
export default Profile;