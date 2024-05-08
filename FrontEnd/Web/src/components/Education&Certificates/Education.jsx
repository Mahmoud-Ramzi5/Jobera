import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MortarboardFill, ChevronDown } from 'react-bootstrap-icons';
import { AddEducation, EditEducation } from '../../apis/ProfileApis.jsx';
import styles from './education.module.css';

const EducationForm = ({ edit, token, step }) => {
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  if (location.state !== null) {
    edit = location.state.edit;
    token = location.state.token;
  }
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
    EditEducation(
      token,
      educationData.level,
      educationData.field,
      educationData.school,
      educationData.startDate,
      educationData.endDate,
      educationData.certificate
    ).then((response) => {
      if (response.status === 200) {
        console.log(response.data);

        // Reset the form fields
        setEducationData({
          level: "",
          field: "",
          school: "",
          startDate: "",
          endDate: "",
          certificate: null,
        });

        navigate('/profile');
      }
      else {
        console.log(response.statusText);
      }
    });
  }

  const handleStep2 = (event) => {
    event.preventDefault();
    AddEducation(
      token,
      educationData.level,
      educationData.field,
      educationData.school,
      educationData.startDate,
      educationData.endDate,
      educationData.certificate
    ).then((response) => {
      if (response.status === 201) {
        console.log(response.data);

        // Reset the form fields
        setEducationData({
          level: "",
          field: "",
          school: "",
          startDate: "",
          endDate: "",
          certificate: null,
        });
      }
      else {
        console.log(response.statusText);
      }
    });
    step('CERTIFICATES');
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>{edit ? 'Edit Education' : 'Add Education'}</h2>
          <form onSubmit={edit ? handleEdit : handleStep2}>
            <div className={styles.row}>
              <label htmlFor="level">Level:</label>
              <div className={styles.dropdown_container}>
                <i className={styles.dropdown_icon}><ChevronDown /></i>
                <select
                  id="level"
                  name="level"
                  value={educationData.level}
                  onChange={handleInputChange}
                  required
                  className={styles.dropdown_select}
                >
                  <option value="">Select Level</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PHD">PHD</option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="High Institute">High Institute</option>
                </select>
              </div>
            </div>
            <div className={styles.row}>
              <label htmlFor="field">
                Field: <i className="fas fa-graduation-cap"></i>
              </label>
              <input
                type="text"
                id="field"
                name="field"
                value={educationData.field}
                onChange={handleInputChange}
                required
                placeholder="Enter field of study"
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="school">
                School: <i className="fas fa-university"></i>
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={educationData.school}
                onChange={handleInputChange}
                required
                placeholder="Enter school name"
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="startDate">
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
            <div className={styles.row}>
              <label htmlFor="endDate">
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
            <div className={styles.row}>
              <label htmlFor="certificate">
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
      </div>
    </div>
  );
};

export default EducationForm;
