import axios from './service';
import { getAccessToken } from '../utilties/auth';

const AUTHENTICATE_VERIFY = '/auth/jwt/verify/'
const USER_GET_SELF = '/auth/users/me/'

const CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const authenticate = async () => {

    const accessToken = await getAccessToken();

    if (accessToken) {
        CONFIG.headers.Authorization = `JWT ${accessToken}`;
    }

    return CONFIG;

}

export const verifyAccessToken = async () => {

    const accessToken = await getAccessToken()

    if (!accessToken) {
        throw new Error('No access token')
    }

    const body = JSON.stringify({
        token: accessToken
    })

    const config = await authenticate(CONFIG);
    return await axios.post(AUTHENTICATE_VERIFY, body, config);
}

export const getCurrentUser = async () => {
    const config = await authenticate(CONFIG)
    return await axios.get(USER_GET_SELF, config);
}