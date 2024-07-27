import React, { useContext, useEffect, useState } from 'react';
import styles from './stats.module.css';
import { LoginContext } from '../../utils/Contexts';
import { StatsAPI } from '../../apis/JobFeedApis';

const Stats = () => {
  const{accessToken}=useContext(LoginContext);
  const[done_jobs,setDone_jobs]=useState(0);
  const[runnning_freelancingJob,setRunnning_freelancingJob]=useState(0);
  const[runnning_fullTimeJob,setRunnning_fullTimeJob]=useState(0);
  const[runnning_partTimeJob,setRunnning_partTimeJob]=useState(0);
  const[exhibiting_companies,setExhibiting_companies]=useState(0);
  const[registered_individual,setRegistered_individual]=useState(0);
  
  useEffect(() => {
    StatsAPI(accessToken).then((response)=>{
      setDone_jobs(response.data.total_done_jobs);
      setExhibiting_companies(response.data.total_exhibiting_companies);
      setRegistered_individual(response.data.total_registered_individual);
      setRunnning_freelancingJob(response.data.total_runnning_freelancingJob_posts);
      setRunnning_fullTimeJob(response.data.total_runnning_fullTimeJob_posts);
      setRunnning_partTimeJob(response.data.total_runnning_partTimeJob_posts);
    })
  })

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-1.svg" alt="" />
          <div>
            <span className={styles.number}>{done_jobs}</span>
            <span className={styles.label}>Done Jobs</span>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.selfEnd}`}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-3.svg" alt="" />
          <div>
            <span className={styles.number}>{exhibiting_companies}</span>
            <span className={styles.label}>Exhibiting Companies</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{registered_individual}</span>
            <span className={styles.label}>Registered Individuals</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{runnning_freelancingJob}</span>
            <span className={styles.label}>Runnning Freelancing Jobs</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{runnning_fullTimeJob}</span>
            <span className={styles.label}>Running FullTime Jobs</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{runnning_partTimeJob}</span>
            <span className={styles.label}>Running PartTime Jobs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;