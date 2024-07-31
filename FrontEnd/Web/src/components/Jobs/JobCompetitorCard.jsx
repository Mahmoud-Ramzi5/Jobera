import { useEffect, useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf, BsPersonCheckFill } from 'react-icons/bs';
import { FetchImage } from '../../apis/FileApi';
import img_holder from '../../assets/default.png';
import styles from './JobCompetitorCard.module.css';


const JobCompetitorCard = ({ CompetitorData, AcceptedCompetitor }) => {
  const [photo, setPhoto] = useState(null);
  const [accepted, setAccepted] = useState(false);

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
              <p className={styles.salary}> ${CompetitorData.offer} </p>
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
