import { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { StarFill, StarHalf } from "react-bootstrap-icons";
import styles from "./userinfo.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import EditMenu from "./EditMenu";
import { LoginContext } from "../../utils/Contexts";
import { UpdateProfilePicture, EditDescription } from "../../apis/ProfileApis";
import { FetchImage } from "../../apis/FileApi";

const UserInfo = ({ ProfileData }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const [description, setDescription] = useState(ProfileData.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [avatarPhotoPath, setAvatarPhotoPath] = useState(
    ProfileData.avatar_photo
  );
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  useEffect(() => {
    if (avatarPhotoPath) {
      FetchImage(accessToken, avatarPhotoPath).then((response) => {
        console.log(response)
        setAvatarPhoto(response);
      });
      setAvatarPhotoPath(null)
    }
  });
  const handleEditClick = () => {
    setIsEditingProfile(true);
    console.log(ProfileData);
  };

  const handleSaveClick = () => {
    window.location.reload(); // Refresh the page after deletion
    setIsEditingProfile(false);
  };

  const handleCancelClick = () => {
    // Cancel the changes
    setIsEditingProfile(false);
  };

  const handleShareProfile = () => {
    // Handle share profile logic
  };
  const handleEditPhoto = () => {
    setIsAddingPhoto(true);
  }
  const handlePhotoChange = (event) => {
    console.log(event.target.files[0])
    setAvatarPhoto(event.target.files[0]);
    UpdateProfilePicture(accessToken, event.target.files[0])
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log("Profile picture updated successfully");
        setIsAddingPhoto(false);
      }
    })
    .catch((error) => {
      // Handle error response, e.g. display an error message or log the error
      console.error("Error updating profile picture:", error);
    });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

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

    return stars;
  };

  const handleDescriptionChange = () => {
    EditDescription(accessToken, formattedDescription).then((response) => {
      if (response.status === 200) {
        console.log("Description updated successfully");
        setIsEditing(false);
      }
      else {
        console.log(response);
      }
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const formattedDescription = stripHtmlTags(description);

  return (
    <Card className={styles.user_info_card}>
      <div className={styles.user_info_inside}>
        <div className={styles.profile_picture_container}>
          <form className={styles.profile_picture_container}>
            <label htmlFor='photo' className={styles.img_holder}>
              {avatarPhoto ? (
                <Card.Img
                  className={styles.Card_Img}
                  variant="top"
                  src={URL.createObjectURL(avatarPhoto)}
                  alt={"picture"}
                  onClick={handleEditPhoto}
                  style={{ pointerEvents: 'none' }}
                />
              ) : (
                <Card.Img
                  className={styles.Card_Img}
                  variant="top"
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s"
                  }
                  alt={"picture"}
                  onClick={handleEditPhoto}
                  style={{ pointerEvents: 'none' }}
                />
              )}
              <div className={styles.profile_picture_overlay}>
                <div className={styles.profile_picture_text}>Change Photo</div>
              </div>
            </label>
            <input
              id="photo"
              type="file"
              placeholder="Photo"
              accept=".png,.jpg,.jpeg"
              onChange={handlePhotoChange} // Call handlePhotoChange when a file is selected
              style={{ visibility: 'hidden' }}
            />
          </form>
        </div>
        <div className={styles.info_in_profile}>
          <div className={styles.user_info_title}>
            <h3 className="card-title">
              {ProfileData.type === "individual" ? (
                ProfileData.full_name
              ) : ProfileData.type === "company" ? (
                ProfileData.name
              ) : (
                <></>
              )}
            </h3>
            <h4 className={styles.specification}>
              {ProfileData.specification}
            </h4>
            <h6 className={styles.location}>
              Location: {ProfileData.state}, {ProfileData.country}
            </h6>
            <div className={styles.rating}>
              <h6>
                Rating: {renderStars(ProfileData.rating)} {ProfileData.rating} (
                {ProfileData.reviews} reviews){" "}
              </h6>
            </div>
            {isEditing ? (
              <div className={styles.description}>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={handleEditorChange}
                />
              </div>
            ) : (
              <p className={styles.description}><b><strong>Description:</strong></b> {formattedDescription}</p>
            )}
            {isEditingProfile ? (
              <EditMenu
                data={ProfileData}
                onSave={handleSaveClick}
                onCancel={handleCancelClick}
              />
            ) : (
              <Button variant="primary" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}{" "}
            <Button variant="secondary" onClick={handleShareProfile}>
              Share
            </Button>{" "}
            {isEditing ? <Button className={styles.descriptionEdit} variant="success" onClick={handleDescriptionChange}>Save Description</Button> : <></>}
            <Button variant="info" onClick={toggleEdit}>
              {isEditing ? "Cancel" : "Edit Description"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
