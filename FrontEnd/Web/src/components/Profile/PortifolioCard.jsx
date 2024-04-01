import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import logo from '../../assets/JoberaLogo.png';
//import './css/UserInfo.css';

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
    }
  ];

  return (
    <div className="Portfolios-card">
      <h4>Portfolios</h4>
      <div className="row">
        {portfolios.map((portfolio) => (
          <div className="col-md-4" key={portfolio.id}>
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
      <Card.Img variant="top" src={photo} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};
export default PortfolioCardList;