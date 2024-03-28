import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import Logo from '../../assets/JoberaLogo.png'
import styles from './ZCard.module.css'
const ZCard = () => {
    const navigate = useNavigate();




return(
    <>
        <>
            <Card style={{ width: '18rem' }} className={styles.card1}>
                <Card.Header>Setup Profile</Card.Header>
                <Card.Body>
                <Card.Title>continue your registeration:</Card.Title>
                <Card.Text>
                    please click the following button then follow the instructions to complete your regisetration
                </Card.Text>
                <button type="button" class="btn btn-outline-dark" className={styles.register_button}>set yourself up</button>
                </Card.Body>
            </Card>
            <br />
        </>
        <>
            <Card style={{ width: '18rem' }} className={styles.card2}>
                <div>
                <Card.Header>Personal Certifications</Card.Header>
                </div>
                <Card.Body>
                <img src = {Logo} alt="an image" className={styles.logo}/>
                <Card.Text>
                    click on the button to display your cirtificates
                </Card.Text>
                <button type="button" class="btn btn-outline-dark" className={styles.certificate_button}>Show Certificates</button>
                </Card.Body>
            </Card>
            <br />
        </>
        <>
            <Card style={{ width: '18rem' }} className={styles.card3}>
                <Card.Header>Setup Profile</Card.Header>
                <Card.Body>
                <Card.Title>continue your registeration:</Card.Title>
                <Card.Text>
                    please click the following button then follow the instructions to complete your regisetration
                </Card.Text>
                <button type="button" class="btn btn-outline-dark" className={styles.skills_button}>set yourself up</button>
                </Card.Body>
            </Card>
            <br />
        </>

    </>
)

};

export default ZCard;
