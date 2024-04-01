import React from 'react';
import axios from 'axios';


export const RegisterAPI = async (
    FirstName,
    LastName,
    email,
    PhoneNumber,
    password,
    ConfirmPassword,
    country,
    state,
    date,
    gender
) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
            "fullName": FirstName + " " + LastName,
            "email": email,
            "phoneNumber": PhoneNumber,
            "password": password,
            "confirmPassword": ConfirmPassword,
            "country": country,
            "state": state,
            "birthDate": date,
            "gender": gender,
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
            "remember": rememberMe
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

export const FetchStates = async (country_id) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/states', {
            'country_id': country_id
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
