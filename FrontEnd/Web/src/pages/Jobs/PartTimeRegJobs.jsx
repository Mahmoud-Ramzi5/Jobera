import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from '../../utils/Contexts.jsx';
import { FetchPartTimeJobs } from '../../apis/JobsApis.jsx';
import JobCard from '../../components/Jobs/JobCard.jsx';
import styles from '../../styles/jobs.module.css';


const PartTimeRegJobs = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const DataSize = 10;

  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
    else if (isDone) {
      return;
    }
    else {
      setIsLoading(true);
      FetchPartTimeJobs(accessToken, nextPage, '').then((response) => {
        if (response.status === 200) {
          setData(response.data.pagination_data);
          if (!response.data.pagination_data.has_more_pages) {
            setIsDone(true);
          }
          response.data.jobs.map((job) => {
            if (job.photo) {
              FetchImage("", job.photo).then((response) => {
                job.photo = response;
                setJobs((prevState) => ([...prevState, job]));
              });
            }
            else {
              setJobs((prevState) => ([...prevState, job]));
            }
          });
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [nextPage]);

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


  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {jobs.map((job) => (
          <JobCard key={job.id} JobData={job} />
        ))}
      </div>
      {isLoading ? <div id='loader'><div className="clock-loader"></div></div>
        : isDone && <h5 className={styles.done}>No more jobs to show</h5>
      }
    </div>
  );
}

export default PartTimeRegJobs;