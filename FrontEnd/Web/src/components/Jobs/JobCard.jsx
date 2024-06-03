//import { LoginContext } from '../../utils/Contexts.jsx';
import { useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import img_holder from '../../assets/upload.png';
import styles from './jobcard.module.css';

const JobCard = ({ JobData }) => {
    // Context
    //const { accessToken } = useContext(LoginContext);
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState(null);
    const [salary, setSalary] = useState(0);
    const [type, setType] = useState(null);


    // return (
    //     <Card className={styles.cards}>
    //         <div className={styles.background}>
    //             <Card.Header className={styles.titles}>
    //                 <div className={styles.title}></div>
    //             </Card.Header>
    //             <Card.Body>
    //                 <Card.Title>The great job</Card.Title>
    //                 <Card.Text>
    //                     <p className={styles.type}>Type: {type}</p>
    //                     <p>Salary: ${salary}</p>
    //                     <p> Published by: { } </p>
    //                 </Card.Text>
    //                 <div className={styles.imageholder}>
    //                     {photo ? (
    //                         <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
    //                     ) : (
    //                         <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
    //                     )}
    //                 </div>
    //             </Card.Body>
    //         </div>
    //     </Card>
    // )
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.info}>
                    <h5 className={styles.title}>the great job{JobData.title}</h5>
                    <p className={styles.type}>Type: {JobData.type}</p>
                    <p>Salary: ${salary}</p>
                    <p> Published by: { } </p>
                </div>
                <div className={styles.imageholder}>
                    {photo ? (
                        <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                    ) : (
                        <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobCard;