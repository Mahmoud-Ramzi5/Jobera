import React, { useState } from 'react';
import styles from './Education.module.css';
import { AddEducation } from '../../apis/ProfileApis';

const EducationForm = () => {
  const [educationData, setEducationData] = useState({
    level: '',
    field: '',
    school: '',
    startDate: '',
    endDate: '',
    certificate: null // New state for certificate file
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEducationData({ ...educationData, certificate: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted education data:', educationData);
    // Add logic to handle form submission (e.g., send data to backend)
    // You can also reset the form fields after submission if needed
    AddEducation(
      educationData.level,
      educationData.field,
      educationData.school,
      educationData.startDate,
      educationData.endDate,
      educationData.certificate,
    )
  };

  return (
    <div className={styles.educationFormContainer}>
      <h2 className={styles.heading}>Add Education</h2>
      <form onSubmit={handleSubmit} className="education-form">
        <div className={styles.formGroup}>
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
          <label className={styles.label} htmlFor="field">Field:</label>
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
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="school">School:</label>
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
          <label className={styles.label} htmlFor="startDate">Start Date:</label>
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
          <label className={styles.label} htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={educationData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* File upload field */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="certificate">Certificate:</label>
          <input
            type="file"
            id="certificate"
            name="certificate"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Add Education</button>
      </form>
    </div>
  );
};

export default EducationForm;
