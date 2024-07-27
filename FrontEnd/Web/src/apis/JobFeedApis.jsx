import axios from 'axios';

export const MostPayedRegJobsAPI = async (token) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/jobFeed/payedReg`, {
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
  export const MostPostingCompaniesAPI = async (token) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/jobFeed/companies`, {
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
  export const MostNeededSkillsAPI = async (token) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/jobFeed/skills`, {
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
  export const MostPayedFreelancingJobsAPI = async (token) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/jobFeed/payedFreelance`, {
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