import React, { useContext, useEffect, useState } from 'react';
import {
    BsPeopleFill,
} from 'react-icons/bs';
import styles from '../../styles/AdminPage.module.css';
import { StatsAPI } from '../../apis/JobFeedApis';
import { LoginContext,ProfileContext } from '../../utils/Contexts';
import Wallet from '../Profile/Wallet';
import { FetchProfile, FetchUserProfile } from '../../apis/ProfileApis/ProfileApis';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { accessToken } = useContext(LoginContext);
    const [stats, setStats] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        StatsAPI(accessToken).then((response) => {
            if (response.status === 200) {
            setStats(response.data.stats);
            removeStat(0);
            }else{
                console.log(response.status)
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
    }, [accessToken]); 

    const removeStat = (indexToRemove) => {
        setStats(prevStats => prevStats.filter((_, index) => index !== indexToRemove));
    };

    return (
        <main className={styles.main_container}>
            <div className={styles.main_title}>
                <h3>Home</h3>
            </div>

            <div className={styles.main_cards}>
                {stats.map((stat, index) => (
                    <div className={styles.card}>
                        <div className={styles.card_inner}>
                            <h3>{stat.name}</h3>
                            <BsPeopleFill className={styles.card_icon} />
                        </div>
                        <h1>{stat.data}</h1>
                    </div>
                ))}
            </div>
            <div className={styles.leftSide}>{profileData.user_id ? <Wallet ProfileData={profileData} /> : null}</div>
        </main>
    );
};

export default Home;