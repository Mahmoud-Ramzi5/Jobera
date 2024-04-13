import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchSkillTypes, FetchSkills } from '../apis/AuthApis.jsx';
import styles from '../styles/register2.module.css';
import Inputstyles from '../styles/Input.module.css';

const Register2 = () => {
  const initialized = useRef(false);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const [checked, setChecked] = useState({});
  const [userSkills, setUserSkills] = useState([]);

  const handleChange = (event, index) => {
    // Destructuring
    event.persist();
    setChecked((prevState) => ({ ...prevState, [index]: true }));
    // Case 1 : The user checks the box
    setUserSkills((prevState) => ([
      ...prevState,
      {
        id: index,
        name: event.target.value,
      },
    ]));
  };

  const handleChange2 = (event, index) => {
    // Destructuring
    event.persist();
    setChecked((prevState) => ({ ...prevState, [index]: false }));
    console.log(index);
    // Case 2  : The user unchecks the box
    setUserSkills((prevState) =>
      prevState.filter((skill) => skill.name !== event.target.value)
    );
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Api Call
      FetchSkillTypes().then((response) => {
        if (response.status === 200) {
          setTypes(response.data.types);
        } else {
          console.log(response.statusText);
        }
      });
    }
  }, []);

  const handleTypeSelect = (event) => {
    setType(event.target.value);
    // Api Call
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

  return (
    <>
      <div className={styles.screen}>
        <div className={styles.inputsforregister}>
          <div className={styles.register__row}>
            <div className={styles.title}>
              Skill Types:
              <div className={styles.scroll}>
                {types.length === 0 ? (
                  <h1>No skill types available.</h1>
                ) : (
                  types.map((type) => (
                    <button
                      className={styles.available_skills}
                      key={type.id}
                      value={type.name}
                      onClick={handleTypeSelect}
                    >
                      {type.name}
                    </button>
                  ))
                )}
              </div>
            </div>
            {type && (
              <>
                <div className={styles.title}>
                  Available Skills:
                  <div className={styles.scroll}>
                    {skills.map((skill) => (
                      <button
                        className={styles.available_skills}
                        key={skill.id}
                        value={skill.name}
                        onClick={(event) => {
                          handleChange(event, skill.id);
                        }}
                        disabled={checked[skill.id]}
                      >
                        {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
                {userSkills.length > 0 && (
                  <div className={styles.title}>
                    Chosen Skills:
                    <div className={styles.choosedskills}>
                      {userSkills.map((skill) => (
                        <button
                          className={styles.skillbutton}
                          key={skill.id}
                          value={skill.name}
                          onClick={(event) => {
                            handleChange2(event, skill.id);
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
      </div>
    </>
  );
};

export default Register2;