import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { PenFill } from 'react-bootstrap-icons';
import { ThemeContext } from '../../App';
import Logo from '../../assets/JoberaLogo.png'
import styles from './ZCard.module.css'
import SlicingAraayInput from './SlicingAraayInput';


const ZCard = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    let dataArray = ["first","second","third","fourth","fifth","sixth","seventh","eighth","nineth"];
    const [specific, setspecific] = useState(5);
    const [showmore, setshowmore] = useState(false);

    /*
            // Perform get skills logic (Call api)
            fetch("http://127.0.0.1:8000/api/skills", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': "application/json",
                    'connection': 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate, br'
                },
                body: JSON.stringify(
                    {
                    "skills": skills,
                    })
                })
                .then((response) => {
                    if (!response.ok) {
                    throw new Error(response.status);
                    }
                    else {
                    return response.json();
                    }
                })
                .then((data) => {
                    // Do somthing with the token return from Server data['token'] 
                    console.log(data)
                    dataArray=data;
                })
                .catch(error => {
                    // Handle errors
                    setfailedMessage('Sorry something went wrong');
                    console.log(error);
                });
    */




return(
    <>
        <>
            <Card style={{ width: '18rem' }} className={styles.card2}>
                <div className={styles.background}>
                    <div>
                    <Card.Header className={styles.titlesplace}><div className={styles.title}>Personal Certifications</div></Card.Header>
                    </div>
                    <Card.Body>
                    <img src = {Logo} alt="an image" className={styles.logo}/>
                    <Card.Text>
                        click on the button to display your cirtificates
                    </Card.Text>
                    <button type="button"  className={(theme==="theme-light")?"btn btn-outline-dark":"btn btn-outline-light"} onClick={() => navigate('/Certificates')}>Show Certificates</button>
                    </Card.Body>
                </div>
            </Card>
            <br />
        </>
        <>
            <Card style={{ width: '18rem' }} className={styles.card3}>
                <div className={styles.background}> 
                <Card.Header className={styles.titlesplace}>
                    <div>
                        <div className={styles.title}>Top skills</div>
                        <button type="button" className={styles.pen_button} onClick={() => navigate('/EditSkills')}><i className={styles.pen}><PenFill /></i></button>
                    </div>
                    
                </Card.Header>
                <Card.Body>
                    {dataArray.length === 0 ? (<div className={styles.nullmessage}>no skills to display</div>) : (
                    <>
                    {/* Here shold be the top skills */}
                        <SlicingAraayInput dataArray={dataArray} first={0} last={specific} />
                        {
                            showmore === false
                        ? (
                            <button type="button" className={styles.skills_button}  onClick={() => {setspecific(dataArray.length);setshowmore(true)}}>view more</button>
                        ) : (
                            <button type="button" className={styles.skills_button}  onClick={() => {setspecific(5);setshowmore(false)}}>view less</button>
                        )
                }
                </>
                )}
                </Card.Body>
                </div>
            </Card>
            <br />
        </>
    </>
)

};

export default ZCard;
