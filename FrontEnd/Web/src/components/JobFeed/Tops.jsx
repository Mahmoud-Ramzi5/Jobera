import React from 'react';
import styles from './Tops.module.css';
import { Link } from 'react-router-dom';  

const Tops = ({ jobs,title }) => {
  console.log(jobs);
  return (
    <div className={styles.tops_container}>
      <div className={styles.card}>
        <h2>{title}</h2>
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
      <Link to={job.skill_id?'/edit-skills':job.company_id?`/profile/${job.company_id}/${job.title}`:`/job/${job.id}`} >  
        <h3>{job.title}</h3>
        <p>{job.salary ? `Salary: ${job.salary}` : `Count: ${job.count}`}</p>
      </Link>
    </li>
  );
};

export default Tops;
