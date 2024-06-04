import { useEffect, useState } from "react";
import styles from "./css/JobCometetorCard.module.css";
import img_holder from "../../assets/upload.png";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const JobCompetetorCard = ({ CompetetorData }) => {
  // Context
  //const { accessToken } = useContext(LoginContext);
  const [RegCompetetor, SetRegCompetetor] = useState({
    name: "",
    rating: "",
    description: "",
    photo: "",
  });
  const [FreelanceCompetetor, SetFreelanceCompetetor] = useState({
    name: "",
    rating: "",
    description: "",
    photo: "",
    salary: "",
  });
  useEffect(() => {
    if(CompetetorData.jobType=="Freelancing"){
      SetFreelanceCompetetor(CompetetorData);
    }
    else{
      SetRegCompetetor(CompetetorData);
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
          {CompetetorData ? (
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
          <h2 className={styles.name}>faff</h2>
          <div className={styles.CompetetorRating}>{RenderStars(4)}</div>
          <p className={styles.salary}>Salary: </p>
          </div>
          
          <p className={styles.CompetetorDescription}>fgaaa</p>
        </div>
      </div>
    </div>
  );
};
export default JobCompetetorCard;
