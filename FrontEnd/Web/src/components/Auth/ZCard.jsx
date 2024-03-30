import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import Logo from '../../assets/JoberaLogo.png'
import styles from './ZCard.module.css'
import SlicingAraayInput from './SlicingAraayInput';
const ZCard = () => {
    const navigate = useNavigate();
    const dataArray = ['Item 1', 'Item 2', 'Item 3','Item 4','Item 5','Item 6','Item 7','Item 8'];
    const [specific, setspecific] = useState(5);
    const [showmore, setshowmore] = useState(false);




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
                <button type="button" className={`${styles.register_button} btn btn-outline-dark`} onClick={() => navigate('/ContineRegisteration')}>set yourself up</button>
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
                <button type="button" className={`${styles.certificate_button} btn btn-outline-dark`} onClick={() => navigate('/Certificates')}>Show Certificates</button>
                </Card.Body>
            </Card>
            <br />
        </>
        <>
            <Card style={{ width: '18rem' }} className={styles.card3}>
                <Card.Header>Top skills
                    <button type="button" className={styles.pen_button} onClick={() => navigate('/EditSkills')}><i className={`${styles.pen} fa-solid fa-pen-clip`}></i></button>
                </Card.Header>
                <Card.Body>
                    {/* Here shold be the top skills */}
                        <SlicingAraayInput dataArray={dataArray} first={0} last={specific} />
                        {
        showmore === false
            ? (
                <button type="button" className={`${styles.skills_button} btn btn-outline-dark`} onClick={() => {setspecific(dataArray.length);setshowmore(true)}}>view more</button>
            ) : (
                <button type="button" className={`${styles.skills_button} btn btn-outline-dark`} onClick={() => {setspecific(5);setshowmore(false)}}>view less</button>
            )
    }
                </Card.Body>
            </Card>
            <br />
        </>
    </>
)

};

export default ZCard;
