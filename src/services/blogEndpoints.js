import axios from './service';
import { authenticate } from '../utilties/auth';

const POSTS = '/blog/posts/'

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


export const updatePost = async (id, data) => {

    const headers = await authenticate(HEADERS)
    const config = { headers }

    return await axios.put(`${POSTS}${id}/`, JSON.stringify(data), config);
}