import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { ThemeContext } from '../../App.jsx';
import styles from './cards.module.css';


const EducationCard = ({ ProfileData, token }) => {
  // Context    
  const { theme } = useContext(ThemeContext);
  // Define states
  const navigate = useNavigate();

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div className={styles.title}>Education</div>
        </Card.Header>
        <Card.Body>
          {ProfileData.education === null ? <></> :
            <>
              <p>Level: {ProfileData.education.level}</p>
              <p>Field: {ProfileData.education.field}</p>
              <p>School: {ProfileData.education.school}</p>
              <p>Start date: {ProfileData.education.start_date}</p>
              <p>End date: {ProfileData.education.end_date}</p>
            </>
          }
          <button
            type="button"
            className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
            onClick={() => navigate('/education', {
              state: { edit: true, education: ProfileData.education }
            })}
          >
            Edit education
          </button>
        </Card.Body>
      </div>
    </Card>
  )
}

export default EducationCard;