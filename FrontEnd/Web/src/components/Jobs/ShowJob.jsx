import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PencilSquare, CurrencyDollar, ChatDots, Check2 } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import {
  FetchJob, ApplyToRegJobAPI, ApplyToFreelancingJobAPI,
  AcceptRegJob, AcceptFreelancingJob
} from '../../apis/JobsApis';
import { FetchImage } from '../../apis/FileApi';
import { CreateChat } from '../../apis/ChatApis';
import JobCompetetorCard from './JobCompetetorCard';
import NormalInput from '../NormalInput';
import Clock from '../../utils/Clock';
import img_holder from '../../assets/upload.png';
import styles from './css/showjob.module.css';
import Inputstyles from '../../styles/Input.module.css'


const ShowJob = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { id } = useParams();
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [job, setJob] = useState({});

  const [accepted, setAccepted] = useState(false);
  const [participate, setParticipate] = useState(false);
  const [isCompetitor, setIsCompetitor] = useState(false);
  const [jobEnded, setJobEnded] = useState(false);

  const [comment, setComment] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchJob(accessToken, id).then((response) => {
        if (response.status === 200) {
          setJob(response.data.job);

          // Adding the photo if exists
          if (response.data.job.photo) {
            FetchImage("", response.data.job.photo).then((response) => {
              setPhoto(response);
            });
          }
        }
        else if (response.status == 404) {
          // TODO add a picture of not found
          setNotFound(true);
        }
        else {
          console.log(response.statusText);
        }

        if (response.data.job.accepted_individual || response.data.job.accepted_user) {
          setAccepted(true);
        }

        // Checking if user is already a competitor
        response.data.job.competitors.map((competitor) => {
          if (competitor.user) {
            if (competitor.user.user_id === profile.user_id) {
              setIsCompetitor(true);
            }
          } else if (competitor.individual) {
            if (competitor.individual.user_id === profile.user_id) {
              setIsCompetitor(true);
            }
          } else {
            setIsCompetitor(false);
          }
        });
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);


  const handleNewCompetitor = (event) => {
    event.preventDefault();
    setParticipate(true);
  }

  const handleNewJobCompetitor = (event) => {
    event.preventDefault();
    ApplyToRegJobAPI(accessToken, job.id, comment).then((response) => {
      if (response.status == 200) {
        console.log('Added a competitor successfully')
        setParticipate(false);
        window.location.reload(); // Refresh the page after deletion
      }
      else {
        console.log(response.statusText);
      }
    })
  }

  const handleCancelJobCompetitor = (event) => {
    event.preventDefault();
    setParticipate(false);
    setComment('');
  }

  const handleAcceptRegCompetitor = (event, id) => {
    AcceptRegJob(accessToken, job.id, id).then((response) => {
      if (response.status == 200) {
        console.log('Competitor Accepted')
        setAccepted(true);
        window.location.reload(); // Refresh the page after deletion
      }
      else {
        console.log(response);
      }
    });
  }

  const handleNewFreelancer = (event) => {
    event.preventDefault();
    ApplyToFreelancingJobAPI(accessToken, job.id, comment, desiredSalary).then((response) => {
      if (response.status == 200) {
        console.log('Added a competitor successfully')
        setParticipate(false);
        window.location.reload(); // Refresh the page after deletion
      }
      else {
        console.log(response.statusText);
      }
    });
  }

  const handleCancelFreelancer = (event) => {
    event.preventDefault();
    setParticipate(false);
    setDesiredSalary('');
    setComment('');
  }

  const handleAcceptFreelancingCompetitor = (event, id) => {
    AcceptFreelancingJob(accessToken, job.id, id).then((response) => {
      if (response.status == 200) {
        console.log('Competitor Accepted')
        setAccepted(true);
        window.location.reload(); // Refresh the page after deletion
      }
      else {
        console.log(response.statusText);
      }
    });
  }


  const handleChatWithIndividual = (event, competitor) => {
    CreateChat(accessToken, competitor.individual.user_id).then((response) => {
      if (response.status == 201) {
        console.log('Chat created')
      } else {
        console.log(response);
      }
    });
    navigate('/ChatsPage');
  }


  if (isLoading) {
    return <Clock />
  }
  return (
    <div className={styles.jobsPage}>
      {notFound ? <></> :
        <>
          <div className={styles.pagecontent}>
            <div className={styles.left_side_container}>
              <div className={styles.imageholder}>
                <div className={styles.image}>
                  {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                  ) :
                    (
                      <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                    )
                  }
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
              <div className={styles.name}>
                Job owner: {job.job_user ? job.job_user.name : job.company.name}
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
                !accepted && !isCompetitor && job.job_user ? (job.job_user.user_id !== profile.user_id ?
                  <button className={styles.competetor_button} onClick={handleNewCompetitor}>+ Be a competitor</button>
                  : <></>)
                  : (!accepted && !isCompetitor && job.company && job.company.id !== profile.user_id
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
              </div>
              <div className={styles.buttons_holder}>
                <button className={styles.send_button} onClick={handleNewFreelancer}>send</button>
                <button className={styles.send_button} onClick={handleCancelFreelancer}>cancel</button>
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
              <div className={styles.competitor_and_button} key={competetor.id}>
                <JobCompetetorCard CompetetorData={competetor} />
                <div className={styles.buttons_holder2}>
                  {
                    job.job_user ? (job.job_user.user_id == profile.user_id && !accepted ?
                      <button className={styles.accept_button}
                        onClick={(event) => handleAcceptFreelancingCompetitor(event, competetor.id)}><Check2 /></button>
                      : <></>)
                      : (job.company && job.company.user_id == profile.user_id && !accepted ?
                        <>
                          <button className={styles.accept_button}
                            onClick={(event) => handleAcceptRegCompetitor(event, competetor.id)}><Check2 /></button>
                          <button className={styles.chat_button}
                            onClick={(event) => handleChatWithIndividual(event, competetor)}><ChatDots /></button>
                        </>
                        : <></>)
                  }
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );

}

export default ShowJob;