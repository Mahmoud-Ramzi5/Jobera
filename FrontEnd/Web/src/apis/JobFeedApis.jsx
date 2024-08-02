import axios from 'axios';


export const JopFeedAPI = async (token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobFeed/tops`, {
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
}

export const StatsAPI = async (token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobFeed/stats`, {
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
}