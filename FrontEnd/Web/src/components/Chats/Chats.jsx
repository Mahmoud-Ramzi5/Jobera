import React, { useState, useEffect, useContext, useRef } from "react";
import { FetchUserChats, FetchChatDetails } from "../../apis/ChatApis";
import { useNavigate } from "react-router-dom";
import styles from "./Chats.module.css";
import { ThemeContext,LoginContext } from "../../utils/Contexts";
import { Card } from "react-bootstrap";
const ChatNavWindow = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chats,setChats]=useState([]);

  // Sample chat data
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      FetchUserChats(accessToken)
        .then((response) => {
          if (response.status === 200) {
            setChats(response.data.chats);
          } else {
            console.log(response.statusText);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [accessToken]);
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
        {chats.slice(0,3).map((chat) => (
          <li key={chat.id} className={styles.chat}>
            <div className={styles.avatar}>
            <form className={styles.profile_picture_container}>
              {chat.reciver.avatar_photo ? (
                <Card.Img
                  className={styles.Card_Img}
                  variant="top"
                  src={chat.reciver.avatar_photo}
                  alt={"Profile Picture"}
                  style={{ pointerEvents: "none" }}
                />
              ) : (
                <Card.Img
                  className={styles.Card_Img}
                  variant="top"
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s"
                  }
                  alt={"Picture"}
                  style={{ pointerEvents: "none" }}
                />
              )}
            </form>
          </div>
            <div className={styles.user}>  {chat.reciver.name ? chat.reciver.name : chat.reciver.full_name}</div>
            <div className={styles.message}>{chat.last_message.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChatNavWindow;
