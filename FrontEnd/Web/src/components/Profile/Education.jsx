import { useEffect, useState, useContext, useRef } from "react";
import styles from "./Education.module.css";
import { AddEducation } from "../../apis/ProfileApis";
import { LoginContext } from "../../App.jsx";

const EducationForm = ({edit,token,register,step}) => {
  const initialized = useRef(false);
  const [educationData, setEducationData] = useState({
    level: "",
    field: "",
    school: "",
    startDate: "",
    endDate: "",
    certificate: null, // New state for certificate file
  });
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = ["application/pdf"];
    if (file && allowedFileTypes.includes(file.type)) {
      setEducationData({ ...educationData, certificate: file });
    } else {
      console.log("Invalid file type. Please select a PDF or Word document.");
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    
  }

  const handleStep3 = (event) => {
    event.preventDefault();
    console.log("Submitted education data:", educationData);
    // Add logic to handle form submission (e.g., send data to backend)
    // You can also reset the form fields after submission if needed
    register({
      "level":educationData.level,
      "field":educationData.field,
      "school":educationData.school,
      "startDate":educationData.startDate,
      "endDate":educationData.endDate,
      "certificates":educationData.certificate
  })
        // Reset the form fields
        setEducationData({
          level: "",
          field: "",
          school: "",
          startDate: "",
          endDate: "",
          certificate: null,
        });
        step('CERTIFICATES');
  };

  return (
    <div className={styles.educationFormContainer}>
      <h2 className={styles.heading}>{edit ? <p>Add Education</p>:<p>Edit Education</p>}</h2>
      <form onSubmit={edit ? handleEdit : handleStep3} className="education-form">
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="level">
            Level:
          </label>
          <div className={styles.dropdownContainer}>
            <select
              id="level"
              name="level"
              value={educationData.level}
              onChange={handleInputChange}
              required
              className={styles.dropdownSelect}
            >
              <option value="">Select Level</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PHD">PHD</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="High Institute">High Institute</option>
            </select>
            <div className={styles.dropdownIcon}>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="field">
            Field: <i className="fas fa-graduation-cap"></i>
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="text"
              id="field"
              name="field"
              value={educationData.field}
              onChange={handleInputChange}
              required
              placeholder="Enter field of study"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="school">
            School: <i className="fas fa-university"></i>
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="text"
              id="school"
              name="school"
              value={educationData.school}
              onChange={handleInputChange}
              required
              placeholder="Enter school name"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="startDate">
            Start Date:
          </label>
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
          <label className={styles.label} htmlFor="endDate">
            End Date:
          </label>
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
          <label className={styles.label} htmlFor="certificate">
            Certificate:
          </label>
          <input
            type="file"
            id="certificate"
            name="certificate"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
            <div>
              <button className={styles.submit_button}>Submit Education</button>
            </div>
          </form>
    </div>
  );
};

export default EducationForm;
