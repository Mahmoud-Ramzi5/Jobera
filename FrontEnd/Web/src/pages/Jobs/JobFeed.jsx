import React from 'react';
import Tops from '../../components/JobFeed/Tops';
import styles from '../../styles/JobFeed.module.css';
import Stats from '../../components/JobFeed/stats';

const JobFeed = () => {
  const jobs = [
    { title: 'Job 1', salary: '$50,000' },
    { title: 'Job 2', salary: '$60,000' },
    { title: 'Job 3', salary: '$70,000' },
    { title: 'Job 4', salary: '$80,000' },
    { title: 'Job 5', salary: '$90,000' },
  ];
  const jobs2 = [
    { title: 'Job 1', salary: '$50,000' },
    { title: 'Job 2', salary: '$60,000' },
    { title: 'Job 3', salary: '$70,000' },
    { title: 'Job 4', salary: '$80,000' },
    { title: 'Job 5', salary: '$90,000' },
  ];
  return (
    <div className={styles.jobFeedContainer}>
      <div className={styles.postsContainer}>
        <div className={styles.posts}>
          <Tops jobs={jobs} />
        </div>
        <div className={styles.posts}>
          <Tops jobs={jobs2} />
        </div>
        <div className={styles.posts}>
          <Tops jobs={jobs2} />
        </div>
        <div className={styles.posts}>
          <Tops jobs={jobs} />
        </div>
      </div>
      <div className={styles.stats}>
        <Stats />
      </div>
    </div>
  );
};

export default JobFeed;
