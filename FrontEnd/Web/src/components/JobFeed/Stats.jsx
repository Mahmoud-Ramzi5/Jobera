import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../../utils/Contexts.jsx";
import { StatsAPI } from "../../apis/JobFeedApis.jsx";
import styles from "./stats.module.css";

const Stats = () => {
  // Translations
  const { t } = useTranslation("global");
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [done_jobs, setDone_jobs] = useState(0);
  const [exhibiting_companies, setExhibiting_companies] = useState(0);
  const [registered_individual, setRegistered_individual] = useState(0);
  const [runnning_fullTimeJob, setRunnning_fullTimeJob] = useState(0);
  const [runnning_partTimeJob, setRunnning_partTimeJob] = useState(0);
  const [runnning_freelancingJob, setRunnning_freelancingJob] = useState(0);
  const [stats_data, setStatsData] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      StatsAPI(accessToken).then((response) => {
        if (response.status === 200) {
          setStatsData(response.data.stats);
        } else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

  return (
    <div className={styles.stats_container}>
      {stats_data.map((stat, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.content}>
            <img
              className="block"
              src="saturn-assets/images/stats/chat-icon-1.svg"
              alt=""
            />
            <div>
              <span className={styles.number}>{stat.data}</span>
              <span className={styles.label}>{stat.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
