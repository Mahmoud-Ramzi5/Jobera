import { useState, useContext } from 'react';
import img_holder from '../../assets/upload.png';
import styles from '../../styles/jobs.module.css';


const JobCard = ({ JobData }) => {
  const [job, setJob] = useState(JobData);

  return (
    <div className={styles.card}>
      {job === null ? <></> :
        <div className={styles.row}>
          <div className={styles.img_holder}>
            {job.photo ? (
              <img src={URL.createObjectURL(job.photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
            ) : (
              <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
            )}
          </div>
          <div className={styles.info}>
            <h3 className={styles.title}>{job.title}</h3>
            <p>Type: {job.type}</p>
          </div>
          <div className={styles.second_column}>
            {job.salary ? (
              <h5 className={styles.salary}>Salary: ${job.salary}</h5>
            ) : (
              <h5 className={styles.salary}>Min salary: ${job.min_salary}&nbsp;&nbsp; Max salary: ${job.max_salary}</h5>
            )}
            <p> Published by: {' '}
              {job.job_user && job.job_user.type === 'individual' ?
                job.job_user.full_name : job.company.name
              }
            </p>
          </div>
        </div>
      }
    </div>
  );
}

export default JobCard;