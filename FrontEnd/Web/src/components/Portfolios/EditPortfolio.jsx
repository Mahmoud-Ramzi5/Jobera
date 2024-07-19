import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Fonts, PencilSquare, Link45deg, Files } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { FetchAllSkills, SearchSkills } from '../../apis/SkillsApis.jsx';
import { AddPortfolioAPI, EditPortfolioAPI } from '../../apis/ProfileApis/PortfolioApis.jsx';
import { FetchImage } from '../../apis/FileApi';
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './portfolio.module.css';
import Inputstyles from '../../styles/Input.module.css';


const EditPortfolio = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const [link, setLink] = useState('');
  const [files, setFiles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [SkillIds, setSkillIds] = useState([]);
  const [checked, setChecked] = useState({});
  const [portfolioSkills, setPortfolioSkills] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [skillCount, setSkillCount] = useState(5);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      FetchAllSkills().then((response) => {
        if (response.status === 200) {
          setSkills(response.data.skills);
        } else {
          console.log(response.statusText);
        }
      });

      if (location.state !== null) {
        if (location.state.edit) {
          setEdit(location.state.edit);

          setTitle(location.state.portfolio.title);
          setDescription(location.state.portfolio.description);
          FetchImage("", location.state.portfolio.photo).then((response) => {
            setPhoto(response);
          });
          setLink(location.state.portfolio.link);
          setFiles(location.state.portfolio.files);
          location.state.portfolio.skills.map((skill) => {
            if (!checked[skill.id]) {
              setChecked((prevState) => ({ ...prevState, [skill.id]: true }));
              setSkillIds((prevState) => [...prevState, skill.id]);
              setPortfolioSkills((prevState) => [...prevState,
              {
                id: skill.id,
                name: skill.name,
              }
              ]);
              setSkillCount((prevState) => (--prevState));
            }
          });
        }
        else {
          setEdit(false);
        }
      }
    }
  }, []);

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
    setPortfolioSkills((prevState) => [...prevState,
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
    setPortfolioSkills((prevState) => prevState.filter((skill) => skill.name !== event.target.value));
    setSkillCount((prevState) => (prevState >= 0 ? ++prevState : prevState));
  };

  const handlePhotoChange = (event) => {
    const image = event.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (image && allowedImageTypes.includes(image.type)) {
      setPhoto(image);
      setNewPhoto(image);
    } else {
      console.log("Invalid Image type. Please select a PNG, JPG, JPEG image.");
    }
  };

  const handleFileChange = (event) => {
    setFiles([]);
    event.preventDefault();
    const allowedFileTypes = ["application/pdf"];
    if (event.target.files.length <= 5) {
      Array.from(event.target.files).forEach((file) => {
        if (file && allowedFileTypes.includes(file.type)) {
          setFiles((prevState) => [...prevState, file]);
        } else {
          console.log("Invalid file type. Please select a PDF document.");
        }
      });
    }
    else {
      for (let i = 0; i < 5; i++) {
        if (event.target.files[i] && allowedFileTypes.includes(event.target.files[i].type)) {
          setFiles((prevState) => [...prevState, event.target.files[i]]);
        } else {
          console.log("Invalid file type. Please select a PDF document.");
        }
      }
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    EditPortfolioAPI(
      accessToken,
      location.state.portfolio.id,
      title,
      description,
      newPhoto,
      link,
      files,
      SkillIds
    ).then((response) => {
      if (response.status === 200) {
        console.log(response.data);

        if (profile.type === 'individual') {
          navigate(`/portfolios/${profile.user_id}/${profile.full_name}`, {
            state: { edit: true }
          });
        }
        else if (profile.type === 'company') {
          navigate(`/portfolios/${profile.user_id}/${profile.name}`, {
            state: { edit: true }
          });
        }
        else {
          console.log('error')
        }
      } else {
        console.log(response.statusText);
      }
    });
  };

  const handleStep4 = (event) => {
    event.preventDefault();
    AddPortfolioAPI(
      accessToken,
      title,
      description,
      photo,
      link,
      files,
      SkillIds
    ).then((response) => {
      if (response.status === 201) {
        console.log(response.data);

        // Reset the form fields
        setTitle("");
        setDescription("");
        setPhoto("");
        setLink("");
        setFiles(null);

        if (profile.type === 'individual') {
          navigate(`/portfolios/${profile.user_id}/${profile.full_name}`);
        }
        else if (profile.type === 'company') {
          navigate(`/portfolios/${profile.user_id}/${profile.name}`);
        }
        else {
          console.log('error')
        }
      } else {
        console.log(response.statusText);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>
            {edit ? t('components.edit_portfolio.h2_heading1')
              : t('components.edit_portfolio.h2_heading2')}
          </h2>
          <form className={styles.form} onSubmit={edit ? handleEdit : handleStep4}>
            <div className={styles.row}>
              <div className={styles.column}>
                <NormalInput
                  type='text'
                  placeholder={t('components.edit_portfolio.title_input')}
                  icon={<Fonts />}
                  value={title}
                  setChange={setTitle}
                />
                <div className={Inputstyles.field}>
                  <i className={Inputstyles.icon}><PencilSquare /></i>
                  <textarea
                    placeholder={t('components.edit_portfolio.description_input')}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className={Inputstyles.input}
                    rows='10'
                  />
                </div>
                <NormalInput
                  type='text'
                  placeholder={t('components.edit_portfolio.link_input')}
                  icon={<Link45deg />}
                  value={link}
                  setChange={setLink}
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
                    onChange={handlePhotoChange}
                    style={{ visibility: 'hidden' }}
                  />
                </div>
                <div className={Inputstyles.field}>
                  <i className={Inputstyles.icon}><Files /></i>
                  <input
                    id='files'
                    type='file'
                    placeholder={t('components.edit_portfolio.files_input')}
                    accept='.pdf'
                    onChange={handleFileChange}
                    multiple
                    className={Inputstyles.input}
                  />
                  <p>
                    {t('components.edit_portfolio.files_text_p')}{' '}
                    <span style={{ fontSize: '10px', marginLeft: '10px' }}>
                      {t('components.edit_portfolio.files_text_span')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <h4 className={styles.heading}>
              {t('components.edit_portfolio.h4_heading')}
            </h4>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.skills}>
                  <input
                    type="text"
                    placeholder={t('components.edit_portfolio.search_input')}
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
                        {t('components.edit_portfolio.not_found')}
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
                  <span>{t('components.edit_portfolio.count')} {skillCount}</span>
                  {portfolioSkills.length === 0 ? <></> :
                    <div className={styles.choosed_skills}>
                      {portfolioSkills.map((skill) => (
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
              <button className={styles.submit_button} disabled={skillCount < 0}>
                {t('components.edit_portfolio.button')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPortfolio;
