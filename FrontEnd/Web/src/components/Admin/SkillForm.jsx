import React, { useState, useEffect } from 'react';
import styles from './SkillForm.module.css';
import { FetchSkillTypes, EditSkillAPI, AddNewSkillApI } from '../../apis/SkillsApis';
import { useContext } from 'react';
import { LoginContext } from '../../utils/Contexts';

const SkillForm = ({ handleSave, skillToEdit = null }) => {
  const { accessToken } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (skillToEdit) {
      setName(skillToEdit.name);
      setType(skillToEdit.type);
      setEditMode(true);
    }
    FetchSkillTypes().then((response) => {
      if (response.status === 200) {
        setTypes(response.data.types);
      } else {
        console.log(response.statusText);
      }
    });
  }, [skillToEdit]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Call API to edit skill
      EditSkillAPI(accessToken, name,type.toUpperCase() ,skillToEdit.id)
        .then((response) => {
          // Handle response
          if (response.status === 200) {
            handleSave(response.data.newSkill);
            }else{
              console.log(type)
              console.log(response);
            }
        })
        .catch((error) => {
          // Handle error
          console.error('Error editing skill:', error);
        });
    } else {
      // Call API to create skill
      AddNewSkillApI(accessToken, name, type.toUpperCase())
        .then((response) => {
          // Handle response
          if (response.status === 200) {
          handleSave(response.data.newSkill);
          }else{
            console.log(response);
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error creating skill:', error);
        });
    }
    setName('');
    setType('');
    setEditMode(false);
  };

  return (
    <div className={styles.skillForm}>
      <h2>{editMode ? 'Edit Skill' : 'Create New Skill'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Skill Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div className={styles.title}>
          Skill Type:
          <select value={type} onChange={handleTypeChange} className={styles.selectType}>
            <option value="">Select a type</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.value['en']}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          {editMode ? 'Save Changes' : 'Create Skill'}
        </button>
      </form>
    </div>
  );
};

export default SkillForm;