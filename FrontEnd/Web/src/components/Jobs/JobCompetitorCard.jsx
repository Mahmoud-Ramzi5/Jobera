import { useEffect, useState, useContext } from 'react';
import { BsStar, BsStarFill, BsStarHalf, BsPersonCheckFill } from 'react-icons/bs';
import { FetchImage } from '../../apis/FileApi';
import NormalInput from '../NormalInput';
import { LoginContext } from '../../utils/Contexts';
import { ChangeOffer } from '../../apis/JobsApis';
import { useTranslation } from 'react-i18next';
import { BsCurrencyDollar } from 'react-icons/bs';
import img_holder from '../../assets/default.png';
import styles from './JobCompetitorCard.module.css';


const JobCompetitorCard = ({ CompetitorData, AcceptedCompetitor, CurrentUser, JobId }) => {
  const { t } = useTranslation('global');
  const { accessToken } = useContext(LoginContext);
  const [photo, setPhoto] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [changing, setChanging] = useState(false);
  const [newOffer, setNewOffer] = useState('');
  const [adminShare, setAdminShare] = useState(0);

  useEffect(() => {
    if (CompetitorData.user) {
      if (CompetitorData.user.avatar_photo) {
        FetchImage("", CompetitorData.user.avatar_photo).then((response) => {
          setPhoto(response);
        });
      }
      if (CompetitorData.user.user_id === AcceptedCompetitor) {
        setAccepted(true);
      }
    }
  }, []);

  const RenderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    if (rating > 0) {
      for (let i = 0; i < fullStars; i++) {
        stars.push(
          <i key={i}>
            <BsStarFill />
          </i>
        );
      }

      if (hasHalfStar) {
        stars.push(
          <i key="half">
            <BsStarHalf />
          </i>
        );
      }
    } else {
      for (let i = 0; i < 5; i++) {
        stars.push(
          <i key={i}>
            <BsStar />
          </i>
        );
      }
    }
    return stars;
  };

  const handleCalculateNewOffer = (amount) => {
    setNewOffer(amount);
    if (amount <= 2000 && amount > 0) {
      setAdminShare(amount * 0.15);
    } else if (amount > 2000 && amount <= 15000) {
      setAdminShare(amount * 0.12);
    } else if (amount > 15000) {
      setAdminShare(amount * 0.10);
    } else {
      console.log('bad amount of money detected')
      setAdminShare(0);
    }
  };

  const handleNewOffer = () => {
    ChangeOffer(
      accessToken,
      JobId,
      newOffer
    ).then((response) => {
      if (response.status == 200) {
        console.log('changed offer');
      } else {
        console.log(response);
      }
      setNewOffer('');
      setAdminShare('');
      setChanging(false);
      window.location.reload();
    });
  }

  return (
    <div className={styles.CompetitorCard}>
      <div className={styles.CompetitorCardContent}>
        <div className={styles.photoContainer}>
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
        <div className={styles.info_container}>
          <div className={styles.namer}>
            <div className={styles.name}>
              {accepted && <BsPersonCheckFill />}
              <h4>
                <a className={styles.anchor} href={`/profile/${CompetitorData.user.user_id}/${CompetitorData.user.name}`}>{CompetitorData.user.name}</a>
              </h4>
            </div>
            <div className={styles.CompetitorRating}>
              {RenderStars(CompetitorData.user.rating)}
            </div>
            {CompetitorData.job_type == "Freelancing" && (
              <div className={styles.offer_and_change}>
                <p className={styles.salary}> ${CompetitorData.offer} </p>
                {CompetitorData.user.user_id === CurrentUser && AcceptedCompetitor === null && !changing &&
                  <button className={styles.change_offer} onClick={() => { setChanging(true) }}>Change offer</button>}
                {changing ? <>
                  <div className={styles.money_holder}>
                    <NormalInput
                      type='number'
                      placeholder={t('components.show_job.desired_salary')}
                      icon={<BsCurrencyDollar />}
                      value={newOffer}
                      setChange={handleCalculateNewOffer}
                    />
                    <br />
                    <p>{t('components.show_job.tax')} {newOffer - adminShare} $</p>
                  </div>
                  <div className={styles.buttons_holder}>
                    <button className={styles.send_button} onClick={handleNewOffer}>
                      {t('components.show_job.send_button')}
                    </button>
                    <button className={styles.send_button} onClick={() => { setChanging(false); setNewOffer(''); setAdminShare('') }}>
                      {t('components.show_job.cancel_button')}
                    </button>
                  </div>
                </> : <></>}
              </div>
            )}
          </div>
          <p className={styles.CompetitorDescription}>
            {CompetitorData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCompetitorCard;
