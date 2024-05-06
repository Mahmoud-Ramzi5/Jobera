import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import styles from './portfolio.module.css';

const Portfolio = ({ title, photo }) => {

    return (
        <Card>
            <div className={styles.portfolio_background}>
                <Card.Img variant="top" src={photo} alt={title + "picture"} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
            </div>
        </Card>
    );
};

export default Portfolio;