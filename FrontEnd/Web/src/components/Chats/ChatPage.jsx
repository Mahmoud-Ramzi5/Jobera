import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../utils/Contexts";
import { FetchUserChats, FetchChatDetails, SendMessage } from "../../apis/ChatApis";
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
      FetchChatDetails(accessToken, selectedChat.id)
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

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim() === "") return;

    SendMessage(accessToken, inputMessage, selectedChat.reciver.user_id)
      .then((response) => {
        if (response.status === 201) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: response.data.message_id,  // Assuming response returns the new message ID
              user_id: selectedChat.sender.user_id,
              message: inputMessage,
              sender: "sender",
            },
          ]);
          setInputMessage("");
        } else {
          console.log(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={handleInputChange}
            className={styles.chat_input_field}
          />
          <button type="submit" className={styles.submit_button}>
            Send
          </button>
        </form>
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
