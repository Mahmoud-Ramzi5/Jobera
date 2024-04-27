import React, { useState } from 'react';
import styles from './Education.module.css';

const EducationForm = () => {
  const [educationData, setEducationData] = useState({
    level: '',
    field: '',
    school: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted education data:', educationData);
    // Add logic to handle form submission (e.g., send data to backend)
    // You can also reset the form fields after submission if needed
  };

  return (
    <div className={styles.educationFormContainer}>
      <h2 className={styles.heading}>Add Education</h2>
      <form onSubmit={handleSubmit} className="education-form">
      <div className={styles.formGroup}>
      <div className="form-group">
          <label htmlFor="field">Field:</label>
          <input  
          className={styles.inputField}
            type="text"
            id="field"
            name="field"
            value={educationData.field}
            onChange={handleInputChange}
            required
          />
        </div>
          <label className={styles.label} htmlFor="level">Level:</label>
          <select
            id="level"
            name="level"
            value={educationData.level}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Level</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PHD">PHD</option>
            <option value="High School Diploma">High School Diploma</option>
            <option value="High Institute">High Institute</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            name="school"
            value={educationData.school}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={educationData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={educationData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton} >Add Education</button>
      </form>
    </div>
  );
};

export default EducationForm;
