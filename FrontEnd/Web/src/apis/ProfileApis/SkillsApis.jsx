import axios from 'axios';

export const GetSkillsAPI = async (
  token
) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/skills', {
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

export const AddSkillsAPI = async (token, SkillIds) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/user/skills/add', {
      'skills': SkillIds,
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

export const EditSkillsAPI = async (token, SkillIds) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/user/skills/edit', {
      'skills': SkillIds,
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