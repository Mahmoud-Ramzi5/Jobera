import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fonts, PencilSquare, Link45deg, Files } from 'react-bootstrap-icons';
import { FetchAllSkills, SearchSkills } from '../../apis/AuthApis.jsx';
import { AddSkills } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './portfolio.module.css';
import Inputstyles from '../../styles/Input.module.css';


const EditPortfolio = ({ edit, token, register, step }) => {
  const initialized = useRef(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [link, setLink] = useState('');
  const [files, setFiles] = useState(null);

  const [skills, setSkills] = useState([]);
  const [SkillIds, setSkillIds] = useState([]);
  const [checked, setChecked] = useState({});
  const [userSkills, setUserSkills] = useState([]);
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
    setUserSkills((prevState) => [...prevState,
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
    setUserSkills((prevState) => prevState.filter((skill) => skill.name !== event.target.value));
    setSkillCount((prevState) => (prevState >= 0 ? ++prevState : prevState));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    AddSkills(token, SkillIds).then((response) => {
      console.log(response);
    });
  };

  const handleStep4 = (event) => {
    event.preventDefault();
    register([title, description, photo, link, files, SkillIds]);
    step('DONE');
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>Add Portfolio item</h2>
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
                    onChange={(event) => setFiles(event.target.files)}
                    multiple
                    className={Inputstyles.input}
                  />
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
                  {userSkills.length === 0 ? <></> :
                    <div className={styles.choosed_skills}>
                      {userSkills.map((skill) => (
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
