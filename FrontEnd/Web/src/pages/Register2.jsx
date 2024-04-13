import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FetchSkillTypes, FetchSkills } from "../apis/AuthApis.jsx";
import styles from "../styles/register2.module.css";
import Inputstyles from "../styles/Input.module.css";
import { AddSkills } from "../apis/ProfileApis.jsx";

const Register2 = () => {
  const initialized = useRef(false);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const [checked, setChecked] = useState({});
  const [userSkills, setUserSkills] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(false); // State for showing submit button

  const handleChange = (event, index) => {
    event.persist();
    setChecked((prevState) => ({ ...prevState, [index]: true }));
    setUserSkills((prevState) => [
      ...prevState,
      {
        id: index,
        name: event.target.value,
      },
    ]);
    setShowSubmitButton(true); // Show submit button when a skill is chosen
  };

  const handleChange2 = (event, index) => {
    event.persist();
    setChecked((prevState) => ({ ...prevState, [index]: false }));
    setUserSkills((prevState) =>
      prevState.filter((skill) => skill.name !== event.target.value)
    );
    if (userSkills.length === 1) {
      setShowSubmitButton(false); // Hide submit button when all skills are unchosen
    }
  };

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

  const handleTypeSelect = (event) => {
    setType(event.target.value);
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
  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(skillIds);
    AddSkills("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOThmZWU2YjBhNWM4NjQ1MzdmMDcxYzE1NmFiYmJjODIwOWYxNTg3OTIzMzM1Mjc2OGI5Zjk0OTBkYTI2YzQ2ODJiYzFjYjg5NTliOThkMTYiLCJpYXQiOjE3MTMwMjAxMjUuMTY3NTgsIm5iZiI6MTcxMzAyMDEyNS4xNjc1ODIsImV4cCI6MTc0NDU1NjEyNS4xNTg0MjYsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.mPoISxA7AjSEFBHC1cFdAazZeY86STejWLYCX_L0BuORV05hUvtjHEiB-TXR6mU9-iAdY_sqKuGbAlw1Ep9XXjEu-ALd8n1ixag6wlo470IqCTr8iMHnOt_3YqQwS84jnhwWytCT2wWmW4fBm9JcbGcNslTspZk51cqtX_HamfotXdYjYrD8JgBMU7ui0yP-T1B0F7TAalIBwEPzADVu6U_7UZnGSRUJfkiCTygdsJxIqGLywxlrqrYUmsKwWspbEH0svj6y9wKPAedHxumSydpDo9o51YBQUHiFjHr0NvzcBrKtj6Tdzfucwi4IeVrPI0HsoymcudptApsgKRFWO7RZlefQnKXDC8Z_-h4kz5f7KFZOk60hDQwpuCTXJEIUG3fKf2TGsK5iCw8co1siJiJLouGWU61ymCrES_uNMHzmn3oaZqTULgadSD3l_PqKfO05ckpZY5d76NIlmrWFrTh2Rqb-Qa7vokfBxAnuqAADy9u2MblXVY2LNiuUwFJAgTMUuxqE0lUvPgTOxaLQ1m_UelO90VoFKXfdUb9O9zrzobiaoMQmzsolGwckcIh-LR1iwAz3HDmp0de_wGhY2oXTuBbwjWkb4Hp6wpn3oXU5FkEY7jrTfrDULpHV8UNwE8-H7qrPiER7muj8kFl67KEVggzrKOs3WxLxZL2_1eI",skillIds);
    console.log(response.statusText);
  }

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
                {showSubmitButton && (
                  <form onSubmit={handleSubmit}>
                    <button className={styles.submitButton}>Submit</button>
                  </form>
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
