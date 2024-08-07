import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EyeFill, Pen, Trash } from "react-bootstrap-icons";
import { LoginContext } from "../../utils/Contexts";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";
import { DeleteFreelancingJobAPI, DeleteRegJobAPI, FetchJobsNoPagination } from "../../apis/JobsApis.jsx";
import { useNavigate } from "react-router-dom";

const AdminJobs = () => {
  const { t } = useTranslation("global");
  const { accessToken } = useContext(LoginContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobsData, setJobsData] = useState(null);
  const [jobType, setJobType] = useState("FullTime");

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      FetchJobsNoPagination("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzM0N2E0ZTdhYWVkYWJkMzM2YmMyNGU4Mjg0NjNhMWRjOWMxMTU4N2E4NmE2NjRjOGRkOTYzZmJhYTFlMzg3MDQ5YTI2MGIyNGY5ZjRjOGIiLCJpYXQiOjE3MjI3ODc2MzIuNzg4MzYxLCJuYmYiOjE3MjI3ODc2MzIuNzg4MzY0LCJleHAiOjE3NTQzMjM2MzIuNjc1NTYzLCJzdWIiOiIzNyIsInNjb3BlcyI6W119.N0p05mKAhfH4sIjMpjMHxnSZPdoL2OLt4qAffUP1WGBWRgyHX39NcN3XLtlWue2vU7W53kgNXTetAsKjPduQQQCeyO4BtgpOrpMp2pfzCcIY4jdF3I6-iov6DQWwV3YDhh1NzaV7QM4wmwZFSjX2MArjMG-RSiFQpHWji7yMzc90hTcK36ebdkBoJ7Je0PJXPVmDKWTfnhEZW6_JFseCnOB4jwPpi-DD3rEVYpNBwrCSkBTRBi7fn0oLzQXJ0YO_P6HJ0ZL86Ct6FXftgJLaOcjHwVBnm9Sm_0jnNQ5alehFdwLqEKdErafFCXE-wwth2eQBwMimgjnGUb1cHBUo7wdQgboNZcCKfDCez1TeT8ph5uPGhDMWsnkOF41TAFIayWaPBKez4Z0oRdznGiuAPw0DDP9bK7HQpyj3zO1hd_noOBM-GmNniRaWQaqfKuNNJR9SNdOMbrIDzEGe7tDx9Fi6eRYWkiLzWv0EShXOMehShC9Xixocg_7XYoP630A2Uz3nsO6XUHfp6sgRNKH9DlfsJJgtQhp3sEusza6mfzoihAVzMLowJys6tBJfDtS_K-A5DQplkMmXVPZ7zB0Bx5WRpBlscJks6DdVtXYQn2oUCe534KhuRmo4Ujg45E6JFx7vcVqRNIii0aoeD0apagUJxJf317AhulYhXiTqwIQ")
        .then((response) => {
          if (response.status === 200) {
            setJobsData(response.data);
          } else {
            console.log(response.statusText);
          }
          setIsLoading(false);
        });
    }
  }, [accessToken]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleJobTypeChange = (type) => {
    setJobType(type);
  };

  const columnStructure = {
    FullTime: [
      { key: "title", label: "Title" },
      { key: "job_user.name", label: "Company" },
      { key: "publish_date", label: "Post Date" },
      { key: "salary", label: "Salary" },
      { key: "accepted_user", label: "Accepted User" },
    ],
    PartTime: [
      { key: "title", label: "Title" },
      { key: "job_user.name", label: "Company" },
      { key: "publish_date", label: "Post Date" },
      { key: "salary", label: "Salary" },
      { key: "accepted_user", label: "Accepted User" },
    ],
    Freelancing: [
      { key: "title", label: "Title" },
      { key: "job_user.name", label: "Client" },
      { key: "deadline", label: "Deadline" },
      { key: "avg_salary", label: "Average Salary" },
      { key: "accepted_user", label: "Accepted User" },
    ],
  };

  const currentColumns = columnStructure[jobType];

  if (isLoading) {
    return <Clock />;
  }
  const handleDelete = (defJob_id) => {
    if (jobType == "Freelancing") {
      DeleteFreelancingJobAPI(accessToken, defJob_id).then((response) => {
        if (response.status == 204) {
          window.location.reload(); // Refresh the page after deletion
        }
        else {
          console.log(response.statusText);
        }
      });
    } else {
      DeleteRegJobAPI(accessToken, defJob_id).then((response) => {
        if (response.status == 204) {
          window.location.reload(); // Refresh the page after deletion
        }
        else {
          console.log(response.statusText);
        }
      });
    }
  };
  const filteredJobs = jobsData && jobsData[jobType]
    ? jobsData[jobType].filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        {jobsData === null ? (
          <Clock />
        ) : (
          <div>
            <div>
              <h1>Jobs</h1>
              <div className={styles.search_bar}>
                <input
                  type="text"
                  placeholder={t(" job title")}
                  value={searchQuery}
                  onChange={handleSearch}
                  className={styles.search_input}
                />
              </div>
              <div className={styles.slider}>
                {Object.keys(columnStructure).map((type) => (
                  <div key={type}>
                    <input
                      type="radio"
                      id={type}
                      name="jobType"
                      value={type}
                      checked={jobType === type}
                      onChange={() => handleJobTypeChange(type)}
                    />
                    <label htmlFor={type}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
            <table className={styles.certificates_table}>
              <thead>
                <tr>
                  {currentColumns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => <tr key={job.defjob_id}>
                    {currentColumns.map((column) => (
                      <td key={column.key}>
                        {column.key === "publish_date" ?
                          new Date(job.publish_date).toISOString().split('T')[0]
                          : column.key === "job_user.name" ?
                            job.job_user.name
                            : column.key === "accepted_user" ?
                              job.accepted_user ? job.accepted_user.name : "Not Accepted"
                              : job[column.key]
                        }
                      </td>
                    ))}
                    <td>
                    <button className={styles.view_button} onClick={() => navigate(`/job/${job.defJob_id}`, {
                      })} >
                        <EyeFill />
                      </button>
                      <button onClick={handleDelete}className={styles.delete_button} >
                        <Trash />
                      </button>
                      
                    </td>
                  </tr>)
                ) : (
                  <tr>
                    <td colSpan={currentColumns.length + 1}>No jobs found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>

  );
};

export default AdminJobs;