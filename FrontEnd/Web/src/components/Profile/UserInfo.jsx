import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { StarFill, StarHalf } from 'react-bootstrap-icons';
import styles from './userinfo.module.css';


const UserInfo = ({ profileData }) => {
  const handleEditProfile = () => {
    // Handle edit profile logic
  };

  const handleShareProfile = () => {
    // Handle share profile logic
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i}><StarFill /></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half"><StarHalf /></i>);
    }

    return stars;
  };

  return (
    <Card className={styles.user_info_card}>
      <div className={styles.user_info_inside}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s" className={styles.profile_picture} alt="Profile Image" />
        <div className={styles.info_in_profile}>
          <div className={styles.user_info_title}>
            <h3 className="card-title">{profileData.fullName}</h3>
            <h4 className={styles.specification}>{profileData.specification}</h4>
            <h6 className={styles.location}>Location: {profileData.state}, {profileData.country}</h6>
            <div className={styles.rating}><h6>Rating: {renderStars(profileData.rating)} {profileData.rating} ({profileData.reviews} reviews) </h6></div>
            <p className={styles.description}>{profileData.description}</p>
            <Button variant="primary" onClick={handleEditProfile}>
              Edit Profile
            </Button>
            {' '}
            <Button variant="secondary" onClick={handleShareProfile}>
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;