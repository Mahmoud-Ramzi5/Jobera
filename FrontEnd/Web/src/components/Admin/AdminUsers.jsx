import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsChatFill, BsTrash } from "react-icons/bs";
import { LoginContext } from "../../utils/Contexts";
import { DeleteUserAPI, FetchAllUsers } from "../../apis/AdminApis.jsx";
import { CreateChat } from "../../apis/ChatApis.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";


const AdminUsers = () => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState("individual");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    } else {
      setIsLoading(true);

      FetchAllUsers(accessToken, currentPage, userType).then((response) => {
        if (response.status === 200) {
          setData(response.data.pagination_data);
          setUserData([]);
          response.data.users.map((user) => {
            if (!userData.some(item => user.user_id === item.user_id)) {
              setUserData(response.data.users);
            }
          });
        } else {
          console.log(response);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [currentPage, userType]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChat = (user_id) => {
    CreateChat(accessToken, user_id).then((response) => {
      if (response.status === 201) {
        navigate(`/chats/${response.data.chat.id}`);
      } else {
        console.log(response.statusText);
      }
    });
  }

  const handleDelete = (user_id) => {
    DeleteUserAPI(accessToken, user_id).then((response) => {
      if (response.status == 204) {
        window.location.reload(); // Refresh the page after deletion
      } else {
        console.log(response);
      }
    });
  };

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

  const filteredUsers = userData
    ? userData.filter(user => user.type == 'individual' ?
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
              onChange={() => {
                setUserType("individual");
                setCurrentPage(1);
              }}
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
              onChange={() => {
                setUserType("company");
                setCurrentPage(1);
              }}
            />
            <label htmlFor="company">
              {t('components.admin.users_table.company')}
            </label>
          </div>
        </div>
        <table className={styles.certificates_table}>
          <thead>
            <tr>
              {currentColumns.map((column) => (<th key={column.key}>{column.label}</th>))}
              <th>{t('components.admin.users_table.actions')}</th>
            </tr>
          </thead>
          <tbody>{filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <tr key={user.user_id}>
              {currentColumns.map((column) => (
                <td key={column.key}>
                  {column.key == "rating" ? user[column.key] == null ? 0 : user[column.key] :
                    column.key == "is_verified" ? column.key == true ? "False" : "True" :
                      column.key == "full_name" || column.key == "name" ?
                        <a className={styles.anchor} href={`/profile/${user.user_id}/${user[column.key]}`}>
                          {user[column.key]}
                        </a> :
                        user[column.key]
                  }
                </td>
              ))}
              <td>
                <button onClick={() => handleChat(user.user_id)} className={styles.edit_button} >
                  <BsChatFill />
                </button>
                <button onClick={() => handleDelete(user.user_id)} className={styles.delete_button} >
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
        {/* Pagination */}
        <div className={styles.pagination}>
          {data.pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? styles.activePage : styles.page}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
