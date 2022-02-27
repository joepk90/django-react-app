import { isEmpty } from './objects';

export const getAccessToken = async () => {

    const accessToken = localStorage.getItem('access');

    if (!accessToken) return null;

    return accessToken;

}


export const authenticate = async (headers) => {

    if (!headers || isEmpty(headers)) return headers;

    const accessToken = await getAccessToken();

    if (accessToken) {
        headers.Authorization = `JWT ${accessToken}`;
    }

    return headers;

}