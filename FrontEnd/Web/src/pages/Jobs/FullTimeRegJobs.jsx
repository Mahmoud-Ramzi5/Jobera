import { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FunnelFill } from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts.jsx';
import { FetchFullTimeJobs } from '../../apis/JobsApis.jsx';
import { FetchImage } from '../../apis/FileApi.jsx';
import JobCard from '../../components/Jobs/JobCard.jsx';
import JobFilter from '../../components/Jobs/JobFilter.jsx';
import Clock from '../../utils/Clock.jsx';
import styles from '../../styles/jobs.module.css';


const FullTimeRegJobs = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const [newFilter, setNewFilter] = useState(false);
  const [filter, setFilter] = useState({
    companyName: '',
    minSalary: 0,
    maxSalary: 100000,
    skills: []
  });

  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!filtered.current) {
      filtered.current = true;
      setIsLoading(true);
      FetchFullTimeJobs(accessToken, nextPage, filter).then((response) => {
        if (response.status === 200) {
          setData(response.data.pagination_data);
          if (!response.data.pagination_data.has_more_pages) {
            setIsDone(true);
          }
          response.data.jobs.map((job) => {
            // Check if job is already in array
            if (!jobs.some(item => job.id === item.id)) {

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

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
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
  }


  return (
    <div className={styles.screen}>
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
        JobType={'FullTime'}
        filter={filter}
        setFilter={setFilter}
        handleFilterSubmit={handleFilterSubmit}
      />
      <div className={styles.right_container}>
        {jobs.map((job) => (
          <Link
            key={job.defJob_id}
            className={styles.job_card}
            to={`/job/${job.defJob_id}`}
          >
            <JobCard JobData={job} />
          </Link>
        ))}
        {isLoading ? <Clock />
          : isDone && <h5 className={styles.done}>
            {t('pages.jobs.done')}
          </h5>
        }
      </div>
      <label
        htmlFor="open_filter"
        className={`${styles.btn} ${styles.menu_btn}`}
      >
        <FunnelFill size={29} />
      </label>
    </div>
  );
}

export default FullTimeRegJobs;