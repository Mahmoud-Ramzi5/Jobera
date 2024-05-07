import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsTrash, BsPencil, BsEye } from "react-icons/bs"; // Import the Bootstrap icons
import { ShowCertificates } from '../../apis/ProfileApis';
import styles from './certificates.module.css';

const Certificates = ({ edit, token, step }) => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    ShowCertificates("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODA5ZTQ5N2FhNDIxNjUyNjkyYmM3MTg3MjVkM2ZmOTg4NWNmZDBmOGI1NzZmYzQwODk5MTlkYjAzMDlhNzZlYWNiZGI4NGYxNzJjYzI1MjUiLCJpYXQiOjE3MTQ0NzA4MzYuNzY1NjQzLCJuYmYiOjE3MTQ0NzA4MzYuNzY1NjQ2LCJleHAiOjE3NDYwMDY4MzYuNTk2OTI2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YYRKETl5K8Qy2TigkybyHpD81nwgBlr6lpTrQJa-NF9puzDPbne4kgfzsHU_vwRyWG4VygWMAAmJusDeO-TJNFiycoRRMHGQujs3vRD7KvKJ4xqwa1Igm63cuq-Gau6JjWuxbR_xPttfOw7rHtjX-jvZkoKsCoPrXKrY6bi4DWzpUumRUOaT2h_prXID3xz7LHxNpUDJzlZbtNUVtgoGWHtitVlJ6l5PuMrR6R6_wCBLd_WSxhHn5duolutKqtIB4ESMIDBcPifO5mhdmUrwYCrjDBIMl7DEaLOPYVNNNifLLvW4X0glN7pjDIKlnF_pHdPckVVvQiFVP2FdpfcH59ku-N6GLa9qpesTXncXBadzt_-g0LTQZ3HW6eQd9StHzHs5h_p0BqUUPrLdET865knGztYri1pwXBkdf5q6IwoOekUcg3mLrBnrrwpA9OxVfMlb3hYqI4EoSL429kaqUKuyB7USOAXGRB6Iey1OyFEcAYyuQaJBrUv9X4WvpRlLOa4iC3ubkx1lV8Xs841zz5kJFWeHHUQWhsSXvAIVIcztoBXEiS-knrx_l9nWRwqUPW3GhDC8OgQOnBJ6PUpvjjmXi6eXimX-yzqvDxxrVleQpsGy9Q--QbvTb4C_-RMrjTUw8EWINbhcKKhEUhz5_V8xjwvfHlP6UnndkMJTyuE")
      .then((response) => {
        if (response.status === 202) {
          setCertificates(response.data.data);
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

  const renderCertificate = (certificate) => {
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
          <Link
            to={`/certificates/${certificate.id}`}
            className={styles.view_button}
          >
            <BsEye />
          </Link>
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
            <Link to="/certificates/create" className={styles.create_button}>
              Create
            </Link>
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
          <tbody>{filteredCertificates.map(renderCertificate)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Certificates;