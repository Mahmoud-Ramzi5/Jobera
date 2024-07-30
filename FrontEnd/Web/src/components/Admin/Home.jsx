import React, { useContext, useEffect, useState } from 'react';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
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
    const{accessToken}=useContext(LoginContext);
    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];
    const[done_jobs,setDone_jobs]=useState(0);
  const[runnning_freelancingJob,setRunnning_freelancingJob]=useState(0);
  const[runnning_fullTimeJob,setRunnning_fullTimeJob]=useState(0);
  const[runnning_partTimeJob,setRunnning_partTimeJob]=useState(0);
  const[exhibiting_companies,setExhibiting_companies]=useState(0);
  const[registered_individual,setRegistered_individual]=useState(0);
  const[done_freelancingJobs,setDone_freelancingJobs]=useState(0);
  const[done_fullTimeJobs,setDone_fullTimeJobs]=useState(0);
  const[done_partTimeJobs,setDone_partTimeJobs]=useState(0);
  
  useEffect(() => {
    StatsAPI("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmZiNTk5NWQzYmQ0OTFmMjE2YzdiYTA5ZWY3YTEyMGU4OTQ0YmE1Mzk2NzUwZjZlOTBlZTQ0NTBkMWNjZmI1NTcwMjIzN2M2MTIzNDVkNDUiLCJpYXQiOjE3MjIzNTU1NTUuMTExMTIyLCJuYmYiOjE3MjIzNTU1NTUuMTExMTI2LCJleHAiOjE3NTM4OTE1NTQuOTg4MjMyLCJzdWIiOiIyMiIsInNjb3BlcyI6W119.GfxuSGHAZXgXBPjLQpa6mmQwSZ6iODKAXkd3zyNWm6cRT0w7NR_z7ZNLsfyB5QH77QTamPYQ5pshY5h7B9pV7yZzdTF-p5Q8dB9AYjE2MYWZXI9uNF-qDAl-adlIESm3ceoWPK9KbydAmv-4r6X1rXihTnpv6pxXSLGDE4HNrXcrF5cdbudo54O_GhfBvyZAgSrFsuaXSphgcR30EDhiQ65YosAbu5wvwX-EyIYVD_k2nrX1-Kb-biDjSzv0tgGDfZ5gOR4RTGXr8B57Wk83X9EYGhkVzKI8PvxS4VVbGmUVU2iCTIY7P5Z24nyM3tf-cD_D3n95DDHIhlvvvmdNyYbeOO0od_s8rg1CN9nNTx9i3z5aHKW6PDNh712N8a-QNoM0cuCRc5jjCpXc-FXqQuOvwNtxQWzHOzqm3j4k__DqMqRHjMxE3GQg6Lf1tmNy8o4E-tjTE1wKLtQFXNDEoHg1tz6g0fAHhsimN9ReBHkxEjRF37KjCjp854TDlaILXuP9fl0g6xJWr56ohQ6USLLg0Mx2_T3tbXbhtDHm_V2XjyzSpxMdMgTelziPU6jimynBzc0ZWC91RRt9Q2KGt2KBaPK2iFwWp2-ncxIefUJLxVXFAbXp8ms0kewpPXM-UVD0s19aOWkISn4etDuJ2j0PT4XTZAwDKnXooWxpNhQ").then((response)=>{
      setDone_jobs(response.data.total_done_jobs);
      setExhibiting_companies(response.data.total_exhibiting_companies);
      setRegistered_individual(response.data.total_registered_individual);
      setRunnning_freelancingJob(response.data.total_running_freelancingJob_posts);
      setRunnning_fullTimeJob(response.data.total_running_fullTimeJob_posts);
      setRunnning_partTimeJob(response.data.total_running_partTimeJob_posts);
      setDone_freelancingJobs(response.data.done_freelancingJobs);
      setDone_fullTimeJobs(response.data.done_fullTimeJobs);
      setDone_partTimeJobs(response.data.done_partTimeJobs);
    })
  })

    return (
        <main className={styles.main_container}>
            <div className={styles.main_title}>
                <h3>DASHBOARD</h3>
            </div>

            <div className={styles.main_cards}>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Individuals</h3>
                        <BsFillArchiveFill className={styles.card_icon} />
                    </div>
                    <h1>{registered_individual}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Running Freelancing Jobs</h3>
                        <BsPeopleFill className={styles.card_icon} />
                    </div>
                    <h1>{runnning_freelancingJob}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Running PartTime Jobs</h3>
                        <BsFillBellFill className={styles.card_icon} />
                    </div>
                    <h1>{runnning_partTimeJob}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Running FullTime Jobs</h3>
                        <BsFillBellFill className={styles.card_icon} />
                    </div>
                    <h1>{runnning_fullTimeJob}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Companies</h3>
                        <BsFillGrid3X3GapFill className={styles.card_icon} />
                    </div>
                    <h1>{exhibiting_companies}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Done Freelancing Jobs</h3>
                        <BsFillBellFill className={styles.card_icon} />
                    </div>
                    <h1>{done_freelancingJobs}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Done PartTime Jobs</h3>
                        <BsFillBellFill className={styles.card_icon} />
                    </div>
                    <h1>{done_partTimeJobs}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_inner}>
                        <h3>Done FullTime Jobs</h3>
                        <BsFillBellFill className={styles.card_icon} />
                    </div>
                    <h1>{done_fullTimeJobs}</h1>
                </div>
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