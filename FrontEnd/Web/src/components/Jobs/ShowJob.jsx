import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginContext } from '../../utils/Contexts';
import { FetchJob } from '../../apis/JobsApis';
import JobCompetetorCard from './JobCompetetorCard';
import img_holder from '../../assets/upload.png';
import styles from './css/showjob.module.css';


const ShowJob = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState({});

  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);
      FetchJob(accessToken, 11).then((response) => {
        console.log(response);
        if (response.status === 200) {
          // get the info for the job
          setJob(response.data.job);
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <div id='loader'><div className="clock-loader"></div></div>
  }

  return (
    <div className={styles.jobsPage}>
      <div className={styles.pagecontent}>
        <div className={styles.leftSideContainer}>
          <div className={styles.imageholder}>
            <div className={styles.image}>
              {job.individual && job.individual.avatar_photo ? (
                <img src={URL.createObjectURL(job.individual.avatar_photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
              ) : (
                job.company && job.company.avatar_photo ? (
                  <img src={URL.createObjectURL(job.company.avatar_photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                ) : (
                  <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                )
              )}
            </div>
          </div>
          <h5 className={styles.heading}>Wanted skills</h5>
          <div className={styles.data}>
            {job.skills && job.skills.map((skill) => (
              <div key={skill.id} className={styles.used_skills}>
                <div className={styles.used_skill}>{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right_side_container}>
          <div className={styles.titleholder}>
            <div className={styles.title}>{job.title}</div>
          </div>
          <div className={styles.name}>Job owner: {job.individual ? (job.individual.full_name) : (job.company.name)}</div>
          <div className={styles.type}>{job.type}  job</div>
          <div className={styles.description}>Description: {job.description}</div>
          {job.salary ? (
            <h5 className={styles.salary}>Salary: ${job.salary}</h5>
          ) : (
            <h5 className={styles.salary}>Min salary: ${job.min_salary}&nbsp;&nbsp; Max salary: ${job.max_salary}</h5>
          )}
        </div>
      </div>
      <div className={styles.competetors}>
        <h5>Competitors</h5>
        {job.competetors && job.competetors.map((competetor) => (
          <JobCompetetorCard key={competetor.id} CompetetorData={competetor} />
        ))}
      </div>
    </div>
  );

}

export default ShowJob;