import React from 'react';
import Tops from '../../components/JobFeed/Tops';
import styles from '../../styles/JobFeed.module.css';

const JobFeed = () => {
  return (
    <div className={styles.jobFeedContainer}>
      <div className={styles.posts}>
        <Tops />
      </div>
      <div className={styles.posts}>
        <Tops />
      </div>
    </div>
  );
};

export default JobFeed;