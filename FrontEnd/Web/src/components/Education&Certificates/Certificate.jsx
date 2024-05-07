import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from '../../App.jsx';
import { AddCertificate } from '../../apis/ProfileApis.jsx';
import styles from './certificate.module.css';

const CertificateForm = () => {
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [CertificateData, setCertificateData] = useState({
    name: "",
    organization: "",
    releaseDate: "",
    file: null, // New state for certificate file
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCertificateData({ ...CertificateData, [name]: value });
  };

  const handleFileChange = (event) => {
    const uplodedfile = event.target.files[0];
    setCertificateData({ ...CertificateData, file: uplodedfile });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Certificate data:", CertificateData.releaseDate);
    // Add logic to handle form submission (e.g., send data to backend)
    // You can also reset the form fields after submission if needed
    AddCertificate(
      // accessToken,
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM0ZGVmMjhlODcyYTljYjg0ZDZlNGRlZWUyZjQzYzdjNjkzNjA2Y2I0NjhhY2ExZmJmZTE3NjE0NzZlZWI4YTU5MWVjMzY5YzVmNTI0YTkiLCJpYXQiOjE3MTQzMTkxMTEuMzA4OTM4LCJuYmYiOjE3MTQzMTkxMTEuMzA4OTQxLCJleHAiOjE3NDU4NTUxMTEuMjEzMjE2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.KRZx8S9wT9RdY1IF3cA0q4K_DfcJzbWgzerBl9CkRFipmI-Q0F33tA6dUlLXT4IdwvQTe9Fuu12qoZpFGn1Cmty2q7SgV-_GN3XM_IGvs9O0n4Hc5MfFhpx61qqwjjN12N6iF9jmuR4WDWB8gCqUPdJtDJ3JZvQYrX9DoZnFPNBQoMKsGUfjcvcxnHRBbxQWFS-6vw8lTvCP73Y3_Lf_fQgz-4Wef2GEtw6hX3y2c9y_pMc-gTt3MUZFN8m0eGVb9i4w8EPe8POyQ94nSKRwEs0GDEtvRr8OBW1v4bRK_zZl4dTlgppW9Gx3xohhAAG-4ks8YFCGgWkd18GiXy5A8CgbAbSTFl-7D_8IaMQAEnDZSqfp1BDKbzvSYi_Tuj-IHFBFRH4FLfUDnsi_tKRD8hGxY-tnody0oRdBFJceHjQKRYXADP6qcao3t9fNra_CxvK1SjERmRN5dPXwYeoSqsBb3uDMXKY7RR13_DgUh6SiQ6K_oVLi7Pi0foJda5TyYVDSQ7fklMtST4gj_gNCNrToO5GLrMxkxrbAVMZSv-FeDn7YqKxMtQf4VXY6AhVDEHTURkzxpuzig9SW9HzD59-fSzqqbuok3nMc8EuspNh52YTr8iwLI54gJma4fAD3wq4mgwPkHdTsrNbnQPi8Kde8Lnr_4qKLw-NagmrGEJ4",
      CertificateData.name,
      CertificateData.organization,
      CertificateData.releaseDate,
      CertificateData.file
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
        setCertificateData({
          name: "",
          organization: "",
          releaseDate: "",
          file: null,
        });
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h3 className={styles.heading}>Add Certificate</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <label htmlFor="name">
                Name:
              </label>
              <input
                className={styles.inputField}
                type="text"
                id="name"
                name="name"
                value={CertificateData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter certificate name"
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="organization">
                Organization:
              </label>
              <input
                className={styles.inputField}
                type="text"
                id="organization"
                name="organization"
                value={CertificateData.organization}
                onChange={handleInputChange}
                required
                placeholder="Enter organization name"
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="releaseDate">
                Release Date:
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={CertificateData.releaseDate}
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
            <button type="submit" className={styles.submit_button}>
              Add Certificate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;