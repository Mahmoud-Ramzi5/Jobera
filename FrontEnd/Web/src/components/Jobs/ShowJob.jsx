import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PencilSquare, CurrencyDollar, ChatDots, Check2, Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import {
  FetchJob, ApplyToRegJobAPI, ApplyToFreelancingJobAPI, BookmarkJobAPI,
  AcceptRegJob, AcceptFreelancingJob, FinishFreelancingJob, DeleteRegJobAPI, DeleteFreelancingJobAPI
} from '../../apis/JobsApis';
import { FetchImage } from '../../apis/FileApi';
import { CreateChat } from '../../apis/ChatApis';
import JobCompetitorCard from './JobCompetitorCard';
import NormalInput from '../NormalInput';
import Clock from '../../utils/Clock';
import img_holder from '../../assets/upload.png';
import styles from './show_job.module.css';
import Inputstyles from '../../styles/Input.module.css'


const ShowJob = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { id } = useParams();
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [photo, setPhoto] = useState(null);
  const [job, setJob] = useState({});

  const [accepted, setAccepted] = useState(false);
  const [participate, setParticipate] = useState(false);
  const [isCompetitor, setIsCompetitor] = useState(false);
  const [jobEnded, setJobEnded] = useState(false);
  const [adminShare, setAdminShare] = useState(0);
  const [isJobCreator, setIsJobCreator] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [comment, setComment] = useState('');
  const [offer, setOffer] = useState('');


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchJob(accessToken, id).then((response) => {
        if (response.status === 200) {
          setJob(response.data.job);
          setJobEnded(response.data.job.is_done);
          setIsFavorite(response.data.job.is_flagged);

          if (response.data.job.job_user && response.data.job.job_user.user_id === profile.user_id) {
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
          navigate('/notfound');
        }
        else {
          console.log(response.statusText);
        }

        if ( response.data.job.accepted_user) {
          setAccepted(true);
        }

        // Check if user is already a competitor
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
    setOffer(amount);
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
    ApplyToRegJobAPI(accessToken, job.defJob_id, comment).then((response) => {
      if (response.status == 200) {
        console.log('Added a competitor successfully')
        setParticipate(false);
        window.location.reload(); // Refresh the page after deletion
      } else {
        console.log(response);
      }
    })
  }

  const handleAcceptRegCompetitor = (event, id) => {
    event.preventDefault();
    AcceptRegJob(accessToken, job.defJob_id, id).then((response) => {
      if (response.status == 200) {
        console.log('Competitor Accepted')
        setAccepted(true);
        window.location.reload(); // Refresh the page after deletion
      } else {
        console.log(response);
      }
    });
  }

  const handleNewFreelancer = (event) => {
    event.preventDefault();
    ApplyToFreelancingJobAPI(accessToken, job.defJob_id, comment, offer).then((response) => {
      if (response.status == 200) {
        console.log('Added a competitor successfully')
        setParticipate(false);
        window.location.reload(); // Refresh the page after deletion
      } else {
        console.log(response);
      }
    });
  }

  const handleAcceptFreelancingCompetitor = (event, id, salary) => {
    event.preventDefault();
    AcceptFreelancingJob(accessToken, job.defJob_id, id, salary).then((response) => {
      if (response.status == 200) {
        console.log('Competitor Accepted');
        setAccepted(true);
        window.location.reload();
      }
      else {
        console.log(response);
      }
    });
  }

  const handleCancelcompetitor = (event) => {
    event.preventDefault();
    setParticipate(false);
    setOffer('');
    setComment('');
  }

  const handleChatWithIndividual = (event, competitor) => {
    event.preventDefault();
    CreateChat(accessToken, competitor.individual.user_id).then((response) => {
      if (response.status === 201) {
        console.log('Chat created');
        navigate('/chats');
      } else {
        console.log(response);
      }
    });
  }

  const handleFinishFreelancingJob = (event) => {
    event.preventDefault();
    FinishFreelancingJob(
      accessToken,
      profile.user_id,
      job.accepted_user.user_id,
      job.defJob_id,
      parseFloat(job.accepted_user.offer)
    ).then((response) => {
      if (response.status == 200) {
        setJobEnded(true);
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  const handleDeleteJob = (event) => {
    event.preventDefault();
    if (job.type === 'Freelancing') {
      DeleteFreelancingJobAPI(accessToken, job.defJob_id).then((response) => {
        if (response.status == 204) {
          console.log('Job deleted');
          navigate('/jobs/Freelancing');
        } else {
          console.log(response);
        }
      });
    } else if (job.type !== 'Freelancing') {
      DeleteRegJobAPI(accessToken, job.defJob_id).then((response) => {
        if (response.status == 204) {
          console.log('Job deleted');
          navigate('/jobs/all');
        } else {
          console.log(response);
        }
      });
    }
  }

  const handleFavorite = () => {
    BookmarkJobAPI(accessToken, id).then((response) => {
      if (response.status === 200) {
        setIsFavorite(response.data.is_flagged);
      } else {
        console.log(response);
      }
    });
  }


  if (isLoading) {
    return <Clock />
  }
  console.log(job.accepted_user);
  return (
    <div className={styles.jobsPage}>
      {jobEnded ? <>job has ended</> :
        <>
          <div className={styles.pagecontent}>
            <div className={styles.left_side_container}>
              <div className={styles.imageholder}>
                <div className={styles.image}>
                  {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                  ) : (
                    <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                  )}
                </div>
              </div>
              <h5 className={styles.heading}>
                {t('components.show_job.heading')}
              </h5>
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
                <div className={styles.title}>
                  <button onClick={handleFavorite} className={`${styles.favorite_button} ${isFavorite ? 'active' : ''}`}>
                    {isFavorite ? <BookmarkFill size={27} /> : <Bookmark size={27} />}
                  </button>
                  {job.title}
                </div>
              </div>
              <div className={styles.name}>
                {t('components.show_job.name')}{' '}
                <a className={styles.anchor} href={`/profile/${job.job_user.user_id}/${job.job_user.name}`}>
                  {job.job_user.name}
                </a>
              </div>
              <div className={styles.type}>
                {job.type}{' '}{t('components.show_job.type')}
              </div>
              <div className={styles.description}>
                {t('components.show_job.description')}{' '}{job.description}
              </div>
              {job.salary ? (
                <div className={styles.salary}>
                  {t('components.show_job.salary')} ${job.salary}
                </div>
              ) : (
                <>
                  <div className={styles.salary}>
                    {t('components.show_job.budget')} ${job.min_salary} &nbsp;-&nbsp; ${job.max_salary}
                  </div>
                  <div className={styles.salary}>
                    {t('components.show_job.avg_salary')} ${job.avg_salary}
                  </div>
                </>
              )}
              <h5 className={styles.state}>
                {t('components.show_job.location')}{' '}
                {job.location ?
                  `${job.location.state}, ${job.location.country}`
                  : 'Remotely'}
              </h5>
              {job.type === 'Freelancing' &&
                <div className={styles.deadline}>
                  {t('components.show_job.deadline')}{' '}{job.deadline}
                </div>}
              <br /><br />
              <div className={styles.publish_date}>
                {t('components.show_job.publish_date')}{' '}{job.publish_date.split('T')[0]}
              </div>
            </div>
          </div>
          <div className={styles.cancel_finish_job}>
            {accepted && !jobEnded && isJobCreator && job.type === 'Freelancing' ?
              <button className={styles.send_button} onClick={handleFinishFreelancingJob}>
                {t('components.show_job.end_job_button')}
              </button>
              : !accepted && isJobCreator ?
                <button className={styles.send_button} onClick={handleDeleteJob}>
                  {t('components.show_job.delete_job_button')}
                </button> :
                <></>}
          </div>
          <div className={styles.competitors}>
            <div className={styles.name_and_button}>
              <h5>{t('components.show_job.h5')}</h5>
              {
                !accepted && !isCompetitor && job.job_user ?
                  (job.job_user.user_id !== profile.user_id &&
                    <button className={styles.competitor_button} onClick={handleNewCompetitor}>
                      {t('components.show_job.competitor_button')}
                    </button>
                  )
                  :
                  (!accepted && !isCompetitor && job.job_user &&
                    job.job_user.user_id !== profile.user_id && profile.type !== 'company' &&
                    <button className={styles.competitor_button} onClick={handleNewCompetitor}>
                      {t('components.show_job.competitor_button')}
                    </button>
                  )
              }
            </div>
            {participate && <>
              <div className={Inputstyles.field}>
                <i className={Inputstyles.icon}><PencilSquare /></i>
                <textarea
                  placeholder={t('components.show_job.comment_input')}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className={Inputstyles.input}
                  rows='5'
                />
              </div>
              {job.type === 'Freelancing' ?
                <>
                  <div className={styles.money_holder}>
                    <NormalInput
                      type='number'
                      placeholder={t('components.show_job.desired_salary')}
                      icon={<CurrencyDollar />}
                      value={offer}
                      setChange={handleCalculateSalary}
                    />
                    <br />
                    <p>{t('components.show_job.tax')} {offer - adminShare} $</p>
                  </div>
                  <div className={styles.buttons_holder}>
                    <button className={styles.send_button} onClick={handleNewFreelancer}>
                      {t('components.show_job.send_button')}
                    </button>
                    <button className={styles.send_button} onClick={handleCancelcompetitor}>
                      {t('components.show_job.cancel_button')}
                    </button>
                  </div>
                </> :
                <div className={styles.buttons_holder}>
                  <button className={styles.send_button} onClick={handleNewJobCompetitor}>
                    {t('components.show_job.send_button')}
                  </button>
                  <button className={styles.send_button} onClick={handleCancelcompetitor}>
                    {t('components.show_job.cancel_button')}
                  </button>
                </div>
              }
            </>
            }
            {job.competitors && job.competitors.map((competitor) => (
              <div className={styles.competitor_and_button} key={competitor.competitor_id}>
                <JobCompetitorCard CompetitorData={competitor} AcceptedCompetitor={job.accepted_user.user_id}/>
                <div className={styles.buttons_holder2}>

                  {job.job_user.user_id === profile.user_id && !accepted &&
                    job.job_user.wallet.available_balance >= parseFloat(competitor.offer) &&
                    <button className={styles.accept_button}
                      onClick={(event) => handleAcceptFreelancingCompetitor(event, competitor.competitor_id, parseFloat(competitor.offer))}>
                      <Check2 />
                    </button>
                  }
                  :
                  {job.job_user && job.type !== 'freelancing' && job.job_user.user_id === profile.user_id && !accepted &&
                    <>
                      <button className={styles.accept_button}
                        onClick={(event) => handleAcceptRegCompetitor(event, competitor.competitor_id)}>
                        <Check2 />
                      </button>
                      <button className={styles.chat_button}
                        onClick={(event) => handleChatWithIndividual(event, competitor)}>
                        <ChatDots />
                      </button>
                    </>
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
