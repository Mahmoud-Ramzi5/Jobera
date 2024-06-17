import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from '../../utils/Contexts.jsx';
import { FetchFreelancingJobs } from '../../apis/JobsApis.jsx';
import JobCard from '../../components/Jobs/JobCard.jsx';
import Slider from '../../components/Slider.jsx';
import styles from '../../styles/jobs.module.css';


const FreelancingJobs = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const DataSize = 10;

  const [newFilter, setNewFilter] = useState(false);
  const [filter, setFilter] = useState({
    userName: '',
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: '',
    toDeadline: ''
  });

  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
    else {
      setIsLoading(true);
      FetchFreelancingJobs(accessToken, nextPage, filter).then((response) => {
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

  const handleFilter = (event) => {
    const { name, value } = event.target;
    if (name === 'minSalary' || name === 'maxSalary') {
      if (value !== '') {
        setFilter({ ...filter, [name]: parseInt(value) });
      }
    }
    else {
      setFilter({ ...filter, [name]: value });
    }
  }

  const handlerFilterSubmit = (event) => {
    setJobs([]);
    setNextPage(1);
    setIsDone(false);
    setNewFilter(true);
  }


  return (
    <div className={styles.screen}>
      <div className={styles.left_container}>
        <div>
          <label htmlFor='UserName'>
            Published By:
          </label>
          <input
            type='text'
            placeholder='Published by'
            id='UserName'
            name='userName'
            value={filter.userName}
            onChange={handleFilter}
            className={styles.search_input}
          />
        </div>
        <br />
        <div>
          <label htmlFor='Salary'>
            Salary:
          </label>
          <Slider values={[filter.minSalary, filter.maxSalary]} handler={setFilter} />
          <div className={styles.slider_area}>
            <input
              type='number'
              name='minSalary'
              min={0}
              max={100000}
              value={filter.minSalary}
              onChange={handleFilter}
              className={styles.slider_input}
            />
            <input
              type='number'
              name='maxSalary'
              min={0}
              max={100000}
              value={filter.maxSalary}
              onChange={handleFilter}
              className={styles.slider_input}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor='Deadline'>
            Deadline:
          </label>
          <div className={styles.deadlline_area}>
            <label htmlFor='FromDeadline'>
              From:
            </label>
            <input
              type='date'
              placeholder='Deadline'
              id='FromDeadline'
              name='fromDeadline'
              value={filter.fromDeadline}
              onChange={handleFilter}
            />
            <label htmlFor='ToDeadline'>
              To:
            </label>
            <input
              type='date'
              placeholder='Deadline'
              id='ToDeadline'
              name='toDeadline'
              value={filter.toDeadline}
              onChange={handleFilter}
            />
          </div>
        </div>
        <button type='submit' onClick={handlerFilterSubmit}>
          Submit filter
        </button>
      </div>

      <div className={styles.right_container}>
        {jobs.map((job) => (
          <JobCard key={job.id} JobData={job} />
        ))}
        {isLoading ? <div id='loader'><div className="clock-loader"></div></div>
          : isDone && <h5 className={styles.done}>No more jobs to show</h5>
        }
      </div>
    </div>
  );
}

export default FreelancingJobs;