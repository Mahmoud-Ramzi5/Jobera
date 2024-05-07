import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BsTrash, BsPencil, BsEye } from "react-icons/bs"; // Import the Bootstrap icons
import { ShowCertificates } from '../../apis/ProfileApis';
import styles from './certificates.module.css';

const Certificates = ({ edit, token, step }) => {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.state !== null) {
    edit = location.state.edit;
    token = location.state.token;
  }
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    ShowCertificates(token).then((response) => {
      if (response.status === 200) {
        setCertificates(response.data.certificates);
      }
      else {
        console.log(response.statusText);
      }
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("/profile");
  }

  const handleStep3 = (event) => {
    event.preventDefault();
    step('PORTFOLIO');
  }

  const RenderCertificate = (certificate) => {
    const handleEdit = () => {
      console.log(`Edit certificate with ID: ${certificate.id}`);
    };

    const handleDelete = () => {
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
            <BsEye />
          </button>
          <button
            onClick={() => handleEdit(certificate.id)}
            className={styles.edit_button}
          >
            <BsPencil />
          </button>
          <button
            onClick={() => handleDelete(certificate.id)}
            className={styles.delete_button}
          >
            <BsTrash />
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
            <button className={styles.search_button}>Search</button>
            <button
              className={styles.create_button}
              onClick={() => navigate('/certificates/create', {
                state: { token: token }
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