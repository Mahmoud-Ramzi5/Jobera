import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fonts, PencilSquare, Link45deg, Calendar3 } from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts.jsx';
// import { AddJobAPI } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './job.module.css';
import Inputstyles from '../../styles/Input.module.css';


const PostFreelancing = () => {
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const navigate = useNavigate();


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [photo, setPhoto] = useState(null);
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [is_done, setIs_done] = useState(false);
    const [accepted_individual, setAccepted_individual] = useState(null);

    const handleCreate = (event) => {
        event.preventDefault();
        console.log(
            accessToken,
            title,
            description,
            deadline,
            photo,
            minSalary,
            maxSalary,
            is_done,
            accepted_individual);

        // AddJobAPI(
        //     accessToken,
        //     title,
        //     description,
        //     deadline,
        //     photo,
        //     minSalary,
        //     maxSalary,
        //     is_done,
        //     accepted_individual
        // ).then((response) => {
        //     if (response.status === 201) {
        //         console.log(response.data);

        // Reset the form fields
        setTitle("");
        setDescription("");
        setDeadline("");
        setPhoto("");
        setMinSalary("");
        setMaxSalary("");
        setIs_done("");
        setAccepted_individual("");

        navigate('/');
        //     } else {
        //         console.log(response.statusText);
        //     }
        // });
    };

    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.screen_content}>
                    <h2 className={styles.heading}>{'Add a job'}</h2>
                    <form className={styles.form} onSubmit={handleCreate}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <NormalInput
                                    type='text'
                                    placeholder='Title'
                                    icon={<Fonts />}
                                    value={title}
                                    setChange={setTitle}
                                />
                                <div className={Inputstyles.field}>
                                    <i className={Inputstyles.icon}><PencilSquare /></i>
                                    <textarea
                                        placeholder='Description'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        className={Inputstyles.input}
                                        rows='10'
                                    />
                                </div>
                                <NormalInput
                                    type='date'
                                    placeholder='Deadline'
                                    icon={<Calendar3 />}
                                    value={deadline}
                                    setChange={setDeadline}
                                />
                                <NormalInput
                                    type='text'
                                    placeholder='Min Salary'
                                    icon={<Link45deg />}
                                    value={minSalary}
                                    setChange={setMinSalary}
                                />
                                <NormalInput
                                    type='text'
                                    placeholder='Max Salary'
                                    icon={<Link45deg />}
                                    value={maxSalary}
                                    setChange={setMaxSalary}
                                />
                            </div>
                            <div className={styles.column}>
                                <div className={Inputstyles.field}>
                                    <label htmlFor='photo' className={styles.img_holder}>
                                        {photo ? (
                                            <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} />
                                        ) : (
                                            <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} />
                                        )}
                                    </label>
                                    <input
                                        id='photo'
                                        type='file'
                                        placeholder='Photo'
                                        accept='.png,.jpg,.jpeg'
                                        onChange={(event) => {
                                            setPhoto(event.target.files[0]);
                                        }}
                                        style={{ visibility: 'hidden' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.submit_div}>
                            <button className={styles.submit_button}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostFreelancing;
