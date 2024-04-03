import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../../App';
import styles from './ZCard.module.css'

const Set_upCard = ()=>{
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();



return(
    <>
    <Card style={{ width: '18rem' }} className={styles.card1}>
        <div className={styles.background}>
            <Card.Header className={styles.titlesplace}><div className={styles.title}>Setup Profile</div></Card.Header>
            <Card.Body>
            <Card.Title>continue your registeration:</Card.Title>
            <Card.Text>
                please click the following button then follow the instructions to complete your regisetration
            </Card.Text>
            <button type="button" className={(theme==="theme-light")?"btn btn-outline-dark":"btn btn-outline-light"} onClick={() => navigate('/ContineRegisteration')}>set yourself up</button>
            </Card.Body>
        </div>
    </Card>
    <br />
    </>
    )
}
export default Set_upCard;