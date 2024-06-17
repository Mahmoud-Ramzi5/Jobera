import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../utils/Contexts";
import { FetchUserChats, FetchChatDetails } from "../../apis/ChatApis";
import { Card } from "react-bootstrap";
import styles from "./ChatPage.module.css";
// Chat list component
const ChatList = ({ setSelectedChat,updateList }) => {
    const { accessToken } = useContext(LoginContext);
    const initialized = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chats, setChats] = useState([]);
  
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
    }, [accessToken,updateList]);
  
    const handleChatClick = (chat) => {
      setSelectedChat(chat);
    };
  
    const RenderChat = ({chat}) => {
      return (
        <div
          className={`${styles.chat_item} ${styles.chat_item_border}`}
          key={chat.id}
          onClick={() => handleChatClick(chat)}
        >
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
          <div className={styles.chat_details}>
            <h3>
              {chat.reciver.name ? chat.reciver.name : chat.reciver.full_name}
            </h3>
            <p>{chat.last_message.message}</p>
          </div>
        </div>
      );
    };
  
    return (
      <div className={styles.chat_list}>
        {isLoading ? <p>Loading...</p> : chats.map((chat) => <RenderChat key={chat.id} chat={chat} />)}
      </div>
    );
  };
  export default ChatList;