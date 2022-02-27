import axios from './service';
import { authenticate } from '../utilties/auth';

const POST_FORM = '/blog/forms/'
const POSTS = '/blog/posts/'

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


export const getPostForm = async (id) => {
    return await axios.get(`${POST_FORM}${id}/`,);
}

export const updatePost = async (id, data) => {

    const headers = await authenticate(HEADERS)
    const config = { headers }

    return await axios.put(`${POSTS}${id}/`, JSON.stringify(data), config);
}