import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FunnelFill, Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../utils/Contexts';
import { PostedJobs, AppliedJobs, BookmarkedJobs, BookmarkJobAPI } from '../apis/JobsApis';
import Posts from '../components/Manage/Posts';
import Offers from '../components/Manage/Offers';
import JobCard from '../components/Jobs/JobCard';
import JobFilter from '../components/Jobs/JobFilter';
import Clock from '../utils/Clock';
import styles from '../styles/manage.module.css';


const Manage = () => {
  // Define states
  const [currentPage, setCurrentPage] = useState("Posts");

  return (
    <div className={styles.manage}>
      <div className={styles.tab_container}>
        <button
          className={`${styles.tab_button} ${currentPage === "Posts" ? styles.tab_button_active : ""}`}
          onClick={() => setCurrentPage("Posts")}
        >
          Posts
        </button>
        <button
          className={`${styles.tab_button} ${currentPage === "Offers" ? styles.tab_button_active : ""}`}
          onClick={() => setCurrentPage("Offers")}
        >
          Offers
        </button>
        <button
          className={`${styles.tab_button} ${currentPage === "Bookmarks" ? styles.tab_button_active : ""}`}
          onClick={() => setCurrentPage("Bookmarks")}
        >
          Bookmarks
        </button>
      </div>
      {currentPage === "Posts" ? <Posts />
        : currentPage === "Offers" ? <Offers />
          : currentPage === "Bookmarks" && <Bookmarks />}
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
    userName: "",
    companyName: "",
    minSalary: 0,
    maxSalary: 100000,
    fromDeadline: "",
    toDeadline: "",
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
        {jobs.map((job) => (
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
