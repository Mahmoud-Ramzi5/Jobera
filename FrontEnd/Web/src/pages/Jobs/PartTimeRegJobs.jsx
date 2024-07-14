import { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FunnelFill, X } from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts.jsx';
import { FetchAllSkills } from '../../apis/SkillsApis.jsx';
import { FetchPartTimeJobs } from '../../apis/JobsApis.jsx';
import { FetchImage } from '../../apis/FileApi.jsx';
import JobCard from '../../components/Jobs/JobCard.jsx';
import Slider from '../../components/Slider.jsx';
import Clock from '../../utils/Clock.jsx';
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

  const [newFilter, setNewFilter] = useState(false);
  const [filter, setFilter] = useState({
    companyName: '',
    minSalary: 0,
    maxSalary: 100000,
    skills: []
  });
  const [skills, setSkills] = useState([]);
  const [choosedSkills, setChoosedSkills] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      FetchAllSkills().then((response) => {
        if (response.status === 200) {
          setSkills(response.data.skills);
        }
        else {
          console.log(response.statusText);
        }
      });
    }
    else {
      setIsLoading(true);
      FetchPartTimeJobs(accessToken, nextPage, filter).then((response) => {
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

  const handleSkillsFilter = (event) => {
    const { value, checked } = event.target;
    // Case 1 : The user checks the box
    if (checked) {
      setChoosedSkills((prevState) => [...prevState, value]);
    }
    // Case 2  : The user unchecks the box
    else {
      setChoosedSkills((prevState) => prevState.filter((skill) => skill !== value));
    }
  }

  useEffect(() => {
    setFilter({ ...filter, skills: choosedSkills });
  }, [choosedSkills]);

  const handlerFilterSubmit = (event) => {
    setJobs([]);
    setNextPage(1);
    setIsDone(false);
    setNewFilter(true);
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
      <div className={styles.left_container}>
        <label
          htmlFor="close_filter"
          className={`${styles.btn} ${styles.close_btn}`}
        >
          <X size={31} />
        </label>
        <div>
          <label htmlFor='CompanyName'>
            Published By:
          </label>
          <input
            type='text'
            placeholder='Published by'
            id='CompanyName'
            name='companyName'
            value={filter.companyName}
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
          <label htmlFor='Type'>
            Skills
          </label>
          {skills.map((S) => (
            <div className='' key={S.id}>
              <input
                type="checkbox"
                value={S.name}
                onChange={handleSkillsFilter}
              />
              <label>&nbsp;{S.name}</label>
            </div>
          ))}
        </div>
        <br />
        <button type='submit' className={styles.submit_button} onClick={handlerFilterSubmit}>
          Submit filter
        </button>
      </div>

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
          : isDone && <h5 className={styles.done}>No more jobs to show</h5>
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

export default PartTimeRegJobs;