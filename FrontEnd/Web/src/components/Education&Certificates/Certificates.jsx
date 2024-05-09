import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';
import { LoginContext } from '../../utils/Contexts';
import { ShowCertificatesAPI, DeleteCertificateAPI } from '../../apis/ProfileApis';
import styles from './certificates.module.css';

const Certificates = ({ step }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      ShowCertificatesAPI(accessToken).then((response) => {
        if (response.status === 200) {
          setCertificates(response.data.certificates);
        }
        else {
          console.log(response.statusText);
        }
      });

      if (location.state !== null) {
        setEdit(location.state.edit);
      }
    }
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    navigate('/profile');
  };

  const handleStep3 = (event) => {
    event.preventDefault();
    localStorage.setItem('register_step', 'PORTFOLIO');
    step('PORTFOLIO');
  }

  const RenderCertificate = (certificate) => {
    const handleEdit = (event) => {
      navigate('/edit-certificate', {
        state: { edit: true, certificate }
      })
    };

    const handleDelete = (event) => {
      DeleteCertificateAPI(accessToken, certificate.id).then((response) => {
        if (response.status == 202) {
          console.log(response);
          window.location.reload(); // Refresh the page after deletion
        }
        else {
          console.log(response.statusText);
        }
      });
    };

    return (
      <tr key={certificate.id}>
        <td>{certificate.name}</td>
        <td>{certificate.organization}</td>
        <td>{certificate.release_date}</td>
        <td>
          <button
            onClick={() => navigate(`/certificates/${certificate.id}`)}
            className={styles.view_button}
          >
            <Eye />
          </button>
          <button
            onClick={handleEdit}
            className={styles.edit_button}
          >
            <Pencil />
          </button>
          <button
            onClick={handleDelete}
            className={styles.delete_button}
          >
            <Trash />
          </button>
        </td>
      </tr>
    );
  };

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div>
          <h1>Certificates</h1>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className={styles.search_input}
            />
            <button
              className={styles.create_button}
              onClick={() => navigate('/edit-certificate', {
                state: { edit: false }
              })}
            >
              Create
            </button>
            <form className={styles.submit_div} onSubmit={edit ? handleEdit : handleStep3}>
              <div>
                <button className={styles.submit_button}>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <table className={styles.certificates_table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Organization</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{filteredCertificates.map(RenderCertificate)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Certificates;