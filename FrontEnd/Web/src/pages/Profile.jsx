import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from '../App.jsx';
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
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
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
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [loggedIn])

  if (isLoading) {
    return <div id='loader'><div className="clock-loader"></div></div>
  }
  return (
    <div className={styles.Profile}>
      <div className={styles.leftSideContainer}>
        <div className={styles.leftSide}><UserInfo ProfileData={profile} token={accessToken} /></div>
        <div className={styles.leftSide}><Wallet ProfileData={profile} token={accessToken} /></div>
        <div className={styles.leftSide}><PortfolioCardList ProfileData={profile} token={accessToken} /></div>
      </div>
      <div className={styles.rightSideContainer}>
        {profile.is_registered ? (<></>) : (
          <div className={styles.rightSide}><SetUpCard ProfileData={profile} token={accessToken} /></div>
        )}
        <div className={styles.rightSide}><EducationCard ProfileData={profile} token={accessToken} /></div>
        <div className={styles.rightSide}><CertificationsCard ProfileData={profile} token={accessToken} /></div>
        <div className={styles.rightSide}><SkillsCard ProfileData={profile} token={accessToken} /></div>
      </div>
    </div>
  );
}

export default Profile;