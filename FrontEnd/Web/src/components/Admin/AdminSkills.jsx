import { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BsPen, BsTrash } from "react-icons/bs";
import { LoginContext } from "../../utils/Contexts.jsx";
import { DeleteSkillAPI, FetchAllSkills } from "../../apis/SkillsApis.jsx";
import SkillForm from "./SkillForm";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";


const AdminSkills = () => {
  // Translations
  const { t } = useTranslation('global');
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

      FetchAllSkills(accessToken).then((response) => {
        if (response.status === 200) {
          setSkills(response.data.skills);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

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

  const handleDelete = (skill_id) => {
    DeleteSkillAPI(accessToken, skill_id).then((response) => {
      if (response.status == 204) {
        window.location.reload(); // Refresh the page after deletion
      } else {
        console.log(response.statusText);
      }
    });
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
              window.location.reload();
            }}
            skillToEdit={selectedSkill}
          />
        ) : (
          <>
            <h1>{t('components.admin.skills_table.h1')}</h1>
            <div className={styles.search_bar}>
              <input
                type="text"
                placeholder={t('components.admin.skills_table.search')}
                value={searchQuery}
                onChange={handleSearch}
                className={styles.search_input}
              />
              <button className={styles.create_button} onClick={handleCreate}>
                {t('components.admin.skills_table.create')}
              </button>
            </div>
            <table className={styles.certificates_table}>
              <thead>
                <tr>
                  <th>{t('components.admin.skills_table.table.th1')}</th>
                  <th>{t('components.admin.skills_table.table.th2')}</th>
                  <th>{t('components.admin.skills_table.table.th3')}</th>
                  <th>{t('components.admin.skills_table.table.th4')}</th>
                </tr>
              </thead>
              <tbody>
                {skills && skills.length > 0 ? (
                  skills
                    .filter((skill) =>
                      skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((skill) => (
                      <tr key={skill.id}>
                        <td>{skill.name}</td>
                        <td>{skill.type}</td>
                        <td>{skill.count}</td>
                        <td>
                          <button onClick={() => handleEdit(skill)} className={styles.edit_button}>
                            <BsPen />
                          </button>
                          <button onClick={() => handleDelete(skill.id)} className={styles.delete_button}>
                            <BsTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={4}>{t('components.admin.jobs_table.no_skills')}</td>
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
