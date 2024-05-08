import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FetchSkillTypes, FetchSkills, SearchSkills } from '../apis/AuthApis.jsx';
import { AddSkills } from '../apis/ProfileApis.jsx';
import styles from '../styles/editskills.module.css';

const EditSkills = ({ step }) => {
  const initialized = useRef(false);
  const Navigate = useNavigate()
  const location = useLocation();
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillCount, setSkillCount] = useState(25);
  const [SkillIds, setSkillIds] = useState([]);
  const [checked, setChecked] = useState({});
  const [userSkills, setUserSkills] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (location.state !== null) {
        location.state.skills.forEach((skill) => {
          if (!checked[skill.id]) {
            setChecked((prevState) => ({ ...prevState, [skill.id]: true }));
            setSkillIds((prevState) => [...prevState, skill.id]);
            setUserSkills((prevState) => [...prevState,
            {
              id: skill.id,
              name: skill.name,
            }
            ]);
            setShowSubmitButton(true);
          }
        });
      }

      FetchSkillTypes().then((response) => {
        if (response.status === 200) {
          setTypes(response.data.types);
        } else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

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
    setShowSubmitButton(true);
  };

  const RemoveSkill = (event, index) => {
    event.persist();
    setChecked((prevState) => ({ ...prevState, [index]: false }));
    setSkillIds((prevState) => prevState.filter((id) => id !== index));
    setUserSkills((prevState) => prevState.filter((skill) => skill.name !== event.target.value));
    if (userSkills.length === 1) {
      setShowSubmitButton(false);
    }
  };

  const handleSearch = (event) => {
    setSearchSkill(event.target.value);
    SearchSkills(event.target.value).then((response) => {
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

  const handleTypeSelect = (event) => {
    setType(event.target.value);
    setSearchSkill("");
    FetchSkills(event.target.value).then((response) => {
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
  };

  const handleEdit = (event) => {
    event.preventDefault();
    // TODO
  };

  const handleStep1 = (event) => {
    event.preventDefault();
    AddSkills(location.state.token, SkillIds).then((response) => {
      if (response.status == 200) {
        localStorage.setItem('register_step', 'EDUCATION');
        step('EDUCATION');
      } else {
        console.log(response);
      }
    });
  };

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.search} >
          <input
            className={styles.search_input}
            type="text"
            placeholder="Enter skill name to search"
            value={searchSkill}
            onChange={handleSearch}
          />
        </div>
        {showSubmitButton && (
          <form className={styles.submit_div} onSubmit={location.state.edit ? handleEdit : handleStep1}>
            <div>
              <button className={styles.submit_button}>Submit</button>
            </div>
          </form>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          Skill Types:
          <select multiple className={styles.scroll_types}>
            {types.length === 0 ? (
              <option
                key='0'
                value=''
                disabled={true}
              >
                Loading types
              </option>
            ) : (
              types.map((type) => (
                <option
                  className={styles.available_types}
                  key={type.id}
                  value={type.name['en']}
                  onClick={handleTypeSelect}
                >
                  {type.name['en']}
                </option>
              ))
            )}
          </select>
        </div>
        <div className={styles.title}>
          {(type || searchSkill) && (
            <>
              <>Available Skills:</>
              <div className={styles.scroll}>
                {skills.map((skill) => (
                  <button
                    className={styles.available_skills}
                    key={skill.id}
                    value={skill.name}
                    onClick={(event) => {
                      AddSkill(event, skill.id);
                    }}
                    disabled={checked[skill.id] || skillCount === 0}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className={styles.title}>
          {userSkills.length > 0 && (
            <>
              <>Chosen Skills:</>
              <div className={styles.scroll}>
                {userSkills.map((skill) => (
                  <button
                    className={styles.choosed_skills}
                    key={skill.id}
                    value={skill.name}
                    onClick={(event) => {
                      RemoveSkill(event, skill.id);
                    }}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSkills;
