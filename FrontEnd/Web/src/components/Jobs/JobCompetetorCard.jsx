import { useEffect, useState } from 'react';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';
import { FetchImage } from '../../apis/FileApi';
import img_holder from '../../assets/upload.png';
import styles from './css/JobCometetorCard.module.css';


const JobCompetetorCard = ({ CompetetorData }) => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (CompetetorData.user) {
      if (CompetetorData.user.avatar_photo) {
        FetchImage("", CompetetorData.user.avatar_photo).then((response) => {
          setPhoto(response);
        });
      }
    } else if (CompetetorData.individual) {
      if (CompetetorData.individual.avatar_photo) {
        FetchImage("", CompetetorData.individual.avatar_photo).then((response) => {
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
    <div className={styles.CompetetorCard}>
      <div className={styles.CompetetorCardContent}>
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
                {CompetetorData.jobType === "Freelancing" ?
                  (CompetetorData.user && CompetetorData.user.full_name ?
                    (CompetetorData.user.full_name) : (CompetetorData.user.name)) :
                  (CompetetorData.individual.full_name)}
              </h4>
            </div>
            <div className={styles.CompetetorRating}>
              {CompetetorData.jobType == "Freelancing" ?
                RenderStars(CompetetorData.user.rating) :
                RenderStars(CompetetorData.individual.rating)}
            </div>
            {CompetetorData.jobType == "Freelancing" ? (
              <p className={styles.salary}>{CompetetorData.salary} </p>
            ) : (
              <></>
            )}
          </div>

          <p className={styles.CompetetorDescription}>
            {CompetetorData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCompetetorCard;
