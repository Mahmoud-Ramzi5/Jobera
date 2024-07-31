import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FetchImage } from '../../apis/FileApi';
import img_holder from '../../assets/noImage.jpg';
import styles from './offers.module.css';


const OfferCard = ({ JobData, CompetitorData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Define states
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (JobData) {
      if (JobData.photo) {
        FetchImage("", JobData.photo).then((response) => {
          setPhoto(response);
        });
      }
    }
  }, []);


  return (
    <div className={styles.offer_card}>
      <div className={styles.content}>
        <div className={styles.photo_container}>
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="Uploaded Photo"
              style={{ pointerEvents: "none" }}
              className={styles.photo}
            />
          ) : (
            <img
              src={img_holder}
              alt="Photo Placeholder"
              style={{ pointerEvents: "none" }}
              className={styles.photo}
            />
          )}{" "}
        </div>
        <div className={styles.containers}>
          <div className={styles.info_container}>
            <div className={styles.container1}>
              <h3 className={styles.title}>
                {JobData.title}
              </h3>
              <h6 className={styles.type}>
                {t('components.offer.type')} {CompetitorData.job_type}
              </h6>
            </div>
            <div className={styles.container2}>
              {CompetitorData.job_type == "Freelancing" && (
                <span className={styles.offer}>
                  {t('components.offer.offer')} ${CompetitorData.offer}
                </span>
              )}
              <h6 className={styles.status}>
                {t('components.offer.status')} {JobData.status}
              </h6>
            </div>
          </div>
          <p className={styles.description_container}>
            {CompetitorData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
