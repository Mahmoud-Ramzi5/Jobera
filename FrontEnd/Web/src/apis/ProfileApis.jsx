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

export const AddSkills = async (token, skillIds) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/profile/skills', {
      'skills': skillIds,
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
  field, // Corrected field name
  school,
  startDate,
  endDate,
  certificate
) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/education', {
      'level': level,
      'field': field, // Corrected field name
      'school': school,
      'startDate': startDate,
      'endDate': endDate,
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
