import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fonts, PencilSquare, Link45deg, Files } from 'react-bootstrap-icons';
import { FetchAllSkills, SearchSkills } from '../../apis/AuthApis.jsx';
import { AddSkills } from '../../apis/ProfileApis.jsx';
import NormalInput from '../NormalInput.jsx';
import img_holder from '../../assets/upload.png';
import styles from './portfolio.module.css';
import Inputstyles from '../../styles/Input.module.css';


const ShowPortfolio = ({ edit, token, register, step }) => {
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
          <h2 className={styles.heading}>Portfolio item</h2>
          <div className={styles.submit_div}>
            <button className={styles.submit_button}>edit</button>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.data_field}>
                <div className={styles.data}>
                  <h5>title</h5>
                </div>
                <div className={styles.data}>
                  <p>description</p>
                </div>
                <div className={styles.data}>
                  <h6>link</h6>
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.data_field}>
                <div className={styles.img_holder}>
                  {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="Uploaded Photo" style={{ pointerEvents: 'none' }} />
                  ) : (
                    <img src={img_holder} alt="Photo Placeholder" style={{ pointerEvents: 'none' }} />
                  )}
                </div>
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
                
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.skills}>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPortfolio;
