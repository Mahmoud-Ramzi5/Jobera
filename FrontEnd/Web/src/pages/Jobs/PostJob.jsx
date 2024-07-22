import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { ProfileContext } from '../../utils/Contexts';
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
            {t('pages.post_job.heading')}
          </h2>
          <div className={styles.all_cards}>
            {profile.type === "company" && <>
              <div className={styles.card_limit}>
                <Card onClick={handleFullTimeJob}>
                  <div className={styles.card_background}>
                    <Card.Img
                      className={styles.Card_Img}
                      variant="top"
                      src={FullTimeJob}
                      alt='FullTimeJob'
                    />
                    <Card.Title className={styles.title}>
                      {t('pages.post_job.title_fulltime')}
                    </Card.Title>
                  </div>
                </Card>
              </div>
              <div className={styles.card_limit}>
                <Card onClick={handlePartTimeJob}>
                  <div className={styles.card_background}>
                    <Card.Img
                      className={styles.Card_Img}
                      variant="top"
                      src={PartTimeJob}
                      alt='PartTimeJob'
                    />
                    <Card.Title className={styles.title}>
                      {t('pages.post_job.title_parttime')}
                    </Card.Title>
                  </div>
                </Card>
              </div>
            </>}
            <div className={styles.card_limit}>
              <Card onClick={handleFreelancingJob}>
                <div className={styles.card_background}>
                  <Card.Img
                    className={styles.Card_Img}
                    variant="top"
                    src={FreelancingJob}
                    alt='FreelancingJob'
                  />
                  <Card.Title className={styles.title}>
                    {t('pages.post_job.title_freelancing')}
                  </Card.Title>
                </div>
              </Card>
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