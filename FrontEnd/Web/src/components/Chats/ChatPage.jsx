import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../utils/Contexts";
import { FetchUserChats, FetchChatDetails } from "../../apis/ChatApis";
import styles from "./ChatPage.module.css";
import ChatList from "./ChatList";

// Chat window component
const ChatWindow = ({ selectedChat }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { accessToken } = useContext(LoginContext);
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      setIsLoading(true);
      FetchChatDetails( accessToken,selectedChat.id)
        .then((response) => {
          if (response.status === 200) {
            setMessages(response.data.chat.messages);
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
  }, [selectedChat, accessToken]);
  
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Logic to send the message
    // Reset input field after sending the message
    setInputMessage("");
  };
  console.log(selectedChat);
  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <h3>
          {selectedChat
            ? selectedChat.reciver.name
              ? selectedChat.reciver.name
              : selectedChat.reciver.full_name
            : "No chat selected"}
        </h3>
      </div>
      <div className={styles.chat_messages}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.user_id === selectedChat.sender.user_id ? styles.sender : styles.receiver
              }`}
              style={{ alignSelf: message.sender === "sender" ? "flex-end" : "flex-start" }}
            >
              <div className={styles.message_content}>{message.message}</div>
            </div>
          ))
        )}
      </div>
      <div className={styles.chat_input}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={handleInputChange}
        />
        <div>
          <button className={styles.submit_button} onClick={handleSendMessage}>
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
