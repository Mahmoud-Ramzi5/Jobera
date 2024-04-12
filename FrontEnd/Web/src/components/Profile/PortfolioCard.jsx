import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
    <Card className={styles.cards}>
      <div className={styles.background}>
        <div className={styles.portfolio_title}>Portfolio         
        <Button className={styles.view_all} variant="primary" as={Link} to="/portfolio">View All</Button>
        </div>
        <div className={styles.portfolio}>
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className={styles.portfolio_card}>
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
    <Card className={styles.portifolio_card}>
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