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
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import styles from '../../styles/AdminPage.module.css';
import { StatsAPI } from '../../apis/JobFeedApis';
import { LoginContext } from '../../utils/Contexts';

const Home = () => {
    const { accessToken } = useContext(LoginContext);
    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];
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

            <div className={styles.charts}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
};

export default Home;