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

export const EditEducation = async (
  token,
  level,
  field,
  school,
  StartDate,
  EndDate,
  certificate
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/education', {
      'level': level,
      'field': field,
      'school': school,
      'start_date': StartDate,
      'end_date': EndDate,
      'certificate_file': certificate
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

export const ShowCertificatesAPI = async (
  token
) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/certificates', {
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

export const AddCertificateAPI = async (
  token,
  name,
  organization,
  ReleaseDate,
  file,
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/certificate/add', {
      'name': name,
      'organization': organization,
      'release_date': ReleaseDate,
      'file': file,
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

export const EditCertificateAPI = async (
  token,
  id,
  name,
  organization,
  ReleaseDate,
  file,
) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/certificate/edit/${id}`, {
      'name': name,
      'organization': organization,
      'release_date': ReleaseDate,
      'file': file,
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

export const DeleteCertificateAPI = async (token, id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/certificates/${id}`, {
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

export const ShowPortfoliosAPI = async (
  token
) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/portfolios', {
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
