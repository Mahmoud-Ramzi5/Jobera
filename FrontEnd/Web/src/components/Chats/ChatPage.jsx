import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../utils/Contexts";
import { FetchUserChats, FetchChatDetails, SendMessage } from "../../apis/ChatApis";
import styles from "./ChatPage.module.css";
import ChatList from "./ChatList";

// Chat window component
const ChatWindow = ({ selectedChat, setUpdateList }) => {
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

    SendMessage(accessToken, inputMessage, selectedChat.other_user.user_id)
      .then((response) => {
        if (response.status === 201) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: response.data.message_id, // Assuming response returns the new message ID
              user: {
                id: selectedChat.sender.user_id,
                name: selectedChat.sender.full_name,
              },
              message: inputMessage,
              send_date: new Date().toISOString(), // Assuming the message is sent immediately
            },
          ]);
          setInputMessage("");
          setUpdateList(true);
        } else {
          console.log(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    const diffInDays = Math.floor((currentDate - messageDate) / (1000 * 60 * 60 * 24));

    if (diffInDays < 7) {
      const options = {
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return messageDate.toLocaleString(undefined, options);
    } else {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return messageDate.toLocaleString(undefined, options);
    }
  };

  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <h3>
          {selectedChat
            ? selectedChat.other_user.name
              ? selectedChat.other_user.name
              : selectedChat.other_user.full_name
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
                message.user.id === selectedChat.sender.user_id ? styles.sender : styles.receiver
              }`}
              style={{ alignSelf: message.user.id === selectedChat.sender.user_id ? "flex-end" : "flex-start" }}
            >
              <div className={styles.message_content}>{message.message}</div>
              <div className={`${styles.timestamp} ${message.user.id === selectedChat.sender.user_id ? styles.sender : styles.receiver}`}>
                {formatTimestamp(message.send_date)}
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.chat_input}>
        <form onSubmit={handleSendMessage} className={styles.chatForm}>
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
  const [updateList, setUpdateList] = useState(false);

  return (
    <div className={styles.app}>
      <ChatList setSelectedChat={setSelectedChat} updateList={updateList} />
      <ChatWindow selectedChat={selectedChat} setUpdateList={setUpdateList} />
    </div>
  );
};

export default ChatPage;
