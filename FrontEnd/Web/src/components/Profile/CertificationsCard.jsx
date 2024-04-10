import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../../App.jsx';
import styles from './cards.module.css';


const CertificationsCard = () => {
  // Context    
  const { theme } = useContext(ThemeContext);
  // Define states
  const navigate = useNavigate();

  return (
    <Card className={styles.cards}>
      <div className={styles.background}>
        <Card.Header className={styles.titles}>
          <div className={styles.title}>Personal Certifications</div>
        </Card.Header>
        <Card.Body>
          <div className={styles.cer_img}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s" alt="an image" />
          </div>
          <Card.Text>
            Click on the button to display your cirtificates
          </Card.Text>
          <button
            type="button"
            className={(theme === "theme-light") ? "btn btn-outline-dark" : "btn btn-outline-light"}
            onClick={() => navigate('/Certificates')}>
            Show Certificates
          </button>
        </Card.Body>
      </div>
    </Card>
  )
}

export default CertificationsCard;