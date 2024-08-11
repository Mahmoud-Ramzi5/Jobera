import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsEyeFill, BsTrash } from "react-icons/bs";
import { LoginContext } from "../../utils/Contexts";
import {
  DeleteFreelancingJobAPI,
  DeleteRegJobAPI, FetchJobsNoPagination
} from "../../apis/JobsApis.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";


const AdminJobs = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobsData, setJobsData] = useState(null);
  const [jobType, setJobType] = useState("FullTime");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchJobsNoPagination(accessToken).then((response) => {
        if (response.status === 200) {
          setJobsData(response.data);
        } else {
          console.log(response);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

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

  const columnStructure = {
    FullTime: [
      { key: "title", label: t('components.admin.jobs_table.column_structure.title') },
      { key: "job_user.name", label: t('components.admin.jobs_table.column_structure.company') },
      { key: "publish_date", label: t('components.admin.jobs_table.column_structure.post_date') },
      { key: "salary", label: t('components.admin.jobs_table.column_structure.salary') },
      { key: "accepted_user", label: t('components.admin.jobs_table.column_structure.accepted_user') },
    ],
    PartTime: [
      { key: "title", label: t('components.admin.jobs_table.column_structure.title') },
      { key: "job_user.name", label: t('components.admin.jobs_table.column_structure.company') },
      { key: "publish_date", label: t('components.admin.jobs_table.column_structure.post_date') },
      { key: "salary", label: t('components.admin.jobs_table.column_structure.salary') },
      { key: "accepted_user", label: t('components.admin.jobs_table.column_structure.accepted_user') },
    ],
    Freelancing: [
      { key: "title", label: t('components.admin.jobs_table.column_structure.title') },
      { key: "job_user.name", label: t('components.admin.jobs_table.column_structure.client') },
      { key: "deadline", label: t('components.admin.jobs_table.column_structure.deadline') },
      { key: "avg_salary", label: t('components.admin.jobs_table.column_structure.avg_salary') },
      { key: "accepted_user", label: t('components.admin.jobs_table.column_structure.accepted_user') },
    ],
  };

  const currentColumns = columnStructure[jobType];

  const filteredJobs = jobsData && jobsData[jobType]
    ? jobsData[jobType].filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];


  if (isLoading) {
    return <Clock />;
  }
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        {jobsData === null ? <Clock /> :
          <div>
            <div>
              <h1>{t('components.admin.jobs_table.h1')}</h1>
              <div className={styles.search_bar}>
                <input
                  type="text"
                  placeholder={t('components.admin.jobs_table.search')}
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
                      onChange={() => setJobType(type)}
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
                  <th>{t('components.admin.jobs_table.actions')}</th>
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
                              job.accepted_user ?
                                job.accepted_user.name
                                : t('components.admin.jobs_table.not_accepted')
                              : job[column.key]
                        }
                      </td>
                    ))}
                    <td>
                      <button className={styles.view_button} onClick={() => navigate(`/job/${job.defJob_id}`)} >
                        <BsEyeFill />
                      </button>
                      <button onClick={handleDelete} className={styles.delete_button} >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>)
                ) : (
                  <tr>
                    <td colSpan={currentColumns.length + 1}>{t('components.admin.jobs_table.no_jobs')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default AdminJobs;
