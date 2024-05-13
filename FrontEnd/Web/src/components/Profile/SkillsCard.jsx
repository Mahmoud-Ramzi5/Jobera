import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { PenFill } from 'react-bootstrap-icons';
import SlicingArrayInput from './SlicingArrayInput';
import styles from './cards.module.css';


const SkillsCard = ({ ProfileData }) => {
  // Define states
  const navigate = useNavigate();
  const [specific, setSpecific] = useState(5);
  const [showMore, setShowMore] = useState(false);

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div>
            <div className={styles.title}>Top skills</div>
            <button
              type="button"
              className={styles.pen_button}
              onClick={() => navigate('/edit-skills', {
                state: { edit: true, skills: ProfileData.skills }
              }
              )}>
              <i className={styles.pen}><PenFill /></i>
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          {ProfileData.skills === null || ProfileData.skills.length === 0 ? <p className={styles.no_data}>No skills to display</p> :
            <>
              {/* Here should be the top skills */}
              <SlicingArrayInput dataArray={ProfileData.skills} first={0} last={specific} />
              {showMore === false ?
                <button
                  type="button"
                  className={styles.skills_button}
                  onClick={() => { setSpecific(ProfileData.skills.length); setShowMore(true) }}>
                  view more
                </button>
                :
                <button
                  type="button"
                  className={styles.skills_button}
                  onClick={() => { setSpecific(5); setShowMore(false) }}>
                  view less
                </button>
              }
            </>
          }
        </Card.Body>
      </div>
    </Card>
  )
}

export default SkillsCard;