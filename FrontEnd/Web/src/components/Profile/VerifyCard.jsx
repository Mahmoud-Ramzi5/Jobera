import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { ThemeContext, ProfileContext, LoginContext } from '../../utils/Contexts';
import { RequestEmailAPI } from '../../apis/AuthApis';
import styles from './cards.module.css';


const VerifyCard = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context    
  const { theme } = useContext(ThemeContext);
  const { profile } = useContext(ProfileContext);
  const { accessToken } = useContext(LoginContext);
  // Define states
  const [message, setMessage] = useState("");

  const handleVerify = () => {
    RequestEmailAPI(accessToken).then((response) => {
      if (response.status === 200) {
        setMessage("Verification Email Has been sent");
      } else {
        setMessage("Your Email is Invalid");
      }
    });
  }


  return (
    profile.user_id === ProfileData.user_id ? message === "" ?
      <Card className={styles.cards}>
        <div className={styles.background}>
          <Card.Header className={styles.titles}>
            <div className={styles.title}>
              {t('components.profile_cards.verify.title')}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {t('components.profile_cards.verify.card_title')}
            </Card.Title>
            <Card.Text>
              {t('components.profile_cards.verify.card_text')}
            </Card.Text>
            <button
              type="button"
              onClick={() => handleVerify()}
              className={(theme === "theme-light") ?
                "btn btn-outline-dark" : "btn btn-outline-light"}
            >
              {t('components.profile_cards.verify.button')}
            </button>
          </Card.Body>
        </div>
      </Card >
      : <Card className={styles.cards}>
        <div className={styles.background}>
          <Card.Header className={styles.titles}>
            <div className={styles.title}>
              {t('components.profile_cards.verify.title')}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {t('components.profile_cards.verify.card_title')}
            </Card.Title>
            <Card.Text>
              {message}
            </Card.Text>
          </Card.Body>
        </div>
      </Card >
      : <></>
  );
};

export default VerifyCard;
