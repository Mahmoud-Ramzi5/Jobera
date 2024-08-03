import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
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

    if (selectedChat) {
      Pusher.logToConsole = true;

      const pusher = new Pusher('181e3fe8a6a1e1e21e6e', {
        cluster: 'ap2',
        encrypted: true,
        authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
        auth: {
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      });

      const channel = pusher.subscribe(`private-chat.${selectedChat.id}`);
      channel.bind('NewMessage', data => {
        setMessages(prevMessages => [...prevMessages, data.message]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [selectedChat]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim() === "") { return };

    SendMessage(accessToken, inputMessage, selectedChat.other_user.user_id).then((response) => {
      if (response.status === 201) {
        setInputMessage("");
      } else {
        console.log(response);
      }
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

  useEffect(() => {
    // Update List
    setUpdateList(true);

    // Scroll to new message
    const Chat_Area = document.getElementById('Chat_Area');
    Chat_Area.scrollTo(0, Chat_Area.scrollHeight);
  }, [messages]);


  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <h3>
          {selectedChat ? selectedChat.other_user.name : t('components.chat_page.chat_header')}
        </h3>
      </div>
      <div id='Chat_Area' className={styles.chat_messages}>
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
