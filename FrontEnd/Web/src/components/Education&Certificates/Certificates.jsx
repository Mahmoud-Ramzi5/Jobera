import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';
import { DeleteCertificateAPI, ShowCertificates } from '../../apis/ProfileApis';
import styles from './certificates.module.css';
import CertificateForm from './Certificate';

const Certificates = ({ step }) => {
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (location.state !== null) {
        ShowCertificates(location.state.token).then((response) => {
          if (response.status === 200) {
            setCertificates(response.data.certificates);
          }
          else {
            console.log(response.statusText);
          }
        });
      }
      else {
        navigate('/profile');
      }
    }
  }, []);

  const handleEditing=(event)=>{
    event.preventDefault();
    navigate('/profile');
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStep3 = (event) => {
    event.preventDefault();
    localStorage.setItem('register_step', 'PORTFOLIO');
    step('PORTFOLIO');
  }

  const RenderCertificate = (certificate) => {
    const handleEdit = (event) => {
      navigate('/certificates/create', {
        state: { edit: true, id:certificate.id ,token: location.state.token }
      })
      console.log(`Edit certificate with ID: ${certificate.id}`);
    };

    const handleDelete = () => {
      DeleteCertificateAPI(location.state.token,certificate.id).then((response)=>{
        if(response.status==202){
          console.log(response);
          window.location.reload(); // Refresh the page after deletion
        }
        else{
          console.log(response)
        }
      })
      console.log(`Delete certificate with ID: ${certificate.id}`);
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
            onClick={() => handleEdit(certificate.id)}
            className={styles.edit_button}
          >
            <Pencil />
          </button>
          <button
            onClick={() => handleDelete(certificate.id)}
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
              onClick={() => navigate('/certificates/create', {
                state: { edit: false ,token: location.state.token }
              })}
            >
              Create
            </button>
            <form className={styles.submit_div} onSubmit={location.state.edit ? handleEditing : handleStep3}>
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