import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PencilSquare, CurrencyDollar, ChatDots, Check2 } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import {
  FetchJob, ApplyToRegJobAPI, ApplyToFreelancingJobAPI,
  AcceptRegJob, AcceptFreelancingJob, DeleteRegJobAPI, DeleteFreelancingJobAPI
} from '../../apis/JobsApis';
import { FreelancingJobTransaction, FinishedJobTransaction } from '../../apis/TransactionsApi';
import { FetchImage } from '../../apis/FileApi';
import { CreateChat } from '../../apis/ChatApis';
import JobCompetitorCard from './JobCompetitorCard';
import NormalInput from '../NormalInput';
import Clock from '../../utils/Clock';
import img_holder from '../../assets/upload.png';
import styles from './show_job.module.css';
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
  const [adminShare, setAdminShare] = useState(0);
  const [isJobCreator, setIsJobCreator] = useState(false);

  const [comment, setComment] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchJob(accessToken, id).then((response) => {
        if (response.status === 200) {
          setJob(response.data.job);
          setJobEnded(response.data.job.is_done)

          if (response.data.job.job_user && response.data.job.job_user.user_id === profile.user_id) {
            setIsJobCreator(true);
          } else if (response.data.job.company && response.data.job.company.user_id === profile.user_id) {
            setIsJobCreator(true);
          } else {
            setIsJobCreator(false);
          }
          // Adding the photo if exists
          if (response.data.job.photo) {
            FetchImage("", response.data.job.photo).then((response) => {
              setPhoto(response);
            });
          }
        }
        else if (response.status === 404) {
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

  const handleCalculateSalary = (amount) => {
    setDesiredSalary(amount);
    if (amount <= 2000 && amount > 0) {
      setAdminShare(amount * 0.15);
    } else if (amount > 2000 && amount <= 15000) {
      setAdminShare(amount * 0.12);
    } else if (amount > 15000) {
      setAdminShare(amount * 0.10);
    } else {
      console.log('bad amount of money detected')
      setAdminShare(0);
    }
  }

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

  const handleAcceptFreelancingCompetitor = (event, id, salary) => {
    event.preventDefault();
    AcceptFreelancingJob(accessToken, job.id, id).then((response) => {
      if (response.status == 200) {
        console.log('Competitor Accepted')
        setAccepted(true);
        FreelancingJobTransaction(
          accessToken,
          profile.user_id,
          job.id,
          salary
        ).then((response) => {
          if (response.status == 200) {
            console.log('transaction went smoothly')
            window.location.reload();
          } else {
            console.log(response);
          }
        })
      }
      else {
        console.log(response.statusText);
      }
    });
  }

  const handleChatWithIndividual = (event, competitor) => {
    event.preventDefault();
    CreateChat(accessToken, competitor.individual.user_id).then((response) => {
      if (response.status == 201) {
        console.log('Chat created')
      } else {
        console.log(response);
      }
    });
    navigate('/ChatsPage');
  }

  const handleFinishFreelancingJob = (event) => {
    event.preventDefault();
    FinishedJobTransaction(
      accessToken,
      profile.user_id,
      job.accepted_user.id,
      job.id,
      job.accepted_user.salary
    ).then((response)=>{
      if (response.status==200){
        setJobEnded(true);
        console.log('done write')
        window.location.reload();
      }else{
        console.log(response);
      }
    })
  }

  const handleFinishJob = (event) => {
    event.preventDefault();
    setJobEnded(true);
    //api to finish job
  }

  const handleDeleteJob = (event) => {
    event.preventDefault();
    if(job.type === 'Freelancing'){
      DeleteFreelancingJobAPI(
        accessToken,
        job.id
      ).then((response) =>{
        if (response.status==204){
          console.log('job deleted');
          navigate('/freelancing-jobs');
        }else{
          console.log(response);
        }});
    }else if(job.type != 'Freelancing'){
      DeleteRegJobAPI(
        accessToken,
        job.id
      ).then((response) =>{
        if (response.status==204){
          console.log('job deleted');
          navigate('/jobs');
        }else{
          console.log(response);
        }
      })
    }
  }

  if (isLoading) {
    return <Clock />
  }
  console.log(job)
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
                Job owner: {job.job_user ? <a className={styles.anchor} href={`/profile/${job.job_user.user_id}/${job.job_user.name}`}>{job.job_user.name}</a> : <a className={styles.anchor} href={`/profile/${job.company.user_id}/${job.company.name}`}>{job.company.name}</a>}
              </div>
              <div className={styles.type}>{job.type}  job</div>
              <div className={styles.description}>Description: {job.description}</div>
              {job.salary ? (
                <div className={styles.salary}>Salary: ${job.salary}</div>
              ) : (
                <>
                  <div className={styles.salary}>Min salary: ${job.min_salary}&nbsp;&nbsp; Max salary: ${job.max_salary}</div>
                  <div className={styles.salary}>Avg offer salary: ${job.avg_salary}</div>
                </>
              )}
              <h5 className={styles.state}> Job location: {job.location ?
                `${job.location.state}, ${job.location.country}` : 'Remotely'}
              </h5>
              {job.type === 'Freelancing' &&
                <div className={styles.deadline}>Deadline: {job.deadline}</div>}
              <br /><br />
              <div className={styles.publish_date}>Publish date: {job.publish_date.split('T')[0]}</div>
            </div>
          </div>
          <div className={styles.cancel_finish_job}>
            {accepted && isJobCreator && job.type === 'Freelancing' ? <button className={styles.send_button} onClick={handleFinishFreelancingJob}>End job</button>
              : accepted && isJobCreator && job.type != 'Freelancing' ? <button className={styles.send_button} onClick={handleFinishJob}>End job</button>
              :!accepted && isJobCreator ? <button className={styles.send_button} onClick={handleDeleteJob}>Delete job</button> :
                <></>}
          </div>
          <div className={styles.competitors}>
            <div className={styles.name_and_button}>
              <h5>Competitors</h5>
              {
                !accepted && !isCompetitor && job.job_user ? (job.job_user.user_id !== profile.user_id ?
                  <button className={styles.competitor_button} onClick={handleNewCompetitor}>+ Be a competitor</button>
                  : <></>)
                  : (!accepted && !isCompetitor && job.company && job.company.user_id !== profile.user_id
                    && profile.type !== 'company' ?
                    <button className={styles.competitor_button} onClick={handleNewCompetitor}>+ Be a competitor</button>
                    : <></>)
              }
            </div>
            {participate ? <>
              <div className={Inputstyles.field}>
                <i className={Inputstyles.icon}><PencilSquare /></i>
                <textarea
                  placeholder='Add your comment'
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className={Inputstyles.input}
                  rows='5'
                />
              </div>
              {job.type === 'Freelancing' ? <>
                <div className={styles.money_holder}>
                  <NormalInput
                    type='number'
                    placeholder='Desired salary'
                    icon={<CurrencyDollar />}
                    value={desiredSalary}
                    setChange={handleCalculateSalary}
                  />
                  <br />
                  <p> Your share after website taxes: {desiredSalary - adminShare} $ </p>
                </div>
                <div className={styles.buttons_holder}>
                  <button className={styles.send_button} onClick={handleNewFreelancer}>Send</button>
                  <button className={styles.send_button} onClick={handleCancelFreelancer}>Cancel</button>
                </div>
              </> :
                <div className={styles.buttons_holder}>
                  <button className={styles.send_button} onClick={handleNewJobCompetitor}>Send</button>
                  <button className={styles.send_button} onClick={handleCancelJobCompetitor}>Cancel</button>
                </div>
              }
            </> : <></>}
            {job.competitors && job.competitors.map((competitor) => (
              <div className={styles.competitor_and_button} key={competitor.id}>
                <JobCompetitorCard CompetitorData={competitor} />
                <div className={styles.buttons_holder2}>
                  {
                    job.job_user ? (job.job_user.user_id === profile.user_id && !accepted &&
                      job.job_user.wallet.current_balance >= competitor.salary &&
                      <button className={styles.accept_button}
                        onClick={(event) => handleAcceptFreelancingCompetitor(event, competitor.id, competitor.salary)}><Check2 /></button>
                    ) : (job.company && job.company.user_id === profile.user_id && !accepted &&
                      <>
                        <button className={styles.accept_button}
                          onClick={(event) => handleAcceptRegCompetitor(event, competitor.id)}><Check2 /></button>
                        <button className={styles.chat_button}
                          onClick={(event) => handleChatWithIndividual(event, competitor)}><ChatDots /></button>
                      </>
                    )}
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