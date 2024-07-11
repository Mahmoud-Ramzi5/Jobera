import axios from 'axios';

export const GetEducation = async (
  token
) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/education', {
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