import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fonts, PencilSquare, Link45deg } from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts.jsx';
// import { AddJobAPI } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './job.module.css';
import Inputstyles from '../../styles/Input.module.css';


const PostJob = () => {
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const navigate = useNavigate();


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [salary, setSalary] = useState(0);
    const [type, setType] = useState(null);
    const [is_done, setIs_done] = useState(false);
    const [accepted_individual, setAccepted_individual] = useState(null);
    const types = [
        { value: 'FULL_TIME', label: 'Full_Time' },
        { value: 'PART_TIME', label: 'Part_Time' },
    ];
    const handleCreate = (event) => {
        event.preventDefault();
        console.log(
            accessToken,
            title,
            description,
            photo,
            salary,
            type,
            is_done,
            accepted_individual);

        // AddJobAPI(
        //     accessToken,
        //     title,
        //     description,
        //     photo,
        //     salary,
        //     type,
        //     is_done,
        //     accepted_individual
        // ).then((response) => {
        //     if (response.status === 201) {
        //         console.log(response.data);

        // Reset the form fields
        setTitle("");
        setDescription("");
        setPhoto("");
        setSalary("");
        setType("");
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
                                    type='text'
                                    placeholder='salary'
                                    icon={<Link45deg />}
                                    value={salary}
                                    setChange={setSalary}
                                />
                                <div className={styles.register__field__radio}>
                                    {types.map((T) => (
                                        <div className={styles.register__input__radio} key={T.value}>
                                            <input
                                                type="radio"
                                                value={T.value}
                                                checked={type === T.value}
                                                onChange={(event) => setType(event.target.value)}
                                            />
                                            <label>{T.label}</label>
                                        </div>
                                    ))}
                                </div>
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

export default PostJob;
