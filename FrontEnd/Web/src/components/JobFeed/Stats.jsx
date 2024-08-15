import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  BsPeopleFill, BsBuildingsFill, BsBriefcaseFill,
  BsLaptopFill, BsClockHistory, BsCheck
} from 'react-icons/bs';
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

  const icons = {
    1: <BsCheck />,
    2: <BsPeopleFill />,
    3: <BsBriefcaseFill />,
    4: <BsClockHistory />,
    5: <BsLaptopFill />,
    6: <BsBuildingsFill />,
    7: <BsBriefcaseFill />,
    8: <BsClockHistory />,
    9: <BsLaptopFill />,
  };

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
            <span className={styles.number}>{stat.data}</span>
            <i className={styles.icon}>{icons[stat.id]}</i>
          </div>
          <span className={styles.label}>
            {stat.name[i18n.language]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
