
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../utils/Contexts';
import { review } from '../apis/ProfileApis/ProfileApis';
import { BsStarFill } from 'react-icons/bs';
import styles from './rating.module.css'


const Rating = ({ title, reviewer_id, reviewed_id, jobEnded }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleRate = (event) => {
    event.preventDefault();
    review(accessToken, reviewer_id, reviewed_id, rating).then((response) => {
      if (response.status == 200) {
        console.log('Rated Successfully');
        setDone(true);
        jobEnded(true);
        navigate('/jobs/Freelancing');
      } else {
        console.log(response);
      }
    });
  }

  if (done === false) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.rating}>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label>
                <input
                  className={styles.my_stars}
                  type='radio'
                  name='rating'
                  value={currentRating}
                  onClick={() => { setRating(currentRating) }}
                />
                <BsStarFill className={styles.star}
                  color={currentRating <= (hover || rating) ? "#567EF5" : "#FFFFFF"}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <div className={styles.button_holder}>
          <button className={styles.submit} onClick={handleRate}>
            {t('components.rating.button_rate')}
          </button>
          <button className={styles.submit} onClick={() => {
            setDone(true);
            jobEnded(true);
            navigate('/jobs/Freelancing')
          }}
          >
            {t('components.rating.button_cancel')}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <></>
    );
  }
};

export default Rating;
