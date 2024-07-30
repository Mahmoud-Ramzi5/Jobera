import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import { LoginContext, ProfileContext } from "../../utils/Contexts";
import {
  ShowCertificatesAPI,
  DeleteCertificateAPI,
} from "../../apis/ProfileApis/EducationApis.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";

const AdminSkills = () => {
  // Translations
  const { t } = useTranslation("global");
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { user_id, user_name } = useParams();
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [jobType, setJobType] = useState("fullTimeJob");
  const [edit, setEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      if (typeof user_id !== "undefined" || typeof user_name !== "undefined") {
        ShowCertificatesAPI(accessToken, user_id, user_name)
          .then((response) => {
            if (response.status === 200) {
              setCertificates(response.data.certificates);
            } else {
              console.log(response.statusText);
              navigate("/notfound");
            }
          })
          .then(() => {
            setIsLoading(false);
          });
      } else {
        ShowCertificatesAPI(accessToken, profile.user_id, profile.full_name)
          .then((response) => {
            if (response.status === 200) {
              setCertificates(response.data.certificates);
            } else {
              console.log(response.statusText);
            }
          })
          .then(() => {
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
    if (typeof user_id !== "undefined" || typeof user_name !== "undefined") {
      navigate(`/profile/${user_id}/${user_name}`);
    } else {
      navigate(`/profile/${profile.user_id}/${profile.full_name}`);
    }
  };

  const handleStep3 = (event) => {
    event.preventDefault();
    step("PORTFOLIO");
  };

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RenderCertificate = (certificate) => {
    const handleEdit = (event) => {
      navigate("/edit-certificate", {
        state: { edit: edit, add: false, certificate },
      });
    };

    const handleDelete = (event) => {
      DeleteCertificateAPI(accessToken, certificate.id).then((response) => {
        if (response.status == 204) {
          window.location.reload(); // Refresh the page after deletion
        } else {
          console.log(response.statusText);
        }
      });
    };

    return (
        <tr key={certificate.id}>
          {currentColumns.map((column) => (
            <td key={column.key}>{certificate[column.key]}</td>
          ))}
          <td>
            {/* Actions buttons */}
            <button onClick={() => handleViewCertificate(certificate)} className={styles.view_button}>
              <Eye />
            </button>
            {isAdmin &&
              <React.Fragment>
                <button onClick={() => handleEditCertificate(certificate)} className={styles.edit_button}>
                  <Pencil />
                </button>
                <button onClick={() => handleDelete(certificate.id)} className={styles.delete_button}>
                  <Trash />
                </button>
              </React.Fragment>
            }
          </td>
        </tr>
    );
  };

  const currentColumns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    {key:"count",label:"Count"}
  ];

  if (isLoading) {
    return <Clock />;
  }
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div>
          <h1>Skills</h1>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder={t("components.certificates.search_input")}
              value={searchQuery}
              onChange={handleSearch}
              className={styles.search_input}
            />
          </div>
        </div>
        <table className={styles.certificates_table}>
          <thead>
            <tr>
              {currentColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>Actions</th> {/* This is a fixed column for actions */}
            </tr>
          </thead>
          <tbody>{filteredCertificates.map(RenderCertificate)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSkills;
