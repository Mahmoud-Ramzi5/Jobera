import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsChatFill, BsTrash } from "react-icons/bs";
import { LoginContext } from "../../utils/Contexts.jsx";
import { DeleteTransactionAPI } from "../../apis/AdminApis.jsx";
import { GetAllTransactions, GetTransactions } from "../../apis/TransactionsApis.jsx";
import { CreateChat } from "../../apis/ChatApis.jsx";
import Clock from "../../utils/Clock.jsx";
import styles from "../../styles/AdminPage.module.css";


const AdminWalet = () => {
  // Translations
  const { t } = useTranslation("global");
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);
  const [adminTransactions, setAdminTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("All");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      GetAllTransactions(accessToken).then((response) => {
        if (response.status === 200) {
          setAllTransactions(response.data.transactions);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });

      GetTransactions(accessToken).then((response) => {
        if (response.status === 200) {
          setAdminTransactions(response.data.transactions);
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

  const handleDelete = (transaction_id) => {
    DeleteTransactionAPI(accessToken, transaction_id).then((response) => {
      if (response.status == 204) {
        window.location.reload();
      } else {
        console.log(response);
      }
    })
  };

  const handleChat = (user_id) => {
    CreateChat(accessToken, user_id).then((response) => {
      if (response.status == 201) {
        navigate(`/chats/${response.data.chat.id}`);
      } else {
        console.log(response.statusText);
      }
    })
  }

  const columnStructure = {
    Admin: [
      { key: "sender.name", label: t("components.admin.wallet_table.column_structure.sender_name") },
      { key: "job.title", label: t("components.admin.wallet_table.column_structure.job_title") },
      { key: "amount", label: t("components.admin.wallet_table.column_structure.amount") },
      { key: "date", label: t("components.admin.wallet_table.column_structure.date") },
    ],
    All: [
      { key: "sender.name", label: t("components.admin.wallet_table.column_structure.sender_name") },
      { key: "receiver.name", label: t("components.admin.wallet_table.column_structure.receiver_name") },
      { key: "job.title", label: t("components.admin.wallet_table.column_structure.job_title") },
      { key: "amount", label: t("components.admin.wallet_table.column_structure.amount") },
      { key: "date", label: t("components.admin.wallet_table.column_structure.date"), },
    ],
  };

  const currentColumns = columnStructure[transactionType];

  const filteredTransactions = transactionType == "All"
    ? allTransactions.filter((transaction) =>
      transaction.job.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : adminTransactions.filter((transaction) =>
      transaction.job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


  if (isLoading) {
    return <Clock />;
  }
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div>
          <h1>{t("components.admin.wallet_table.h1")}</h1>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder={t("components.admin.wallet_table.search")}
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
            <label htmlFor="All">
              {t("components.admin.wallet_table.all")}
            </label>
            <input
              type="radio"
              id="Admin"
              name="transactionType"
              value="Admin"
              checked={transactionType === "Admin"}
              onChange={() => setTransactionType("Admin")}
            />
            <label htmlFor="Admin">
              {t("components.admin.wallet_table.admin_s")}
            </label>
          </div>
        </div>
        <table className={styles.certificates_table}>
          <thead>
            <tr>
              {currentColumns.map((column) => (<th key={column.key}>{column.label}</th>))}
              <th>{t("components.admin.wallet_table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  {currentColumns.map((column) => (
                    <td key={column.key}>{" "}
                      {column.key === "date"
                        ? new Date(transaction.date).toISOString().split("T")[0]
                        : column.key === "job.title"
                          ? transaction.job.title
                          : column.key === "sender.name"
                            ? transaction.sender.name
                            : column.key === "receiver.name"
                              ? transaction.receiver.name
                              : transaction[column.key]}{" "}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleChat(transaction.sender.id)} className={styles.edit_button} >
                      <BsChatFill />
                    </button>
                    <button onClick={() => handleDelete(transaction.id)} className={styles.delete_button} >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={currentColumns.length + 1}>
                  {t("components.admin.wallet_table.no_transactions")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWalet;
