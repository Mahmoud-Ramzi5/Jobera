import React from 'react';
import styles from './Tops.module.css';

const Tops = ({ jobs }) => {
  return (
    <div className={styles.tops_container}>
      <div className={styles.card}>
        <h1>Top Jobs</h1>
        <ul className={styles.jobs_list}>
          {jobs.map((job, index) => (
            <Job job={job} index={index} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Job = ({ job, index }) => {
  return (
    <li className={styles.job_item}>
      <h3>{job.title}</h3>
      <p>Salary: {job.salary}</p>
    </li>
  );
};

export default Tops;
