import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddCertificate, EditCertificate, ShowCertificate } from '../../apis/ProfileApis.jsx';
import styles from './certificate.module.css';

const CertificateForm = () => {
  const navigate = useNavigate();
  const initialized = useRef(false);
  const location = useLocation();
  const [CertificateData, setCertificateData] = useState({
    name: "",
    organization: "",
    releaseDate: "",
    file: null, // New state for certificate file
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (location.state.edit) {
        ShowCertificate(location.state.token, location.state.id)
          .then((response) => {
            if (response.status === 201) {
              setCertificateData((prevData) => ({
                ...prevData,
                name: response.data.data.name,
                organization: response.data.data.organization,
                releaseDate: response.data.data.release_date,
                file: response.data.data.file,
              }));
            } else {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [location.state.edit, location.state.id, location.state.token]);

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
    if(location.state.edit){
      console.log(location.state.token)
      EditCertificate(
        location.state.token,
        location.state.id,
        CertificateData.name,
        CertificateData.organization,
        CertificateData.releaseDate,
        CertificateData.file
      ).then((response) => {
        if (response.status === 201) {
          console.log(response.data);
  
          navigate('/certificates', {
            state: { edit: true, token: location.state.token }
          })
        } else {
          console.log(response.statusText);
        }
      });
    }  
    else{
    AddCertificate(
      location.state.token,
      CertificateData.name,
      CertificateData.organization,
      CertificateData.releaseDate,
      CertificateData.file
    ).then((response) => {
      if (response.status === 201) {
        console.log(response.data);

        // Reset the form fields
        setCertificateData({
          name: "",
          organization: "",
          releaseDate: "",
          file: null,
        });

        navigate('/certificates', {
          state: { edit: true, token: location.state.token }
        })
      } else {
        console.log(response.statusText);
      }
    });
  }
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h3 className={styles.heading}>{location.state.edit ? 'Edit Certficate' : 'Add Certificate'}</h3>
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
            {location.state.edit ? 'Edit Certficate' : 'Add Certificate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
