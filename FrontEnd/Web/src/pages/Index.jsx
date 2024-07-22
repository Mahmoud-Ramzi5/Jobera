import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import Slide1 from '../assets/Slide1.png';
import Slide2 from '../assets/Slide2.png';
import Slide3 from '../assets/Slide3.png';
import styles from '../styles/index.module.css';

const Index = () => {
  // Context
  const { loggedIn } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleNavigateJobs = (event) => {
    if (loggedIn) {
      event.preventDefault();
      navigate('/jobs/all');
    }
    else {
      navigate('/login');
    }
  };

  const handlePostJob = (event) => {
    if (loggedIn) {
      event.preventDefault();
      if (profile.type === "individual") {
        navigate('/jobs/postfreelancing');
      } else {
        navigate('/jobs/post');
      }
    }
    else {
      navigate('/login');
    }
  };

  return (
    <>
      <Carousel className={styles.carousel} activeIndex={index} onSelect={handleSelect} pause='hover'>
        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide1})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>Find Your Next Dream Job</span>
              <p>Easiest way to find a perfect job</p>
              <div className={styles.carousel_buttons}>
                <button onClick={handleNavigateJobs}>Looking For a job?</button>
                <button onClick={handlePostJob}>Post a job</button>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide2})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>Second Slide Label</span>
              <p>GG</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide3})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>Third Slide Label</span>
              <p>GG</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className={styles.container1}>
        <div className={styles.container2}>
          <span>1000+</span>
          <h2>Browse From Our Top Jobs</h2>
          <p>The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.</p>
        </div>
      </div>
    </>
  );
};

export default Index;