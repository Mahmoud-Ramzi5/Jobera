import React, { useState,useEffect } from 'react';
import Tops from '../../components/JobFeed/Tops';
import styles from '../../styles/JobFeed.module.css';
import Stats from '../../components/JobFeed/stats';
import { LoginContext } from '../../utils/Contexts';
import { useContext } from 'react';
import { MostNeededSkillsAPI,MostPayedFreelancingJobsAPI,MostPostingCompaniesAPI,MostPayedRegJobsAPI } from '../../apis/JobFeedApis';

const JobFeed = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const [MostNeededSkills,setMostNeededSkills]=useState([]);
  const [MostPayedFreelancingJobs,setMostPayedFreelancingJobs]=useState([]);
  const [MostPayedRegJobs,setMostPayedRegJobs]=useState([]);
  const [MostPostingCompanies,setMostPostingCompanies]=useState([]);

  useEffect(() => {
    MostNeededSkillsAPI(accessToken).then((response)=>{
      if (response.status === 200){
        setMostNeededSkills(response.data.data);
      }else{
        console.log(response);
      }
    })
    MostPayedFreelancingJobsAPI(accessToken).then((response)=>{
      if (response.status === 200){
        setMostPayedFreelancingJobs(response.data);
      }else{
        console.log(response);
      }
    })
    MostPayedRegJobsAPI(accessToken).then((response)=>{
      if (response.status === 200){
        setMostPayedRegJobs(response.data);
      }else{
        console.log(response);
      }
    })
    MostPostingCompaniesAPI(accessToken).then((response)=>{
      if (response.status === 200){
        setMostPostingCompanies(response.data.data);
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
