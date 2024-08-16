import axios from 'axios';


export const RegisterAPI = async (
    FirstName,
    LastName,
    email,
    PhoneNumber,
    password,
    ConfirmPassword,
    StateId,
    date,
    gender
) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
            "full_name": FirstName + " " + LastName,
            "email": email,
            "phone_number": PhoneNumber,
            "password": password,
            "confirm_password": ConfirmPassword,
            "state_id": StateId,
            "birth_date": date,
            "gender": gender,
            "type": "individual"
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const CompanyRegisterAPI = async (
    name,
    field,
    email,
    PhoneNumber,
    password,
    ConfirmPassword,
    StateId,
    date
) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/company/register', {
            "name": name,
            "field": field,
            "email": email,
            "phone_number": PhoneNumber,
            "password": password,
            "confirm_password": ConfirmPassword,
            "state_id": StateId,
            "founding_date": date,
            "type": "company"
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const LoginAPI = async (
    email,
    password,
    rememberMe
) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
            "email": email,
            "password": password,
            "remember": rememberMe,
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const LogoutAPI = async (
    token,
) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/logout', {},
            {
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

export const ForgotPasswordAPI = async (
    email,
) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/password/reset-link', {
            "email": email,
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const ResetPasswordAPI = async (
    token,
    email,
    password,
    ConfirmPassword
) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/password/reset', {
            "email": email,
            "password": password,
            "confirm_password": ConfirmPassword,
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

export const CheckToken = async (
    token
) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/isExpired', {
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

export const RequestEmailAPI = async (
    token
) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/verify', {
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

export const VerifyEmailAPI = async (
    token
) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/verifyEmail', {
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

export const FetchEmail = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/email', {
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

export const FetchProviders = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/providers', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const FetchCountries = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/countries', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const FetchStates = async (country_name) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/states', {
            'country_name': country_name
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};
