import { useTranslation } from 'react-i18next';
import styles from './little_card.module.css'


const LittleCard = ({ title, info }) => {
    // Translations
    const { t } = useTranslation('global');

    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.info}>{info}</div>
        </div>
    );
};

export default LittleCard;