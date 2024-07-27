import React, { useState,useEffect } from 'react';
import Tops from '../../components/JobFeed/Tops';
import styles from '../../styles/JobFeed.module.css';
import Stats from '../../components/JobFeed/stats';
import { LoginContext } from '../../utils/Contexts';
import { useContext } from 'react';
import {  JopFeedAPI } from '../../apis/JobFeedApis';

const JobFeed = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const [MostNeededSkills,setMostNeededSkills]=useState([]);
  const [MostPayedFreelancingJobs,setMostPayedFreelancingJobs]=useState([]);
  const [MostPayedRegJobs,setMostPayedRegJobs]=useState([]);
  const [MostPostingCompanies,setMostPostingCompanies]=useState([]);

  useEffect(() => {
    JopFeedAPI(accessToken).then((response)=>{
      if (response.status === 200){
        setMostNeededSkills(response.data.MostNeededSkills);
        setMostPayedFreelancingJobs(response.data.MostPayedFreelancingJobs);
        setMostPayedRegJobs(response.data.MostPayedRegJobs);
        setMostPostingCompanies(response.data.MostPostingCompanies)
      }else{
        console.log(response);
      }
    })
    
  });

  return (
    <div className={styles.jobFeedContainer}>
      <div className={styles.postsContainer}>
        <div className={styles.posts}>
          <Tops jobs={MostNeededSkills} title="Most Needed Skills"/>
        </div>
        <div className={styles.posts}>
          <Tops jobs={MostPayedFreelancingJobs} title="Most Payed Freelancing Jobs" />
        </div>
        <div className={styles.posts}>
          <Tops jobs={MostPayedRegJobs} title="Most Payed Regular Jobs" />
        </div>
        <div className={styles.posts}>
          <Tops jobs={MostPostingCompanies} title="Most Posting Companies" />
        </div>
      </div>
      <div className={styles.stats}>
        <Stats />
      </div>
    </div>
  );
};

export default JobFeed;
