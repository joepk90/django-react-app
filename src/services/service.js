import axios from 'axios';
import { toast } from 'react-toastify';

// .env: REACT_APP_API_URL=http://domain.com
const HOST = process.env.REACT_APP_API_URL

axios.defaults.baseURL = HOST;

axios.interceptors.response.use(null, error => {

    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        toast.error('unexpected error occured');
    }

    return Promise.reject(error);

});

export const getDefaultHeaders = () => {

    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}


