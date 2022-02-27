import axios, { getDefaultHeaders } from './service';
import { authenticate } from '../utilties/auth';

const POST_FORM = '/blog/forms/'
const POSTS = '/blog/posts/'


export const getPostForm = async (id) => {
    return await axios.get(`${POST_FORM}${id}/`,);
}

export const updatePost = async (id, data) => {

    const defaultHeaders = getDefaultHeaders()
    const headers = await authenticate(defaultHeaders);

    const config = { headers }

    return await axios.put(`${POSTS}${id}/`, JSON.stringify(data), config);
}