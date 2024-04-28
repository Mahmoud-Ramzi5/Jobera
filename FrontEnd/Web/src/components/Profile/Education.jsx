import { useEffect, useState, useContext, useRef } from "react";
import styles from "./Education.module.css";
import { AddEducation } from "../../apis/ProfileApis";
import { LoginContext } from "../../App.jsx";

const EducationForm = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
    useContext(LoginContext);
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
    setEducationData({ ...educationData, certificate: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted education data:", educationData);
    // Add logic to handle form submission (e.g., send data to backend)
    // You can also reset the form fields after submission if needed
    console.log(accessToken);
    AddEducation(
     // accessToken,
     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM0ZGVmMjhlODcyYTljYjg0ZDZlNGRlZWUyZjQzYzdjNjkzNjA2Y2I0NjhhY2ExZmJmZTE3NjE0NzZlZWI4YTU5MWVjMzY5YzVmNTI0YTkiLCJpYXQiOjE3MTQzMTkxMTEuMzA4OTM4LCJuYmYiOjE3MTQzMTkxMTEuMzA4OTQxLCJleHAiOjE3NDU4NTUxMTEuMjEzMjE2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.KRZx8S9wT9RdY1IF3cA0q4K_DfcJzbWgzerBl9CkRFipmI-Q0F33tA6dUlLXT4IdwvQTe9Fuu12qoZpFGn1Cmty2q7SgV-_GN3XM_IGvs9O0n4Hc5MfFhpx61qqwjjN12N6iF9jmuR4WDWB8gCqUPdJtDJ3JZvQYrX9DoZnFPNBQoMKsGUfjcvcxnHRBbxQWFS-6vw8lTvCP73Y3_Lf_fQgz-4Wef2GEtw6hX3y2c9y_pMc-gTt3MUZFN8m0eGVb9i4w8EPe8POyQ94nSKRwEs0GDEtvRr8OBW1v4bRK_zZl4dTlgppW9Gx3xohhAAG-4ks8YFCGgWkd18GiXy5A8CgbAbSTFl-7D_8IaMQAEnDZSqfp1BDKbzvSYi_Tuj-IHFBFRH4FLfUDnsi_tKRD8hGxY-tnody0oRdBFJceHjQKRYXADP6qcao3t9fNra_CxvK1SjERmRN5dPXwYeoSqsBb3uDMXKY7RR13_DgUh6SiQ6K_oVLi7Pi0foJda5TyYVDSQ7fklMtST4gj_gNCNrToO5GLrMxkxrbAVMZSv-FeDn7YqKxMtQf4VXY6AhVDEHTURkzxpuzig9SW9HzD59-fSzqqbuok3nMc8EuspNh52YTr8iwLI54gJma4fAD3wq4mgwPkHdTsrNbnQPi8Kde8Lnr_4qKLw-NagmrGEJ4",
      educationData.level,
      educationData.field,
      educationData.school,
      educationData.startDate,
      educationData.endDate,
      educationData.certificate
    )
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
        } else {
          console.log(response.statusText);
        }
      })
      .then(() => {
        // Reset the form fields
        setEducationData({
          level: "",
          field: "",
          school: "",
          startDate: "",
          endDate: "",
          certificate: null,
        });
      });
  };

  return (
    <div className={styles.educationFormContainer}>
      <h2 className={styles.heading}>Add Education</h2>
      <form onSubmit={handleSubmit} className="education-form">
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="level">
            Level:
          </label>
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
          <label className={styles.label} htmlFor="field">
            field:
          </label>
          <input
            className={styles.inputfield}
            type="text"
            id="field"
            name="field"
            value={educationData.field}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="school">
            School:
          </label>
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
        <button type="submit" className={styles.submitButton}>
          Add Education
        </button>
      </form>
    </div>
  );
};

export default EducationForm;
