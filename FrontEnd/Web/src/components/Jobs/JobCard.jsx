import { useState } from 'react';
import img_holder from '../../assets/upload.png';
import styles from '../../styles/jobs.module.css';


const JobCard = ({ JobData }) => {

  return (
    <div className={styles.card}>
      {JobData && <div className={styles.row}>
        <div className={styles.img_holder}>
          {JobData.photo ? (
            <img src={URL.createObjectURL(JobData.photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
          ) : (
            <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{JobData.title}</h3>
          <p>Type: {JobData.type}</p>
        </div>
        <div className={styles.second_column}>
          {JobData.salary ? (
            <h5 className={styles.salary}>Salary: ${JobData.salary}</h5>
          ) : (
            <h5 className={styles.salary}>Min salary: ${JobData.min_salary}&nbsp;&nbsp; Max salary: ${JobData.max_salary}</h5>
          )}
          <p> Published by: {' '}
            {JobData.job_user ? JobData.job_user.name : JobData.company.name}
          </p>
        </div>
      </div>
      }
    </div>
  );
}

export default JobCard;