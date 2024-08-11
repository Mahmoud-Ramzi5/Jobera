import React from 'react';
import { useTranslation } from 'react-i18next';
import defaultUser from '../../assets/default.png';
import styles from './chats.module.css';


const ChatCard = ({ chat, onClick }) => {
  // Translations
  const { t } = useTranslation('global');


  return (
    <li className={styles.card} onClick={onClick}>
      {chat.other_user.avatar_photo ? (
        <img
          className={styles.Card_Img}
          variant="top"
          src={URL.createObjectURL(chat.other_user.avatar_photo)}
          alt={"Profile Picture"}
          style={{ pointerEvents: "none" }}
        />
      ) : (
        <img
          className={styles.Card_Img}
          variant="top"
          src={defaultUser}
          alt={"Default Picture"}
          style={{ pointerEvents: "none" }}
        />
      )}
      {chat.unread_messages !== 0 &&
        <small className={styles.card_unread}>
          {chat.unread_messages}
        </small>
      }
      <div className={styles.card_user}>
        {chat.other_user.name}
      </div>
      <div className={styles.card_message}>
        {chat.last_message ? chat.last_message.message : t('components.nav_bar.card_chat')}
      </div>
    </li>
  );
};

export default ChatCard;
