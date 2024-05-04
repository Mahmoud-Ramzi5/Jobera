import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchSkillTypes, FetchSkills, SearchSkills } from '../apis/AuthApis.jsx';
import { AddSkills } from '../apis/ProfileApis.jsx';
import Bar from './Bar.jsx';
import styles from '../styles/editskills.module.css';

const EditSkills = ({ edit, token, register, step }) => {
  const initialized = useRef(false);
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
      FetchSkillTypes().then((response) => {
        if (response.status === 200) {
          setTypes(response.data.types);
        } else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

  const handleSearch = (event) => {
    setSearchSkill(event.target.value);
    GetSearchedSkills(event.target.value);
  }

  const GetSearchedSkills = (skill) => {
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
    AddSkills(token, SkillIds).then((response) => {
      console.log(response);
    });
  };

  const handlestep2 = (event) => {
    event.preventDefault();
    register(SkillIds);
    step('EDUCATION');
  };

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {/*<div className={styles.logo_holder}>
            <img src={Logo} className={styles.logo} alt="logo" />
          </div>*/}
        <div className={styles.search} >
          <input
            className={styles.search_input}
            type="text"
            placeholder="Enter skill name to search"
            value={searchSkill}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.Bar}>
        </div>
        {showSubmitButton && (
          <form className={styles.submit_div} onSubmit={edit ? handleEdit : handlestep2}>
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
        {(type || searchSkill) && (
          <>
            <div className={styles.title}>
              Available Skills:
              <select multiple disabled={skillCount === 0} className={styles.scroll_types}>
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
                      className={styles.available_skills}
                    >
                      {skill.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            {/*<div className={styles.title}>
              Available Skills:
              <div className={styles.scroll}>
                {skills.map((skill) => (
                  <button
                    className={styles.available_skills}
                    key={skill.id}
                    value={skill.name}
                    onClick={(event) => {
                      AddSkill(event, skill.id);
                    }}
                    disabled={checked[skill.id]}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>*/}
            {userSkills.length > 0 && (
              <div className={styles.title}>
                Chosen Skills:
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditSkills;
