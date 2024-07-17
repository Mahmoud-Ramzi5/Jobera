import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { ThemeContext, ProfileContext } from '../../utils/Contexts';
import { FetchFile } from '../../apis/FileApi';
import styles from './cards.module.css';


const EducationCard = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context    
  const { theme } = useContext(ThemeContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const navigate = useNavigate();

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div className={styles.title}>
            {t('components.profile_cards.education.title')}
          </div>
        </Card.Header>
        <Card.Body>
          {ProfileData.education === null ?
            <p className={styles.no_data}>{t('components.profile_cards.education.no_data')}</p> :
            <>
              <p>{t('components.profile_cards.education.level')} {ProfileData.education.level}</p>
              <p>{t('components.profile_cards.education.field')} {ProfileData.education.field}</p>
              <p>{t('components.profile_cards.education.school')} {ProfileData.education.school}</p>
              <p>{t('components.profile_cards.education.start_date')} {ProfileData.education.start_date}</p>
              <p>{t('components.profile_cards.education.end_date')} {ProfileData.education.end_date}</p>
            </>
          }
          {profile.user_id === ProfileData.user_id ?
            <button
              type="button"
              className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
              onClick={() => navigate('/edit-education', {
                state: { edit: true }
              })}
            >
              {t('components.profile_cards.education.edit_education_button')}
            </button>
            : <></>}
          {ProfileData.education && ProfileData.education.certificate_file &&
            <button
              type="button"
              className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
              onClick={async () => {
                FetchFile("", ProfileData.education.certificate_file);
              }}
            >
              {t('components.profile_cards.education.show_certificate_button')}
            </button>
          }
        </Card.Body>
      </div>
    </Card>
  );
};

export default EducationCard;