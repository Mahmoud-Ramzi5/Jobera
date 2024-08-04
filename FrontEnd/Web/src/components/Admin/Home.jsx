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
        StatsAPI("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjZmMmIyYmY1ZGY4OGRlYmU1ZTk2NzY1MWU3NDUwN2EzMTZkZDZlZjQ2MmYzZWMzMzFiNTc4ZTEyNGY4OTFiOTczM2IyZjI2MDM2Y2NjYTIiLCJpYXQiOjE3MjI2MTM2NDcuMzU4ODM4LCJuYmYiOjE3MjI2MTM2NDcuMzU4ODQyLCJleHAiOjE3NTQxNDk2NDcuMzUwNTA4LCJzdWIiOiIzNyIsInNjb3BlcyI6W119.EzPhKuouGT9I2LhZV98sP2wl3WYocg4XFgKRmkLUCIU0PoykjkLrktmLe0DNWd36UiqQ4W8Ts2Cn17vOBR2driDM_XrSmzsZ84sg9zkbEfAmqMPnmHuiXEkcUsaCZm2wfVukTWrYo21JDw9Ygg3H7LFbW4d0Q26CToBFzABdVdMbJzil_TUFRl9UnEkYywqpQ5I48mFivyFsytloCv6JHTmbf2yDadS7sRI6RuBQk9ayeRrO4wmay-0HXFMpxdUZYvX2XBpwHJBnNtDYieaB-A827SkTm8K1-W7Ly4CuKvhDRUc2RBPJqPwXA3WtozBge6UQ5CaxDfIpmW46fEIuRrt5YwMvUTBH2OuP-QeW9ZyWI90u0ROTh9uyUbDvGJ8qsIX4NFmolXx9EACYpKoNYnX-veMpCyvALJlAdRgX8Zd2H17jNbrXOD9spfie3vC8L0rwBN6orbY_Y07RbeRkZVL7Ba0u4uLdou7kO1vfGwTjUhja_QKDqLs8P2zaC62LgdN3cIzGT5HJ4tx7UN39XRk1i8sUAZ_1On0U1EhM2tcnHrtgrS6jVgftVwGxiAW5zumv_7KaDpSNTB9h-VoUIp0gNV3xXbB55m77Gf1sg3dDX2YSNl8kyvam-h-kAovMUhmTRQ7EDsmOdvFHaK02XqRvjCx0zM1rfFX4glVzZLU").then((response) => {
            setStats(response.data.stats);
            removeStat(0);
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