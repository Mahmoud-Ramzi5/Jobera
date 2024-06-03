import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from '../../utils/Contexts';
import { GetSpecificJobs } from '../../apis/JobsApis';
import JobCard from './JobCard.jsx';

const Jobs = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(1);
  const [isDone, setIsDine] = useState(false);
  const DataSize = 10;
  const [jobs, setJobs] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    GetSpecificJobs(accessToken, startIndex, DataSize).then((response) => {
      if (response.status === 200) {
        if (response.data.jobs.length == 0) {
          setIsDine(true);
          return;
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
  }, [startIndex]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (isDone) {
      return;
    }
    if (scrollY + windowHeight >= documentHeight - 100) {
      setStartIndex(startIndex + DataSize);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startIndex]);

  if (isLoading) {
    return <div id='loader'><div className="clock-loader"></div></div>
  }
  return (
    <div>
      {jobs.map((job) => {
        return <JobCard JobData={job} />
      })}
    </div>
  );
}

export default Jobs;