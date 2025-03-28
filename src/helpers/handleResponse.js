import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';

function handleResponse(response, suppress) {
    suppress = suppress !== undefined ? suppress : false;
    
    if (!response.ok) {
        if (response.status == 401) {
            // auto logout if 401 Unauthorized response returned from api
            AuthService.logout();
        }

        let message = response.statusText;

        // replace with our custom message
       return response.clone().text().then(text => {
            const data = text && JSON.parse(text);
            if (data.status && data.status.message) {
                message = data.status.message;
            }

            toast.error(message);
    
            return Promise.reject(message);
        });

    }
    
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        if (data && data.status.error) {

            toast.error(data.status.message);

            return Promise.reject(data.status.message);
        }

        if (!suppress)
            toast.success(data.status.message);

        return data.payload;
    });

}

export default handleResponse;