import React, { useContext, useEffect, useState } from 'react';
import {
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsFillBellFill,
    BsBuilding,
    BsLaptop,
    BsLaptopFill,
    BsSuitcase,
    BsBriefcase,
    BsBagFill
} from 'react-icons/bs';
import styles from '../../styles/AdminPage.module.css';
import { StatsAPI } from '../../apis/JobFeedApis';
import { LoginContext } from '../../utils/Contexts';
import Wallet from '../Profile/Wallet';

const Home = () => {
    const { accessToken } = useContext(LoginContext);
  
    const [stats, setStats] = useState([]);

    useEffect(() => {
        StatsAPI(accessToken).then((response) => {
            if (response.status === 200) {
            setStats(response.data.stats);
            removeStat(0);
            }else{
                console.log(response.status)
            }
        })
    })
    const removeStat = (indexToRemove) => {
        setStats(prevStats => prevStats.filter((_, index) => index !== indexToRemove));
    };

    return (
        <main className={styles.main_container}>
            <div className={styles.main_title}>
                <h3>DASHBOARD</h3>
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
        </main>
    );
};

export default Home;