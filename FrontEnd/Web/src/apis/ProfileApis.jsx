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

export const AddSkills = async (token, SkillIds) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/profile/skills', {
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
    const response = await axios.post('http://127.0.0.1:8000/api/education', {
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

export const AddCertificate= async (
  token, 
  name,
  organization,
  releaseDate,
  file,
) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/certificate', {
        'name': name,
        'organization': organization,
        'release_date': releaseDate,
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
export const ShowCertificates= async (
  token
) => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/certificate', {
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