import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Fonts, PencilSquare, Link45deg, Files } from 'react-bootstrap-icons';
import { LoginContext } from '../../App.jsx';
import { FetchAllSkills, SearchSkills } from '../../apis/AuthApis.jsx';
import { AddPortfolioAPI } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './portfolio.module.css';
import Inputstyles from '../../styles/Input.module.css';


const EditPortfolio = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
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
        setEdit(location.state.edit);

        setTitle(location.state.portfolio.title);
        setDescription(location.state.portfolio.description);
        setPhoto(location.state.portfolio.photo);
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

  const handleEdit = (event) => {
    event.preventDefault();
    // TODO
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

        navigate('/portfolios');
      } else {
        console.log(response.statusText);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>{edit ? 'edit Portfolio item' : 'Add Portfolioitem'}</h2>
          <form className={styles.form} onSubmit={edit ? handleEdit : handleStep4}>
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
                  placeholder='Link'
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
                    onChange={(event) => setPhoto(event.target.files[0])}
                    style={{ visibility: 'hidden' }}
                  />
                </div>
                <div className={Inputstyles.field}>
                  <i className={Inputstyles.icon}><Files /></i>
                  <input
                    id='files'
                    type='file'
                    placeholder='Files'
                    accept='.pdf,.doc,.docx,.png,.jpg,.jpeg'
                    onChange={(event) => {
                      if (event.target.files.length <= 5) {
                        setFiles(event.target.files);
                      }
                      else {
                        for (let i = 0; i < 5; i++) {
                          setFiles((prevState) => [...prevState, event.target.files[i]]);
                        }
                        event.preventDefault();
                      }
                    }}
                    multiple
                    className={Inputstyles.input}
                  />
                  <p>
                    Up to 5 files.
                    <span style={{ fontSize: '10px', marginLeft: '10px' }}>
                      If more is uploaded, only the first 5 files will be uploaded.
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <h4 className={styles.heading}>Skills used:</h4>
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
              <button className={styles.submit_button} disabled={skillCount < 0}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPortfolio;
