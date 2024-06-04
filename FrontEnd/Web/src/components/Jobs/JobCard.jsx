//import { LoginContext } from '../../utils/Contexts.jsx';
import { useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import img_holder from '../../assets/upload.png';
import styles from './css/jobcard.module.css';

const JobCard = ({ JobData }) => {
    // Context
    //const { accessToken } = useContext(LoginContext);
    const [job, setJob] = useState(JobData);
    const [title, setTitle] = useState('habedano');
    const [photo, setPhoto] = useState(null);
    const [salary, setSalary] = useState('');
    const [min_salary, setMin_salary] = useState('');
    const [max_salary, setMax_salary] = useState('');
    const [type, setType] = useState('Freelancing');

    console.log(job)
    return (
        <div className={styles.container}>
            {job === null ? <></> :
                <div className={styles.row}>
                    <div className={styles.imageholder}>
                        {job.photo ? (
                            <img src={URL.createObjectURL(job.photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
                        ) : (
                            <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
                        )}
                    </div>
                    <div className={styles.info}>
                        <h5 className={styles.title}>{job.title}</h5>
                        <p>Type: {job.type}</p>
                    </div>
                    <div className={styles.secondcolumn}>
                        {job.salary  ? (<p className={styles.salary}>Salary: ${job.salary}</p>) :
                            (<div className={styles.salary}>Min salary: ${job.min_salary}&nbsp;&nbsp; Max salary: ${job.max_salary}</div>)}
                        <p> Published by: alhabed almalek{ } </p>
                    </div>
                </div>
            }
        </div>
    );


    // return (
    //     <div className={styles.container}>
    //         <div className={styles.row}>
    //             <div className={styles.info}>
    //                 <h5 className={styles.title}>the great job{JobData.title}</h5>
    //                 <p className={styles.type}>Type: {JobData.type}</p>
    //                 <p>Salary: ${salary}</p>
    //                 <p> Published by: { } </p>
    //             </div>
    //             <div className={styles.imageholder}>
    //                 {photo ? (
    //                     <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} className={styles.image} />
    //                 ) : (
    //                     <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} className={styles.image} />
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default JobCard;