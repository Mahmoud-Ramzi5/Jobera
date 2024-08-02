import axios from 'axios';


export const FetchNotifications = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/notifications', {
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

export const MarkNotification = async (token, notification_id) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/notifications',
            {
                'notification_id': notification_id
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

export const DeleteNotification = async (token, notification_id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/notification/${notification_id}`, {
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
