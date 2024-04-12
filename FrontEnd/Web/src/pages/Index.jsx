import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slide1 from '../assets/Slide1.png';
import Slide2 from '../assets/Slide2.png';
import Slide3 from '../assets/Slide3.jpg';
import styles from '../styles/index.module.css';

const Index = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel className={styles.carousel} activeIndex={index} onSelect={handleSelect} pause='hover'>
        <Carousel.Item className={styles.carousel_item} style={{ backgroundImage: `url(${Slide1})`, backgroundSize: 'cover' }}>
          <Carousel.Caption className={styles.carousel_caption}>
            <div className={styles.carousel_container}>
              <span>Find Your Next Dream Job</span>
              <p>Easiest way to find a perfect job</p>
              <button>Looking For a job?</button>
              <button>Post a job</button>
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
    </>
  );
};

export default Index;