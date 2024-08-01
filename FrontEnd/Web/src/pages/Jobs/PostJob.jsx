import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { ProfileContext } from '../../utils/Contexts';
import { BsSuitcaseLg, BsClockHistory } from 'react-icons/bs';
import { FaLaptopCode } from 'react-icons/fa'
import PostRegJob from '../../components/Jobs/PostRegJob';
import PostFreelancing from '../../components/Jobs/PostFreelancing';
import FullTimeJob from '../../assets/fullTimeJob.png'
import PartTimeJob from '../../assets/partTimeJob.png'
import FreelancingJob from '../../assets/freelancingJob.png'
import styles from './post_job.module.css'


const PostJob = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { profile } = useContext(ProfileContext);
  // Define states
  const [type, setType] = useState('')

  const handleFullTimeJob = (event) => {
    setType('FullTime');
  }

  const handlePartTimeJob = (event) => {
    setType('PartTime');
  }

  const handleFreelancingJob = (event) => {
    setType('Freelancing');
  }


  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>
            {t('pages.post_job.heading1')}{' '}
            {type === 'FullTime' ? t('pages.post_job.title_fulltime')
              : type === 'PartTime' ? t('pages.post_job.title_parttime')
                : type === 'Freelancing' ? t('pages.post_job.title_freelancing')
                  : ''}{' '}
            {t('pages.post_job.heading2')}
          </h2>
          <div className={styles.all_cards}>
            {profile.type === "company" && <>
              <div className={styles.card_limit}>
                <BsSuitcaseLg className={styles.job_icon} onClick={handleFullTimeJob} />
                <h5 className={styles.title}>{t('pages.post_job.title_fulltime')}</h5>
              </div>
              <div className={styles.card_limit}>
                <BsClockHistory className={styles.job_icon} onClick={handlePartTimeJob} />
                <h5 className={styles.title}>{t('pages.post_job.title_parttime')}</h5>
              </div>
            </>}
            <div className={styles.card_limit}>
              <FaLaptopCode className={styles.job_icon} onClick={handleFreelancingJob} />
              <h5 className={styles.title}>{t('pages.post_job.title_freelancing')}</h5>
            </div>
          </div>
          {type ?
            (type === 'FullTime' ? <PostRegJob type={type} />
              : (type === 'PartTime' ? <PostRegJob type={type} />
                : type === 'Freelancing' && <PostFreelancing />))
            : <></>}
        </div>
      </div>
    </div>
  );
};

export default PostJob;