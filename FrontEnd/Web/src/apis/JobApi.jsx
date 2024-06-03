import axios from 'axios';

export const FetchAllRegJobs = async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/regJobs', {
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
  export const FetchAllFreelancingJobs = async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/FreelancingJobs', {
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
  export const FetchRegJob = async (token,id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/regJobs/${id}`, {
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
  export const FetchFreelancigJob = async (token,id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/FreelancingJobs/${id}`, {
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
  export const AddRegJobAPI = async (
    token,
    title,
    description,
    state_id,
    salary,
    photo,
    type,
    skills
  ) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/regJob/add', {
        'title':title,
        'description':description,
        'state_id':state_id,
        'salary':salary,
        'photo':photo,
        'type':type,
        'skills':skills
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