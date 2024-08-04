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
      FetchJobsNoPagination("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjZmMmIyYmY1ZGY4OGRlYmU1ZTk2NzY1MWU3NDUwN2EzMTZkZDZlZjQ2MmYzZWMzMzFiNTc4ZTEyNGY4OTFiOTczM2IyZjI2MDM2Y2NjYTIiLCJpYXQiOjE3MjI2MTM2NDcuMzU4ODM4LCJuYmYiOjE3MjI2MTM2NDcuMzU4ODQyLCJleHAiOjE3NTQxNDk2NDcuMzUwNTA4LCJzdWIiOiIzNyIsInNjb3BlcyI6W119.EzPhKuouGT9I2LhZV98sP2wl3WYocg4XFgKRmkLUCIU0PoykjkLrktmLe0DNWd36UiqQ4W8Ts2Cn17vOBR2driDM_XrSmzsZ84sg9zkbEfAmqMPnmHuiXEkcUsaCZm2wfVukTWrYo21JDw9Ygg3H7LFbW4d0Q26CToBFzABdVdMbJzil_TUFRl9UnEkYywqpQ5I48mFivyFsytloCv6JHTmbf2yDadS7sRI6RuBQk9ayeRrO4wmay-0HXFMpxdUZYvX2XBpwHJBnNtDYieaB-A827SkTm8K1-W7Ly4CuKvhDRUc2RBPJqPwXA3WtozBge6UQ5CaxDfIpmW46fEIuRrt5YwMvUTBH2OuP-QeW9ZyWI90u0ROTh9uyUbDvGJ8qsIX4NFmolXx9EACYpKoNYnX-veMpCyvALJlAdRgX8Zd2H17jNbrXOD9spfie3vC8L0rwBN6orbY_Y07RbeRkZVL7Ba0u4uLdou7kO1vfGwTjUhja_QKDqLs8P2zaC62LgdN3cIzGT5HJ4tx7UN39XRk1i8sUAZ_1On0U1EhM2tcnHrtgrS6jVgftVwGxiAW5zumv_7KaDpSNTB9h-VoUIp0gNV3xXbB55m77Gf1sg3dDX2YSNl8kyvam-h-kAovMUhmTRQ7EDsmOdvFHaK02XqRvjCx0zM1rfFX4glVzZLU")
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