import { getAccessToken } from '../utilties/auth';

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