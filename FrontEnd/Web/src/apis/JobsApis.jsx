import axios from 'axios';


export const FetchJobs = async (token, page, filter) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs?page=${page}`, {
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

export const FetchFullTimeJobs = async (token, page, filter) => {
  let apiUrl = `http://127.0.0.1:8000/api/regJobs?page=${page}&type[eq]=FullTime`;
  if (filter.companyName !== null) {
    apiUrl = `${apiUrl}&company_name[like]=${filter.companyName}`;
  }
  if (filter.minSalary >= 0 && filter.maxSalary >= 0) {
    apiUrl = `${apiUrl}&salary[gte]=${filter.minSalary}&salary[lte]=${filter.maxSalary}`;
  }
  if (filter.skills.length !== 0) {
    apiUrl = `${apiUrl}&skills=${filter.skills}`;
  }
  try {
    const response = await axios.get(apiUrl, {
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

export const FetchPartTimeJobs = async (token, page, filter) => {
  let apiUrl = `http://127.0.0.1:8000/api/regJobs?page=${page}&type[eq]=PartTime`;
  if (filter.companyName !== null) {
    apiUrl = `${apiUrl}&company_name[like]=${filter.companyName}`;
  }
  if (filter.minSalary >= 0 && filter.maxSalary >= 0) {
    apiUrl = `${apiUrl}&salary[gte]=${filter.minSalary}&salary[lte]=${filter.maxSalary}`;
  }
  if (filter.skills.length !== 0) {
    apiUrl = `${apiUrl}&skills=${filter.skills}`;
  }
  try {
    const response = await axios.get(apiUrl, {
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

export const FetchFreelancingJobs = async (token, page, filter) => {
  let apiUrl = `http://127.0.0.1:8000/api/FreelancingJobs?page=${page}`;
  if (filter.userName !== null) {
    apiUrl = `${apiUrl}&user_name[like]=${filter.userName}`;
  }
  if (filter.minSalary >= 0 && filter.maxSalary >= 0) {
    apiUrl = `${apiUrl}&min_salary[gte]=${filter.minSalary}&max_salary[lte]=${filter.maxSalary}`;
  }
  if (filter.fromDeadline !== '') {
    apiUrl = `${apiUrl}&deadline[gte]=${filter.fromDeadline}`;
  }
  if (filter.toDeadline !== '') {
    apiUrl = `${apiUrl}&deadline[lte]=${filter.toDeadline}`;
  }
  if (filter.skills.length !== 0) {
    apiUrl = `${apiUrl}&skills=${filter.skills}`;
  }
  try {
    const response = await axios.get(apiUrl, {
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

export const FetchJob = async (token, id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}`, {
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
      'deadline': deadline,
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

export const ApplyToRegJobAPI = async (
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

export const ApplyToFreelancingJobAPI = async (
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
};

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
};


//
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

export const AcceptFreelancingJob = async (token, freelancingJobId, competetorId) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/FreelancingJob/accept/${freelancingJobId}`, {
      'freelancing_job_competetor_id': competetorId
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
}

export const AcceptRegJob = async (token, regJobId, competetorId) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/regJob/accept/${regJobId}`, {
      'reg_job_competetor_id': competetorId
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
}

