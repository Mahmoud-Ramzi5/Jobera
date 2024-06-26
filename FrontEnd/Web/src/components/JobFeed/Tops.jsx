import React from 'react';
import styles from './Tops.module.css';

const Tops = () => {
  const jobs = [
    { title: 'Job 1', salary: '$50,000' },
    { title: 'Job 2', salary: '$60,000' },
    { title: 'Job 3', salary: '$70,000' },
    { title: 'Job 4', salary: '$80,000' },
    { title: 'Job 5', salary: '$90,000' },
  ];

  return (
    <div className={styles.tops_container}>
      <h1>Top Jobs</h1>
      <ul className={styles.jobs_list}>
        {jobs.map((job, index) => (
          <li key={index} className={styles.job_item}>
            <h3>{job.title}</h3>
            <p>Salary: {job.salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tops;