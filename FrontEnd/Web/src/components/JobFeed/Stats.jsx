import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../../utils/Contexts.jsx';
import { StatsAPI } from '../../apis/JobFeedApis.jsx';
import styles from './stats.module.css';


const Stats = () => {
  // Translations
  const { t } = useTranslation('global');
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

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      StatsAPI(accessToken).then((response) => {
        if (response.status === 200) {
          setDone_jobs(response.data.total_done_jobs);
          setExhibiting_companies(response.data.total_exhibiting_companies);
          setRegistered_individual(response.data.total_registered_individual);
          setRunnning_fullTimeJob(response.data.total_runnning_fullTimeJob_posts);
          setRunnning_partTimeJob(response.data.total_runnning_partTimeJob_posts);
          setRunnning_freelancingJob(response.data.total_runnning_freelancingJob_posts);
        } else {
          console.log(response.statusText);
        }
      });
    }
  }, []);


  return (
    <div className={styles.stats_container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-1.svg" alt="" />
          <div>
            <span className={styles.number}>{done_jobs}</span>
            <span className={styles.label}>{t('pages.job_feed.stats.label1')}</span>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.selfEnd}`}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-3.svg" alt="" />
          <div>
            <span className={styles.number}>{exhibiting_companies}</span>
            <span className={styles.label}>{t('pages.job_feed.stats.label2')}</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{registered_individual}</span>
            <span className={styles.label}>{t('pages.job_feed.stats.label3')}</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{runnning_fullTimeJob}</span>
            <span className={styles.label}>{t('pages.job_feed.stats.label4')}</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{runnning_partTimeJob}</span>
            <span className={styles.label}>{t('pages.job_feed.stats.label5')}</span>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <img className="block" src="saturn-assets/images/stats/chat-icon-2.svg" alt="" />
          <div>
            <span className={styles.number}>{runnning_freelancingJob}</span>
            <span className={styles.label}>{t('pages.job_feed.stats.label6')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
