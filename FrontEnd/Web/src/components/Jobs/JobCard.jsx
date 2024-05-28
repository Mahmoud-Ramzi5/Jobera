//import { LoginContext } from '../../utils/Contexts.jsx';
import { useState, useContext } from 'react';
import img_holder from '../../assets/upload.png';
import styles from './jobcard.module.css';

const JobCard = () => {
    // Context
    //const { accessToken } = useContext(LoginContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [salary, setSalary] = useState('');
    const [type, setType] = useState(null);



    return (<div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.info}>
                <p className={styles.title}>Title: {title}</p>
                <p className={styles.description}>Description: {description}</p>
                <p className={styles.salary}>Salary: ${salary}</p>
                <p className={styles.type}>type: {type}</p>
            </div>
            <div className={styles.imageholder}>
                Published by: { }
                {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                ) : (
                    <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                )}
            </div>
        </div>
    </div>);
};
export default JobCard;