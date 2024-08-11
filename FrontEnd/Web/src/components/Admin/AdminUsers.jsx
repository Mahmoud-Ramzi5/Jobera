import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BsChatFill, BsTrash } from "react-icons/bs";
import { LoginContext } from "../../utils/Contexts";
import { FetchAllUsers } from "../../apis/AdminApis.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";


const AdminUsers = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("individual");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchAllUsers(accessToken).then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (user_id) => {
    // TODO
    console.log(user_id);
  }

  const columnStructure = {
    company: [
      { key: "name", label: t('components.admin.users_table.column_structure.name') },
      { key: "phone_number", label: t('components.admin.users_table.column_structure.phone_number') },
      { key: "country", label: t('components.admin.users_table.column_structure.country') },
      { key: "state", label: t('components.admin.users_table.column_structure.state') },
      { key: "field", label: t('components.admin.users_table.column_structure.field') },
      { key: "founding_date", label: t('components.admin.users_table.column_structure.founding_date') },
      { key: "rating", label: t('components.admin.users_table.column_structure.rating') },
      { key: "is_verified", label: t('components.admin.users_table.column_structure.is_verified') },
    ],
    individual: [
      { key: "full_name", label: t('components.admin.users_table.column_structure.full_name') },
      { key: "phone_number", label: t('components.admin.users_table.column_structure.phone_number') },
      { key: "country", label: t('components.admin.users_table.column_structure.country') },
      { key: "state", label: t('components.admin.users_table.column_structure.state') },
      { key: "birth_date", label: t('components.admin.users_table.column_structure.birth_date') },
      { key: "gender", label: t('components.admin.users_table.column_structure.gender') },
      { key: "rating", label: t('components.admin.users_table.column_structure.rating') },
      { key: "is_verified", label: t('components.admin.users_table.column_structure.is_verified') },
    ]
  };

  const currentColumns = columnStructure[userType];

  const filteredUsers = userData && userData[userType]
    ? userData[userType].filter(user => user.type == 'individual' ?
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) :
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];


  if (isLoading) {
    return <Clock />;
  }
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div>
          <h1>{t('components.admin.users_table.h1')}</h1>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder={t('components.admin.users_table.search')}
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
            <label htmlFor="individual">
              {t('components.admin.users_table.individual')}
            </label>
            <input
              type="radio"
              id="company"
              name="userType"
              value="company"
              checked={userType === "company"}
              onChange={() => setUserType("company")}
            />
            <label htmlFor="company">
              {t('components.admin.users_table.company')}
            </label>
          </div>
        </div>
        <table className={styles.certificates_table}>
          <thead>
            <tr>
              {currentColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>{t('components.admin.users_table.actions')}</th>
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
                  <BsChatFill />
                </button>
                <button onClick={handleDelete} className={styles.delete_button} >
                  <BsTrash />
                </button>
              </td>
            </tr>)
          ) : (
            <tr>
              <td colSpan={currentColumns.length + 1}>{t('components.admin.users_table.no_users')}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
