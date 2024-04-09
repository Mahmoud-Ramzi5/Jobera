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
