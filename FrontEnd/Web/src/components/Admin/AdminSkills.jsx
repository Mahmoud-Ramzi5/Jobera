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
      FetchAllSkills(accessToken)
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