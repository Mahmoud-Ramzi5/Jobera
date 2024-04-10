import React from 'react';
import { Card, Button } from 'react-bootstrap';
import logo from '../../assets/JoberaLogo.png';
import styles from './cards.module.css';

const PortfolioCardList = () => {
  const portfolios = [
    {
      id: 1,
      title: 'Portfolio 1',
      photo: logo
    },
    {
      id: 2,
      title: 'Portfolio 2',
      photo: logo
    },
    {
      id: 3,
      title: 'Portfolio 3',
      photo: logo
    },
  ];

  return (
    <div className={styles.cards}>
      <div className={styles.portfolio_title}>Portfolios</div>
      <div className={styles.portfolio}>
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className={styles.portfolio_card}>
            <PortfolioCard title={portfolio.title} photo={portfolio.photo} />
          </div>
        ))}
      </div>
    </div>
  );
};

const PortfolioCard = ({ title, photo }) => {
  return (
    <Card>
      <div className={styles.background}>
        <Card.Img variant="top" src={photo} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </div>
    </Card>
  );
};

export default PortfolioCardList;