import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import { FetchUserProfile } from '../apis/ProfileApis.jsx';
import UserInfo from '../components/Profile/UserInfo';
import Wallet from '../components/Profile/Wallet.jsx';
import SetUpCard from '../components/Profile/SetUpCard.jsx';
import EducationCard from '../components/Profile/EducationCard.jsx';
import CertificationsCard from '../components/Profile/CertificationsCard.jsx';
import SkillsCard from '../components/Profile/SkillsCard.jsx';
import PortfolioCard from '../components/Profile/PortfolioCard.jsx';
import styles from '../styles/profile.module.css';


const Profile = () => {
  // Context
  const { loggedIn, accessToken } = useContext(LoginContext);
  const { profile, setProfile } = useContext(ProfileContext);
  // Define states
  const location = useLocation();

  useEffect(() => {
    if (loggedIn && accessToken) {
      FetchUserProfile(accessToken).then((response) => {
        if (response.status === 200) {
          setProfile(response.data.user);
        }
        else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

  if (profile.type === 'individual') {
    return (
      <div className={styles.Profile}>
        <div className={styles.leftSideContainer}>
          <div className={styles.leftSide}><UserInfo ProfileData={profile} /></div>
          <div className={styles.leftSide}><Wallet ProfileData={profile} /></div>
          <div className={styles.leftSide}><PortfolioCard ProfileData={profile} /></div>
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
  else if (profile.type === 'company') {
    return (
      <div className={styles.Profile}>
        <div className={styles.CompanyContainer}>
          <div className={styles.leftSide}><UserInfo ProfileData={profile} /></div>
          <div className={styles.leftSide}><PortfolioCard ProfileData={profile} /></div>
        </div>
      </div>
    );
  }
  else {
    return <></>
  }
}

export default Profile;