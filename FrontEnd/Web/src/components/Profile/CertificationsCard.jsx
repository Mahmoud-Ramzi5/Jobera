import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { ThemeContext } from '../../utils/Contexts';
import certificate from '../../assets/certificate.png'
import styles from './cards.module.css';


const CertificationsCard = () => {
  // Context    
  const { theme } = useContext(ThemeContext);
  // Define states
  const navigate = useNavigate();

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div className={styles.title}>Personal Certifications</div>
        </Card.Header>
        <Card.Body>
          <div className={styles.cer_img}>
            <img src={certificate} alt="Certificate" />
          </div>
          <Card.Text>
            Click on the button to display your certificates
          </Card.Text>
          <button
            type="button"
            className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
            onClick={() => navigate('/certificates', {
              state: { edit: true }
            })}
          >
            Show Certificates
          </button>
        </Card.Body>
      </div>
    </Card>
  )
}

export default CertificationsCard;