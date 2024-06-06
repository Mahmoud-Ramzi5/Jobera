import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginContext } from '../../utils/Contexts';
import img_holder from '../../assets/upload.png';
import styles from './css/showjob.module.css';


const ShowJob = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState({
    title: "",
    description: "",
    photo: null,
    salary: 0,
    type: "",
    skills: [{ id: 1, name: 'ssssssss' }]
  });

  // useEffect(() => {
  //     if (accessToken) {
  //         setIsLoading(true);
  //         FetchJob(accessToken,id).then((response) => {
  //             if (response.status === 200) {
  //                 // get the info for the job
  //                 setJob(response.data);
  //             }
  //             else {
  //                 console.log(response.statusText);
  //             }
  //         }).then(() => {
  //             setIsLoading(false);
  //         });
  //     }
  // });

  // if (isLoading) {
  //     return <div id='loader'><div className="clock-loader"></div></div>
  // }

  return (
    <div className={styles.jobsPage}>
      <div className={styles.pagecontent}>
        <div className={styles.leftSideContainer}>
          <div className={styles.title}>my great project{job.title}</div>
          <div className={styles.description}>Description: {job.description}</div>
          <div className={styles.left}>salary: ${job.salary}</div>
          <div className={styles.left}>type: {job.type}</div>
          <h4 className={styles.heading}>Skills wanted:</h4>
          <div className={styles.data}>
            {job.skills.map((skill) => (
              <div key={skill.id} className={styles.used_skills}>
                <div className={styles.used_skill}>{skill.name}</div>
              </div>
            ))}
          </div>
          <div className={styles.comments}>
            <h5>Comments</h5>
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          <div className={styles.name}>published by: { }</div>
          <div className={styles.imageholder}>
            <div className={styles.image}>
              {job.photo ? (
                <img src={URL.createObjectURL(job.photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
              ) : (
                <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ShowJob;