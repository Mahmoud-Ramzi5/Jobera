import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
  // Params
  const { user_name } = useParams();
  // Define states
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageProfile, setPageProfile] = useState([]);

  useEffect(() => {
    if (loggedIn && accessToken) {
      setIsLoading(true);

      FetchUserProfile(accessToken, user_name).then((response) => {
        if (response.status === 200) {
          setPageProfile(response.data.user);
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <div id='loader'><div className="clock-loader"></div></div>
  }
  if (pageProfile.type === 'individual') {
    return (
      <div className={styles.Profile}>
        <div className={styles.leftSideContainer}>
          <div className={styles.leftSide}><UserInfo ProfileData={pageProfile} /></div>
          <div className={styles.leftSide}><Wallet ProfileData={pageProfile} /></div>
          <div className={styles.leftSide}><PortfolioCard ProfileData={pageProfile} /></div>
        </div>
        <div className={styles.rightSideContainer}>
          {profile.is_registered ? (<></>) : (
            <div className={styles.rightSide}><SetUpCard ProfileData={pageProfile} /></div>
          )}
          <div className={styles.rightSide}><EducationCard ProfileData={pageProfile} /></div>
          <div className={styles.rightSide}><CertificationsCard ProfileData={pageProfile} /></div>
          <div className={styles.rightSide}><SkillsCard ProfileData={pageProfile} /></div>
        </div>
      </div>
    );
  }
  else if (pageProfile.type === 'company') {
    return (
      <div className={styles.Profile}>
        <div className={styles.CompanyContainer}>
          <div className={styles.leftSide}><UserInfo ProfileData={pageProfile} /></div>
          <div className={styles.leftSide}><PortfolioCard ProfileData={pageProfile} /></div>
        </div>
      </div>
    );
  }
  else {
    return <></>
  }
}

export default Profile;