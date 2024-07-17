import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { ThemeContext, ProfileContext } from '../../utils/Contexts';
import styles from './cards.module.css';


const SetUpCard = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context    
  const { theme } = useContext(ThemeContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const navigate = useNavigate();

  return (
    profile.user_id === ProfileData.user_id ?
      <Card className={styles.cards}>
        <div className={styles.background}>
          <Card.Header className={styles.titles}>
            <div className={styles.title}>
              {t('components.profile_cards.set_up.title')}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {t('components.profile_cards.set_up.card_title')}
            </Card.Title>
            <Card.Text>
              {t('components.profile_cards.set_up.card_text')}
            </Card.Text>
            <button
              type="button"
              className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
              onClick={() => navigate('/complete-register', { state: { edit: false } })}>
              {t('components.profile_cards.set_up.button')}
            </button>
          </Card.Body>
        </div>
      </Card >
      : <></>
  );
};

export default SetUpCard;