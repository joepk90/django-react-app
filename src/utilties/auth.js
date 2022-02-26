export const getAccessToken = async () => {

    const accessToken = localStorage.getItem('access');

    if (!accessToken) return null;

    return accessToken;

}