import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { StarFill, StarHalf } from "react-bootstrap-icons";
import styles from "./userinfo.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import EditMenu from "./EditMenu";

const UserInfo = ({ ProfileData }) => {
  const [description, setDescription] = useState(ProfileData.description);
  const [isEditing, setIsEditing] = useState(false);
  const[isEditingProfile,setIsEditingProfile]=useState(false);
  const handleEditClick = () => {
    setIsEditingProfile(true);
    console.log(ProfileData)
  };

  const handleSaveClick = () => {
    
    // Save the changes
    setIsEditingProfile(false);
  };

  const handleCancelClick = () => {
    // Cancel the changes
    setIsEditingProfile(false);
  };

  const handleShareProfile = () => {
    // Handle share profile logic
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
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s"
            className={styles.profile_picture}
            alt="Profile Image"
          />
          <div className={styles.profile_picture_overlay}>
            <div className={styles.profile_picture_text}>Change Photo</div>
          </div>
        </div>
        <div className={styles.info_in_profile}>
          <div className={styles.user_info_title}>
            <h3 className="card-title">{ProfileData.full_name}</h3>
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
              <p className={styles.description}>{formattedDescription}</p>
            )}
              {isEditingProfile ? (
                <EditMenu
                  data={ProfileData}
                  onSave={handleSaveClick}
                  onCancel={handleCancelClick}
                />
              ) : (
                <Button variant="primary" onClick={handleEditClick}>Edit Profile</Button>
              )}{" "}
            <Button variant="secondary" onClick={handleShareProfile}>
              Share
            </Button>{" "}
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
