import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoginContext, ProfileContext } from '../../utils/Contexts.jsx';
import { AddCertificateAPI, EditCertificateAPI } from '../../apis/ProfileApis/EducationApis.jsx';
import styles from './certificate.module.css';


const CertificateForm = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const navigate = useNavigate();
  const initialized = useRef(false);
  const location = useLocation();

  const [edit, setEdit] = useState(true);
  const [add, setAdd] = useState(false);
  const [CertificateData, setCertificateData] = useState({
    name: "",
    organization: "",
    release_date: new Date().toISOString().split('T')[0],
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
    const file = event.target.files[0];
    const allowedFileTypes = ["application/pdf"];
    if (file && allowedFileTypes.includes(file.type)) {
      setCertificateData({ ...CertificateData, file: file });
    } else {
      console.log("Invalid file type. Please select a PDF document.");
    }
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

          if (edit) {
            navigate(`/certificates/${profile.user_id}/${profile.full_name}`, {
              state: { edit: edit }
            });
          } else {
            navigate('/complete-register', {
              state: { edit: edit, currStep: 'CERTIFICATES' }
            });
          }
          // Reset the form fields
          setCertificateData({
            name: "",
            organization: "",
            release_date: new Date().toISOString().split('T')[0],
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

          if (edit) {
            navigate(`/certificates/${profile.user_id}/${profile.full_name}`, {
              state: { edit: edit }
            });
          } else {
            navigate('/complete-register', {
              state: { edit: edit, currStep: 'CERTIFICATES' }
            });
          }
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
          <h3 className={styles.heading}>{add ? 'Add Certificate' : 'Edit Certificate'}</h3>
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
              <DatePicker
                id='ReleaseDate'
                dateFormat='dd/MM/yyyy'
                wrapperClassName={styles.date_picker}
                selected={CertificateData.release_date}
                onChange={(date) => {
                  const selectedDate = new Date(date).toISOString().split('T')[0];
                  setCertificateData({ ...CertificateData, release_date: selectedDate });
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
            <button type="submit" className={styles.submit_button}>
              {add ? 'Add Certificate' : 'Edit Certificate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
