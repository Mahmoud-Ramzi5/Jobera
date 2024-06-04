import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fonts, PencilSquare, CurrencyDollar, GeoAltFill, Globe } from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts.jsx';
import { FetchAllSkills, SearchSkills, FetchCountries, FetchStates } from '../../apis/AuthApis.jsx';
// import { AddJobAPI } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './css/job.module.css';
import Inputstyles from '../../styles/Input.module.css';
import { AddRegJobAPI } from '../../apis/JobsApis.jsx';

const PostJob = () => {
    // Context
    const { accessToken } = useContext(LoginContext);

    const initialized = useRef(false);
    // Define states
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [salary, setSalary] = useState('');
    const [type, setType] = useState(null);
    const types = [
        { value: 'FullTime', label: 'Full_Time' },
        { value: 'PartTime', label: 'Part_Time' },
    ];
    const [needLocation, setNeedLocation] = useState('Remotly');
    const locations = [
        { value: 'Remotly', label: 'Remotly' },
        { value: 'Location', label: 'Location' },
    ];
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [states, setStates] = useState([]);
    const [state, setState] = useState('');
    const [skills, setSkills] = useState([]);
    const [SkillIds, setSkillIds] = useState([]);
    const [checked, setChecked] = useState({});
    const [jobSkills, setJobSkills] = useState([]);
    const [searchSkill, setSearchSkill] = useState("");
    const [skillCount, setSkillCount] = useState(5);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            FetchCountries().then((response) => {
                if (response.status === 200) {
                    setCountries(response.data.countries);
                }
                else {
                    console.log(response.statusText);
                }
            });

            FetchAllSkills().then((response) => {
                if (response.status === 200) {
                    setSkills(response.data.skills);
                } else {
                    console.log(response.statusText);
                }
            });
        }
    }, []);

    const handleCreate = (event) => {
        event.preventDefault();
        let state_id;
        if (needLocation == 'Remotly') {
            state_id = 0;
        } else {
            state_id = state;
        }
        console.log(
            accessToken,
            title,
            description,
            photo,
            salary,
            type,
            state_id,
            SkillIds
        );

        AddRegJobAPI(
            accessToken,
            title,
            description,
            state_id,
            salary,
            photo,
            type,
            SkillIds
        ).then((response) => {
            if (response.status === 201) {
                console.log(response.data);
                console.log('i woeked but the other not fuck you ')

                // Reset the form fields
                setTitle("");
                setDescription("");
                setPhoto("");
                setSalary("");
                setType("");
                setCountry('');
                setState('');
                setJobSkills([]);
                setSkillIds([]);

                navigate('/');
            } else {
                console.log(response.statusText);
            }
        });
    };

    const handleCountrySelect = (event) => {
        setCountry(event.target.value);

        // Api Call
        FetchStates(event.target.value).then((response) => {
            if (response.status === 200) {
                setStates(response.data.states);
            }
            else {
                console.log(response.statusText);
            }
        });
    }

    const SearchSkill = (skill) => {
        setSearchSkill(skill);
        SearchSkills(skill).then((response) => {
            if (response.status === 200) {
                setSkills(response.data.skills);
                response.data.skills.forEach((skill) => {
                    if (!checked[skill.id]) {
                        setChecked((prevState) => ({ ...prevState, [skill.id]: false }));
                    }
                });
            } else {
                console.log(response.statusText);
            }
        });
    }

    const AddSkill = (event, index) => {
        event.persist();
        setChecked((prevState) => ({ ...prevState, [index]: true }));
        setSkillIds((prevState) => [...prevState, index]);
        setJobSkills((prevState) => [...prevState,
        {
            id: index,
            name: event.target.value,
        }
        ]);
        setSkillCount((prevState) => (prevState > 0 ? --prevState : prevState));
    };

    const RemoveSkill = (event, index) => {
        event.persist();
        setChecked((prevState) => ({ ...prevState, [index]: false }));
        setSkillIds((prevState) => prevState.filter((id) => id !== index));
        setJobSkills((prevState) => prevState.filter((skill) => skill.name !== event.target.value));
        setSkillCount((prevState) => (prevState >= 0 ? ++prevState : prevState));
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
                                    type='number'
                                    placeholder='salary'
                                    icon={<CurrencyDollar />}
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
                        <div className={styles.register__field__radio}>
                            {locations.map((T) => (
                                <div className={styles.register__input__radio} key={T.value}>
                                    <input
                                        type="radio"
                                        value={T.value}
                                        checked={needLocation === T.value}
                                        onChange={(event) => setNeedLocation(event.target.value)}
                                    />
                                    <label>{T.label}</label>
                                </div>
                            ))}
                        </div>
                        {needLocation == 'Location' ? (
                            <div className={styles.register__row}>
                                <div className={Inputstyles.field}>
                                    <i className={Inputstyles.icon}><Globe /></i>
                                    <select onChange={handleCountrySelect} value={country} className={Inputstyles.input} required>
                                        <option key={0} value='' disabled>Country</option>
                                        {(countries.length === 0) ? <></> : countries.map((country) => {
                                            return <option key={country.country_id} value={country.country_name} className={Inputstyles.option}>{country.country_name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className={Inputstyles.field}>
                                    <i className={Inputstyles.icon}><GeoAltFill /></i>
                                    <select onChange={(event) => setState(event.target.value)} value={state} className={Inputstyles.input} required>
                                        <option key={0} value='' disabled>City</option>
                                        {(states.length === 0) ? <></> : states.map((state) => {
                                            return <option key={state.state_id} value={state.state_id} className={Inputstyles.option}>{state.state_name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>) :
                            (<></>)}
                        <h4 className={styles.heading}>Skills wanted:</h4>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <div className={styles.skills}>
                                    <input
                                        type="text"
                                        placeholder="Search skill"
                                        value={searchSkill}
                                        onChange={(event) => SearchSkill(event.target.value)}
                                    />
                                    <p></p>
                                    <select multiple disabled={skillCount === 0}>
                                        {skills.length === 0 ? (
                                            <option
                                                key='0'
                                                value=''
                                                disabled={true}
                                            >
                                                Skill not found
                                            </option>
                                        ) : (
                                            skills.map((skill) => (
                                                <option
                                                    key={skill.id}
                                                    value={skill.name}
                                                    onClick={(event) => AddSkill(event, skill.id)}
                                                    hidden={checked[skill.id]}
                                                    disabled={checked[skill.id] || skillCount === 0}
                                                >
                                                    {skill.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.skills}>
                                    <span> Skills left: {skillCount}</span>
                                    {jobSkills.length === 0 ? <></> :
                                        <div className={styles.choosed_skills}>
                                            {jobSkills.map((skill) => (
                                                <button
                                                    className={styles.choosed_skill}
                                                    key={skill.id}
                                                    value={skill.name}
                                                    onClick={(event) => RemoveSkill(event, skill.id)}
                                                >
                                                    {skill.name}
                                                </button>
                                            ))}
                                        </div>
                                    }
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
