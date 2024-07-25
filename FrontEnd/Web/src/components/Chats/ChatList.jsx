import { useState, useEffect, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../../utils/Contexts';
import { FetchUserChats } from '../../apis/ChatApis';
import { FetchImage } from '../../apis/FileApi';
import ChatCard from './ChatCard';
import styles from './chats.module.css';


const ChatList = ({ setSelectedChat, updateList, setUpdateList }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);
  // Define states
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
    else {
      setChats([]);
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
        setUpdateList(false);
      });
    }
  }, [accessToken, updateList]);


  return (
    <div className={styles.List}>
      {isLoading ? <p>Loading...</p> :
        <ul className={styles.chat_list}>
          {chats ?
            <h4 className={styles.no_chats}>{t('components.nav_bar.no_chats')}</h4>
            : chats.map((chat) => (
              <ChatCard key={chat.id} chat={chat} onClick={() => setSelectedChat(chat)} />
            ))}
        </ul>
      }
    </div>
  );
};

export default ChatList;
