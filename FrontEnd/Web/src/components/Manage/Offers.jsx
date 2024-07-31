import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FunnelFill, Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { AppliedJobs, BookmarkJobAPI } from '../../apis/JobsApis.jsx';
import OfferCard from './OfferCard.jsx';
import JobFilter from '../Jobs/JobFilter.jsx';
import JobSlider from './JobSlider.jsx';
import Clock from '../../utils/Clock.jsx';
import styles1 from '../../styles/jobs.module.css';
import styles2 from './offers.module.css';


const Offers = () => {
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

      AppliedJobs(accessToken, nextPage, filter).then((response) => {
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
    var wantedJob = {};
    jobs.map((job) => {
      if (job.job_data.defJob_id === defJobId) {
        wantedJob = job.job_data
      }
    });
    BookmarkJobAPI(accessToken, defJobId).then((response) => {
      if (response.status === 200) {
        wantedJob.is_flagged = response.data.is_flagged;
        setJobs(jobs.map((job) => (job.job_data.defJob_id === defJobId ?
          { ...job, job_data: wantedJob }
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
        className={styles1.menu_btn}
      />
      <input
        type="radio"
        name="slider"
        id="close_filter"
        className={styles1.close_btn}
      />
      <JobFilter
        JobType={filter.type}
        filter={filter}
        setFilter={setFilter}
        handleFilterSubmit={handleFilterSubmit}
      />
      <div className={styles1.right_container}>
        <JobSlider
          filter={filter}
          manageType={'Offers'}
          profileType={profile.type}
          handleJobType={handleJobType}
        />
        {jobs.map((job) => (
          <span key={job.job_data.defJob_id}
            className={styles2.show_offer_info}
          >
            <Link to={`/job/${job.job_data.defJob_id}`}>
              <OfferCard JobData={job.job_data} CompetitorData={job.user_offer} />
            </Link>
          </span>
        ))}
        {isLoading ? <Clock />
          : isDone && <h5 className={styles1.done}>
            done
          </h5>
        }
        <label
          htmlFor="open_filter"
          className={`${styles1.btn} ${styles1.menu_btn}`}
        >
          <FunnelFill size={29} />
        </label>
      </div >
    </div>
  );
}

export default Offers;
