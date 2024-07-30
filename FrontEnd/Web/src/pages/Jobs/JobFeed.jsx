import { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../../utils/Contexts';
import { JopFeedAPI } from '../../apis/JobFeedApis';
import Stats from '../../components/JobFeed/Stats';
import Tops from '../../components/JobFeed/Tops';
import Clock from '../../utils/Clock';
import styles from '../../styles/JobFeed.module.css';


const JobFeed = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [MostNeededSkills, setMostNeededSkills] = useState([]);
  const [MostPayedRegJobs, setMostPayedRegJobs] = useState([]);
  const [MostPayedFreelancingJobs, setMostPayedFreelancingJobs] = useState([]);
  const [MostPostingCompanies, setMostPostingCompanies] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      JopFeedAPI(accessToken).then((response) => {
        if (response.status === 200) {
          setMostNeededSkills(response.data.MostNeededSkills);
          setMostPayedRegJobs(response.data.MostPayedRegJobs);
          setMostPayedFreelancingJobs(response.data.MostPayedFreelancingJobs);
          setMostPostingCompanies(response.data.MostPostingCompanies);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);


  if (isLoading) {
    return <Clock />
  }
  return (
    <div className={styles.page_container}>
      <div className={styles.posts_container}>
        <div className={styles.post}>
          <Tops jobs={MostNeededSkills} title={t('pages.job_feed.tops.title1')} />
        </div>
        <div className={styles.post}>
          <Tops jobs={MostPayedRegJobs} title={t('pages.job_feed.tops.title2')} />
        </div>
        <div className={styles.post}>
          <Tops jobs={MostPayedFreelancingJobs} title={t('pages.job_feed.tops.title3')} />
        </div>
        <div className={styles.post}>
          <Tops jobs={MostPostingCompanies} title={t('pages.job_feed.tops.title4')} />
        </div>
      </div>
      <Stats />
    </div>
  );
};

export default JobFeed;
