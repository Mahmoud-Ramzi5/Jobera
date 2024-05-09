import { useContext, useEffect, useState, useRef } from 'react'
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import { FetchUserProfile } from '../apis/ProfileApis.jsx';
import UserInfo from '../components/Profile/UserInfo';
import Wallet from '../components/Profile/Wallet.jsx';
import SetUpCard from '../components/Profile/SetUpCard.jsx';
import EducationCard from '../components/Profile/EducationCard.jsx';
import CertificationsCard from '../components/Profile/CertificationsCard.jsx';
import SkillsCard from '../components/Profile/SkillsCard.jsx';
import PortfolioCardList from '../components/Profile/PortfolioCard.jsx';
import styles from '../styles/profile.module.css';


const Profile = () => {
  // Context    
  const { accessToken } = useContext(LoginContext);
  const { profile, setProfile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);

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
      }).then(() => {
        console.log('Done');
      });
    }
  }, []);

  return (
    <div className={styles.Profile}>
      <div className={styles.leftSideContainer}>
        <div className={styles.leftSide}><UserInfo ProfileData={profile} /></div>
        <div className={styles.leftSide}><Wallet ProfileData={profile} /></div>
        <div className={styles.leftSide}><PortfolioCardList ProfileData={profile} /></div>
      </div>
      <div className={styles.rightSideContainer}>
        {profile.is_registered ? (<></>) : (
          <div className={styles.rightSide}><SetUpCard ProfileData={profile} /></div>
        )}
        <div className={styles.rightSide}><EducationCard ProfileData={profile} /></div>
        <div className={styles.rightSide}><CertificationsCard ProfileData={profile} /></div>
        <div className={styles.rightSide}><SkillsCard ProfileData={profile} /></div>
      </div>
    </div>
  );
}

export default Profile;