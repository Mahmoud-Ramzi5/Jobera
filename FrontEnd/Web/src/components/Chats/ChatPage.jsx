import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { FetchChat, SendMessage } from '../../apis/ChatApis';
import ChatList from './ChatList';
import Clock from '../../utils/Clock';
import styles from './chats.module.css';


const ChatPage = () => {
  // Define states
  const [selectedChat, setSelectedChat] = useState(null);
  const [updateList, setUpdateList] = useState(false);

  return (
    <div className={styles.chat_page}>
      <ChatList setSelectedChat={setSelectedChat} updateList={updateList} setUpdateList={setUpdateList} />
      <ChatWindow selectedChat={selectedChat} setUpdateList={setUpdateList} />
    </div>
  );
};


const ChatWindow = ({ selectedChat, setUpdateList }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const [isLoading, setIsLoading] = useState(false);

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      setIsLoading(true);

      FetchChat(accessToken, selectedChat.id).then((response) => {
        if (response.status === 200) {
          setMessages(response.data.chat.messages);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [selectedChat]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim() === "") { return };

    setIsLoading(true);
    SendMessage(accessToken, inputMessage, selectedChat.other_user.user_id).then((response) => {
      if (response.status === 201) {
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
        setInputMessage("");
        setUpdateList(true);
      } else {
        console.log(response.statusText);
      }
    }).then(() => {
      setIsLoading(false);
    });
  }

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
          {selectedChat ? selectedChat.other_user.name : t('components.chat_page.chat_header')}
        </h3>
      </div>
      <div className={styles.chat_messages}>
        {isLoading ? <Clock /> : (
          messages.map((message) => (
            <div key={message.id} className={` ${styles.message} 
                ${message.user.user_id === profile.user_id ? styles.sender : styles.receiver}
              `}>
              <div className={styles.message_content}>{message.message}</div>
              <div className={`${styles.timestamp}`}>{formatTimestamp(message.send_date)}</div>
            </div>
          ))
        )}
      </div>
      {selectedChat &&
        <form onSubmit={handleSendMessage} className={styles.chat_form}>
          <input
            type="text"
            placeholder={t('components.chat_page.chat_input')}
            value={inputMessage}
            onChange={(event) => setInputMessage(event.target.value)}
          />
          <button type="submit" className={styles.submit_button}>
            {t('components.chat_page.chat_button')}
          </button>
        </form>
      }
    </div>
  );
};

export default ChatPage;
