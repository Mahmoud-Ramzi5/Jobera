import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from '../App.jsx';
import { FetchUserProfile } from '../apis/ProfileApis.jsx';
import UserInfo from '../components/Profile/UserInfo';
import Wallet from '../components/Profile/Wallet.jsx';
import SetUpCard from '../components/Profile/SetUpCard.jsx';
import CertificationsCard from '../components/Profile/CertificationsCard.jsx';
import SkillsCard from '../components/Profile/SkillsCard.jsx';
import styles from '../styles/profile.module.css';


const Profile = () => {
  // Context    
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      FetchUserProfile(accessToken).then((response) => {
        if (response.status === 200) {
          setProfile(response.data.user);
        }
        else {
          console.log(response.statusText);
        }
      });
    }
  }, [loggedIn])

  return (
    <div className={styles.Profile}>
      <div className={styles.leftSideContainer}>
        <div className={styles.leftSide}><UserInfo profileData={profile} /></div>
        <div className={styles.leftSide}><Wallet profileData={profile} /></div>
      </div>
      <div className={styles.rightSideContainer}>
        {!isRegistered ? (<>
          <div className={styles.rightSide}><SetUpCard /></div>
        </>) : (<></>)}
        <div className={styles.rightSide}><CertificationsCard /></div>
        <div className={styles.rightSide}><SkillsCard /></div>
      </div>
    </div>
  );
}

export default Profile;