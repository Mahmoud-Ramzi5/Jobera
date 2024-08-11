import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../../utils/Contexts';
import { MarkMessagesAsRead } from '../../apis/ChatApis';
import ChatCard from './ChatCard';
import styles from './chats.module.css';


const ChatList = ({ chats, setChats, setSelectedChat, isLoading }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { accessToken } = useContext(LoginContext);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    MarkMessagesAsRead(accessToken, chat.id).then((response) => {
      if (response.status === 200) {
        setChats(chats.map((chat2) => (chat2.id === chat.id ?
          { ...chat2, unread_messages: 0 }
          : chat2)
        ));
        setSelectedChat(chat);
      } else {
        console.log(response);
      }
    });
  }


  return (
    <div className={styles.List}>
      {isLoading ? <p>Loading...</p> :
        <ul className={styles.chat_list}>
          {chats.length === 0 ?
            <h4 className={styles.no_chats}>{t('components.nav_bar.no_chats')}</h4>
            : chats.map((chat) => (
              <ChatCard key={chat.id} chat={chat} onClick={() => handleChatSelect(chat)} />
            ))}
        </ul>
      }
    </div>
  );
};

export default ChatList;
