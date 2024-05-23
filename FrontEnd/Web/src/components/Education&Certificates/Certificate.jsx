import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../../utils/Contexts.jsx';
import { AddCertificateAPI, EditCertificateAPI } from '../../apis/ProfileApis.jsx';
import styles from './certificate.module.css';

const CertificateForm = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const navigate = useNavigate();
  const initialized = useRef(false);
  const location = useLocation();
  const [edit, setEdit] = useState(true);
  const [add, setAdd] = useState(false);
  const [CertificateData, setCertificateData] = useState({
    name: "",
    organization: "",
    release_date: "",
    file: null, // New state for certificate file
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (location.state !== null) {
        setEdit(location.state.edit);
        setAdd(location.state.add);
        if (!location.state.add) {
          setCertificateData(location.state.certificate);
        }
      }
      else {
        navigate('/certificates');
      }
    }
  }, []);

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
    if (add) {
      AddCertificateAPI(
        accessToken,
        CertificateData.name,
        CertificateData.organization,
        CertificateData.release_date,
        CertificateData.file
      ).then((response) => {
        if (response.status === 201) {
          console.log(response.data);

          // Reset the form fields
          setCertificateData({
            name: "",
            organization: "",
            release_date: "",
            file: null,
          });
        } else {
          console.log(response.statusText);
        }
      });
    }
    else {
      EditCertificateAPI(
        accessToken,
        CertificateData.id,
        CertificateData.name,
        CertificateData.organization,
        CertificateData.release_date,
        CertificateData.file
      ).then((response) => {
        if (response.status === 200) {
          console.log(response.data);

        } else {
          console.log(response.statusText);
        }
      });
    }

    if(edit) {
      navigate('/certificates', {
        state: { edit: edit }
      });
    } else {
      navigate('/complete-register', {
        state: { edit: edit }
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screen_content}>
          <h3 className={styles.heading}>{add ? 'Add Certficate' : 'Edit Certificate'}</h3>
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
              <label htmlFor="ReleaseDate">
                Release Date:
              </label>
              <input
                type="date"
                id="ReleaseDate"
                name="release_date"
                value={CertificateData.release_date}
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
              {add ? 'Add Certficate' : 'Edit Certificate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
