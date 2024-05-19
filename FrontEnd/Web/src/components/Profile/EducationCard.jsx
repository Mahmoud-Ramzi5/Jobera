import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { ThemeContext } from '../../utils/Contexts';
import { FetchFile } from '../../apis/FileApi';
import styles from './cards.module.css';


const EducationCard = ({ ProfileData }) => {
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
          {ProfileData.education === null ? <p className={styles.no_data}>No education to display</p> :
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
          {ProfileData.education !== null && ProfileData.education.certificate_file &&
            <button
              type="button"
              className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
              onClick={async () => {
                FetchFile("", ProfileData.education.certificate_file);
              }}
            >
              Show certificate
            </button>
          }
        </Card.Body>
      </div>
    </Card>
  )
}

export default EducationCard;