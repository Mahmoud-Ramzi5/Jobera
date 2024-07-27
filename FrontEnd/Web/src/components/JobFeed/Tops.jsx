import React from 'react';
import styles from './Tops.module.css';

const Tops = ({ jobs,title }) => {
  console.log(jobs);
  return (
    <div className={styles.tops_container}>
      <div className={styles.card}>
        <h1>{title}</h1>
        <ul className={styles.jobs_list}>
          {jobs.map((job, index) => (
            <Job job={job}  key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Job = ({ job }) => {
  return (
    <li className={styles.job_item}>
      <h3>{job.title}</h3>
      <p>{job.salary?<p>Salary: {job.salary}</p>:<p>Count:{job.count}</p>}</p>
    </li>
  );
};

export default Tops;
