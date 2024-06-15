import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../utils/Contexts";
import { FetchUserChats,FetchChatDetails } from "../../apis/ChatApis";
import { Card } from 'react-bootstrap';
import styles from "./ChatPage.module.css";

// Chat list component
const ChatList = ({ setSelectedChat }) => {
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
  }, [accessToken]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const RenderChat = (chat) => {
    return (
      <div className={`${styles.chat_item} ${styles.chat_item_border}`} key={chat.id} onClick={() => handleChatClick(chat)}>
        <div className={styles.avatar}>
          <form className={styles.profile_picture_container}>
            {chat.reciver.avatar_photo ? (
              <Card.Img
                className={styles.Card_Img}
                variant="top"
                src={chat.reciver.avatar_photo}
                alt={"Profile Picture"}
                style={{ pointerEvents: 'none' }}
              />
            ) : (
              <Card.Img
                className={styles.Card_Img}
                variant="top"
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5NjeHQbu_ztouupPjcHZsD9LT-QYehassjT3noI4Q&s"
                }
                alt={"Picture"}
                style={{ pointerEvents: 'none' }}
              />
            )}
          </form>
        </div>
        <div className={styles.chat_details}>
          <h3>{chat.reciver.name ?chat.reciver.name:chat.reciver.full_name }</h3>
          <p>{chat.last_message.message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.chat_list}>
      {isLoading ? <p>Loading...</p> : chats.map((chat) => RenderChat(chat))}
    </div>
  );
};

// Chat window component
const ChatWindow = ({ selectedChat }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages,setMessages]=useState([]);
  const { accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);
      console.log(selectedChat)
    }
  }, );

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Logic to send the message
    // Reset input field after sending the message
    setInputMessage('');
  };
  console.log(selectedChat)
  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <h3>{selectedChat ? (selectedChat.reciver.name ?selectedChat.reciver.name:selectedChat.reciver.full_name)  : "No chat selected"}</h3>
      </div>
      <div className={styles.chat_messages}>
        {/* Display messages of the selected chat */}
      </div>
      <div className={styles.chat_input}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={handleInputChange}
        />
        <div>
          <button
            className={styles.submit_button}
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Main app component
const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className={styles.app}>
      <ChatList setSelectedChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
};

export default ChatPage;