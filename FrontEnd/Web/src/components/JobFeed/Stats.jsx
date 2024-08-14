import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../../utils/Contexts.jsx";
import { StatsAPI } from "../../apis/JobFeedApis.jsx";
import styles from "./stats.module.css";

const Stats = () => {
  // Translations
  const { t, i18n } = useTranslation("global");
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [statsData, setStatsData] = useState([]);

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
      {statsData.map((stat, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.content}>
            <img
              className="block"
              src="saturn-assets/images/stats/chat-icon-1.svg"
              alt=""
            />
            <div>
              <span className={styles.number}>{stat.data}</span>
              <span className={styles.label}>
                {stat.name[i18n.language]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
