import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsFunnelFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { PostedJobs, BookmarkJobAPI } from '../../apis/JobsApis';
import { FetchImage } from '../../apis/FileApi';
import JobCard from '../Jobs/JobCard';
import JobFilter from '../Jobs/JobFilter';
import JobSlider from './JobSlider';
import Clock from '../../utils/Clock';
import styles from '../../styles/jobs.module.css';


const Posts = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [newFilter, setNewFilter] = useState(false);
  const [filter, setFilter] = useState({
    type: 'Freelancing',
    userName: "",
    companyName: "",
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: "",
    toDeadline: "",
    skills: [],
  });

  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!filtered.current) {
      filtered.current = true;
      setIsLoading(true);

      PostedJobs(accessToken, nextPage, filter).then((response) => {
        if (response.status === 200) {
          setData(response.data.pagination_data);
          if (!response.data.pagination_data.has_more_pages) {
            setIsDone(true);
          }
          response.data.jobs.map((job) => {
            // Check if job is already in array
            if (!jobs.some(item => job.defJob_id === item.defJob_id)) {

              // if not add job
              if (job.photo) {
                FetchImage("", job.photo).then((response) => {
                  job.photo = response;
                  setJobs((prevState) => ([...prevState, job]));
                });
              }
              else {
                setJobs((prevState) => ([...prevState, job]));
              }
            }
          });
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
        setNewFilter(false);
      });
    }
  }, [nextPage, newFilter]);

  const handleBookmark = (defJobId) => {
    BookmarkJobAPI(accessToken, defJobId).then((response) => {
      if (response.status === 200) {
        setJobs(jobs.map((job) => (job.defJob_id === defJobId ?
          { ...job, is_flagged: response.data.is_flagged }
          : job)
        ));
      } else {
        console.log(response);
      }
    });
  }

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
      filtered.current = false;
      setNextPage(nextPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPage]);

  const handleFilterSubmit = (event) => {
    setJobs([]);
    setNextPage(1);
    setIsDone(false);
    setNewFilter(true);
    filtered.current = false;
  };

  const handleJobType = (Type) => {
    setFilter({ ...filter, type: Type });
    setJobs([]);
    setNextPage(1);
    setIsDone(false);
    setNewFilter(true);
    filtered.current = false;
  };


  return (
    <div style={{ display: 'flex' }}>
      <input
        type="radio"
        name="slider"
        id="open_filter"
        className={styles.menu_btn}
      />
      <input
        type="radio"
        name="slider"
        id="close_filter"
        className={styles.close_btn}
      />
      <JobFilter
        JobType={filter.type}
        filter={filter}
        setFilter={setFilter}
        handleFilterSubmit={handleFilterSubmit}
        NoPublishedBy={true}
      />
      <div className={styles.right_container}>
        <JobSlider
          filter={filter}
          manageType={'Posts'}
          profileType={profile.type}
          handleJobType={handleJobType}
        />
        {jobs.map((job) => (
          <div key={job.defJob_id}
            className={styles.job_card}
          >
            <Link to={`/job/${job.defJob_id}`}>
              <JobCard JobData={job} />
            </Link>
            <button onClick={() => handleBookmark(job.defJob_id)}
              className={`${styles.favorite_button} ${job.is_flagged ? 'active' : ''}`}
            >
              {job.is_flagged ? <BsBookmarkFill size={27} /> : <BsBookmark size={27} />}
            </button>
          </div>
        ))}
        {isLoading ? <Clock />
          : isDone && <h5 className={styles.done}>
            {t('pages.jobs.done')}
          </h5>
        }
        <label
          htmlFor="open_filter"
          className={`${styles.btn} ${styles.menu_btn}`}
        >
          <BsFunnelFill size={29} />
        </label>
      </div>
    </div>
  );
}

export default Posts;
