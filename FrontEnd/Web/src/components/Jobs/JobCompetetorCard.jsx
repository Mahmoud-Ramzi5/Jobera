import { useEffect, useState } from "react";
import styles from "./css/JobCometetorCard.module.css";
import img_holder from "../../assets/upload.png";
import { FetchImage } from "../../apis/FileApi";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const JobCompetetorCard = ({ CompetetorData }) => {
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    CompetetorData.jobType == "Freelancing"
    if (CompetetorData.user) {
      if(CompetetorData.user.avatar_photo){FetchImage("", CompetetorData.user.avatar_photo).then((response) => {
        setPhoto(response);
      });}
    }else if(CompetetorData.individual) {
      if(CompetetorData.individual.avatar_photo){FetchImage("", CompetetorData.individual.avatar_photo).then((response) => {
        setPhoto(response);
      });}
    }
  });
  // Context
  //const { accessToken } = useContext(LoginContext);
  // const [RegCompetetor, SetRegCompetetor] = useState({
  //   name: "",
  //   rating: "",
  //   description: "",
  //   photo: "",
  // });
  // const [FreelanceCompetetor, SetFreelanceCompetetor] = useState({
  //   name: "",
  //   rating: "",
  //   description: "",
  //   photo: "",
  //   salary: "",
  // });
  // useEffect(() => {
  //   if(CompetetorData.jobType=="Freelancing"){
  //     SetFreelanceCompetetor(CompetetorData);
  //   }
  //   else{
  //     SetRegCompetetor(CompetetorData);
  //   }
  // }, []);
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
            <div className={styles.name}><h2>{CompetetorData.individual && CompetetorData.individual.full_name ? (CompetetorData.individual.full_name) : (CompetetorData.user.name)}</h2></div>
            <div className={styles.CompetetorRating}>
              {CompetetorData.individual ?
                RenderStars(CompetetorData.individual.rating) :
                RenderStars(CompetetorData.user.rating)}
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
