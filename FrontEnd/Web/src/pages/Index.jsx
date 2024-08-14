import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-bootstrap/Carousel';
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import Slide1 from '../assets/Slide1.png';
import Slide2 from '../assets/Slide3.png';
import Slide3 from '../assets/Slide2.png';
import Picture1 from '../assets/typing.gif';
import Picture2 from '../assets/laptop_with_apps.png';
import styles from '../styles/index.module.css';


const Index = () => {
  // Translations
  const { t } = useTranslation('global');
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
    if (profile.user_id == 1) {
      navigate('/');
    } else if (loggedIn) {
      event.preventDefault();
      navigate('/jobs/post');
    } else {
      navigate('/login');
    }
  };


  return (
    <>
      <Carousel className={styles.carousel} activeIndex={index} onSelect={handleSelect} pause='hover'>
        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide1})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>{t('pages.Index.slide1.span')}</span>
              <p>{t('pages.Index.slide1.p')}</p>
              <div className={styles.carousel_buttons}>
                <button onClick={handleNavigateJobs}>{t('pages.Index.slide1.button1')}</button>
                <button onClick={handlePostJob}>{t('pages.Index.slide1.button2')}</button>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide2})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>{t('pages.Index.slide1.span')}</span>
              <p>{t('pages.Index.slide1.p')}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide3})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>{t('pages.Index.slide3.span')}</span>
              <p>{t('pages.Index.slide3.span')}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className={styles.container1}>
        <div className={styles.container2}>
          <span className={styles.great_title}>
            {t('pages.Index.great_title1')}
          </span>
          <h2>{t('pages.Index.h2_1')}</h2>
          <br />
          <br />
          <span className={styles.mini_title}>
            {t('pages.Index.mini_title1')}
          </span>
          <div className={styles.two_sides}>
            <div className={styles.four_cards}>
              <span className={styles.card_holder}>
                <LittleCard
                  title={t('pages.Index.little_card1.title')}
                  info={t('pages.Index.little_card1.info')}
                />
                <LittleCard
                  title={t('pages.Index.little_card2.title')}
                  info={t('pages.Index.little_card2.info')}
                />
              </span>
              <span className={styles.card_holder}>
                <LittleCard
                  title={t('pages.Index.little_card3.title')}
                  info={t('pages.Index.little_card3.info')}
                />
                <LittleCard
                  title={t('pages.Index.little_card4.title')}
                  info={t('pages.Index.little_card4.info')}
                />
              </span>
            </div>
            <div className={styles.picture}>
              <img className={styles.image} src={Picture1}></img>
            </div>
          </div>
          <div className={styles.bar}></div>
          <br />
          <span className={styles.great_title}>
            {t('pages.Index.great_title2')}
          </span>
          <h2>{t('pages.Index.h2_2')}</h2>
          <br />
          <br />
          <span className={styles.mini_title}>
            {t('pages.Index.mini_title2')}
          </span>
          <div className={styles.two_sides}>
            <div className={styles.four_cards}>
              <span className={styles.card_holder}>
                <LittleCard
                  title={t('pages.Index.little_card5.title')}
                  info={t('pages.Index.little_card5.info')}
                />
                <LittleCard
                  title={t('pages.Index.little_card6.title')}
                  info={t('pages.Index.little_card6.info')}
                />
              </span>
              <span className={styles.card_holder}>
                <LittleCard
                  title={t('pages.Index.little_card7.title')}
                  info={t('pages.Index.little_card7.info')}
                />
                <LittleCard
                  title={t('pages.Index.little_card8.title')}
                  info={t('pages.Index.little_card8.info')}
                />
              </span>
            </div>
            <div className={styles.picture}>
              <img className={styles.image} src={Picture2}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LittleCard = ({ title, info }) => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>{info}</div>
    </div>
  );
};

export default Index;
