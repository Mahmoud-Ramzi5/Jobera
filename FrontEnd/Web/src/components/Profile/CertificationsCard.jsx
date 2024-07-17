import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { ThemeContext } from '../../utils/Contexts';
import certificate from '../../assets/certificate.png'
import styles from './cards.module.css';


const CertificationsCard = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context    
  const { theme } = useContext(ThemeContext);
  // Define states
  const navigate = useNavigate();

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div className={styles.title}>
            {t('components.profile_cards.certifications.title')}
          </div>
        </Card.Header>
        <Card.Body>
          <div className={styles.cer_img}>
            <img src={certificate} alt="Certificate" />
          </div>
          <Card.Text>
            {t('components.profile_cards.certifications.card_text')}
          </Card.Text>
          <button
            type="button"
            className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
            onClick={() => navigate(`/certificates/${ProfileData.user_id}/${ProfileData.full_name}`, {
              state: { edit: true }
            })
            }
          >
            {t('components.profile_cards.certifications.button')}
          </button>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CertificationsCard;