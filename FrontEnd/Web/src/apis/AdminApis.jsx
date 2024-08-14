import axios from 'axios';

export const FetchAllUsers = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
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

export const FetchReportsData = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/reports', {
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

export const GenerateRedeemCode = async (token, amount) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate',
            {
                "value": amount
            },
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
export const DeleteTransactionAPI = async (token, transaction_id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/transactions/${transaction_id}`,
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
export const DeleteUserAPI = async (token, user_id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/users/${user_id}`,
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