import React from 'react';
import UserInfo from "../components/Profile/UserInfo";
import ZCard from "../components/Profile/ZCard";
import styles from "../components/Profile/css/main.module.css";

const Profile = () => {
    return (
        <div className={styles.Profile}>
            <div className={styles.leftSide}><UserInfo /></div>
            <div className={styles.rightSideContainer}>
                <div className={styles.rightSide}><ZCard /></div>
            </div>
        </div>
    );
}
export default Profile;