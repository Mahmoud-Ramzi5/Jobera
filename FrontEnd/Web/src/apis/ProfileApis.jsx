import React from 'react';
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

export const AddEducation = async (
  token,
  level,
  field,
  school,
  StartDate,
  EndDate,
  certificate
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/education/add', {
      'level': level,
      'field': field,
      'school': school,
      'start_date': StartDate,
      'end_date': EndDate,
      'certificate_file': certificate
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
    const response = await axios.post('http://127.0.0.1:8000/api/education/edit', {
      'level': level,
      'field': field,
      'school': school,
      'start_date': StartDate,
      'end_date': EndDate,
      'certificate_file': certificate
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

export const ShowCertificates = async (
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
export const ShowCertificate = async (
  token,
  id
) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/certificates/${id}`, {
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

export const AddCertificate = async (
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

export const EditCertificate = async (
  token,
  id,
  name,
  organization,
  ReleaseDate,
  file,
) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/certificate/edit/${id}`, {
      'name': name,
      'organization': organization,
      'release_date': ReleaseDate,
      'file': file,
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
}

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
    const response = await axios.post('http://127.0.0.1:8000/api/portfolio/edit', {
      'title': title,
      'description': description,
      'photo': photo,
      'link': link,
      'files': files,
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
