import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { PenFill } from 'react-bootstrap-icons';
import { ThemeContext } from '../../App.jsx';
import SlicingArrayInput from './SlicingArrayInput';
import styles from './cards.module.css';


const SkillsCard = ({ ProfileData }) => {
  // Context    
  const { theme } = useContext(ThemeContext);
  // Define states
  const navigate = useNavigate();
  const [specific, setSpecific] = useState(5);
  const [showMore, setShowMore] = useState(false);

  let dataArray = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "nineth"];

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
                edit: true,
              }
              )}>
              <i className={styles.pen}><PenFill /></i>
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          {dataArray.length === 0 ? (<div className={styles.no_skills}>no skills to display</div>) : (<>
            {/* Here shold be the top skills */}
            <SlicingArrayInput dataArray={dataArray} first={0} last={specific} />
            {showMore === false ? (
              <button
                type="button"
                className={styles.skills_button}
                onClick={() => { setSpecific(dataArray.length); setShowMore(true) }}>
                view more
              </button>
            ) : (
              <button
                type="button"
                className={styles.skills_button}
                onClick={() => { setSpecific(5); setShowMore(false) }}>
                view less
              </button>
            )}
          </>)}
        </Card.Body>
      </div>
    </Card>
  )
}

export default SkillsCard;