import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import styles from './cards.module.css';

const PortfolioCardList = ({ ProfileData }) => {
  // Define states
  const navigate = useNavigate();
  const portfolios = ProfileData.portfolios.slice(0, 3);

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
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
        <div className={styles.portfolio}>
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className={styles.portfolio_div}>
              <Link to={`/portfolio/${portfolio.id}`}>
                <PortfolioCard title={portfolio.title} photo={portfolio.photo} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const PortfolioCard = ({ title, photo }) => {
  return (
    <Card className={styles.portfolio_card}>
      <div className={styles.portfolio_background}>
        <Card.Img variant="top" src={photo} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </div>
    </Card>
  );
};

export default PortfolioCardList;