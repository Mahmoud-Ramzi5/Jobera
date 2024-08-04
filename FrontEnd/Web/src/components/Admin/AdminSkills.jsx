import React, { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pen, Trash } from "react-bootstrap-icons";
import { LoginContext } from "../../utils/Contexts";
import { FetchAllSkills } from "../../apis/SkillsApis.jsx";
import SkillForm from "./SkillForm";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";

const AdminSkills = () => {
  // Translations
  const { t } = useTranslation("global");
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showSkillForm, setShowSkillForm] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      FetchAllSkills("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOThmZWU2YjBhNWM4NjQ1MzdmMDcxYzE1NmFiYmJjODIwOWYxNTg3OTIzMzM1Mjc2OGI5Zjk0OTBkYTI2YzQ2ODJiYzFjYjg5NTliOThkMTYiLCJpYXQiOjE3MTMwMjAxMjUuMTY3NTgsIm5iZiI6MTcxMzAyMDEyNS4xNjc1ODIsImV4cCI6MTc0NDU1NjEyNS4xNTg0MjYsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.mPoISxA7AjSEFBHC1cFdAazZeY86STejWLYCX_L0BuORV05hUvtjHEiB-TXR6mU9-iAdY_sqKuGbAlw1Ep9XXjEu-ALd8n1ixag6wlo470IqCTr8iMHnOt_3YqQwS84jnhwWytCT2wWmW4fBm9JcbGcNslTspZk51cqtX_HamfotXdYjYrD8JgBMU7ui0yP-T1B0F7TAalIBwEPzADVu6U_7UZnGSRUJfkiCTygdsJxIqGLywxlrqrYUmsKwWspbEH0svj6y9wKPAedHxumSydpDo9o51YBQUHiFjHr0NvzcBrKtj6Tdzfucwi4IeVrPI0HsoymcudptApsgKRFWO7RZlefQnKXDC8Z_-h4kz5f7KFZOk60hDQwpuCTXJEIUG3fKf2TGsK5iCw8co1siJiJLouGWU61ymCrES_uNMHzmn3oaZqTULgadSD3l_PqKfO05ckpZY5d76NIlmrWFrTh2Rqb-Qa7vokfBxAnuqAADy9u2MblXVY2LNiuUwFJAgTMUuxqE0lUvPgTOxaLQ1m_UelO90VoFKXfdUb9O9zrzobiaoMQmzsolGwckcIh-LR1iwAz3HDmp0de_wGhY2oXTuBbwjWkb4Hp6wpn3oXU5FkEY7jrTfrDULpHV8UNwE8-H7qrPiER7muj8kFl67KEVggzrKOs3WxLxZL2_1eI")
        .then((response) => {
          if (response.status === 200) {
            setSkills(response.data.skills);
          } else {
            console.log(response.statusText);
          }
          setIsLoading(false);
        });
    }
  }, [accessToken]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCreate = () => {
    setSelectedSkill(null);
    setShowSkillForm(true);
  };

  const handleEdit = (skill) => {
    setSelectedSkill(skill);
    setShowSkillForm(true);
  };

  const handleCancel = () => {
    setShowSkillForm(false);
  };

  if (isLoading) {
    return <Clock />;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        {showSkillForm ? (
          <SkillForm
            handleSave={(newSkill) => {
              // Handle save logic here
              console.log(newSkill);
              handleCancel();
            }}
            skillToEdit={selectedSkill}
          />
        ) : (
          <>
            <h1>Skills</h1>
            <div className={styles.search_bar}>
              <input
                type="text"
                placeholder={t("skill name")}
                value={searchQuery}
                onChange={handleSearch}
                className={styles.search_input}
              />
              <button className={styles.create_button} onClick={handleCreate}>
                Create
              </button>
            </div>
            <table className={styles.certificates_table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills && skills.length > 0 ? (
                  skills
                    .filter((skill) =>
                      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((skill) => (
                      <tr key={skill.id}>
                        <td>{skill.name}</td>
                        <td>{skill.type}</td>
                        <td>{skill.count}</td>
                        <td>
                          <button
                            className={styles.edit_button}
                            onClick={() => handleEdit(skill)}
                          >
                            <Pen />
                          </button>
                          <button onClick={() => handleDelete(skill.id)} className={styles.delete_button}>
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={4}>No skills found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSkills;