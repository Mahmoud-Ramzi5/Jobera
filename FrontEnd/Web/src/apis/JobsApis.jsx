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

export const FetchJobsNoPagination = async (token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/all`, {
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

export const FetchJob = async (token, defJob_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${defJob_id}`, {
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

export const ApplyToFreelancingJobAPI = async (
  token,
  job_id,
  description,
  offer
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/FreelancingJob/apply', {
      'job_id': job_id,
      'description': description,
      'offer': offer
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

export const DeleteRegJobAPI = async (token, defJob_id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/regJobs/${defJob_id}`, {
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

export const DeleteFreelancingJobAPI = async (token, defJob_id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/FreelancingJobs/${defJob_id}`, {
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

export const AcceptRegJob = async (token, defJobId, competitorId) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/regJob/accept/${defJobId}`, {
      'reg_job_competitor_id': competitorId
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
}

export const AcceptFreelancingJob = async (token, defJobId, competitorId, salary) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/FreelancingJob/accept/${defJobId}`, {
      'freelancing_job_competitor_id': competitorId,
      'offer': salary
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
}

export const FinishFreelancingJob = async (token, sender_id, receiver_id, defJob_id, amount) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/FreelancingJob/done/${defJob_id}`,
      {
        'sender_id': sender_id,
        'receiver_id': receiver_id,
        'amount': amount
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
}

export const BookmarkJobAPI = async (token, defJobId) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/jobs/${defJobId}/bookmark`,
      null, {
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

export const PostedJobs = async (token, page, filter) => {
  let apiUrl = `http://127.0.0.1:8000/api/manage/posted?page=${page}`;
  if (filter.type !== null) {
    apiUrl = `${apiUrl}&type[eq]=${filter.type}`;
  }
  if (filter.userName !== null) {
    apiUrl = `${apiUrl}&user_name[like]=${filter.userName}`;
  }
  if (filter.companyName !== null) {
    apiUrl = `${apiUrl}&company_name[like]=${filter.companyName}`;
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

export const AppliedJobs = async (token, page, filter) => {
  let apiUrl = `http://127.0.0.1:8000/api/manage/applied?page=${page}`;
  if (filter.type !== null) {
    apiUrl = `${apiUrl}&type[eq]=${filter.type}`;
  }
  if (filter.type === 'Freelancing' && filter.userName !== null) {
    apiUrl = `${apiUrl}&user_name[like]=${filter.userName}`;
  }
  if ((filter.type === 'RegularJob') && filter.companyName !== null) {
    apiUrl = `${apiUrl}&company_name[like]=${filter.companyName}`;
  }
  if (filter.type === 'Freelancing' && filter.minSalary >= 0 && filter.maxSalary >= 0) {
    apiUrl = `${apiUrl}&min_salary[gte]=${filter.minSalary}&max_salary[lte]=${filter.maxSalary}`;
  }
  if ((filter.type === 'RegularJob') && filter.minSalary >= 0 && filter.maxSalary >= 0) {
    apiUrl = `${apiUrl}&salary[gte]=${filter.minSalary}&salary[lte]=${filter.maxSalary}`;
  }
  if (filter.type === 'Freelancing' && filter.fromDeadline !== '') {
    apiUrl = `${apiUrl}&deadline[gte]=${filter.fromDeadline}`;
  }
  if (filter.type === 'Freelancing' && filter.toDeadline !== '') {
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

export const BookmarkedJobs = async (token) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/manage/bookmarked`, {
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

export const ChangeOffer = async (
  token,
  defJob_id,
  offer
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/FreelancingJobs/offer', {
      'defJob_id': defJob_id,
      'offer': offer,
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
//
// export const FetchRegJobCompetitors = async (token, id) => {
//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/regJobs/${id}/competitors`, {
//       headers: {
//         'Content-Type': 'application/json; charset=UTF-8',
//         'Accept': "application/json",
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response;
//   } catch (error) {
//     return error.response;
//   }
// };

// export const FetchFreelancingJobCompetitors = async (token, id) => {
//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/FreelancingJobs/${id}/competitors`, {
//       headers: {
//         'Content-Type': 'application/json; charset=UTF-8',
//         'Accept': "application/json",
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response;
//   } catch (error) {
//     return error.response;
//   }
// };