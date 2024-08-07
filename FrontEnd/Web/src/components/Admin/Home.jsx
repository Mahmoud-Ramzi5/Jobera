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
        StatsAPI("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzM0N2E0ZTdhYWVkYWJkMzM2YmMyNGU4Mjg0NjNhMWRjOWMxMTU4N2E4NmE2NjRjOGRkOTYzZmJhYTFlMzg3MDQ5YTI2MGIyNGY5ZjRjOGIiLCJpYXQiOjE3MjI3ODc2MzIuNzg4MzYxLCJuYmYiOjE3MjI3ODc2MzIuNzg4MzY0LCJleHAiOjE3NTQzMjM2MzIuNjc1NTYzLCJzdWIiOiIzNyIsInNjb3BlcyI6W119.N0p05mKAhfH4sIjMpjMHxnSZPdoL2OLt4qAffUP1WGBWRgyHX39NcN3XLtlWue2vU7W53kgNXTetAsKjPduQQQCeyO4BtgpOrpMp2pfzCcIY4jdF3I6-iov6DQWwV3YDhh1NzaV7QM4wmwZFSjX2MArjMG-RSiFQpHWji7yMzc90hTcK36ebdkBoJ7Je0PJXPVmDKWTfnhEZW6_JFseCnOB4jwPpi-DD3rEVYpNBwrCSkBTRBi7fn0oLzQXJ0YO_P6HJ0ZL86Ct6FXftgJLaOcjHwVBnm9Sm_0jnNQ5alehFdwLqEKdErafFCXE-wwth2eQBwMimgjnGUb1cHBUo7wdQgboNZcCKfDCez1TeT8ph5uPGhDMWsnkOF41TAFIayWaPBKez4Z0oRdznGiuAPw0DDP9bK7HQpyj3zO1hd_noOBM-GmNniRaWQaqfKuNNJR9SNdOMbrIDzEGe7tDx9Fi6eRYWkiLzWv0EShXOMehShC9Xixocg_7XYoP630A2Uz3nsO6XUHfp6sgRNKH9DlfsJJgtQhp3sEusza6mfzoihAVzMLowJys6tBJfDtS_K-A5DQplkMmXVPZ7zB0Bx5WRpBlscJks6DdVtXYQn2oUCe534KhuRmo4Ujg45E6JFx7vcVqRNIii0aoeD0apagUJxJf317AhulYhXiTqwIQ").then((response) => {
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