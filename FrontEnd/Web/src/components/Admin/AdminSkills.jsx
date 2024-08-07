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
      FetchAllSkills("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzM0N2E0ZTdhYWVkYWJkMzM2YmMyNGU4Mjg0NjNhMWRjOWMxMTU4N2E4NmE2NjRjOGRkOTYzZmJhYTFlMzg3MDQ5YTI2MGIyNGY5ZjRjOGIiLCJpYXQiOjE3MjI3ODc2MzIuNzg4MzYxLCJuYmYiOjE3MjI3ODc2MzIuNzg4MzY0LCJleHAiOjE3NTQzMjM2MzIuNjc1NTYzLCJzdWIiOiIzNyIsInNjb3BlcyI6W119.N0p05mKAhfH4sIjMpjMHxnSZPdoL2OLt4qAffUP1WGBWRgyHX39NcN3XLtlWue2vU7W53kgNXTetAsKjPduQQQCeyO4BtgpOrpMp2pfzCcIY4jdF3I6-iov6DQWwV3YDhh1NzaV7QM4wmwZFSjX2MArjMG-RSiFQpHWji7yMzc90hTcK36ebdkBoJ7Je0PJXPVmDKWTfnhEZW6_JFseCnOB4jwPpi-DD3rEVYpNBwrCSkBTRBi7fn0oLzQXJ0YO_P6HJ0ZL86Ct6FXftgJLaOcjHwVBnm9Sm_0jnNQ5alehFdwLqEKdErafFCXE-wwth2eQBwMimgjnGUb1cHBUo7wdQgboNZcCKfDCez1TeT8ph5uPGhDMWsnkOF41TAFIayWaPBKez4Z0oRdznGiuAPw0DDP9bK7HQpyj3zO1hd_noOBM-GmNniRaWQaqfKuNNJR9SNdOMbrIDzEGe7tDx9Fi6eRYWkiLzWv0EShXOMehShC9Xixocg_7XYoP630A2Uz3nsO6XUHfp6sgRNKH9DlfsJJgtQhp3sEusza6mfzoihAVzMLowJys6tBJfDtS_K-A5DQplkMmXVPZ7zB0Bx5WRpBlscJks6DdVtXYQn2oUCe534KhuRmo4Ujg45E6JFx7vcVqRNIii0aoeD0apagUJxJf317AhulYhXiTqwIQ")
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