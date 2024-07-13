import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext, ProfileContext } from '../utils/Contexts.jsx';
import { FetchSkillTypes, FetchSkills, SearchSkills } from '../apis/SkillsApis.jsx';
import { GetSkillsAPI, AddSkillsAPI, EditSkillsAPI } from '../apis/ProfileApis/SkillsApis.jsx';
import Clock from '../utils/Clock.jsx';
import styles from '../styles/skills.module.css';

const SkillsForm = ({ step }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate()
  const location = useLocation();

  const [edit, setEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

      if (location.state !== null) {
        setEdit(location.state.edit);

        if (location.state.edit) {
          GetSkillsAPI(accessToken).then((response) => {
            if (response.status === 200) {
              response.data.skills.forEach((skill) => {
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
            else {
              console.log(response.statusText);
            }
          }).then(() => {
            setIsLoading(false);
          });
        }
        else {
          setIsLoading(false);
        }
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
    EditSkillsAPI(accessToken, SkillIds).then((response) => {
      if (response.status == 200) {
        navigate(`/profile/${profile.user_id}/${profile.full_name}`);
      } else {
        console.log(response.statusText);
      }
    });
  };

  const handleStep1 = (event) => {
    event.preventDefault();
    AddSkillsAPI(accessToken, SkillIds).then((response) => {
      if (response.status == 200) {
        step('EDUCATION');
      } else {
        console.log(response.statusText);
      }
    });
  };

  if (isLoading) {
    return <Clock />
  }
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
          <form className={styles.submit_div} onSubmit={edit ? handleEdit : handleStep1}>
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
                  value={type.name}
                  onClick={handleTypeSelect}
                >
                  {type.value['en']}
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

export default SkillsForm;
