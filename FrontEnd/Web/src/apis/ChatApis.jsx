import axios from 'axios';


export const FetchUserChats = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/chats', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const FetchChat = async (token, chatId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/chats/${chatId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const CreateChat = async (token, receiver_id) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/chats/create', {
      "receiver_id": receiver_id,
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const SendMessage = async (token, message, receiver_id) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/chats/sendMessage', {
      "message": message,
      "receiver_id": receiver_id
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    }); return response;
  } catch (error) {
    return error.response;
  }
};

export const MarkMessagesAsRead = async (token, chat_id) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/chat/messages', {
      "chat_id": chat_id
    }, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    }); return response;
  } catch (error) {
    return error.response;
  }
};
