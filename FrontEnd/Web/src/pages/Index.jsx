import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { LoginContext } from '../utils/Contexts.jsx';
import LittleCard from '../components/LittleCard.jsx';
import Slide1 from '../assets/Slide1.png';
import Slide2 from '../assets/Slide3.png';
import Slide3 from '../assets/Slide2.png';
import picture1 from '../assets/typing.gif';
import picture2 from '../assets/laptop_with_apps.png';
import styles from '../styles/index.module.css';

const Index = () => {
  // Context
  const { loggedIn } = useContext(LoginContext);
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
      navigate('/jobs/post');
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
              <span>No.1 job app in syria</span>
              <p>Jobera is the most reliable job app in Syria because of it's awesome features and comfortable use</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide3})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>We always listen</span>
              <p>we would love to hear about your experience using the app or the defficulties you encountered to help improve your experience and assure your satisfaction </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className={styles.container1}>
        <div className={styles.container2}>
          <span className={styles.great_title}>What is Jobera?</span>
          <h2>Jobera is an app that specializes in posting and accepting jobs and surves two types of users companies and individuals</h2>
          <br />
          <br />
          <span className={styles.mini_title}>Jobera's services</span>
          <div className={styles.two_sides}>
            <div className={styles.four_cards}>
              <span className={styles.card_holder}>
                <LittleCard title={'Posting jobs '} info={'Jobera gives you the ability to post jobs based on your needs easly and provides the best experience along with low costs'} />
                <LittleCard title={'Viewig jobs'} info={'Jobera makes it easier for you to view varient types of jobs and search through them to get what will suit you best'} />
              </span>
              <span className={styles.card_holder}>
                <LittleCard title={'paying system'} info={'you can trust us with your money, The transactions are done smoothly between users and recrded for further view'} />
                <LittleCard title={'Chat system'} info={'Jobera provides the ability to chat between job maker and job accepters inside the app to make sure work is going smoothly'} />
              </span>
            </div>
            <div className={styles.picture}>
              <img className={styles.image} src={picture1}></img>
            </div>
          </div>
          <div className={styles.bar}></div>
          <br />
          <span className={styles.great_title}>Why Jobera?</span>
          <h2>Jobera is the best Job app because of it's awsome features that gives the user the best experience</h2>
          <br />
          <br />
          <span className={styles.mini_title}>Some of Jobera's features</span>
          <div className={styles.two_sides}>
            <div className={styles.four_cards}>
              <span className={styles.card_holder}>
                <LittleCard title={'Varient job types'} info={'Jobera provides to the users three types of jobs (fulltime, parttime, freelancing) which they can easily be accessed through the navbar'} />
                <LittleCard title={'Job feed'} info={'A page designed specialy to provide the users with the informations about best jobs or the best deals in particular time'} />
              </span>
              <span className={styles.card_holder}>
                <LittleCard title={'Comfortable system'} info={"It's easy to manage your account and activity like your jobs or the jobs you participated to and even being able to change your information if you want"} />
                <LittleCard title={'Interactive interfaces'} info={'Jobera has great interfaces that are responsive, clear and even beautiful which will provide best experience '} />
              </span>
            </div>
            <div className={styles.picture}>
              <img className={styles.image} src={picture2}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;