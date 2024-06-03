import axios from 'axios';


export const GetSpecificJobs = async (token, startIndex, dataSize) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs?startIndex=${startIndex}&dataSize=${dataSize}`, {
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

export const FetchRegJob = async (token, id) => {
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

export const FetchFreelancigJob = async (token, id) => {
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
      'title': title,
      'description': description,
      'state_id': state_id,
      'salary': salary,
      'photo': photo,
      'type': type,
      'skills': skills
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

export const AddFreelancingJobAPI = async (
  token,
  title,
  description,
  state_id,
  min_salary,
  max_salary,
  photo,
  deadline,
  skills
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/FreelancingJob/add', {
      'title': title,
      'description': description,
      'state_id': state_id,
      'min_salary': min_salary,
      'max_salary': max_salary,
      'photo': photo,
      'type': type,
      'skills': skills,
      'deadline': deadline,
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

export const ApplyRegJobAPI = async (
  token,
  job_id,
  description,
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/regJob/apply', {
      'job_id': job_id,
      'description': description,
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

export const ApplyFreelancingJobAPI = async (
  token,
  job_id,
  description,
  salary
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/FreelancingJob/apply', {
      'job_id': job_id,
      'description': description,
      'salary': salary
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

export const FetchRegJobCompetetors = async (token, id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/regJobs/${id}/competetors`, {
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

export const FetchFreelancingJobCompetetors = async (token, id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/FreelancingJobs/${id}/competetors`, {
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

export const DeleteRegJobAPI = async (token, id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/regJobs/${id}`, {
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

export const DeleteFreelancingJobAPI = async (token, id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/FreelancingJobs/${id}`, {
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