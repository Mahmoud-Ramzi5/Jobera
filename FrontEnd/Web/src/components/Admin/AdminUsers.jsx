import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChatFill, Eye, Pencil, Trash } from "react-bootstrap-icons";
import { LoginContext, ProfileContext } from "../../utils/Contexts";
import {
  ShowCertificatesAPI,
  DeleteCertificateAPI,
} from "../../apis/ProfileApis/EducationApis.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";
import { FetchAllUsers } from "../../apis/AdminApis.jsx";

const AdminUsers = () => {
  // Translations
  const { t } = useTranslation("global");
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { user_id, user_name } = useParams();
  // Define states
  const initialized = useRef(false);

  const [userType, setUserType] = useState("individual");

  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      FetchAllUsers("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOThmZWU2YjBhNWM4NjQ1MzdmMDcxYzE1NmFiYmJjODIwOWYxNTg3OTIzMzM1Mjc2OGI5Zjk0OTBkYTI2YzQ2ODJiYzFjYjg5NTliOThkMTYiLCJpYXQiOjE3MTMwMjAxMjUuMTY3NTgsIm5iZiI6MTcxMzAyMDEyNS4xNjc1ODIsImV4cCI6MTc0NDU1NjEyNS4xNTg0MjYsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.mPoISxA7AjSEFBHC1cFdAazZeY86STejWLYCX_L0BuORV05hUvtjHEiB-TXR6mU9-iAdY_sqKuGbAlw1Ep9XXjEu-ALd8n1ixag6wlo470IqCTr8iMHnOt_3YqQwS84jnhwWytCT2wWmW4fBm9JcbGcNslTspZk51cqtX_HamfotXdYjYrD8JgBMU7ui0yP-T1B0F7TAalIBwEPzADVu6U_7UZnGSRUJfkiCTygdsJxIqGLywxlrqrYUmsKwWspbEH0svj6y9wKPAedHxumSydpDo9o51YBQUHiFjHr0NvzcBrKtj6Tdzfucwi4IeVrPI0HsoymcudptApsgKRFWO7RZlefQnKXDC8Z_-h4kz5f7KFZOk60hDQwpuCTXJEIUG3fKf2TGsK5iCw8co1siJiJLouGWU61ymCrES_uNMHzmn3oaZqTULgadSD3l_PqKfO05ckpZY5d76NIlmrWFrTh2Rqb-Qa7vokfBxAnuqAADy9u2MblXVY2LNiuUwFJAgTMUuxqE0lUvPgTOxaLQ1m_UelO90VoFKXfdUb9O9zrzobiaoMQmzsolGwckcIh-LR1iwAz3HDmp0de_wGhY2oXTuBbwjWkb4Hp6wpn3oXU5FkEY7jrTfrDULpHV8UNwE8-H7qrPiER7muj8kFl67KEVggzrKOs3WxLxZL2_1eI")
        .then((response) => {
          if (response.status === 200) {
            setUserData(response.data);
          } else {
            console.log(response.statusText);
          }
          setIsLoading(false);
        });
    }
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleUserTypeChange = (type) => {
    setJobType(type);
  };


  const columnStructure = {
    company: [
      { key: "name", label: "Name" },
      { key: "phone_number", label: "Phone Number" },
      { key: "country", label: "Country" },
      { key: "state", label: "State" },
      { key: "field", label: "Field" },
      { key: "founding_date", label: "Founding Date" },
      { key: "rating", label: "Rating" },
      { key: "is_verified", label: "Verified" },
    ],
    individual: [
      { key: "full_name", label: "Full Name" },
      { key: "phone_number", label: "Phone Number" },
      { key: "country", label: "Country" },
      { key: "state", label: "State" },
      { key: "birth_date", label: "Birth Date" },
      { key: "gender", label: "Gender" },
      { key: "rating", label: "Rating" },
      { key: "is_verified", label: "Verified" },
    ]
  };

  const currentColumns = columnStructure[userType];

  const filteredUsers = userData && userData[userType]
    ? userData[userType].filter(user => user.type == 'individual' ?
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) :
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleDelete = (user_id) => {
    console.log(user_id)
  }

  if (isLoading) {
    return <Clock />;
  }
  console.log(userData[userType])
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div>
          <h1>Users</h1>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder={t("name")}
              value={searchQuery}
              onChange={handleSearch}
              className={styles.search_input}
            />
          </div>
          <div className={styles.slider}>
            <input
              type="radio"
              id="individual"
              name="userType"
              value="individual"
              checked={userType === "individual"}
              onChange={() => setUserType("individual")}
            />
            <label htmlFor="individual">Individual</label>

            <input
              type="radio"
              id="company"
              name="userType"
              value="company"
              checked={userType === "company"}
              onChange={() => setUserType("company")}
            />
            <label htmlFor="company">Company</label>
          </div>
        </div>
        <table className={styles.certificates_table}>
          <thead>
            <tr>
              {currentColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <tr key={user.user_id}>
              {currentColumns.map((column) => (
                <td key={column.key}>
                  {column.key == "rating" ? user[column.key] == null ? 0 : user[column.key] :
                    column.key == "is_verified" ? column.key == true ? "True" : "False" :
                      user[column.key]
                  }
                </td>
              ))}
              <td>
              <button onClick={handleDelete} className={styles.edit_button} >
                  <ChatFill />
                </button>
                <button onClick={handleDelete} className={styles.delete_button} >
                  <Trash />
                </button>

              </td>
            </tr>)
          ) : (
            <tr>
              <td colSpan={currentColumns.length + 1}>No users found</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
