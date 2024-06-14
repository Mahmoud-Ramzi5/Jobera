import React from 'react';
import styles from './ChatPage.module.css';

// Chat list component
const ChatList= () => {
  return (
    <div className={styles.chat_list}>
      <div className={styles.chat_item}>
        <div className={styles.avatar}></div>
        <div className={styles.chat_details}>
          <h3>Contact Name</h3>
          <p>Last message...</p>
        </div>
      </div>
      {/* Add more chat items here */}
    </div>
  );
}

// Chat window component
const ChatWindow= () => {
  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <h3>Contact Name</h3>
      </div>
      <div className={styles.chat_messages}>
        {/* Messages go here */}
      </div>
      <div className={styles.chat_input}>
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
}

// Main app component
const ChatPage= () => {
  return (
    <div className={styles.app}>
      <ChatList />
      <ChatWindow />
    </div>
  );
}

export default ChatPage;