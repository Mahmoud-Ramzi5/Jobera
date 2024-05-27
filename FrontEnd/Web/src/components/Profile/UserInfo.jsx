import { useContext, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginContext } from '../../utils/Contexts';
import { UpdateProfilePicture, EditDescription } from '../../apis/ProfileApis';
import { FetchImage } from '../../apis/FileApi';
import EditMenu from './EditMenu';
import styles from './userinfo.module.css';


const UserInfo = ({ ProfileData }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const [description, setDescription] = useState(ProfileData.description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const avatarPhotoPath = ProfileData.avatar_photo;

  useEffect(() => {
    if (avatarPhotoPath) {
      FetchImage(accessToken, avatarPhotoPath).then((response) => {
        setAvatarPhoto(response);
      });
    }
  });

  const handleShareProfile = () => {
    // TODO
  };

  const handlePhotoChange = (event) => {
    const image = event.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (image && allowedImageTypes.includes(image.type)) {
      setAvatarPhoto(image);
      UpdateProfilePicture(accessToken, image)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.message);
          } else {
            console.log(response.statusText);
          }
        });
    } else {
      console.log("Invalid Image type. Please select a PNG, JPG, JPEG image.");
    }
  };

  /* Description */
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleDescriptionChange = () => {
    EditDescription(accessToken, formattedDescription).then((response) => {
      if (response.status === 200) {
        console.log(response.data.message);
        setIsEditingDescription(false);
      }
      else {
        console.log(response.statusText);
      }
    });
  };

  const StripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const formattedDescription = StripHtmlTags(description);
  /* --------------------------------- */

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
    }
    else {
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
    <Card className={styles.user_info_card}>
      <div className={styles.user_info_inside}>
        <form className={styles.profile_picture_container}>
          <label htmlFor='photo'>
            {avatarPhoto ? (
              <Card.Img
                className={styles.Card_Img}
                variant="top"
                src={URL.createObjectURL(avatarPhoto)}
                alt={"Profile Picture"}
                style={{ pointerEvents: 'none' }}
              />
            ) : (
              <Card.Img
                className={styles.Card_Img}
                variant="top"
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s"
                }
                alt={"Picture"}
                style={{ pointerEvents: 'none' }}
              />
            )}
            <span className={styles.profile_picture_overlay}>
              <span className={styles.profile_picture_text}>Change Photo</span>
            </span>
          </label>
          <input
            id="photo"
            type="file"
            placeholder="Photo"
            accept=".png,.jpg,.jpeg"
            onChange={handlePhotoChange}
            style={{ visibility: 'hidden' }}
          />
        </form>
        <div className={styles.info_in_profile}>
          <h2 className={styles.user_info_title}>
            {ProfileData.type === "individual" ? (
              ProfileData.full_name
            ) : ProfileData.type === "company" ? (
              ProfileData.name
            ) : (
              <>Error</>
            )}
          </h2>
          <h6 className={styles.location}>
            Location: {ProfileData.state}, {ProfileData.country}
          </h6>
          <h6 className={styles.rating}>
            Rating: {RenderStars(ProfileData.rating)} (
            {ProfileData.reviews} reviews){" "}
          </h6>
          <div className={styles.description}>
            {isEditingDescription ? (
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleEditorChange}
              />
            ) : (
              <p><b>Description:</b> {formattedDescription}</p>
            )}
          </div>
          {isEditingProfile ? (
            <EditMenu
              data={ProfileData}
              onSave={() => setIsEditingProfile(false)}
              //onCancel={() => setIsEditingProfile(false)}
            />
          ) : (
            <Button variant="primary" onClick={() => setIsEditingProfile(true)}>
              Edit Profile
            </Button>
          )}{" "}
          {/*<Button variant="secondary" onClick={handleShareProfile}>
            Share
          </Button>{" "}*/}
          {isEditingDescription ? (
            <><Button variant="success" onClick={handleDescriptionChange}>
              Save Description
            </Button>{" "}
              <Button variant="danger" onClick={() => setIsEditingDescription(!isEditingDescription)}>
                Cancel
              </Button></>
          ) : (
            <Button variant="info" onClick={() => setIsEditingDescription(!isEditingDescription)}>
              Edit Description
            </Button>
          )}{" "}
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
