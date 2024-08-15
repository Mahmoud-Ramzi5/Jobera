import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {
    BsPeopleFill, BsBuildingsFill, BsBriefcaseFill,
    BsLaptopFill, BsClockHistory
} from 'react-icons/bs';
import { LoginContext } from '../../utils/Contexts';
import { FetchProfile } from '../../apis/ProfileApis/ProfileApis';
import { StatsAPI } from '../../apis/JobFeedApis';
import Wallet from '../Profile/Wallet';
import styles from '../../styles/AdminPage.module.css';


const Home = () => {
    // Translations
    const { t, i18n } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const initialized = useRef(false);
    const [statsData, setStatsData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const navigate = useNavigate();

    const icons = {
        1: <></>,
        2: <BsPeopleFill />,
        3: <BsBriefcaseFill />,
        4: <BsClockHistory />,
        5: <BsLaptopFill />,
        6: <BsBuildingsFill />,
        7: <BsBriefcaseFill />,
        8: <BsClockHistory />,
        9: <BsLaptopFill />,
    };

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            StatsAPI(accessToken).then((response) => {
                if (response.status === 200) {
                    setStatsData(response.data.stats);
                    removeStat(0);
                } else {
                    console.log(response.statusText)
                }
            })

            FetchProfile(accessToken).then((response) => {
                if (response.status === 200) {
                    setProfileData(response.data.user);
                } else {
                    console.log(response.statusText);
                    navigate('/notfound');
                }
            });
        }
    }, []);

    const removeStat = (indexToRemove) => {
        setStatsData(prevStats =>
            prevStats.filter((_, index) => index !== indexToRemove));
    };


    return (
        <main className={styles.main_container}>
            <div className={styles.main_title}>
                <h3>{t('components.admin.home')}</h3>
            </div>

            <div className={styles.main_cards}>
                {statsData.map((stat, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.card_inner}>
                            <h3>{stat.name[i18n.language]}</h3>
                            <i className={styles.card_icon}>
                                {icons[stat.id]}
                            </i>
                        </div>
                        <h1>{stat.data}</h1>
                    </div>
                ))}
            </div>
            <div className={styles.leftSide}>
                {profileData.user_id && <Wallet ProfileData={profileData} />}
            </div>
        </main>
    );
};

export default Home;
