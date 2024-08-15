import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { ThemeContext, ProfileContext, LoginContext } from '../../utils/Contexts';
import styles from './cards.module.css';
import { hasLoadedNamespace } from 'i18next';
import { VerifyEmailAPI } from '../../apis/AuthApis';


const VerifyCard = ({ ProfileData }) => {
    // Translations
    const { t } = useTranslation('global');
    // Context    
    const { theme } = useContext(ThemeContext);
    const { profile } = useContext(ProfileContext);
    const { accessToken } = useContext(LoginContext);
    const [message, setMessage] = useState("");
    // Define states
    const handleVerify = () => {
        VerifyEmailAPI(accessToken).then((response) => {
            if (response.status == 200) {
                setMessage("Verification Email Has been sent");
            }
            else {
                console.log(response);
                setMessage("Your Email is Invalid");
            }
        })
    }

    return (
        profile.user_id === ProfileData.user_id ?message ===""?
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
                            className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
                            onClick={() => handleVerify()}>
                            {t('components.profile_cards.verify.button')}
                        </button>
                    </Card.Body>
                </div>
            </Card >
            :<Card className={styles.cards}>
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