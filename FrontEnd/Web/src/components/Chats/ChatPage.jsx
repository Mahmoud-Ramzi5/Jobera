import { useState, useEffect, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Pusher from 'pusher-js';
import { LoginContext, ProfileContext } from '../../utils/Contexts';
import { FetchUserChats, FetchChat, SendMessage } from '../../apis/ChatApis';
import ChatList from './ChatList';
import Clock from '../../utils/Clock';
import styles from './chats.module.css';


const ChatPage = () => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const subscribed = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchUserChats(accessToken).then((response) => {
        if (response.status === 200) {
          response.data.chats.map((chat) => {
            // Check if chat is already in array
            if (!chats.some(item => chat.id === item.id)) {

              if (chat.other_user.avatar_photo) {
                FetchImage("", chat.other_user.avatar_photo).then((response) => {
                  chat.other_user.avatar_photo = response;
                  setChats((prevState) => ([...prevState, chat]));
                });
              }
              else {
                setChats((prevState) => ([...prevState, chat]));
              }
            }
          });
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
        setSubscribe(true);
      });
    }
  }, []);


  useEffect(() => {
    if (!subscribed.current && chats.length > 0) {
      subscribed.current = true;
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

      var channels = [];
      chats.forEach((chat) => {
        const channel = pusher.subscribe(`private-chat.${chat.id}`);
        channels.push(channel);

        channel.bind('NewMessage', data => {
          setChats(chats.map((chat2) => (chat2.id === data.message.chat_id ?
            { ...chat2, last_message: data.message }
            : chat2)
          ));

          setSelectedChatMessages((prevMessages) => ([...prevMessages, data.message]));
        });
      });

      return () => {
        channels.forEach((channel) => {
          channel.unbind_all();
          channel.unsubscribe();
        });
      };
    }
  }, [subscribe])


  return (
    <div className={styles.chat_page}>
      <ChatList chats={chats} setChats={setChats} setSelectedChat={setSelectedChat} isLoading={isLoading} />
      <ChatWindow chat={selectedChat} messages={selectedChatMessages} setMessages={setSelectedChatMessages} />
    </div>
  );
};


const ChatWindow = ({ chat, messages, setMessages }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  const { profile } = useContext(ProfileContext);
  // Define states
  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (chat) {
      setIsLoading(true);

      FetchChat(accessToken, chat.id).then((response) => {
        if (response.status === 200) {
          setMessages(response.data.chat.messages);
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [chat]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    setSendMessage(true);
    if (inputMessage.trim() === "") { return };

    SendMessage(accessToken, inputMessage, chat.other_user.user_id).then((response) => {
      if (response.status === 201) {
        setInputMessage("");
      } else {
        console.log(response);
      }
    }).then(() => {
      setSendMessage(false);
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
    // Scroll to new message
    const Chat_Area = document.getElementById('Chat_Area');
    Chat_Area.scrollTo(0, Chat_Area.scrollHeight);
  }, [messages]);


  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <h3>
          {chat ? chat.other_user.name : t('components.chat_page.chat_header')}
        </h3>
      </div>
      {isLoading ? <Clock /> : <>
        <div id='Chat_Area' className={styles.chat_messages}>
          {messages.map((message) => (
            <div key={message.id} className={` ${styles.message} 
                ${message.sender.user_id === profile.user_id ? styles.sender : styles.receiver}
              `}>
              <div className={styles.message_content}>{message.message}</div>
              <div className={`${styles.timestamp}`}>{formatTimestamp(message.send_date)}</div>
            </div>
          ))}
        </div>
        {chat &&
          <form onSubmit={handleSendMessage} className={styles.chat_form}>
            <input
              type="text"
              placeholder={t('components.chat_page.chat_input')}
              value={inputMessage}
              onChange={(event) => setInputMessage(event.target.value)}
            />
            {!sendMessage &&
              <button type="submit" className={styles.submit_button}>
                {t('components.chat_page.chat_button')}
              </button>
            }
          </form>
        }
      </>}
    </div>
  );
};

export default ChatPage;
