import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
} from './types';

// .env: REACT_APP_API_URL=http://domain.com
const HOST = process.env.REACT_APP_API_URL

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        })

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify`, body, config);

            dispatch({
                type: AUTHENTICATED_SUCCESS,
            })

        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL,
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const response = await axios.get(`${HOST}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            })

        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
            })
        }

    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        })
    }



}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const response = await axios.post(`${HOST}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    })
}