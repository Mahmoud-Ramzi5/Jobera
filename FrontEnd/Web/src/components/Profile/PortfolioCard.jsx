import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FetchImage } from '../../apis/FileApi';
import img_holder from '../../assets/upload.png';
import styles from './cards.module.css';

const PortfolioCard = ({ ProfileData }) => {
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      ProfileData.portfolios.slice(0, 3).map((portfolio) => {
        if (portfolio.photo) {
          FetchImage("", portfolio.photo).then((response) => {
            portfolio.photo = response;
            setPortfolios((prevState) => ([...prevState, portfolio]));
          });
        }
        else {
          setPortfolios((prevState) => ([...prevState, portfolio]));
        }
      });
    }
  });

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div className={styles.portfolio_title}>
            Portfolio
            <Button className={styles.portfolio_button} variant="primary"
              onClick={() => navigate('/portfolios', {
                state: { edit: true }
              })}
            >
              View All
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <div className={styles.portfolio}>
            {portfolios === null || portfolios.length === 0 ? <p className={styles.no_data}>No portfolio to display</p> :
              portfolios.map((portfolio) => (
                <div key={portfolio.id} className={styles.portfolio_div}>
                  <Link to={`/portfolio/${portfolio.id}`} state={{ portfolio }}>
                    <Portfolio title={portfolio.title} photo={portfolio.photo} />
                  </Link>
                </div>
              ))}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

const Portfolio = ({ title, photo }) => {
  return (
    <Card className={styles.portfolio_card}>
      <div className={styles.portfolio_background}>
        {photo ? (
          <Card.Img
            className={styles.Card_Img}
            variant="top"
            src={URL.createObjectURL(photo)}
            alt={title + "picture"}
          />
        ) : (
          <Card.Img
            className={styles.Card_Img}
            variant="top"
            src={img_holder}
            alt={title + "picture"}
          />
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </div>
    </Card>
  );
};

export default PortfolioCard;