import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Chats.module.css";
import { ThemeContext } from "../../utils/Contexts";
import { ChevronRight } from "react-bootstrap-icons";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
const ChatList = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Sample chat data
  const chats = [
    { id: 1, user: "John Doe", lastMessage: "Hello there!" },
    { id: 2, user: "Jane Smith", lastMessage: "How are you?" },
    { id: 3, user: "Alice Johnson", lastMessage: "Nice to meet you." },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.Chatshead}>
        <h2>Recent Chats</h2>
        <button
          type="button"
          className={
            theme === "theme-light"
              ? "btn btn-outline-dark"
              : "btn btn-outline-light"
          }
          onClick={() => navigate("/chatsPage")}
        >
          Show Chats
        </button>
      </div>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} className={styles.chat}>
            <div className={styles.user}>{chat.user}</div>
            <div className={styles.message}>{chat.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChatList;
