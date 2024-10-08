import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext, LoginContext } from '../../utils/Contexts.jsx';
import { FetchUserChats } from '../../apis/ChatApis.jsx';
import { FetchImage } from '../../apis/FileApi.jsx';
import ChatCard from './ChatCard.jsx';
import styles from './chats.module.css';


const ChatNav = ({ setShowChatsScreen }) => {
  // Translations
  const { t } = useTranslation('global');
  // Context
  const { theme } = useContext(ThemeContext);
  const { accessToken } = useContext(LoginContext);
  // Define states
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setIsLoading(true);

      FetchUserChats(accessToken).then((response) => {
        if (response.status === 200) {
          response.data.chats.map((chat) => {
            if (chat.other_user.avatar_photo) {
              FetchImage("", chat.other_user.avatar_photo).then((response) => {
                chat.other_user.avatar_photo = response;
                setChats((prevState) => ([...prevState, chat]));
              });
            }
            else {
              setChats((prevState) => ([...prevState, chat]));
            }
          });
        } else {
          console.log(response.statusText);
        }
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [accessToken]);


  return (
    <div className={styles.container}>
      <div className={styles.chats_head}>
        <h4>{t('components.nav_bar.h4_chats')}</h4>
        <button
          type='button'
          className={
            theme === 'theme-light'
              ? 'btn btn-outline-dark'
              : 'btn btn-outline-light'
          }
          onClick={() => {
            navigate("/chats");
            setShowChatsScreen(false);
          }}
        >
          {t('components.nav_bar.button_chats')}
        </button>
      </div>
      <ul className={styles.chat_list}>
        {isLoading ? <>Loading...</> : chats.length === 0 ?
          <h4 className={styles.no_chats}>{t('components.nav_bar.no_chats')}</h4>
          : chats.slice(0, 3).map((chat) => (
            <ChatCard key={chat.id} chat={chat}
              onClick={() => {
                navigate(`/chats/${chat.id}`);
                setShowChatsScreen(false);
              }} />
          ))}
      </ul>
    </div>
  );
};

export default ChatNav;
