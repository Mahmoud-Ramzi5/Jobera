import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BsFonts, BsPencilSquare, BsCurrencyDollar,
  BsGeoAltFill, BsGlobe
} from 'react-icons/bs';
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { FetchCountries, FetchStates } from '../../apis/AuthApis.jsx';
import { FetchAllSkills, SearchSkills } from '../../apis/SkillsApis.jsx';
import { AddRegJobAPI } from '../../apis/JobsApis.jsx';;
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './post_job.module.css';
import Inputstyles from '../../styles/Input.module.css';


const PostRegJob = ({ type }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [salary, setSalary] = useState('');
  const [adminShare, setAdminShare] = useState(0);

  const [needLocation, setNeedLocation] = useState('Remotely');
  const locations = [
    { value: 'Remotely', label: 'Remotely' },
    { value: 'Location', label: 'Location' },
  ];

  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  const [state, setState] = useState('');
  const [states, setStates] = useState([]);

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

  const handleCalculateSalary = (amount) => {
    setSalary(amount);
    if (amount <= 2000 && amount > 0) {
      setAdminShare(amount * 0.15);
    } else if (amount > 2000 && amount <= 15000) {
      setAdminShare(amount * 0.12);
    } else if (amount > 15000) {
      setAdminShare(amount * 0.10);
    } else {
      console.log('bad amount of money detected')
      setAdminShare(0);
    }
  }

  const handleCreate = (event) => {
    event.preventDefault();
    if (profile.wallet.available_balance >= adminShare) {
      let state_id;
      if (needLocation === 'Remotely') {
        state_id = 0;
      } else {
        state_id = state;
      }

      // Api Call
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

          // Reset the form fields
          setTitle('');
          setDescription('');
          setPhoto('');
          setSalary('');
          setCountry('');
          setState('');
          setJobSkills([]);
          setSkillIds([]);

          navigate('/jobs/all');
          window.location.reload();
        } else {
          console.log(response);
        }
      });
    } else {
      console.log('not enough balance');
    }
  }

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
  }

  const RemoveSkill = (event, index) => {
    event.persist();
    setChecked((prevState) => ({ ...prevState, [index]: false }));
    setSkillIds((prevState) => prevState.filter((id) => id !== index));
    setJobSkills((prevState) => prevState.filter((skill) => skill.name !== event.target.value));
    setSkillCount((prevState) => (prevState >= 0 ? ++prevState : prevState));
  }


  return (
    <div className={styles.screen_content}>
      <form className={styles.form} onSubmit={handleCreate}>
        <div className={styles.row}>
          <div className={styles.column}>
            <NormalInput
              type='text'
              placeholder={t('pages.post_job.form.title')}
              icon={<BsFonts />}
              value={title}
              setChange={setTitle}
            />
            <div className={Inputstyles.field}>
              <i className={Inputstyles.icon}><BsPencilSquare /></i>
              <textarea
                placeholder={t('pages.post_job.form.description')}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={Inputstyles.input}
                rows='10'
              />
            </div>
            <NormalInput
              type='number'
              placeholder={t('pages.post_job.form.reg.salary')}
              icon={<BsCurrencyDollar />}
              value={salary}
              setChange={handleCalculateSalary}
            />
            <p>Website Tax: ${adminShare}</p>
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
            <br />
          </div>
        </div>
        <div className={styles.register__field__radio}>
          {locations.map((L) => (
            <div className={styles.register__input__radio} key={L.value}>
              <input
                type="radio"
                value={L.value}
                checked={needLocation === L.value}
                onChange={(event) => setNeedLocation(event.target.value)}
              />
              <label>{L.label}</label>
            </div>
          ))}
        </div>
        {needLocation === 'Location' ? (
          <div className={styles.register__row}>
            <div className={Inputstyles.field}>
              <i className={Inputstyles.icon}><BsGlobe /></i>
              <select onChange={handleCountrySelect} value={country} className={Inputstyles.input} required>
                <option key={0} value='' disabled>{t('pages.post_job.form.country_input')}</option>
                {(countries.length === 0) ? <></> : countries.map((country) => {
                  return <option key={country.country_id} value={country.country_name} className={Inputstyles.option}>{country.country_name}</option>
                })}
              </select>
            </div>
            <div className={Inputstyles.field}>
              <i className={Inputstyles.icon}><BsGeoAltFill /></i>
              <select onChange={(event) => setState(event.target.value)} value={state} className={Inputstyles.input} required>
                <option key={0} value='' disabled>{t('pages.post_job.form.city_input')}</option>
                {(states.length === 0) ? <></> : states.map((state) => {
                  return <option key={state.state_id} value={state.state_id} className={Inputstyles.option}>{state.state_name}</option>
                })}
              </select>
            </div>
          </div>) :
          (<></>)}
        <br />
        <h4 className={styles.heading}>
          {t('pages.post_job.form.h4_heading')}
        </h4>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.skills}>
              <input
                type="text"
                placeholder={t('pages.post_job.form.search_input')}
                value={searchSkill}
                onChange={(event) => SearchSkill(event.target.value)}
              />
              <select multiple disabled={skillCount === 0}>
                {skills.length === 0 ? (
                  <option
                    key='0'
                    value=''
                    disabled={true}
                  >
                    {t('pages.post_job.form.not_found')}
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
              <span> {t('pages.post_job.form.left')} {skillCount}</span>
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
          <button className={styles.submit_button}>
            {t('pages.post_job.form.button')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostRegJob;
