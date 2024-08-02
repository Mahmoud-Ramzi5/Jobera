import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'react-bootstrap';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { UpdateProfilePicture, EditDescription } from '../../apis/ProfileApis/ProfileApis';
import { FetchImage } from '../../apis/FileApi';
import EditMenu from './EditMenu';
import defaultUser from '../../assets/default.png';
import styles from './userinfo.module.css';


const UserInfo = ({ ProfileData }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define state
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [description, setDescription] = useState(ProfileData.description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    if (ProfileData.avatar_photo) {
      FetchImage(accessToken, ProfileData.avatar_photo).then((response) => {
        setAvatarPhoto(response);
      });
    }
  });

  const handlePhotoChange = (event) => {
    const image = event.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (image && allowedImageTypes.includes(image.type)) {
      setAvatarPhoto(image);
      UpdateProfilePicture(accessToken, image).then((response) => {
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

  const StripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const formattedDescription = StripHtmlTags(description);

  const handleDescriptionChange = () => {
    EditDescription(accessToken, formattedDescription).then((response) => {
      if (response.status === 200) {
        ProfileData.description = formattedDescription;
        setIsEditingDescription(false);
      }
      else {
        console.log(response.statusText);
      }
    });
  };
  /* --------------------------------- */

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
    }
    else {
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
                src={defaultUser}
                alt={"Default Picture"}
                style={{ pointerEvents: 'none' }}
              />
            )}
            {profile.user_id === ProfileData.user_id ?
              <span className={styles.profile_picture_overlay}>
                <span className={styles.profile_picture_text}>
                  {t('components.profile_cards.user_info.picture_text')}
                </span>
              </span>
              : <></>}
          </label>
          {profile.user_id === ProfileData.user_id ?
            <input
              id="photo"
              type="file"
              placeholder="Photo"
              accept=".png,.jpg,.jpeg"
              onChange={handlePhotoChange}
              style={{ visibility: 'hidden' }}
            />
            : <></>}
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
            {t('components.profile_cards.user_info.location')} {ProfileData.state}, {ProfileData.country}
          </h6>
          <h6 className={styles.rating}>
            {t('components.profile_cards.user_info.rating')} {RenderStars(ProfileData.rating)} (
            {ProfileData.reviews} {t('components.profile_cards.user_info.reviews')}){" "}
          </h6>
          <div className={styles.description}>
            {isEditingDescription ? (
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleEditorChange}
              />
            ) : (
              <p><b>{t('components.profile_cards.user_info.description')}</b> {ProfileData.description}</p>
            )}
          </div>
          {profile.user_id === ProfileData.user_id ?
            <>
              {isEditingProfile ? (
                <EditMenu
                  data={ProfileData}
                  onClose={() => setIsEditingProfile(false)}
                />
              ) : (
                <Button variant="primary" onClick={() => setIsEditingProfile(true)}>
                  {t('components.profile_cards.user_info.edit_Profile_button')}
                </Button>
              )}{" "}
              {isEditingDescription ? (
                <><Button variant="success" onClick={handleDescriptionChange}>
                  {t('components.profile_cards.user_info.save_description_button')}
                </Button>{" "}
                  <Button variant="danger" onClick={() => {
                    setDescription(ProfileData.description);
                    setIsEditingDescription(false)
                  }}>
                    {t('components.profile_cards.user_info.cancel_button')}
                  </Button></>
              ) : (
                <Button variant="info" onClick={() => setIsEditingDescription(true)}>
                  {t('components.profile_cards.user_info.edit_Description_button')}
                </Button>
              )}{" "}
            </> : <></>}
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
