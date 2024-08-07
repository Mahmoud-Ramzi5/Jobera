import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { LoginContext } from '../../utils/Contexts';
import { BookmarkedJobs, BookmarkJobAPI } from '../../apis/JobsApis';
import { FetchImage } from '../../apis/FileApi';
import JobCard from '../Jobs/JobCard';
import Clock from '../../utils/Clock';
import styles from '../../styles/jobs.module.css';


const Bookmarks = () => {
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

      BookmarkedJobs(accessToken).then((response) => {
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


  return (
    <div className={styles.mid_container}>
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
    </div>
  );
};

export default Bookmarks;
