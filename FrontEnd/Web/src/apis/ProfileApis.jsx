import axios from 'axios';


export const FetchUserProfile = async (token) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/profile', {
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

export const EditProfile = async (
  token,
  Name,
  PhoneNumber,
  state_id,
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/profile/edit', {
      "name": Name,
      "full_name": Name,
      "phone_number": PhoneNumber,
      "state_id": state_id,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const EditDescription = async (token, description) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/profile/description`, {
      "description": description
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

export const UpdateProfilePicture = async (token, avatarPhoto) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/profile/photo`, {
      "avatar_photo": avatarPhoto
    }, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
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



export const GetRegisterStep = async (token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/regStep`, {
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
