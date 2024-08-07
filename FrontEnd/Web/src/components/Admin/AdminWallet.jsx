import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChatFill, Eye, Pencil, Trash } from "react-bootstrap-icons";
import { LoginContext, ProfileContext } from "../../utils/Contexts.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";
import { FetchAllUsers } from "../../apis/AdminApis.jsx";

const AdminWalet = () => {
  // Translations
  const { t } = useTranslation("global");
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Params
  const { user_id, user_name } = useParams();
  // Define states
  const initialized = useRef(false);

  const [userType, setUserType] = useState("All");

  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      FetchAllUsers("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzM0N2E0ZTdhYWVkYWJkMzM2YmMyNGU4Mjg0NjNhMWRjOWMxMTU4N2E4NmE2NjRjOGRkOTYzZmJhYTFlMzg3MDQ5YTI2MGIyNGY5ZjRjOGIiLCJpYXQiOjE3MjI3ODc2MzIuNzg4MzYxLCJuYmYiOjE3MjI3ODc2MzIuNzg4MzY0LCJleHAiOjE3NTQzMjM2MzIuNjc1NTYzLCJzdWIiOiIzNyIsInNjb3BlcyI6W119.N0p05mKAhfH4sIjMpjMHxnSZPdoL2OLt4qAffUP1WGBWRgyHX39NcN3XLtlWue2vU7W53kgNXTetAsKjPduQQQCeyO4BtgpOrpMp2pfzCcIY4jdF3I6-iov6DQWwV3YDhh1NzaV7QM4wmwZFSjX2MArjMG-RSiFQpHWji7yMzc90hTcK36ebdkBoJ7Je0PJXPVmDKWTfnhEZW6_JFseCnOB4jwPpi-DD3rEVYpNBwrCSkBTRBi7fn0oLzQXJ0YO_P6HJ0ZL86Ct6FXftgJLaOcjHwVBnm9Sm_0jnNQ5alehFdwLqEKdErafFCXE-wwth2eQBwMimgjnGUb1cHBUo7wdQgboNZcCKfDCez1TeT8ph5uPGhDMWsnkOF41TAFIayWaPBKez4Z0oRdznGiuAPw0DDP9bK7HQpyj3zO1hd_noOBM-GmNniRaWQaqfKuNNJR9SNdOMbrIDzEGe7tDx9Fi6eRYWkiLzWv0EShXOMehShC9Xixocg_7XYoP630A2Uz3nsO6XUHfp6sgRNKH9DlfsJJgtQhp3sEusza6mfzoihAVzMLowJys6tBJfDtS_K-A5DQplkMmXVPZ7zB0Bx5WRpBlscJks6DdVtXYQn2oUCe534KhuRmo4Ujg45E6JFx7vcVqRNIii0aoeD0apagUJxJf317AhulYhXiTqwIQ")
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
    Admin: [
      { key: "sender.name", label: "Sender Name" },
      { key: "job.title", label: "Job title" },
      { key: "amount", label: "Amount" },
      { key: "date", label: "Date" },  
    ],
    All: [
      { key: "sender.name", label: "Sender Name" },
      { key: "receiver.name", label: "Receiver Name" },
      { key: "job.title", label: "Job title" },
      { key: "amount", label: "Amount" },
      { key: "date", label: "Date" },
    ]
  };

  const currentColumns = columnStructure[userType];

  const filteredUsers = userData && userData[userType]
    ? userData[userType].filter(user => user.type == 'All' ?
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
          <h1>Transactions</h1>
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
              id="All"
              name="userType"
              value="All"
              checked={userType === "All"}
              onChange={() => setUserType("All")}
            />
            <label htmlFor="All">All</label>

            <input
              type="radio"
              id="Admin"
              name="userType"
              value="Admin"
              checked={userType === "Admin"}
              onChange={() => setUserType("Admin")}
            />
            <label htmlFor="Admin">Admin's</label>
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

export default AdminWalet;
