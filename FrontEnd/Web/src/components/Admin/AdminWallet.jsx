import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChatFill, Eye, Pencil, Trash } from "react-bootstrap-icons";
import { LoginContext, ProfileContext } from "../../utils/Contexts.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";
import { FetchAllUsers } from "../../apis/AdminApis.jsx";
import { GetAllTransactions, GetTransactions } from "../../apis/TransactionsApis.jsx";

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

  const [transactionType, setTransactionType] = useState("All");

  const [isLoading, setIsLoading] = useState(true);

  const [allTransactions, setAllTransactions] = useState([]);
  const [adminTransactions, setAdminTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      GetAllTransactions(accessToken)
        .then((response) => {
          if (response.status === 200) {
            setAllTransactions(response.data.transactions);
          } else {
            console.log(response.statusText);
          }
          setIsLoading(false);
        });
        GetTransactions(accessToken)
        .then((response) => {
          if (response.status === 200) {
            setAdminTransactions(response.data.transactions);
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

  const currentColumns = columnStructure[transactionType];

  const filteredTransactions = transactionType=="All"?allTransactions:adminTransactions;

  const handleDelete = (user_id) => {
    console.log(user_id)
  }

  if (isLoading) {
    return <Clock />;
  }
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
              name="transactionType"
              value="All"
              checked={transactionType === "All"}
              onChange={() => setTransactionType("All")}
            />
            <label htmlFor="All">All</label>

            <input
              type="radio"
              id="Admin"
              name="transactionType"
              value="Admin"
              checked={transactionType === "Admin"}
              onChange={() => setTransactionType("Admin")}
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
          <tbody>{filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => <tr key={transaction.id}>
              {currentColumns.map((column) => (
                <td key={column.key}>
                  {
                    transaction[column.key]
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
              <td colSpan={currentColumns.length + 1}>No transactions found</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWalet;
