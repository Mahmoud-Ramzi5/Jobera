import React from "react";
import styles from './Chats.module.css';
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
const Chats = () => {
  // Sample chat data
  const chats = [
    { id: 1, user: "John Doe", lastMessage: "Hello there!" },
    { id: 2, user: "Jane Smith", lastMessage: "How are you?" },
    { id: 3, user: "Alice Johnson", lastMessage: "Nice to meet you." },
  ];

  return (
    <div className={styles.container}>
      <h2>All Chats</h2>
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
export default Chats;