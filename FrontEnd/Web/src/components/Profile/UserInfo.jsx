import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import logo from '../../assets/JoberaLogo.png';
import styles from './userinfo.module.css';

const UserInfo = () => {
  const profileData = {
    name: 'John Doe',
    rating: 4.5,
    reviews: 3,
    location: 'New York, USA',
    profilePhoto: logo,
    specification: 'software engineer',
    description: "sdhklfjhfdskjahfksjldhgklwrhoiwrugfowfowigfwoegfwioegfwieohgfwkjdgfsjhkagfeiwgfiewogfiewgfkjhsdgfjhksdgfiewtfigedwikcigsdavckyewafgcmndsahvfukywaemjfvyiyuweakfvykuesdmjvceuwkafjgjskdfewyukafgkyewuaftgyvawkuefgywkaugfkwuagfkawuf"
  };

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
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }

    return stars;
  };

  return (
    <Card className={styles.user_info_card}>
      <div className={`${styles.user_info_inside} row g-0`}>
        <div className={`${styles.profile_picture} col-md-4`}>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s" alt="Profile" />
        </div>
        <div className="col-md-8">
          <div className={styles.user_info_title} >
            <h3 className="card-title">{profileData.name}</h3>
            <h4 className={styles.specification}>{profileData.specification}</h4>
            <h6 className={styles.location}>Location: {profileData.location}</h6>
            <div className={styles.rating}><h6>Rating: {renderStars(profileData.rating)} {profileData.rating} ({profileData.reviews} reviews) </h6></div>
            <p className={styles.description}>{profileData.description}</p>
            <Button variant="primary" onClick={handleEditProfile}>
              Edit Profile
            </Button>{' '}
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