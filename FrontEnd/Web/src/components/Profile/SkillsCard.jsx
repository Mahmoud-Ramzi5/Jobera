import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { BsPenFill } from 'react-icons/bs';
import { ProfileContext } from '../../utils/Contexts';
import { SlicedArray } from '../SlicingInput';
import styles from './cards.module.css';


const SkillsCard = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context    
  const { profile } = useContext(ProfileContext);
  // Define states
  const navigate = useNavigate();
  const [specific, setSpecific] = useState(5);
  const [showMore, setShowMore] = useState(false);

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div>
            <div className={styles.title}>
              {t('components.profile_cards.skills.title')}
            </div>
            {profile.user_id === ProfileData.user_id &&
              <button
                type="button"
                className={styles.pen_button}
                onClick={() => navigate('/edit-skills', {
                  state: { edit: true }
                }
                )}>
                <i className={styles.pen}><BsPenFill /></i>
              </button>
            }
          </div>
        </Card.Header>
        <Card.Body>
          {ProfileData.skills === null || ProfileData.skills.length === 0 ?
            <p className={styles.no_data}>
              {t('components.profile_cards.skills.no_data')}
            </p> :
            <>
              {/* Here should be the top skills */}
              <SlicedArray dataArray={ProfileData.skills} first={0} last={specific} />
              {showMore === false ?
                <button
                  type="button"
                  className={styles.skills_button}
                  onClick={() => { setSpecific(ProfileData.skills.length); setShowMore(true) }}
                >
                  {t('components.profile_cards.skills.view_more')}
                </button>
                :
                <button
                  type="button"
                  className={styles.skills_button}
                  onClick={() => { setSpecific(5); setShowMore(false) }}
                >
                  {t('components.profile_cards.skills.view_less')}
                </button>
              }
            </>
          }
        </Card.Body>
      </div>
    </Card>
  );
};

export default SkillsCard;