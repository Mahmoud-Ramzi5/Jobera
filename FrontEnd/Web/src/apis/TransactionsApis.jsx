import axios from 'axios';

export const GetTransactions = async (token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/transactions`, {
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

export const FinishedJobTransaction = async (
  token,
  sender_id,
  receiver_id,
  job_id,
  amount
) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/transactions/done`, {
      'sender_id': sender_id,
      'receiver_id': receiver_id,
      'job_id': job_id,
      'amount': amount
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

export const UseRedeemCode = async (
  token,
  code
) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/redeemcode`, {
      'code': code,
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