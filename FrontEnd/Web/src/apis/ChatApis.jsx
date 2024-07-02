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

export const FetchChatDetails = async (token, chatId) => {
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

export const SendMessage = async (token, message, reciver_id) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/chats/sendMessage', {
      "reciver_id": reciver_id,
      "message": message
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
export const CreateChat = async (token, reciver_id) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/chats/create', {
      "reciver_id": reciver_id,
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