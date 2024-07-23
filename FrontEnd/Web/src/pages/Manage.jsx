import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "../styles/Mange.module.css";
import { LoginContext } from "../utils/Contexts";
import { JobYouPosted, JobYouApplied, BookmarkedJobs } from "../apis/JobsApis";
import JobCard from "../components/Jobs/JobCard";
import Clock from "../utils/Clock";
import { Link } from "react-router-dom";
import JobFilter from "../components/Jobs/JobFilter";

const Manage = () => {
  const [currentPage, setCurrentPage] = useState("Posts");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.Manage}>
      <div className={styles.slider}>
        <button
          className={currentPage === "Posts" ? styles.active : ""}
          onClick={() => handlePageChange("Posts")}
        >
          Posts
        </button>
        <button
          className={currentPage === "Offers" ? styles.active : ""}
          onClick={() => handlePageChange("Offers")}
        >
          Offers
        </button>
        <button
          className={currentPage === "Bookmarks" ? styles.active : ""}
          onClick={() => handlePageChange("Bookmarks")}
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
  const initialized = useRef(false);
  const filtered = useRef(false);
  const { accessToken } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(false);
  const [regjobs, setRegJobs] = useState([]);
  const [freelancingjobs, setFreelancingJobs] = useState([]);
  const [newFilter, setNewFilter] = useState(false);
  const [jobType, setJobType] = useState("all");
  const [filter, setFilter] = useState({
    userName: "",
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: "",
    toDeadline: "",
    skills: [],
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);
      JobYouPosted(accessToken)
        .then((response) => {
          if (response.status === 200) {
            setRegJobs(response.data.RegJobs);
            setFreelancingJobs(response.data.FreelancingJobs);
            console.log(response.data.FreelancingJobs);
          } else {
            console.log(response.statusText);
          }
        })
        .then(() => {
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
          {isLoading ? <Clock /> : null}
        </div>
      </div>
    </div>
  );
};

const Offers = () => {
  const initialized = useRef(false);
  const filtered = useRef(false);
  const { accessToken } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(false);
  const [regjobs, setRegJobs] = useState([]);
  const [freelancingjobs, setFreelancingJobs] = useState([]);
  const [newFilter, setNewFilter] = useState(false);
  const [jobType, setJobType] = useState("all");
  const [filter, setFilter] = useState({
    userName: "",
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: "",
    toDeadline: "",
    skills: [],
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);
      JobYouApplied(accessToken)
        .then((response) => {
          if (response.status === 200) {
            setRegJobs(response.data.RegJobs);
            setFreelancingJobs(response.data.FreelancingJobs);
            console.log(response.data);
          } else {
            console.log(response.statusText);
          }
        })
        .then(() => {
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
        />
        <div className={styles.mid_container}>
          {(jobType === "all" || jobType === "regjobs") &&
            regjobs.map((job) => (
              <Link
                key={job.regJob.defJob_id}
                className={styles.job_card}
                to={`/job/${job.regJob.defJob_id}`}
              >
                <JobCard JobData={job.regJob} showOffer={true} />
              </Link>
            ))}
          {(jobType === "all" || jobType === "freelancing") &&
            freelancingjobs.map((job) => (
              <Link
                key={job.freelancingJob.defJob_id}
                className={styles.job_card}
                to={`/job/${job.freelancingJob.defJob_id}`}
              >
                <JobCard JobData={job.freelancingJob} showOffer={true} />
              </Link>
            ))}
          {isLoading ? <Clock /> : null}
        </div>
      </div>
    </div>
  );
};

const Bookmarks = () => {
  const initialized = useRef(false);
  const filtered = useRef(false);
  const { accessToken } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [newFilter, setNewFilter] = useState(false);
  const [jobType, setJobType] = useState("all");
  const [filter, setFilter] = useState({
    userName: "",
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: "",
    toDeadline: "",
    skills: [],
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);
      BookmarkedJobs(accessToken)
        .then((response) => {
          if (response.status === 200) {
            setJobs(response.data.jobs);
          } else {
            console.log(response.statusText);
          }
        })
        .then(() => {
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
            jobs.map((job) => (
              <Link
                key={job.defJob_id}
                className={styles.job_card}
                to={`/job/${job.defJob_id}`}
              >
                <JobCard JobData={job} />
              </Link>
            ))}
          {(jobType === "all" || jobType === "freelancing") &&
            jobs.map((job) => (
              <Link
                key={job.defJob_id}
                className={styles.job_card}
                to={`/job/${job.defJob_id}`}
              >
                <JobCard JobData={job} />
              </Link>
            ))}
          {isLoading ? <Clock /> : null}
        </div>
      </div>
    </div>
  );
};

export default Manage;
