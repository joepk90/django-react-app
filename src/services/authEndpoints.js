import axios from './service';
import { getAccessToken, authenticate } from '../utilties/auth';

const AUTHENTICATE_CREATE = '/auth/jwt/create/'
const AUTHENTICATE_VERIFY = '/auth/jwt/verify/'
const USER_GET_SELF = '/auth/users/me/'

const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const createAccessToken = async (email, password) => {

    if (!email || !password) {
        throw new Error('Email or Password not provided.')
    }

    const config = {
        headers: HEADERS
    };

    const body = JSON.stringify({ email, password });

    return await axios.post(AUTHENTICATE_CREATE, body, config);

}

export const verifyAccessToken = async () => {

    const accessToken = await getAccessToken()

    if (!accessToken) {
        throw new Error('No access token')
    }

    const body = JSON.stringify({
        token: accessToken
    })

    const headers = await authenticate(HEADERS);
    const config = { headers }

    return await axios.post(AUTHENTICATE_VERIFY, body, config);
}

export const getCurrentUser = async () => {

    const headers = await authenticate(HEADERS);
    const config = { headers }

    return await axios.get(USER_GET_SELF, config);
}