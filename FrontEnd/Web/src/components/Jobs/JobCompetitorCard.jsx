import { useEffect, useState } from 'react';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';
import { FetchImage } from '../../apis/FileApi';
import img_holder from '../../assets/default.png';
import styles from './JobCompetitorCard.module.css';


const JobCompetitorCard = ({ CompetitorData }) => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (CompetitorData.user) {
      if (CompetitorData.user.avatar_photo) {
        FetchImage("", CompetitorData.user.avatar_photo).then((response) => {
          setPhoto(response);
        });
      }
    } else if (CompetitorData.individual) {
      if (CompetitorData.individual.avatar_photo) {
        FetchImage("", CompetitorData.individual.avatar_photo).then((response) => {
          setPhoto(response);
        });
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
            <StarFill />
          </i>
        );
      }

      if (hasHalfStar) {
        stars.push(
          <i key="half">
            <StarHalf />
          </i>
        );
      }
    } else {
      for (let i = 0; i < 5; i++) {
        stars.push(
          <i key={i}>
            <Star />
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
              <h4>
                {CompetitorData.job_type === "Freelancing" ?
                  <a className={styles.anchor} href={`/profile/${CompetitorData.user.user_id}/${CompetitorData.user.name}`}>{CompetitorData.user.name}</a> :
                  <a className={styles.anchor} href={`/profile/${CompetitorData.individual.user_id}/${CompetitorData.individual.full_name}`}>{CompetitorData.individual.full_name}</a>}
              </h4>
            </div>
            <div className={styles.CompetitorRating}>
              {CompetitorData.job_type == "Freelancing" ?
                RenderStars(CompetitorData.user.rating) :
                RenderStars(CompetitorData.individual.rating)}
            </div>
            {CompetitorData.job_type == "Freelancing" && (
              <p className={styles.salary}> ${CompetitorData.salary} </p>
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
