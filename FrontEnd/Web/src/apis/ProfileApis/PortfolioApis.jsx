import axios from 'axios';

export const ShowPortfoliosAPI = async (
  token,
  user_id,
  user_name,
) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/portfolios/${user_id}/${user_name}`, {
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

export const ShowPortfolioAPI = async (
  token,
  id
) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/portfolio/${id}`, {
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

export const AddPortfolioAPI = async (
  token,
  title,
  description,
  photo,
  link,
  files,
  SkillIds
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/portfolio/add', {
      'title': title,
      'description': description,
      'photo': photo,
      'link': link,
      'files': files,
      'skills': SkillIds,
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

export const EditPortfolioAPI = async (
  token,
  id,
  title,
  description,
  photo,
  link,
  files,
  SkillIds
) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/portfolio/edit/${id}`, {
      'title': title,
      'description': description,
      'photo': photo,
      'link': link,
      'files': files,
      'skills': SkillIds,
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

export const DeletePortfolioAPI = async (token, id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/portfolios/${id}`, {
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