import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { ShowCertificatesAPI, DeleteCertificateAPI } from '../../apis/ProfileApis/EducationApis.jsx';
import { FetchFile } from '../../apis/FileApi';
import Clock from '../../utils/Clock.jsx';
import styles from './certificates.module.css';


const Certificates = ({ step }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { user_id, user_name } = useParams();
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [edit, setEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      if (typeof user_id !== 'undefined' || typeof user_name !== 'undefined') {
        ShowCertificatesAPI(accessToken, user_id, user_name).then((response) => {
          if (response.status === 200) {
            setCertificates(response.data.certificates);
          }
          else {
            console.log(response.statusText);
          }
        }).then(() => {
          setIsLoading(false);
        });
      }
      else {
        ShowCertificatesAPI(accessToken, profile.user_id, profile.full_name).then((response) => {
          if (response.status === 200) {
            setCertificates(response.data.certificates);
          }
          else {
            console.log(response.statusText);
          }
        }).then(() => {
          setIsLoading(false);
        });
      }


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
    if (typeof user_id !== 'undefined' || typeof user_name !== 'undefined') {
      navigate(`/profile/${user_id}/${user_name}`);
    } else {
      navigate(`/profile/${profile.user_id}/${profile.full_name}`);
    }
  };

  const handleStep3 = (event) => {
    event.preventDefault();
    step('PORTFOLIO');
  }


  const filteredCertificates = certificates.filter((certificate) =>
    certificate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RenderCertificate = (certificate) => {
    const handleEdit = (event) => {
      navigate('/edit-certificate', {
        state: { edit: edit, add: false, certificate }
      });
    };

    const handleDelete = (event) => {
      DeleteCertificateAPI(accessToken, certificate.id).then((response) => {
        if (response.status == 204) {
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
            onClick={async () => { FetchFile("", certificate.file); }}
            className={styles.view_button}
          >
            <Eye />
          </button>
          {profile.user_id == user_id || typeof user_id === 'undefined' ?
            <>
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
            </> : <></>}
        </td>
      </tr>
    );
  };


  if (isLoading) {
    return <Clock />
  }
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
            {profile.user_id == user_id || typeof user_id === 'undefined' ?
              <>
                <button
                  className={styles.create_button}
                  onClick={() => navigate('/edit-certificate', {
                    state: { edit: edit, add: true }
                  })}
                >
                  Create
                </button>
                <form className={styles.submit_div} onSubmit={edit ? handleEdit : handleStep3}>
                  <div>
                    <button className={styles.submit_button}>{edit ? 'Back to profile' : 'Submit'}</button>
                  </div>
                </form>
              </> : <></>}
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