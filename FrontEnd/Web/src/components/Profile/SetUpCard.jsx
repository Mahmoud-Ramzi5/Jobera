import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { ThemeContext } from '../../App.jsx';
import styles from './cards.module.css';


const SetUpCard = ({ ProfileData, token }) => {
  // Context    
  const { theme } = useContext(ThemeContext);
  // Define states
  const navigate = useNavigate();

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div className={styles.title}>Setup Profile</div>
        </Card.Header>
        <Card.Body>
          <Card.Title>Continue your registeration:</Card.Title>
          <Card.Text>
            Please click the following button then follow the instructions to complete your regisetration.
          </Card.Text>
          <button
            type="button"
            className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
            onClick={() => navigate('/complete-register', {
              state: {
                edit: false,
                token: token,
                skills: ProfileData.skills,
                education: ProfileData.education,
                certificates: ProfileData.certificates,
                Portfolios: ProfileData.Portfolios,
              }
            }
            )}>
            Set yourself up
          </button>
        </Card.Body>
      </div>
    </Card>
  )
}

export default SetUpCard;