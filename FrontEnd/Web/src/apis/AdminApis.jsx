import axios from 'axios';
export const FetchAllUsers = async (
    token
) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
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