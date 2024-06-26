import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PencilSquare, CurrencyDollar } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { FetchJob, ApplyToRegJobAPI, ApplyToFreelancingJobAPI } from '../../apis/JobsApis';
import NormalInput from '../NormalInput';
import JobCompetetorCard from './JobCompetetorCard';
import img_holder from '../../assets/upload.png';
import styles from './css/showjob.module.css';
import Inputstyles from '../../styles/Input.module.css'


const ShowJob = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState({});
  const [participate, setParticipate] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [comment, setComment] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);
      FetchJob(accessToken, id).then((response) => {
        console.log(response);
        if (response.status === 200) {
          // get the info for the job
          setJob(response.data.job);
        }
        else if (response.status == 404) {
          //to do add a picture of not found
          setNotFound(true);
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

  const handleNewCompetitor = (event) => {
    event.preventDefault();
    console.log('we are number one');
    setParticipate(true);
  }

  const handleNewJobCompetitor = (event) => {
    event.preventDefault();
    console.log(comment);
    ApplyToRegJobAPI(accessToken, job.id, comment).then((response) => {
      if (response.status == 200) {
        console.log('added a competitor succsefully')
      }
      else {
        console.log(response.statusText);
      }
    })
  }

  const handleNewFreelancer = (event) => {
    event.preventDefault();
    console.log(comment, desiredSalary);
    ApplyToFreelancingJobAPI(accessToken, job.id, comment, desiredSalary).then((response) => {
      if (response.status == 200) {
        console.log('added a competitor succsefully')
      }
      else {
        console.log(response.statusText);
      }
    });
  }

  const handleCancelFreelancer = (event) => {
    event.preventDefault();
    setParticipate(false);
    setComment('');
    setDesiredSalary('')
  }

  const handleCancelJobCompetitor = (event) => {
    event.preventDefault();
    setParticipate(false);
    setComment('');
  }

  return (
    <div className={styles.jobsPage}>
      {notFound ? <></> :
        <>
          <div className={styles.pagecontent}>
            <div className={styles.left_side_container}>
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
              <div className={styles.name}>Job owner: {job.job_user ?
                (job.job_user.full_name ?
                  job.job_user.full_name
                  : job.job_user.name)
                : (job.company.name)}
              </div>
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
            <div className={styles.name_and_button}>
              <h5>Competitors</h5>
              {
                job.job_user ? (job.job_user.user_id !== profile.user_id ?
                  <button className={styles.competetor_button} onClick={handleNewCompetitor}>+ Be a competitor</button>
                  : <></>)
                  : (job.company && job.company.id !== profile.user_id
                    && profile.type !== 'company' ?
                    <button className={styles.competetor_button} onClick={handleNewCompetitor}>+ Be a competitor</button>
                    : <></>)
              }
            </div>
            {participate && job.type === 'Freelancing' ? (<>
              <div className={Inputstyles.field}>
                <i className={Inputstyles.icon}><PencilSquare /></i>
                <textarea
                  placeholder='add your comment'
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className={Inputstyles.input}
                  rows='5'
                />
              </div>
              <div className={styles.money_holder}>
                <NormalInput
                  type='number'
                  placeholder='DesiredSalary'
                  icon={<CurrencyDollar />}
                  value={desiredSalary}
                  setChange={setDesiredSalary}
                />
                <div className={styles.buttons_holder}>
                  <button className={styles.send_button} onClick={handleNewFreelancer}>send</button>
                  <button className={styles.send_button} onClick={handleCancelFreelancer}>cancel</button>
                </div>

              </div>
            </>
            ) : (<></>)}
            {participate && job.type != 'Freelancing' ? (<>
              <div className={Inputstyles.field}>
                <i className={Inputstyles.icon}><PencilSquare /></i>
                <textarea
                  placeholder='add your comment'
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className={Inputstyles.input}
                  rows='5'
                />
              </div>
              <div className={styles.buttons_holder}>
                <button className={styles.send_button} onClick={handleNewJobCompetitor}>send</button>
                <button className={styles.send_button} onClick={handleCancelJobCompetitor}>cancel</button>
              </div>
            </>
            ) : (<></>)}
            {job.competetors && job.competetors.map((competetor) => (
              <JobCompetetorCard key={competetor.id} CompetetorData={competetor} />
            ))}
          </div>
        </>
      }
    </div>
  );

}

export default ShowJob;