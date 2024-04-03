import React from 'react';
import UserInfo from '../components/Profile/UserInfo';
import ZCard from "../components/Profile/ZCard";
import Wallet from '../components/Profile/Wallet.jsx';
import styles from '../styles/profile.module.css';
import Set_upCard from '../components/Profile/Set_upCard.jsx';

const Profile = () => {
    let is_registered = false;
    {/*here should be some kind of a fetch to check if the user is fully registered */}
    return (
        <div className={styles.Profile}>
            <div className={styles.leftSideContainer}>
                <div className={styles.leftSide1}><UserInfo /></div>
                <div><Wallet /></div>
            </div>
            <div className={styles.rightSideContainer}>
                {!is_registered?(
                <>
                    <div className={styles.rightSidefirst}><Set_upCard /></div>
                </>):(
                <></>
                    )}
                <div className={styles.rightSide}><ZCard /></div>
            </div>
        </div>
    );
}
export default Profile;