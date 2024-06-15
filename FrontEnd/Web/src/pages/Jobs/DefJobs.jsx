import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from '../../utils/Contexts.jsx';
import { FetchJobs } from '../../apis/JobsApis.jsx';
import Slider from '../../components/Slider.jsx';
import JobCard from '../../components/Jobs/JobCard.jsx';
import styles from '../../styles/jobs.module.css';


const DefJobs = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const DataSize = 10;
  const types = [
    { value: 'All', label: 'All', icon: <></> },
    { value: 'FullTime', label: 'FullTime', icon: <></> },
    { value: 'PartTime', label: 'PartTime', icon: <></> },
    { value: 'Freelancinng', label: 'Freelancinng', icon: <></> },
  ];

  const [filter, setFilter] = useState({
    user: '',
    type: 'All',
    minSalary: 0,
    maxSalary: 100000
  });

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
      FetchJobs(accessToken, nextPage).then((response) => {
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



  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value })
  }

  console.log(filter);

  return (
    <div className={styles.screen}>
      <div className={styles.left_container}>
        <label htmlFor='user'>
          Published By:
        </label>
        <input
          type='text'
          placeholder='Published by'
          id='user'
          name='user'
          value={filter.user}
          onChange={handleFilter}

        />


        {types.map((T) => (
          <div className={styles.GG} key={T.value}>
            <input
              type="radio"
              name='type'
              value={T.value}
              checked={filter.type === T.value}
              onChange={handleFilter}
            />
            <i>{T.icon}</i>
            <label>{T.label}</label>
          </div>
        ))}

        <div>
          <Slider values={[filter.minSalary, filter.maxSalary]} handler={setFilter} />
          <div className={styles.slider_area}>
            <input
              type='number'
              name='minSalary'
              min={0}
              max={100000}

              value={filter.minSalary}
              onChange={handleFilter}
            />

            <input
              type='number'
              name='maxSalary'
              min={0}
              max={100000}

              value={filter.maxSalary}
              onChange={handleFilter}
            />
          </div>
        </div>

      </div>
      <div className={styles.right_container}>
        {jobs.map((job) => (
          <JobCard key={job.defJob_id} JobData={job} />
        ))}
        {isLoading ? <div id='loader'><div className="clock-loader"></div></div>
          : isDone && <h5 className={styles.done}>No more jobs to show</h5>
        }
      </div>
    </div>
  );
}

export default DefJobs;