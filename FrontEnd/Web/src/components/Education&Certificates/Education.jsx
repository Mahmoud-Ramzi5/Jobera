import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MortarboardFill, ChevronDown } from 'react-bootstrap-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoginContext } from '../../utils/Contexts.jsx';
import { GetEducation, EditEducation } from '../../apis/ProfileApis/EducationApis.jsx';
import styles from './education.module.css';


const EducationForm = ({ step }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [edit, setEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [educationData, setEducationData] = useState({
    level: "",
    field: "",
    school: "",
    start_date: new Date(),
    end_date: new Date(),
    certificate_file: null, // New state for certificate file
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      GetEducation(accessToken).then((response) => {
        if (response.status === 200) {
          response.data.education.start_date = new Date(response.data.education.start_date);
          response.data.education.end_date = new Date(response.data.education.end_date);
          setEducationData(response.data.education);
        }
        else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });

      if (location.state !== null) {
        setEdit(location.state.edit);
        // if (location.state.education !== null) {
        //   setEducationData(location.state.education);
        // }
      }
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = ["application/pdf"];
    if (file && allowedFileTypes.includes(file.type)) {
      setEducationData({ ...educationData, certificate_file: file });
    } else {
      console.log("Invalid file type. Please select a PDF document.");
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    EditEducation(
      accessToken,
      educationData.level,
      educationData.field,
      educationData.school,
      educationData.start_date,
      educationData.end_date,
      educationData.certificate_file
    ).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        navigate('/profile');
      }
      if (response.status === 201) {
        console.log(response.data);

        // Reset the form fields
        setEducationData({
          level: "",
          field: "",
          school: "",
          start_date: new Date(),
          end_date: new Date(),
          certificate_file: null,
        });

        step('CERTIFICATES');
      }
      else {
        console.log(response.statusText);
      }
    });
  }


  if (isLoading) {
    return <div id='loader'><div className="clock-loader"></div></div>
  }
  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h2 className={styles.heading}>{edit ? 'Edit Education' : 'Add Education'}</h2>
          <form onSubmit={handleEdit}>
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
                  <option value="BACHELOR">Bachelor</option>
                  <option value="MASTER">Master</option>
                  <option value="PHD">PHD</option>
                  <option value="HIGH_SCHOOL_DIPLOMA">High School Diploma</option>
                  <option value="HIGH_INSTITUTE">High Institute</option>
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
              <label htmlFor="StartDate">
                Start Date:
              </label>
              <DatePicker
                id='StartDate'
                dateFormat='dd/MM/yyyy'
                wrapperClassName={styles.date_picker}
                selected={educationData.start_date}
                onChange={(date) => {
                  const selectedDate = new Date(date).toISOString().split('T')[0];
                  setEducationData({ ...educationData, start_date: selectedDate });
                }}
                showMonthDropdown
                showYearDropdown
                required
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="EndDate">
                End Date:
              </label>
              <DatePicker
                id='EndDate'
                dateFormat='dd/MM/yyyy'
                wrapperClassName={styles.date_picker}
                selected={educationData.end_date}
                onChange={(date) => {
                  const selectedDate = new Date(date).toISOString().split('T')[0];
                  setEducationData({ ...educationData, end_date: selectedDate });
                }}
                showMonthDropdown
                showYearDropdown
                required
              />
            </div>
            {/* File upload field */}
            <div className={styles.row}>
              <label htmlFor="Certificate">
                Certificate:
              </label>
              <input
                type="file"
                id="Certificate"
                name="certificate"
                accept=".pdf"
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
