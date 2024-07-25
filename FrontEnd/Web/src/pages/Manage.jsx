import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../utils/Contexts';
import { JobYouPosted, JobYouApplied, BookmarkedJobs } from '../apis/JobsApis';
import JobCard from '../components/Jobs/JobCard';
import JobFilter from '../components/Jobs/JobFilter';
import JobCompetitorCard from '../components/Jobs/JobCompetitorCard';
import Clock from '../utils/Clock';
import styles from '../styles/manage.module.css';

const Manage = () => {
  // Define states
  const [currentPage, setCurrentPage] = useState("Posts");


  return (
    <div className={styles.manage}>
      <div className={styles.slider}>
        <button
          className={currentPage === "Posts" ? styles.active : ""}
          onClick={() => setCurrentPage("Posts")}
        >
          Posts
        </button>
        <button
          className={currentPage === "Offers" ? styles.active : ""}
          onClick={() => setCurrentPage("Offers")}
        >
          Offers
        </button>
        <button
          className={currentPage === "Bookmarks" ? styles.active : ""}
          onClick={() => setCurrentPage("Bookmarks")}
        >
          Bookmarks
        </button>
      </div>

      <div className={styles.content}>
        {currentPage === "Posts" && <Posts />}
        {currentPage === "Offers" && <Offers />}
        {currentPage === "Bookmarks" && <Bookmarks />}
      </div>
    </div>
  );
};

const Posts = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newFilter, setNewFilter] = useState(false);
  const [filter, setFilter] = useState({
    userName: '',
    companyName: '',
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: '',
    toDeadline: '',
    skills: [],
  });

  const [regjobs, setRegJobs] = useState([]);
  const [freelancingjobs, setFreelancingJobs] = useState([]);
  const [jobType, setJobType] = useState("all");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);
      JobYouPosted(accessToken).then((response) => {
        if (response.status === 200) {
          setRegJobs(response.data.RegJobs);
          setFreelancingJobs(response.data.FreelancingJobs);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleFilterSubmit = (event) => {
    setJobs([]);
    setNextPage(1);
    setIsDone(false);
    setNewFilter(true);
    filtered.current = false;

    // Update jobType based on the selected radio button
    const selectedJobType = document.querySelector(
      'input[name="jobType"]:checked'
    ).value;
    setJobType(selectedJobType);
  };


  return (
    <div>
      <div className={styles.slider}>
        <label>
          <input
            type="radio"
            name="jobType"
            value="all"
            checked={jobType === "all"}
            onChange={() => setJobType("all")}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="jobType"
            value="regjobs"
            checked={jobType === "regjobs"}
            onChange={() => setJobType("regjobs")}
          />
          RegJobs
        </label>
        <label>
          <input
            type="radio"
            name="jobType"
            value="freelancing"
            checked={jobType === "freelancing"}
            onChange={() => setJobType("freelancing")}
          />
          Freelancing
        </label>
      </div>

      <div className={styles.screen}>
        <JobFilter
          JobType={jobType === "freelancing" ? "Freelancing" : ""}
          filter={filter}
          setFilter={setFilter}
          handleFilterSubmit={handleFilterSubmit}
          NoPublishedBy={true}
        />

        <div className={styles.mid_container}>
          {(jobType === "all" || jobType === "regjobs") &&
            regjobs.map((job) => (
              <Link
                key={job.defJob_id}
                className={styles.job_card}
                to={`/job/${job.defJob_id}`}
              >
                <JobCard JobData={job} />
              </Link>
            ))}
          {(jobType === "all" || jobType === "freelancing") &&
            freelancingjobs.map((job) => (
              <Link
                key={job.defJob_id}
                className={styles.job_card}
                to={`/job/${job.defJob_id}`}
              >
                <JobCard JobData={job} />
              </Link>
            ))}
          {isLoading && <Clock />}
        </div>
      </div>
    </div>
  );
};

const Offers = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [newFilter, setNewFilter] = useState(false);
  const [filter, setFilter] = useState({
    userName: '',
    companyName: '',
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: '',
    toDeadline: '',
    skills: [],
  });

  const [regjobs, setRegJobs] = useState([]);
  const [freelancingjobs, setFreelancingJobs] = useState([]);
  const [jobType, setJobType] = useState("all");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);
      JobYouApplied(accessToken).then((response) => {
        if (response.status === 200) {
          setRegJobs(response.data.RegJobs);
          setFreelancingJobs(response.data.FreelancingJobs);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleFilterSubmit = (event) => {
    setRegJobs([]);
    setFreelancingJobs([]);
    setNewFilter(true);
    filtered.current = false;

    // Update jobType based on the selected radio button
    const selectedJobType = document.querySelector(
      'input[name="jobType"]:checked'
    ).value;
    setJobType(selectedJobType);
  };


  return (
    <div>
      <div className={styles.slider}>
        <label>
          <input
            type="radio"
            name="jobType"
            value="all"
            checked={jobType === "all"}
            onChange={() => setJobType("all")}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="jobType"
            value="regjobs"
            checked={jobType === "regjobs"}
            onChange={() => setJobType("regjobs")}
          />
          RegJobs
        </label>
        <label>
          <input
            type="radio"
            name="jobType"
            value="freelancing"
            checked={jobType === "freelancing"}
            onChange={() => setJobType("freelancing")}
          />
          Freelancing
        </label>
      </div>

      <div className={styles.screen}>
        <JobFilter
          JobType={jobType === "freelancing" ? "Freelancing" : ""}
          filter={filter}
          setFilter={setFilter}
          handleFilterSubmit={handleFilterSubmit}
        />

        <div className={styles.mid_container}>
          {(jobType === "all" || jobType === "regjobs") &&
            regjobs.map((job) => (
              <Link
                key={job.regJob.defJob_id}
                className={styles.job_card}
                to={`/job/${job.regJob.defJob_id}`}
              >
                <JobCard JobData={job.regJob} />
              </Link>
            ))}
          {(jobType === "all" || jobType === "freelancing") &&
            freelancingjobs.map((job) => (
              <div key={job.freelancingJob.defJob_id} className={styles.job_card}>
                <Link
                  to={`/job/${job.freelancingJob.defJob_id}`}
                >
                  <JobCard JobData={job.freelancingJob} />
                </Link>
                {showMore ? (
                  <>
                    <span className={styles.show_offer_info}>
                      <JobCompetitorCard CompetitorData={job.offer} />
                    </span>
                    <button
                      className={styles.show_button}
                      onClick={() => setShowMore(false)}
                    >
                      Show less
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.show_button}
                    onClick={() => setShowMore(true)}
                  >
                    Show Offer
                  </button>
                )}
              </div>
            ))}
          {isLoading && <Clock />}
        </div>
      </div>
    </div>
  );
};

const Bookmarks = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const filtered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newFilter, setNewFilter] = useState(false);
  const [filter, setFilter] = useState({
    userName: '',
    companyName: '',
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: '',
    toDeadline: '',
    skills: [],
  });

  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("all");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);
      BookmarkedJobs(accessToken).then((response) => {
        if (response.status === 200) {
          setJobs(response.data.jobs);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleFilterSubmit = (event) => {
    setJobs([]);
    setNextPage(1);
    setIsDone(false);
    setNewFilter(true);
    filtered.current = false;

    // Update jobType based on the selected radio button
    const selectedJobType = document.querySelector(
      'input[name="jobType"]:checked'
    ).value;
    setJobType(selectedJobType);
  };


  return (
    <div className={styles.screen}>
      <JobFilter
        JobType={jobType === "freelancing" ? "Freelancing" : ""}
        filter={filter}
        setFilter={setFilter}
        handleFilterSubmit={handleFilterSubmit}
        NoPublishedBy={true}
      />
      <div className={styles.mid_container}>
        {
          jobs.map((job) => (
            <Link
              key={job.defJob_id}
              className={styles.job_card}
              to={`/job/${job.defJob_id}`}
            >
              <JobCard JobData={job} />
            </Link>
          ))}
        {isLoading && <Clock />}
      </div>
    </div>
  );
};

export default Manage;